import React, { useState } from 'react';
import { Send, BookOpen } from 'lucide-react';
import { Chat, Message, Attachment } from '../types';
import ChatMessage from './ChatMessage';
import FileUploadButton from './FileUploadButton';
import ChatHeader from './ChatHeader';

interface ChatAreaProps {
  currentChat: Chat;
  onGenerateProcess: (chat: Chat, processTitle: string) => void;
  onSendMessage: (chatId: string, content: string, attachments?: File[]) => void;
  onTitleChange: (chatId: string, newTitle: string) => void;
  isDemo?: boolean;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  currentChat,
  onGenerateProcess,
  onSendMessage,
  onTitleChange,
  isDemo
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showVademecum, setShowVademecum] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;
    
    onSendMessage(currentChat.id, message.trim(), attachments);
    setMessage('');
    setAttachments([]);
  };

  const handleFileSelect = (files: File[]) => {
    setAttachments(files);
  };

  const handleTitleChange = (newTitle: string) => {
    onTitleChange(currentChat.id, newTitle);
  };

  const isVademecumChat = currentChat.category === 'vademecum';

  const vademecumSuggestions = [
    'Código Civil',
    'Código de Processo Civil',
    'Código Penal',
    'Código de Processo Penal',
    'CLT',
    'Constituição Federal',
    'Lei das S.A.',
    'Código de Defesa do Consumidor',
    'Lei de Falências',
    'Lei de Licitações'
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <ChatHeader
        chat={currentChat}
        onTitleChange={handleTitleChange}
        onGenerateProcess={onGenerateProcess}
        isDemo={isDemo}
      />

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {isVademecumChat && showVademecum && (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Consulta Rápida</h3>
              <div className="grid grid-cols-2 gap-2">
                {vademecumSuggestions.map((law, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      onSendMessage(currentChat.id, `Consultar ${law}`);
                      setShowVademecum(false);
                    }}
                    className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {law}
                  </button>
                ))}
              </div>
            </div>
          )}
          {currentChat.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative flex items-center">
            <FileUploadButton
              onFileSelect={handleFileSelect}
              isDemo={isDemo}
            />
            {isVademecumChat && (
              <button
                type="button"
                onClick={() => setShowVademecum(!showVademecum)}
                className="absolute left-10 p-2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <BookOpen size={20} />
              </button>
            )}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={isVademecumChat 
                ? "Digite o artigo, lei ou código que deseja consultar..." 
                : isDemo 
                  ? "Digite sua dúvida jurídica para testar o assistente..." 
                  : "Digite sua mensagem..."}
              className="w-full px-12 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
            />
            <button
              type="submit"
              disabled={!message.trim() && attachments.length === 0}
              className="absolute right-2 p-2 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
          {isDemo && (
            <p className="mt-2 text-xs text-gray-500 text-center">
              Esta é uma demonstração limitada. Para acesso completo às funcionalidades, 
              <button onClick={() => window.location.href = '/'} className="ml-1 text-blue-600 hover:underline">
                cadastre-se aqui
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ChatArea;