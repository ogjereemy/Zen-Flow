// Enhanced haptic feedback utilities for mobile devices
export const hapticFeedback = {
  // Light tap for button presses
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    // iOS haptic feedback
    if ('HapticFeedback' in window) {
      (window as any).HapticFeedback.impact('light');
    }
  },

  // Medium feedback for mode changes
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
    if ('HapticFeedback' in window) {
      (window as any).HapticFeedback.impact('medium');
    }
  },

  // Strong feedback for important actions
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    if ('HapticFeedback' in window) {
      (window as any).HapticFeedback.impact('heavy');
    }
  },

  // Success pattern
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([20, 10, 20]);
    }
    if ('HapticFeedback' in window) {
      (window as any).HapticFeedback.notification('success');
    }
  },

  // Error pattern
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 20, 50, 20, 50]);
    }
    if ('HapticFeedback' in window) {
      (window as any).HapticFeedback.notification('error');
    }
  }
};

// Audio feedback for better accessibility
export const audioFeedback = {
  tick: () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiU2u7NfS4HJHLA8N+QQQsUXLPn7qpYFgpBnN7yumEcBzqM0uwVXaWNJHPG8N2QQQsVY8YlUQhQaLvt559NEg+f0JdvGnpOO6mCWElMnqmPqwFhWNJ+SNlOuoRJWGRs1qV4kGxqr7kJQzM4XlpUWuC8VK2C6iRnpJ0xPPGrP8G3QiQOOCN8Hnr');
    audio.volume = 0.1;
    audio.play().catch(() => {}); // Ignore errors for silent browsers
  },

  beep: () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiU2u7NfS4HJHLA8N+QQQsUXLPn7qpYFgpBnN7yumEcBzqP2vDD');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  }
};