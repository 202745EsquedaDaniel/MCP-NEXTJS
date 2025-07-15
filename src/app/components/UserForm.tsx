'use client';

import { useState } from 'react';

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

interface UserFormProps {
  onSubmit: (data: UserData) => void;
}

const interestOptions = [
  'Programación', 'Diseño', 'Marketing', 'Data Science', 
  'Ciberseguridad', 'Emprendimiento', 'Creatividad', 'Tecnología'
];

export default function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    age: 18,
    education: '',
    experience: 'Principiante',
    interests: [],
    goals: '',
    timeAvailable: 'Tiempo moderado',
    budget: 'Medio'
  });

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.interests.length > 0 && formData.goals) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cuéntanos sobre ti
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Edad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edad
            </label>
            <input
              type="number"
              min="16"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Educación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de educación
            </label>
            <select
              value={formData.education}
              onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona tu nivel</option>
              <option value="Secundaria">Secundaria</option>
              <option value="Bachillerato">Bachillerato</option>
              <option value="Técnico">Técnico</option>
              <option value="Universitario">Universitario</option>
              <option value="Postgrado">Postgrado</option>
            </select>
          </div>

          {/* Experiencia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experiencia en tecnología
            </label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>

          {/* Intereses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intereses (selecciona al menos 2)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map(interest => (
                <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Objetivos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cuál es tu objetivo principal?
            </label>
            <textarea
              value={formData.goals}
              onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
              placeholder="Ej: Encontrar trabajo en programación, crear mi propio negocio, aprender nuevas habilidades..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          {/* Tiempo disponible */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo disponible para estudiar
            </label>
            <select
              value={formData.timeAvailable}
              onChange={(e) => setFormData(prev => ({ ...prev, timeAvailable: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Poco tiempo">Poco tiempo (1-2 horas/día)</option>
              <option value="Tiempo moderado">Tiempo moderado (3-4 horas/día)</option>
              <option value="Mucho tiempo">Mucho tiempo (5+ horas/día)</option>
            </select>
          </div>

          {/* Presupuesto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presupuesto disponible
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Bajo">Bajo ($0 - $500)</option>
              <option value="Medio">Medio ($500 - $1,500)</option>
              <option value="Alto">Alto ($1,500+)</option>
            </select>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={!formData.name || formData.interests.length < 2 || !formData.goals}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Obtener Recomendaciones
          </button>
        </form>
      </div>
    </div>
  );
} 