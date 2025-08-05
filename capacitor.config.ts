import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.b209ff8783df4a0fa8a21b0230f186dc',
  appName: 'HabitHive',
  webDir: 'dist',
  server: {
    url: 'https://b209ff87-83df-4a0f-a8a2-1b0230f186dc.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;