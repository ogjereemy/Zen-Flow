import { motion } from "framer-motion";
import { useMemo } from "react";

interface FloatingParticlesProps {
  orientation: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const particleConfigs = {
  'portrait-primary': {
    count: 15,
    colors: ['#3b82f6', '#1d4ed8', '#2563eb', '#1e40af'],
    maxSize: 4,
    baseDuration: 8
  },
  'landscape-primary': {
    count: 20,
    colors: ['#10b981', '#059669', '#047857', '#065f46'],
    maxSize: 6,
    baseDuration: 6
  },
  'portrait-secondary': {
    count: 25,
    colors: ['#f59e0b', '#d97706', '#b45309', '#92400e'],
    maxSize: 5,
    baseDuration: 10
  },
  'landscape-secondary': {
    count: 18,
    colors: ['#06b6d4', '#0891b2', '#0e7490', '#155e75'],
    maxSize: 7,
    baseDuration: 12
  }
};

export default function FloatingParticles({ orientation }: FloatingParticlesProps) {
  const config = particleConfigs[orientation as keyof typeof particleConfigs] || particleConfigs['portrait-primary'];
  
  const particles = useMemo(() => {
    const particleArray: Particle[] = [];
    
    for (let i = 0; i < config.count; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * config.maxSize + 1,
        duration: config.baseDuration + Math.random() * 4,
        delay: Math.random() * 2,
        color: config.colors[Math.floor(Math.random() * config.colors.length)]
      });
    }
    
    return particleArray;
  }, [orientation, config]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={`${orientation}-${particle.id}`}
          className="absolute rounded-full opacity-20"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(particle.id) * 10, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Gradient overlay for better visual depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />
    </div>
  );
}