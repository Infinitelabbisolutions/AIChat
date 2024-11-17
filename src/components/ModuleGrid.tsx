import React from 'react';
import { Scale, FileText, Gavel, BookOpen, Users, Calculator, FileSearch, FilePlus, FileCheck, Brain, BookMarked, Hammer, HammerIcon } from 'lucide-react';
import ModuleCard from './ModuleCard';

interface ModuleGridProps {
  onModuleSelect: (title: string) => void;
  isDemo?: boolean;
}

const ModuleGrid: React.FC<ModuleGridProps> = ({ onModuleSelect, isDemo }) => {
  const modules = [
    {
      icon: FilePlus,
      title: 'Criar Processo',
      description: 'Assistência na criação e estruturação de novos processos judiciais.'
    },
    {
      icon: FileSearch,
      title: 'Análise Processual',
      description: 'Análise detalhada de processos existentes com recomendações estratégicas.'
    },
    {
      icon: FileCheck,
      title: 'Correção Processual',
      description: 'Identificação e correção de inconsistências em peças processuais.'
    },
    {
      icon: BookMarked,
      title: 'Consultar Vademecum',
      description: 'Consulte leis, códigos e jurisprudências atualizadas do direito brasileiro.'
    },
    {
      icon: Scale,
      title: 'Direito Civil',
      description: 'Suporte em processos de família, contratos, responsabilidade civil e sucessões.'
    },
    {
      icon: Gavel,
      title: 'Direito Trabalhista',
      description: 'Assistência em reclamações trabalhistas, acordos e direitos do trabalhador.'
    },
    {
      icon: Users,
      title: 'Direito Empresarial',
      description: 'Orientação em processos societários, falências e recuperação judicial.'
    },
    {
      icon: Brain,
      title: 'Direito Tributário',
      description: 'Análise de questões fiscais, planejamento tributário e defesas administrativas.'
    },
    {
      icon: BookOpen,
      title: 'Direito Administrativo',
      description: 'Suporte em licitações, contratos administrativos e processos disciplinares.'
    },
    {
      icon: FileText,
      title: 'Direito Penal',
      description: 'Assistência em processos criminais, defesas e recursos penais.'
    },
    {
      icon: HammerIcon,
      title: 'Peças Processuais',
      description: 'Suporte em licitações, contratos administrativos e processos disciplinares.'
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestão Processual</h2>
          <p className="text-gray-600">
            {isDemo 
              ? 'Selecione uma opção para experimentar o chat de demonstração'
              : 'Selecione uma opção para começar a análise ou criação do seu processo'}
          </p>
          {isDemo && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
              No modo demonstração, você pode experimentar o chat básico e consultar o Vademecum. 
              Para acessar todas as funcionalidades, incluindo análise jurídica completa e geração de processos, 
              cadastre-se em nossa plataforma.
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <button
              key={index}
              onClick={() => onModuleSelect(module.title)}
              className="text-left"
              disabled={isDemo && !['Consultar Vademecum'].includes(module.title)}
            >
              <div className={`${isDemo && !['Consultar Vademecum'].includes(module.title) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <ModuleCard
                  icon={module.icon}
                  title={module.title}
                  description={module.description}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModuleGrid;