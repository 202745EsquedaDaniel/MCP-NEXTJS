'use client';

import { UserData, Course } from '../page';

interface CourseRecommendationProps {
  userData: UserData;
  recommendations: Course[];
  onReset: () => void;
}

export default function CourseRecommendation({ 
  userData, 
  recommendations, 
  onReset 
}: CourseRecommendationProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header con información del usuario */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Hola {userData.name}!
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Basándonos en tu perfil, hemos seleccionado los mejores cursos para ti
          </p>
          
          {/* Resumen del perfil */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="font-semibold text-blue-800">Experiencia</div>
              <div className="text-blue-600">{userData.experience}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="font-semibold text-green-800">Intereses</div>
              <div className="text-green-600">{userData.interests.join(', ')}</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="font-semibold text-purple-800">Tiempo</div>
              <div className="text-purple-600">{userData.timeAvailable}</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="font-semibold text-orange-800">Presupuesto</div>
              <div className="text-orange-600">{userData.budget}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cursos Recomendados para Ti
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((course, index) => (
            <div 
              key={course.id} 
              className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                index === 0 ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {/* Badge para el curso más recomendado */}
              {index === 0 && (
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 text-sm font-semibold text-center">
                  ⭐ MEJOR OPCIÓN
                </div>
              )}
              
              <div className="p-6">
                {/* Icono y título */}
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{course.image}</span>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{course.title}</h4>
                    <p className="text-sm text-gray-500">{course.category}</p>
                  </div>
                </div>
                
                {/* Descripción */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {course.description}
                </p>
                
                {/* Detalles del curso */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duración:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Nivel:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Precio:</span>
                    <span className="font-bold text-green-600">{course.price}</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map(tag => (
                    <span 
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Botón de acción */}
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                  Ver Detalles del Curso
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ¿Por qué estos cursos son perfectos para ti?
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Basado en tu experiencia:</h4>
            <p className="text-gray-600">
              Hemos seleccionado cursos que se adaptan a tu nivel de experiencia actual ({userData.experience.toLowerCase()}), 
              asegurando que puedas aprender a tu ritmo sin sentirte abrumado.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Alineado con tus intereses:</h4>
            <p className="text-gray-600">
              Los cursos están relacionados con tus áreas de interés: {userData.interests.join(', ')}. 
              Esto te mantendrá motivado durante todo el proceso de aprendizaje.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Adaptado a tu tiempo:</h4>
            <p className="text-gray-600">
              Considerando que tienes {userData.timeAvailable.toLowerCase()}, 
              estos cursos te permitirán progresar de manera consistente sin comprometer otras responsabilidades.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Dentro de tu presupuesto:</h4>
            <p className="text-gray-600">
              Todos los cursos están dentro de tu rango de presupuesto ({userData.budget.toLowerCase()}), 
              ofreciendo la mejor relación calidad-precio para tu inversión.
            </p>
          </div>
        </div>
      </div>

      {/* Botón para volver a empezar */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="bg-gray-600 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
        >
          Volver a Comenzar
        </button>
      </div>
    </div>
  );
} 