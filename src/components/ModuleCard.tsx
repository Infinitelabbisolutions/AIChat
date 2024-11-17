import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
      <div className="p-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}

export default ModuleCard;