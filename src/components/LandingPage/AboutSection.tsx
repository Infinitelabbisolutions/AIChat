import React from 'react';
import { Shield, Users, BookOpen } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que nos escolher?</h2>
          <p className="text-lg text-gray-600">
            Tecnologia de ponta aliada ao conhecimento jurídico brasileiro
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Segurança Total</h3>
            <p className="text-gray-600">
              Seus dados e documentos protegidos com criptografia de ponta a ponta
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Suporte Especializado</h3>
            <p className="text-gray-600">
              Equipe de suporte com profundo conhecimento jurídico
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Atualização Constante</h3>
            <p className="text-gray-600">
              Base de conhecimento sempre atualizada com as últimas mudanças na legislação
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;