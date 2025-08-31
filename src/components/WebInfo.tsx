import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  Smartphone, 
  Palette, 
  Code2, 
  Database, 
  Video, 
  Shield,
  Clock,
  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  Settings
} from "lucide-react";

export function WebInfo() {
  const features = [
    {
      icon: Smartphone,
      title: "12 Pantallas Completas",
      description: "Splash, Onboarding, Auth, Dashboard y más"
    },
    {
      icon: Video,
      title: "Videollamadas WebRTC",
      description: "Consultas médicas en tiempo real"
    },
    {
      icon: MessageSquare,
      title: "Chat en Tiempo Real",
      description: "Comunicación instantánea con profesionales"
    },
    {
      icon: Calendar,
      title: "Sistema de Citas",
      description: "Gestión completa de appointments"
    },
    {
      icon: Database,
      title: "Firebase Integration",
      description: "Backend completo con autenticación"
    },
    {
      icon: Shield,
      title: "Seguridad Médica",
      description: "Cumplimiento de estándares de salud"
    }
  ];

  const techStack = [
    { name: "React", color: "blue" },
    { name: "TypeScript", color: "blue" },
    { name: "Tailwind CSS", color: "green" },
    { name: "Firebase", color: "orange" },
    { name: "WebRTC", color: "purple" },
    { name: "Figma", color: "pink" }
  ];

  return (
    <div className="hidden xl:block fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="space-y-4 w-80">
        {/* Información de la App */}
        <Card className="bg-white/95 backdrop-blur-sm border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span>SaludConecta</span>
            </CardTitle>
            <CardDescription>
              Aplicación de telemedicina con diseño moderno y funcionalidades completas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tech Stack */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Tecnologías</h4>
              <div className="flex flex-wrap gap-1">
                {techStack.map((tech) => (
                  <Badge key={tech.name} variant="secondary" className="text-xs">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="text-lg font-semibold text-blue-600">12</div>
                <div className="text-xs text-blue-700">Pantallas</div>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <div className="text-lg font-semibold text-green-600">100%</div>
                <div className="text-xs text-green-700">Funcional</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Características */}
        <Card className="bg-white/95 backdrop-blur-sm border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Características</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {features.slice(0, 4).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-lg p-1.5 flex-shrink-0">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 leading-tight">
                        {feature.title}
                      </p>
                      <p className="text-xs text-gray-600 leading-tight">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-500 text-white border-0">
          <CardContent className="p-4 text-center">
            <h4 className="font-semibold mb-2">Prototipo Interactivo</h4>
            <p className="text-xs opacity-90 mb-3">
              Explora todas las funcionalidades navegando con el panel lateral
            </p>
            <div className="flex items-center justify-center space-x-1 text-xs opacity-75">
              <Clock className="w-3 h-3" />
              <span>Actualizado hoy</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}