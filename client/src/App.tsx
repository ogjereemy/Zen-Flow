import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

import SplashScreen from "./components/SplashScreen";
import ModeIndicator from "./components/ModeIndicator";
import FloatingParticles from "./components/FloatingParticles";
import InstallPrompt from "./components/InstallPrompt";
import AlarmMode from "./components/modes/AlarmMode";
import StopwatchMode from "./components/modes/StopwatchMode";
import TimerMode from "./components/modes/TimerMode";
import WeatherMode from "./components/modes/WeatherMode";
import { useOrientation } from "./hooks/useOrientation";

type OrientationType = 'portrait-primary' | 'landscape-primary' | 'portrait-secondary' | 'landscape-secondary';

const modes = {
  'portrait-primary': { name: 'Alarm Clock', icon: '🕐', component: AlarmMode },
  'landscape-primary': { name: 'Stopwatch', icon: '⏱️', component: StopwatchMode },
  'portrait-secondary': { name: 'Timer', icon: '⏳', component: TimerMode },
  'landscape-secondary': { name: 'Weather', icon: '🌤️', component: WeatherMode }
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const orientation = useOrientation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

  const currentMode = modes[orientation as OrientationType] || modes['portrait-primary'];
  const ModeComponent = currentMode.component;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="h-screen w-screen overflow-hidden relative">
          <AnimatePresence>
            {showSplash && <SplashScreen key="splash" />}
          </AnimatePresence>

          {!showSplash && (
            <>
              <FloatingParticles orientation={orientation} />
              
              <ModeIndicator 
                mode={currentMode.name} 
                icon={currentMode.icon} 
              />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={orientation}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full w-full"
                >
                  <ModeComponent />
                </motion.div>
              </AnimatePresence>
              
              <InstallPrompt />
            </>
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
