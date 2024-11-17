import React, { useState, useRef, useEffect } from 'react';
import { FileText, Pencil, Check, X } from 'lucide-react';
import { Chat } from '../types';

interface ChatHeaderProps {
  chat: Chat;
  onTitleChange: (newTitle: string) => void;
  onGenerateProcess: (chat: Chat, processTitle: string) => void;
  isDemo?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  chat,
  onTitleChange,
  onGenerateProcess,
  isDemo
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [processTitle, setProcessTitle] = useState(`Processo - ${chat.title}`);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTitleSubmit = () => {
    if (title.trim()) {
      onTitleChange(title.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setTitle(chat.title);
      setIsEditing(false);
    }
  };

  const handleGenerateProcess = () => {
    if (processTitle.trim()) {
      onGenerateProcess(chat, processTitle.trim());
      setShowProcessModal(false);
    }
  };

  const isVademecumChat = chat.category === 'vademecum';
  const canGenerateProcess = chat.messages.length > 0 && !isVademecumChat && !isDemo;

  return (
    <div className="bg-white border-b border-gray-100 p-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="px-2 py-1 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                onClick={handleTitleSubmit}
                className="p-1 hover:bg-gray-100 rounded-lg text-green-600"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => {
                  setTitle(chat.title);
                  setIsEditing(false);
                }}
                className="p-1 hover:bg-gray-100 rounded-lg text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">{chat.title}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-gray-100 rounded-lg text-gray-500"
              >
                <Pencil size={14} />
              </button>
            </div>
          )}
        </div>
        {canGenerateProcess && (
          <>
            <button
              onClick={() => setShowProcessModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
            >
              <FileText className="w-4 h-4" />
              <span>Gerar Processo</span>
            </button>

            {showProcessModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Gerar Processo
                  </h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Processo
                    </label>
                    <input
                      type="text"
                      value={processTitle}
                      onChange={(e) => setProcessTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Digite o nome do processo"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowProcessModal(false)}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleGenerateProcess}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Gerar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;