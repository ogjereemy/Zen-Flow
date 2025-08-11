import { motion } from 'framer-motion';
import { useStopwatch } from '@/hooks/useTime';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function StopwatchMode() {
  const { 
    isRunning, 
    elapsedTime, 
    lapTimes, 
    start, 
    pause, 
    reset, 
    lap, 
    formatTime 
  } = useStopwatch();

  const timeDisplay = formatTime(elapsedTime);

  const backgroundStyle = {
    background: 'linear-gradient(-45deg, hsl(199 89% 48%), hsl(199 100% 26%), hsl(199 89% 48%), hsl(199 100% 26%))',
    backgroundSize: '400% 400%',
    '--color-1': 'hsl(199 89% 48%)',
    '--color-2': 'hsl(199 100% 26%)',
    '--color-3': 'hsl(199 89% 48%)',
    '--color-4': 'hsl(199 100% 26%)'
  } as React.CSSProperties;

  return (
    <div className="h-full relative overflow-hidden" style={backgroundStyle}>
      <div className="bg-gradient-animated absolute inset-0" />
      
      {/* Rotating background element */}
      <div className="absolute inset-0 opacity-20 flex items-center justify-center">
        <motion.div 
          className="w-96 h-96 border border-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-between px-8">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 text-center"
        >
          <div className="text-8xl font-bold digital-glow mb-4 text-white" data-testid="stopwatch-time">
            {timeDisplay.display}
          </div>
          <div className="text-2xl opacity-60 text-white">
            {timeDisplay.milliseconds}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col space-y-4 ml-8"
        >
          <Button
            className="w-20 h-20 bg-green-500 hover:bg-green-600 rounded-full text-2xl touch-feedback shadow-2xl"
            onClick={isRunning ? pause : start}
            data-testid="stopwatch-toggle"
          >
            {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </Button>
          
          <Button
            variant="ghost"
            className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-xl touch-feedback text-white"
            onClick={reset}
            data-testid="stopwatch-reset"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-xl touch-feedback text-white"
            onClick={lap}
            disabled={!isRunning}
            data-testid="stopwatch-lap"
          >
            <Flag className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      {/* Lap Times */}
      {lapTimes.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 max-h-32 overflow-y-auto"
        >
          <div className="glass-morphism rounded-xl p-4">
            <div className="text-sm opacity-80 mb-2 text-white">Lap Times</div>
            {lapTimes.map((lapTime, index) => (
              <div key={index} className="flex justify-between text-sm mb-1 text-white">
                <span>Lap {index + 1}</span>
                <span className="digital-glow">{formatTime(lapTime).display}{formatTime(lapTime).milliseconds}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
