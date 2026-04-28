import { useEffect, useRef } from 'react';

interface DisplacementConfig {
  intensity?: number;
  speed?: number;
  rgbSplit?: number;
}

export function useDisplacementEffect(config: DisplacementConfig = {}) {
  const { intensity = 50, speed = 0.1, rgbSplit = 3 } = config;
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef({ x: 0, y: 0, time: 0 });
  const currentDistortion = useRef(0);
  const targetDistortion = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const svgId = 'displacement-svg-filter';
    
    let svgFilter = document.getElementById(svgId);
    if (!svgFilter) {
      svgFilter = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgFilter.id = svgId;
      svgFilter.innerHTML = `
        <defs>
          <filter id="displacementFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="4" result="noise" seed="1"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="displacement"/>
            <feColorMatrix type="matrix" in="displacement" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="rgbSplit"/>
          </filter>
          <filter id="rgbSplitFilter">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
            <feOffset dx="0" dy="0" result="redChannel"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
            <feOffset dx="0" dy="0" result="greenChannel"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
            <feOffset dx="0" dy="0" result="blueChannel"/>
            <feBlend mode="screen" in="redChannel" in2="greenChannel"/>
            <feBlend mode="screen" in="blueChannel" in2="Result"/>
          </filter>
        </defs>
      `;
      svgFilter.style.position = 'absolute';
      svgFilter.style.width = '0';
      svgFilter.style.height = '0';
      document.body.appendChild(svgFilter);
    }

    const applyDistortion = (distortion: number) => {
      container.style.filter = `url(#displacementFilter)`;
      const turbulence = svgFilter?.querySelector('feDisplacementMap');
      if (turbulence) {
        (turbulence as SVGElement).setAttribute('scale', distortion.toString());
      }
      
      if (distortion > 5) {
        const splitAmount = Math.min(distortion * 0.02, rgbSplit);
        const matrix = `1 0 0 0 ${splitAmount} 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0`;
        container.style.filter = `url(#displacementFilter) contrast(1.1)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - lastPosRef.current.time;
      
      if (dt > 0) {
        const dx = e.clientX - lastPosRef.current.x;
        const dy = e.clientY - lastPosRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const velocity = distance / dt;
        
        targetDistortion.current = Math.min(velocity * intensity, 100);
      }
      
      lastPosRef.current = { x: e.clientX, y: e.clientY, time: now };
    };

    const animate = () => {
      currentDistortion.current += (targetDistortion.current - currentDistortion.current) * speed;
      applyDistortion(currentDistortion.current);
      targetDistortion.current *= 0.95;
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.style.filter = '';
    };
  }, [intensity, speed, rgbSplit]);

  return containerRef;
}

export default useDisplacementEffect;