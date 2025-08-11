import { motion } from "framer-motion";

interface ModeIndicatorProps {
  mode: string;
  icon: string;
}

export default function ModeIndicator({ mode, icon }: ModeIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-40 glass-morphism rounded-xl px-4 py-2 neon-glow breathe"
    >
      <div className="flex items-center space-x-2">
        <motion.div 
          className="text-xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
        <span className="font-medium text-sm text-white text-stroke">{mode}</span>
      </div>
    </motion.div>
  );
}
