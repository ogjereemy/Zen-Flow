import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { hapticFeedback, audioFeedback } from "@/utils/haptics";
import { forwardRef } from "react";

interface EnhancedButtonProps extends ButtonProps {
  haptic?: 'light' | 'medium' | 'heavy';
  sound?: boolean;
  ripple?: boolean;
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ children, onClick, haptic = 'light', sound = true, ripple = true, className, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Haptic feedback
      if (haptic) {
        hapticFeedback[haptic]();
      }

      // Audio feedback
      if (sound) {
        audioFeedback.tick();
      }

      // Original onClick
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="relative overflow-hidden"
      >
        <Button
          ref={ref}
          onClick={handleClick}
          className={`relative overflow-hidden ${ripple ? 'ripple-effect' : ''} ${className}`}
          {...props}
        >
          {children}
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-white/20 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </Button>
      </motion.div>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton };