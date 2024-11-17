import React, { useRef, useState } from 'react';
import { Paperclip, X, FileText, File } from 'lucide-react';

interface FileUploadButtonProps {
  onFileSelect: (files: File[]) => void;
  isDemo?: boolean;
  maxFiles?: number;
  acceptedTypes?: string;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileSelect,
  isDemo = false,
  maxFiles = 5,
  acceptedTypes = '.pdf,.doc,.docx,.txt'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    if (isDemo) {
      alert('O envio de arquivos não está disponível no modo demonstração. Cadastre-se para acessar esta funcionalidade.');
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > maxFiles) {
      alert(`Você pode enviar no máximo ${maxFiles} arquivos por vez.`);
      return;
    }

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > 10 * 1024 * 1024) { // 10MB limit
      alert('O tamanho total dos arquivos não pode exceder 10MB.');
      return;
    }

    setSelectedFiles(files);
    onFileSelect(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      onFileSelect(newFiles);
      return newFiles;
    });
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        className="p-2 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50"
        title="Anexar arquivo"
      >
        <Paperclip size={20} />
      </button>

      {selectedFiles.length > 0 && (
        <div className="absolute bottom-full left-0 w-full bg-white border-t border-gray-100 p-2 space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                {file.type.includes('pdf') ? (
                  <FileText size={16} className="text-blue-600" />
                ) : (
                  <File size={16} className="text-gray-600" />
                )}
                <span className="text-sm text-gray-700 truncate max-w-[200px]">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024).toFixed(1)}KB)
                </span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X size={14} className="text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadButton;