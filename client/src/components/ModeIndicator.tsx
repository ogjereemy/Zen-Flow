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
      className="fixed top-4 left-4 z-40 glass-morphism rounded-xl px-4 py-2"
    >
      <div className="flex items-center space-x-2">
        <div className="text-xl">{icon}</div>
        <span className="font-medium text-sm text-white">{mode}</span>
      </div>
    </motion.div>
  );
}
