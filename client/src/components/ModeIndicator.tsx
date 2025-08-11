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
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-4 left-4 z-10 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10"
    >
      <div className="flex items-center gap-2 text-white">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xl"
        >
          {icon}
        </motion.span>
        <span className="text-sm font-medium tracking-wide">{mode}</span>
      </div>
    </motion.div>
  );
}