import * as PIXI from 'pixi.js';

export class DisplacementEffect {
  private app: PIXI.Application | null = null;
  private displacementSprite: PIXI.Sprite | null = null;
  private displacementFilter: PIXI.DisplacementFilter | null = null;
  private container: HTMLElement | null = null;
  
  private lastMouseX = 0;
  private lastMouseY = 0;
  private velocityX = 0;
  private velocityY = 0;
  private targetScale = 0;
  private currentScale = 0;
  
  private animationFrameId: number | null = null;

  constructor() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.animate = this.animate.bind(this);
  }

  private generatePerlinNoiseTexture(): PIXI.Texture {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    
    const permutation = [];
    for (let i = 0; i < 256; i++) permutation.push(i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
    }
    const p = [...permutation, ...permutation];
    
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
      const A = p[X] + Y;
      const B = p[X + 1] + Y;
      return lerp(
        lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
        lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u),
        v
      );
    };
    
    const octaveNoise = (x: number, y: number, octaves: number) => {
      let value = 0;
      let amplitude = 1;
      let frequency = 1;
      let maxValue = 0;
      for (let i = 0; i < octaves; i++) {
        value += amplitude * noise(x * frequency, y * frequency);
        maxValue += amplitude;
        amplitude *= 0.5;
        frequency *= 2;
      }
      return value / maxValue;
    };
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = x / size * 4;
        const ny = y / size * 4;
        const value = (octaveNoise(nx, ny, 4) + 1) / 2;
        const idx = (y * size + x) * 4;
        const byte = Math.floor(value * 255);
        data[idx] = byte;
        data[idx + 1] = byte;
        data[idx + 2] = byte;
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    return PIXI.Texture.from(canvas);
  }

  private handleMouseMove(e: MouseEvent) {
    const now = performance.now();
    const dt = Math.max(now - this.lastMouseX, 1);
    
    this.velocityX = (e.clientX - this.lastMouseX) / dt;
    this.velocityY = (e.clientY - this.lastMouseY) / dt;
    
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    
    const speed = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
    this.targetScale = Math.min(speed * 50, 100);
  }

  private animate() {
    if (!this.displacementFilter) return;
    
    this.currentScale += (this.targetScale - this.currentScale) * 0.1;
    this.displacementFilter.scale.x = this.currentScale * (1 + this.velocityX * 0.5);
    this.displacementFilter.scale.y = this.currentScale * (1 + this.velocityY * 0.5);
    
    if (this.displacementSprite) {
      this.displacementSprite.x += 1;
      this.displacementSprite.y += 0.5;
      if (this.displacementSprite.x > 256) this.displacementSprite.x = 0;
    }
    
    this.targetScale *= 0.95;
    
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  async initialize(container: HTMLElement) {
    this.container = container;
    
    this.app = new PIXI.Application();
    
    const bounds = container.getBoundingClientRect();
    await this.app.init({
      width: bounds.width,
      height: bounds.height,
      backgroundAlpha: 0,
      resizeTo: container,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });
    
    const canvas = this.app.canvas;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';
    container.appendChild(canvas);
    
    const noiseTexture = this.generatePerlinNoiseTexture();
    this.displacementSprite = new PIXI.Sprite(noiseTexture);
    this.displacementSprite.texture.baseTexture.wrapMode = 'repeat';
    this.app.stage.addChild(this.displacementSprite);
    
    this.displacementFilter = new PIXI.DisplacementFilter(this.displacementSprite);
    this.displacementFilter.scale.x = 0;
    this.displacementFilter.scale.y = 0;
    
    window.addEventListener('mousemove', this.handleMouseMove);
    
    this.animate();
    
    return {
      addFilterToContainer: (htmlContainer: HTMLElement) => {
        htmlContainer.style.filter = 'url(#displacement)';
      },
      getFilter: () => this.displacementFilter
    };
  }

  dispose() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('mousemove', this.handleMouseMove);
    if (this.app) {
      this.app.destroy(true);
    }
  }
}

export const createDisplacementEffect = () => new DisplacementEffect();