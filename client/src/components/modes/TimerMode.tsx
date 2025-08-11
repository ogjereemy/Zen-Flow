import { motion } from 'framer-motion';
import { useTimer } from '@/hooks/useTime';
import { Button } from '@/components/ui/button';
import { Play, Pause, Plus, Minus } from 'lucide-react';

export default function TimerMode() {
  const { 
    timeLeft, 
    isRunning, 
    progress, 
    start, 
    pause, 
    reset, 
    setTimer, 
    formatTime 
  } = useTimer(5);

  const strokeDasharray = 283; // Circumference of circle with radius 45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * progress) / 100;

  const backgroundStyle = {
    background: 'linear-gradient(-45deg, hsl(24 95% 53%), hsl(16 85% 40%), hsl(24 95% 53%), hsl(16 85% 40%))',
    backgroundSize: '400% 400%',
    '--color-1': 'hsl(24 95% 53%)',
    '--color-2': 'hsl(16 85% 40%)',
    '--color-3': 'hsl(24 95% 53%)',
    '--color-4': 'hsl(16 85% 40%)'
  } as React.CSSProperties;

  const increaseTime = () => {
    const currentMinutes = Math.ceil(timeLeft / (60 * 1000));
    setTimer(currentMinutes + 1);
  };

  const decreaseTime = () => {
    const currentMinutes = Math.ceil(timeLeft / (60 * 1000));
    if (currentMinutes > 1) {
      setTimer(currentMinutes - 1);
    }
  };

  return (
    <div className="h-full relative overflow-hidden" style={backgroundStyle}>
      <div className="bg-gradient-animated absolute inset-0" />
      
      {/* Pulsing circular patterns */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute border border-white rounded-full"
            style={{
              width: `${24 - i * 4}rem`,
              height: `${24 - i * 4}rem`,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.5 
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-full justify-center items-center px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-8"
        >
          <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="rgba(255,255,255,0.2)" 
              strokeWidth="2" 
              fill="none" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="white" 
              strokeWidth="3" 
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear digital-glow"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold digital-glow text-white" data-testid="timer-time">
              {formatTime(timeLeft)}
            </div>
            <div className="text-lg opacity-60 mt-2 text-white">
              {isRunning ? 'Running' : timeLeft === 0 ? 'Finished' : 'Ready'}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-6 mb-8"
        >
          <Button
            variant="ghost"
            className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-xl touch-feedback text-white"
            onClick={decreaseTime}
            disabled={isRunning}
            data-testid="decrease-timer"
          >
            <Minus className="h-6 w-6" />
          </Button>
          
          <Button
            className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full text-2xl touch-feedback shadow-2xl"
            onClick={isRunning ? pause : timeLeft === 0 ? reset : start}
            data-testid="timer-toggle"
          >
            {timeLeft === 0 ? (
              <RotateCcw className="h-8 w-8" />
            ) : isRunning ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-xl touch-feedback text-white"
            onClick={increaseTime}
            disabled={isRunning}
            data-testid="increase-timer"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-3"
        >
          {[1, 5, 10, 15].map(minutes => (
            <Button
              key={minutes}
              variant="ghost"
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl px-4 py-2 text-sm touch-feedback text-white"
              onClick={() => setTimer(minutes)}
              disabled={isRunning}
              data-testid={`timer-preset-${minutes}`}
            >
              {minutes}m
            </Button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
