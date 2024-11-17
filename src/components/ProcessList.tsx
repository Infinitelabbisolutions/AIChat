import React from 'react';
import { FileText, Download, Trash2, Clock } from 'lucide-react';
import { GeneratedProcess } from '../types';

interface ProcessListProps {
  processes: GeneratedProcess[];
  onDownload: (process: GeneratedProcess) => void;
  onDelete: (process: GeneratedProcess) => void;
}

const ProcessList: React.FC<ProcessListProps> = ({ processes, onDownload, onDelete }) => {
  const handleDownload = (process: GeneratedProcess) => {
    if (process.status === 'completed' && process.downloadUrl) {
      onDownload(process);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Processos Gerados</h2>
          <p className="text-gray-600">Gerencie e baixe os processos gerados pelo assistente.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {processes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FileText className="mx-auto h-12 w-12 mb-4 text-gray-400" />
              <p className="font-medium">Nenhum processo gerado ainda</p>
              <p className="text-sm mt-1">Os processos gerados aparecerão aqui</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {processes.map((process) => (
                <div
                  key={process.id}
                  className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      process.status === 'completed' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                        : 'bg-gray-200'
                    }`}>
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{process.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">
                          {new Date(process.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          process.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {process.status === 'pending' ? (
                            <>
                              <Clock className="w-3 h-3" />
                              Processando
                            </>
                          ) : (
                            <>
                              <FileText className="w-3 h-3" />
                              Concluído
                            </>
                          )}
                        </span>
                        <span className="text-xs text-gray-500">
                          {process.pages} {process.pages === 1 ? 'página' : 'páginas'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(process)}
                      disabled={process.status === 'pending'}
                      className={`p-2 rounded-lg transition-colors ${
                        process.status === 'completed'
                          ? 'text-blue-600 hover:bg-blue-50'
                          : 'text-gray-400 cursor-not-allowed'
                      }`}
                      title={process.status === 'completed' ? 'Baixar processo' : 'Processo em geração'}
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(process)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir processo"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProcessList;