import { AppProvider, useApp } from "./components/AppContext";
import { SplashScreen } from "./components/screens/SplashScreen";
import { OnboardingScreen } from "./components/screens/OnboardingScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { DashboardScreen } from "./components/screens/DashboardScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { ChatScreen } from "./components/screens/ChatScreen";
import { CalendarScreen } from "./components/screens/CalendarScreen";
import { ResourcesScreen } from "./components/screens/ResourcesScreen";
import { SettingsScreen } from "./components/screens/SettingsScreen";
import { VideoCallScreen } from "./components/screens/VideoCallScreen";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen />;
      case "onboarding1":
        return <OnboardingScreen step={1} />;
      case "onboarding2":
        return <OnboardingScreen step={2} />;
      case "onboarding3":
        return <OnboardingScreen step={3} />;
      case "register":
        return <RegisterScreen />;
      case "login":
        return <LoginScreen />;
      case "dashboard":
        return <DashboardScreen />;
      case "profile":
        return <ProfileScreen />;
      case "chat":
        return <ChatScreen />;
      case "calendar":
        return <CalendarScreen />;
      case "resources":
        return <ResourcesScreen />;
      case "settings":
        return <SettingsScreen />;
      case "video-call":
        return <VideoCallScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="size-full max-w-md mx-auto bg-white overflow-hidden">
      {renderScreen()}
      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}