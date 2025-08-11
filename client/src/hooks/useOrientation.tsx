import { useState, useEffect } from 'react';

type OrientationType = 'portrait-primary' | 'landscape-primary' | 'portrait-secondary' | 'landscape-secondary';

export function useOrientation(): OrientationType {
  const [orientation, setOrientation] = useState<OrientationType>('portrait-primary');

  useEffect(() => {
    const updateOrientation = () => {
      if (screen.orientation) {
        setOrientation(screen.orientation.type as OrientationType);
      } else {
        // Fallback for browsers without screen.orientation
        const angle = window.orientation || 0;
        if (angle === 0) {
          setOrientation('portrait-primary');
        } else if (angle === 90) {
          setOrientation('landscape-primary');
        } else if (angle === 180) {
          setOrientation('portrait-secondary');
        } else if (angle === -90 || angle === 270) {
          setOrientation('landscape-secondary');
        }
      }
    };

    updateOrientation();

    if (screen.orientation) {
      screen.orientation.addEventListener('change', updateOrientation);
      return () => screen.orientation.removeEventListener('change', updateOrientation);
    } else {
      window.addEventListener('orientationchange', updateOrientation);
      return () => window.removeEventListener('orientationchange', updateOrientation);
    }
  }, []);

  return orientation;
}
