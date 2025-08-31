import { useApp } from "./AppContext";
import { Button } from "./ui/button";
import { 
  Home, 
  User, 
  MessageCircle, 
  Calendar,
  BookOpen,
  Settings,
  Video,
  LogIn,
  UserPlus,
  Play
} from "lucide-react";

export function WebNavigation() {
  const { currentScreen, setCurrentScreen } = useApp();

  const navigationItems = [
    { id: "splash", label: "Inicio", icon: Play, category: "app" },
    { id: "onboarding1", label: "Onboarding", icon: BookOpen, category: "app" },
    { id: "register", label: "Registro", icon: UserPlus, category: "auth" },
    { id: "login", label: "Login", icon: LogIn, category: "auth" },
    { id: "dashboard", label: "Dashboard", icon: Home, category: "main" },
    { id: "profile", label: "Perfil", icon: User, category: "main" },
    { id: "chat", label: "Chat", icon: MessageCircle, category: "main" },
    { id: "calendar", label: "Citas", icon: Calendar, category: "main" },
    { id: "video-call", label: "Videollamada", icon: Video, category: "main" },
    { id: "resources", label: "Recursos", icon: BookOpen, category: "main" },
    { id: "settings", label: "Configuración", icon: Settings, category: "main" },
  ];

  const categories = {
    app: "Aplicación",
    auth: "Autenticación", 
    main: "Funciones Principales"
  };

  return (
    <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 w-64 max-h-[80vh] overflow-y-auto">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 mb-2">Navegación Demo</h3>
          <p className="text-xs text-gray-500">
            Explora todas las pantallas de SaludConecta
          </p>
        </div>

        {Object.entries(categories).map(([categoryKey, categoryLabel]) => (
          <div key={categoryKey} className="mb-4">
            <h4 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-2 px-2">
              {categoryLabel}
            </h4>
            <div className="space-y-1">
              {navigationItems
                .filter(item => item.category === categoryKey)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id || 
                    (item.id === "onboarding1" && ["onboarding1", "onboarding2", "onboarding3"].includes(currentScreen));
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentScreen(item.id as any)}
                      className={`w-full justify-start text-left h-9 ${
                        isActive 
                          ? "bg-blue-600 hover:bg-blue-700 text-white" 
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Button>
                  );
                })}
            </div>
          </div>
        ))}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Prototipo interactivo<br />
            <span className="text-blue-600 font-medium">SaludConecta</span>
          </p>
        </div>
      </div>
    </div>
  );
}