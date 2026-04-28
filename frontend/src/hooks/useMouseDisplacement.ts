import { useEffect, useRef, useCallback } from 'react';
import { createDisplacementEffect, MouseDisplacementEffect } from '../utils/MouseDisplacementEffect';

interface UseMouseDisplacementOptions {
  enabled?: boolean;
  maxDisplacement?: number;
  smoothness?: number;
  onInit?: (effect: MouseDisplacementEffect) => void;
}

export function useMouseDisplacement(options: UseMouseDisplacementOptions = {}) {
  const { enabled = true, maxDisplacement = 80, smoothness = 0.15, onInit } = options;
  const effectRef = useRef<MouseDisplacementEffect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initEffect = useCallback(async () => {
    if (!containerRef.current || effectRef.current) return;

    const effect = createDisplacementEffect();
    effectRef.current = effect;
    
    try {
      await effect.init(containerRef.current);
      onInit?.(effect);
    } catch (error) {
      console.error('Failed to initialize displacement effect:', error);
    }
  }, [onInit]);

  const destroyEffect = useCallback(() => {
    if (effectRef.current) {
      effectRef.current.dispose();
      effectRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      initEffect();
    } else {
      destroyEffect();
    }

    return destroyEffect;
  }, [enabled, initEffect, destroyEffect]);

  return {
    containerRef,
    effect: effectRef.current,
    init: initEffect,
    destroy: destroyEffect,
  };
}

export default useMouseDisplacement;