import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTime } from '@/hooks/useTime';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { Switch } from '@/components/ui/switch';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { hapticFeedback } from '@/utils/haptics';

export default function AlarmMode() {
  const currentTime = useTime();
  const [alarmTime, setAlarmTime] = useState({ hours: 7, minutes: 30 });
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current === null) {
      audioRef.current = new Audio('/alarm.mp3'); // Placeholder: Add your alarm sound file here
      audioRef.current.loop = true;
    }

    if (alarmEnabled) {
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();

      if (
        currentHours === alarmTime.hours &&
        currentMinutes === alarmTime.minutes &&
        !alarmTriggered
      ) {
        console.log('Alarm triggered!');
        hapticFeedback.heavy();
        audioRef.current?.play();
        setAlarmTriggered(true);
        setIsRinging(true); // Set isRinging to true when alarm triggers
      } else if (
        (currentHours !== alarmTime.hours ||
          currentMinutes !== alarmTime.minutes) &&
        alarmTriggered
      ) {
        // Reset alarmTriggered when the minute changes to allow re-triggering next day
        setAlarmTriggered(false);
        setIsRinging(false); // Set isRinging to false when alarm minute passes
        audioRef.current?.pause();
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
      }
    } else {
      // If alarm is disabled, stop any playing sound and reset triggered state
      audioRef.current?.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      setAlarmTriggered(false);
      setIsRinging(false); // Set isRinging to false when alarm is disabled
    }
  }, [alarmEnabled, alarmTime, currentTime, alarmTriggered]);

  const formatCurrentTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatCurrentDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const adjustAlarmTime = (type: 'hours' | 'minutes', direction: 'up' | 'down') => {
    setAlarmTime(prev => {
      if (type === 'hours') {
        const newHours = direction === 'up' ? 
          (prev.hours + 1) % 24 : 
          prev.hours === 0 ? 23 : prev.hours - 1;
        return { ...prev, hours: newHours };
      } else {
        const newMinutes = direction === 'up' ? 
          (prev.minutes + 1) % 60 : 
          prev.minutes === 0 ? 59 : prev.minutes - 1;
        return { ...prev, minutes: newMinutes };
      }
    });
  };

  const handleTurnOffAlarm = () => {
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setAlarmEnabled(false);
    setAlarmTriggered(false);
    setIsRinging(false);
  };

  const handleSnoozeAlarm = () => {
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setAlarmTriggered(false);
    setIsRinging(false);

    const now = new Date();
    let newMinutes = now.getMinutes() + 5; // Snooze for 5 minutes
    let newHours = now.getHours();

    if (newMinutes >= 60) {
      newMinutes -= 60;
      newHours = (newHours + 1) % 24;
    }

    setAlarmTime({ hours: newHours, minutes: newMinutes });
    setAlarmEnabled(true); // Re-enable alarm for snooze
  };

  const backgroundStyle = {
    background: 'linear-gradient(-45deg, hsl(263 70% 50%), hsl(263 80% 25%), hsl(263 70% 50%), hsl(263 80% 25%))',
    backgroundSize: '400% 400%',
    '--color-1': 'hsl(263 70% 50%)',
    '--color-2': 'hsl(263 80% 25%)',
    '--color-3': 'hsl(263 70% 50%)',
    '--color-4': 'hsl(263 80% 25%)'
  } as React.CSSProperties;

  return (
    <div className="h-full relative overflow-hidden" style={backgroundStyle}>
      <div className="bg-gradient-animated absolute inset-0" />
      
      {/* Animated background overlay */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-center items-center px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-7xl font-bold digital-glow mb-2 text-white text-stroke breathe">
            {formatCurrentTime(currentTime)}
          </div>
          <div className="text-2xl font-light opacity-80 text-white">
            {currentTime.getHours() >= 12 ? 'PM' : 'AM'}
          </div>
          <div className="text-lg mt-2 opacity-60 text-white">
            {formatCurrentDate(currentTime)}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-morphism rounded-2xl p-6 w-full max-w-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-white">Alarm</span>
            <Switch 
              checked={alarmEnabled}
              onCheckedChange={setAlarmEnabled}
              data-testid="alarm-toggle"
            />
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="flex flex-col items-center space-y-2">
              <EnhancedButton
                variant="ghost"
                size="sm"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white touch-feedback ripple neon-glow"
                onClick={() => adjustAlarmTime('hours', 'up')}
                haptic="light"
                data-testid="increase-hour"
              >
                <ChevronUp className="h-4 w-4" />
              </EnhancedButton>
              
              <div className="text-2xl font-bold digital-glow text-white min-w-[3rem] text-center">
                {alarmTime.hours.toString().padStart(2, '0')}
              </div>
              
              <EnhancedButton
                variant="ghost"
                size="sm"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white touch-feedback"
                onClick={() => adjustAlarmTime('hours', 'down')}
                haptic="light"
                data-testid="decrease-hour"
              >
                <ChevronDown className="h-4 w-4" />
              </EnhancedButton>
            </div>
            
            <div className="text-2xl font-bold text-white">:</div>
            
            <div className="flex flex-col items-center space-y-2">
              <EnhancedButton
                variant="ghost"
                size="sm"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white touch-feedback"
                onClick={() => adjustAlarmTime('minutes', 'up')}
                haptic="light"
                data-testid="increase-minute"
              >
                <ChevronUp className="h-4 w-4" />
              </EnhancedButton>
              
              <div className="text-2xl font-bold digital-glow text-white min-w-[3rem] text-center">
                {alarmTime.minutes.toString().padStart(2, '0')}
              </div>
              
              <EnhancedButton
                variant="ghost"
                size="sm"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white touch-feedback"
                onClick={() => adjustAlarmTime('minutes', 'down')}
                haptic="light"
                data-testid="decrease-minute"
              >
                <ChevronDown className="h-4 w-4" />
              </EnhancedButton>
            </div>
          </div>
          
          <div className="text-center">
            <span className="bg-yellow-500 px-3 py-1 rounded-full text-sm font-medium text-black">
              {alarmTime.hours >= 12 ? 'PM' : 'AM'}
            </span>
          </div>

          {isRinging && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex justify-center space-x-4 mt-6"
            >
              <EnhancedButton
                variant="default"
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
                onClick={handleTurnOffAlarm}
                haptic="heavy"
              >
                Turn Off
              </EnhancedButton>
              <EnhancedButton
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black shadow-lg"
                onClick={handleSnoozeAlarm}
                haptic="medium"
              >
                Snooze
              </EnhancedButton>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
