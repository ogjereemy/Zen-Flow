import { motion } from "framer-motion";

interface FloatingParticlesProps {
  orientation: string;
}

export default function FloatingParticles({ orientation }: FloatingParticlesProps) {
  const particleColors = {
    'portrait-primary': ['#8B5CF6', '#A855F7', '#C084FC'], // Purple tones
    'landscape-primary': ['#0EA5E9', '#06B6D4', '#67E8F9'], // Blue tones
    'portrait-secondary': ['#F97316', '#FB923C', '#FDBA74'], // Orange tones
    'landscape-secondary': ['#0284C7', '#0369A1', '#075985'] // Deep blue tones
  };

  const colors = particleColors[orientation as keyof typeof particleColors] || particleColors['portrait-primary'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 20 : -20, 0],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}