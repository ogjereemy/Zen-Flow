import { useEffect } from 'react';

interface HapticFeedbackProps {
  intensity?: 'light' | 'medium' | 'heavy';
  trigger?: boolean;
}

export function useHapticFeedback(intensity: 'light' | 'medium' | 'heavy' = 'medium') {
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      const duration = {
        light: 10,
        medium: 25,
        heavy: 50
      }[intensity];
      
      navigator.vibrate(duration);
    }
  };

  return triggerHaptic;
}

export default function HapticFeedback({ intensity = 'medium', trigger }: HapticFeedbackProps) {
  useEffect(() => {
    if (trigger && 'vibrate' in navigator) {
      const duration = {
        light: 10,
        medium: 25,
        heavy: 50
      }[intensity];
      
      navigator.vibrate(duration);
    }
  }, [trigger, intensity]);

  return null;
}