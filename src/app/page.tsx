'use client';

import { useState } from 'react';
import UserForm from './components/UserForm';
import CourseRecommendation from './components/CourseRecommendation';

export interface UserData {
  name: string;
  age: number;
  education: string;
  experience: string;
  interests: string[];
  goals: string;
  timeAvailable: string;
  budget: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  category: string;
  tags: string[];
  image: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [recommendations, setRecommendations] = useState<Course[]>([]);

  const handleFormSubmit = (data: UserData) => {
    setUserData(data);
    const courses = generateRecommendations(data);
    setRecommendations(courses);
  };

  const generateRecommendations = (data: UserData): Course[] => {
    const allCourses: Course[] = [
      {
        id: '1',
        title: 'Desarrollo Web Full Stack',
        description: 'Aprende HTML, CSS, JavaScript, React, Node.js y bases de datos para crear aplicaciones web completas.',
        duration: '6 meses',
        level: 'Principiante',
        price: '$1,200',
        category: 'Programación',
        tags: ['web', 'javascript', 'react', 'nodejs'],
        image: '🌐'
      },
      {
        id: '2',
        title: 'Data Science y Machine Learning',
        description: 'Domina Python, estadísticas, análisis de datos y algoritmos de machine learning.',
        duration: '8 meses',
        level: 'Intermedio',
        price: '$1,800',
        category: 'Ciencia de Datos',
        tags: ['python', 'data', 'ml', 'ai'],
        image: '📊'
      },
      {
        id: '3',
        title: 'Diseño UX/UI Avanzado',
        description: 'Crea experiencias de usuario excepcionales con herramientas modernas de diseño.',
        duration: '4 meses',
        level: 'Intermedio',
        price: '$900',
        category: 'Diseño',
        tags: ['ux', 'ui', 'design', 'figma'],
        image: '🎨'
      },
      {
        id: '4',
        title: 'Marketing Digital',
        description: 'Estrategias de marketing online, SEO, redes sociales y publicidad digital.',
        duration: '3 meses',
        level: 'Principiante',
        price: '$600',
        category: 'Marketing',
        tags: ['marketing', 'seo', 'social', 'ads'],
        image: '📈'
      },
      {
        id: '5',
        title: 'Desarrollo Móvil con React Native',
        description: 'Crea aplicaciones móviles multiplataforma con React Native.',
        duration: '5 meses',
        level: 'Intermedio',
        price: '$1,000',
        category: 'Programación',
        tags: ['mobile', 'react', 'javascript', 'app'],
        image: '📱'
      },
      {
        id: '6',
        title: 'Ciberseguridad',
        description: 'Aprende a proteger sistemas y redes contra amenazas cibernéticas.',
        duration: '6 meses',
        level: 'Avanzado',
        price: '$1,500',
        category: 'Seguridad',
        tags: ['security', 'cyber', 'networking', 'ethical-hacking'],
        image: '🔒'
      }
    ];

    // Algoritmo de recomendación basado en los datos del usuario
    const scoredCourses = allCourses.map(course => {
      let score = 0;
      
      // Basado en experiencia
      if (data.experience === 'Principiante' && course.level === 'Principiante') score += 3;
      if (data.experience === 'Intermedio' && course.level === 'Intermedio') score += 3;
      if (data.experience === 'Avanzado' && course.level === 'Avanzado') score += 3;
      
      // Basado en intereses
      data.interests.forEach(interest => {
        if (course.tags.includes(interest.toLowerCase())) score += 2;
      });
      
      // Basado en objetivos
      if (data.goals.includes('trabajo') && course.category === 'Programación') score += 2;
      if (data.goals.includes('emprendimiento') && course.category === 'Marketing') score += 2;
      if (data.goals.includes('creatividad') && course.category === 'Diseño') score += 2;
      
      // Basado en tiempo disponible
      if (data.timeAvailable === 'Poco tiempo' && course.duration.includes('3')) score += 1;
      if (data.timeAvailable === 'Tiempo moderado' && course.duration.includes('5')) score += 1;
      if (data.timeAvailable === 'Mucho tiempo' && course.duration.includes('8')) score += 1;
      
      // Basado en presupuesto
      if (data.budget === 'Bajo' && parseInt(course.price.replace('$', '').replace(',', '')) < 1000) score += 2;
      if (data.budget === 'Medio' && parseInt(course.price.replace('$', '').replace(',', '')) >= 1000 && parseInt(course.price.replace('$', '').replace(',', '')) < 1500) score += 2;
      if (data.budget === 'Alto' && parseInt(course.price.replace('$', '').replace(',', '')) >= 1500) score += 2;
      
      return { ...course, score };
    });

    // Ordenar por puntuación y devolver los 3 mejores
    return scoredCourses
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenido a 00lar Corp
          </h1>
          <p className="text-xl text-gray-600">
            Descubre el curso perfecto para tu futuro profesional
          </p>
        </div>

        {!userData ? (
          <UserForm onSubmit={handleFormSubmit} />
        ) : (
          <CourseRecommendation 
            userData={userData} 
            recommendations={recommendations}
            onReset={() => {
              setUserData(null);
              setRecommendations([]);
            }}
          />
        )}
      </div>
    </div>
  );
}
