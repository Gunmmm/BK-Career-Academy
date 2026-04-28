import * as PIXI from 'pixi.js';

export class MouseDisplacementEffect {
  private app: PIXI.Application | null = null;
  private displacementFilter: PIXI.DisplacementFilter | null = null;
  private noiseSprite: PIXI.Sprite | null = null;
  
  private lastX = 0;
  private lastY = 0;
  private lastTime = 0;
  private velocityX = 0;
  private velocityY = 0;
  private targetDisplacement = 0;
  private currentDisplacement = 0;
  
  private animationId: number | null = null;
  private container: HTMLElement | null = null;

  private generateNoiseTexture(): PIXI.Texture {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    
    const p: number[] = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    const perm = [...p, ...p];
    
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + t * (b - a);
    const grad = (hash: number, x: number, y: number) => {
      const h = hash & 3;
      const u = h < 2 ? x : y;
      const v = h < 2 ? y : x;
      return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
    };
    
    const noise = (x: number, y: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = fade(x);
      const v = fade(y);
      const A = perm[X] + Y;
      const B = perm[X + 1] + Y;
      return lerp(
        lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
        lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u),
        v
      );
    };
    
    const fbm = (x: number, y: number) => {
      let value = 0, amp = 1, freq = 1, max = 0;
      for (let i = 0; i < 5; i++) {
        value += amp * noise(x * freq, y * freq);
        max += amp;
        amp *= 0.5;
        freq *= 2;
      }
      return value / max;
    };
    
    const imageData = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const v = (fbm(x / size * 3, y / size * 3) + 1) * 0.5;
        const b = Math.floor(v * 255);
        const i = (y * size + x) * 4;
        imageData.data[i] = b;
        imageData.data[i + 1] = b;
        imageData.data[i + 2] = b;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    return PIXI.Texture.from(canvas);
  }

  private handleMouseMove = (e: MouseEvent) => {
    const now = performance.now();
    const dt = Math.max(now - this.lastTime, 1);
    
    this.velocityX = (e.clientX - this.lastX) / dt;
    this.velocityY = (e.clientY - this.lastY) / dt;
    
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.lastTime = now;
    
    const speed = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
    const maxDisplacement = 80;
    this.targetDisplacement = Math.min(speed * 15, maxDisplacement);
  };

  private animate = () => {
    if (!this.displacementFilter || !this.noiseSprite) return;
    
    const smoothing = 0.15;
    this.currentDisplacement += (this.targetDisplacement - this.currentDisplacement) * smoothing;
    
    const directionalX = 1 + this.velocityX * 0.3;
    const directionalY = 1 + this.velocityY * 0.3;
    
    this.displacementFilter.scale.x = this.currentDisplacement * directionalX;
    this.displacementFilter.scale.y = this.currentDisplacement * directionalY;
    
    this.noiseSprite.x = (this.noiseSprite.x + 0.5) % 256;
    this.noiseSprite.y = (this.noiseSprite.y + 0.3) % 256;
    
    this.targetDisplacement *= 0.92;
    
    this.animationId = requestAnimationFrame(this.animate);
  };

  async init(targetElement: HTMLElement): Promise<void> {
    this.container = targetElement;
    this.lastX = window.innerWidth / 2;
    this.lastY = window.innerHeight / 2;
    this.lastTime = performance.now();
    
    this.app = new PIXI.Application();
    const bounds = targetElement.getBoundingClientRect();
    
    await this.app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundAlpha: 0,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio, 2),
      autoDensity: true,
    });
    
    const canvas = this.app.canvas as HTMLCanvasElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    const noiseTexture = this.generateNoiseTexture();
    this.noiseSprite = new PIXI.Sprite(noiseTexture);
    this.noiseSprite.texture.source.scaleMode = 'linear';
    this.app.stage.addChild(this.noiseSprite);
    
    this.displacementFilter = new PIXI.DisplacementFilter(this.noiseSprite);
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    
    targetElement.style.filter = 'url(#pixi-displacement)';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'pixi-displacement';
    svg.style.cssText = 'position:absolute;width:0;height:0;';
    svg.innerHTML = `
      <defs>
        <filter id="displacement">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" seed="5"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
    `;
    document.body.appendChild(svg);
    
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.handleResize);
    
    this.animate();
  }

  private handleResize = () => {
    if (this.app) {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
  };

  dispose(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
    
    if (this.app) {
      try {
        this.app.stage.removeAllChildren();
        if (this.app.canvas && this.app.canvas.parentNode) {
          this.app.canvas.parentNode.removeChild(this.app.canvas);
        }
        this.app.destroy(true, { children: true, texture: true });
      } catch (e) {
        console.warn('PixiJS cleanup error:', e);
      }
    }
    
    const svg = document.getElementById('pixi-displacement');
    if (svg) svg.remove();
    
    if (this.container) {
      this.container.style.filter = '';
    }
  }
}

export const createDisplacementEffect = () => new MouseDisplacementEffect();