import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [logoScale, setLogoScale] = useState(0.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoScale(prev => prev === 0.8 ? 1.1 : 0.8);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        <motion.div
          animate={{ scale: logoScale }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="mb-8"
        >
          <div className="text-8xl mb-4">🧭</div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
            OrientClock
          </h1>
          <p className="text-blue-200 text-lg">
            Four Apps. One Orientation.
          </p>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-white/70 mt-6 text-sm"
        >
          Rotate your device to discover four powerful apps
        </motion.p>
      </div>
    </motion.div>
  );
}