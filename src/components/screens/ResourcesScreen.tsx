import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Play, 
  Clock, 
  Heart,
  Brain,
  Activity,
  Pill,
  Filter
} from 'lucide-react';
import { useApp } from '../AppContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'video' | 'guide';
  duration: string;
  image: string;
  tag: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Cómo mantener una alimentación saludable',
    description: 'Guía completa para mejorar tus hábitos alimenticios y mantener una dieta equilibrada.',
    category: 'Nutrición',
    type: 'article',
    duration: '5 min',
    image: 'https://images.unsplash.com/photo-1670165088604-5a39f5c1be51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXRyaXRpb24lMjBoZWFsdGh5JTIwbGlmZXN0eWxlfGVufDF8fHx8MTc1NjYwMDczOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'Recomendado'
  },
  {
    id: '2',
    title: 'Ejercicios en casa para principiantes',
    description: 'Rutina de ejercicios que puedes hacer desde la comodidad de tu hogar sin equipamiento.',
    category: 'Ejercicio',
    type: 'video',
    duration: '15 min',
    image: 'https://images.unsplash.com/photo-1634144646738-809a0f8897c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVyY2lzZSUyMGZpdG5lc3MlMjBoZWFsdGh8ZW58MXx8fHwxNzU2NjAwNzQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'Popular'
  },
  {
    id: '3',
    title: 'Manejo del estrés y la ansiedad',
    description: 'Técnicas de relajación y mindfulness para reducir el estrés en tu vida diaria.',
    category: 'Salud Mental',
    type: 'guide',
    duration: '8 min',
    image: 'https://images.unsplash.com/photo-1659353886114-9aa119aef5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZWR1Y2F0aW9uJTIwaGVhbHRoJTIwdGlwc3xlbnwxfHx8fDE3NTY2MDA3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'Nuevo'
  }
];

const categories = [
  { name: 'Todos', icon: BookOpen, count: resources.length },
  { name: 'Nutrición', icon: Heart, count: 1 },
  { name: 'Ejercicio', icon: Activity, count: 1 },
  { name: 'Salud Mental', icon: Brain, count: 1 },
  { name: 'Medicamentos', icon: Pill, count: 0 }
];

export function ResourcesScreen() {
  const { setCurrentScreen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'Todos' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'guide':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Recomendado':
        return 'bg-[--salud-blue] text-white';
      case 'Popular':
        return 'bg-[--salud-green] text-white';
      case 'Nuevo':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[--salud-light-gray]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white px-6 py-4 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[--salud-gray]" />
          </button>
          <h1 className="text-xl font-semibold text-[--salud-dark]">Recursos educativos</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Filter className="w-6 h-6 text-[--salud-gray]" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[--salud-gray]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar artículos, videos, guías..."
            className="w-full pl-10 pr-4 py-3 bg-[--salud-light-gray] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[--salud-blue] focus:border-transparent outline-none transition-all"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-[--salud-dark] mb-4">Categorías</h3>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
                  ${selectedCategory === category.name
                    ? 'bg-[--salud-blue] text-white'
                    : 'bg-white text-[--salud-gray] hover:bg-gray-50'
                  }
                `}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[--salud-dark]">
              {selectedCategory === 'Todos' ? 'Todos los recursos' : selectedCategory}
            </h3>
            <span className="text-sm text-[--salud-gray]">
              {filteredResources.length} recurso{filteredResources.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-4">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTagColor(resource.tag)}`}>
                      {resource.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                    {getTypeIcon(resource.type)}
                    <span className="text-xs">{resource.duration}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-[--salud-blue] font-medium">{resource.category}</span>
                    <div className="w-1 h-1 bg-[--salud-gray] rounded-full"></div>
                    <div className="flex items-center space-x-1 text-sm text-[--salud-gray]">
                      <Clock className="w-3 h-3" />
                      <span>{resource.duration}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-[--salud-dark] mb-2 line-clamp-2">
                    {resource.title}
                  </h4>
                  
                  <p className="text-[--salud-gray] text-sm line-clamp-3 mb-3">
                    {resource.description}
                  </p>
                  
                  <button className="text-[--salud-blue] font-medium text-sm hover:underline">
                    Leer más →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-xl p-8 text-center"
            >
              <BookOpen className="w-12 h-12 text-[--salud-gray] mx-auto mb-4" />
              <h4 className="font-medium text-[--salud-dark] mb-2">No se encontraron recursos</h4>
              <p className="text-[--salud-gray] text-sm">
                Prueba con otros términos de búsqueda o selecciona una categoría diferente
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}