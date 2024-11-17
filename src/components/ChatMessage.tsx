import React from 'react';
import { Message } from '../types';
import { Scale, User, FileText, File, Download } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex gap-4 ${isAssistant ? 'bg-white shadow-sm rounded-lg p-4' : ''}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isAssistant ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
      }`}>
        {isAssistant ? (
          <Scale size={18} className="text-white" />
        ) : (
          <User size={18} className="text-gray-700" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium text-gray-900">
          {isAssistant ? 'Assistente Jurídico' : 'Você'}
        </div>
        <div className="text-gray-700">{message.content}</div>
        
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"
              >
                {attachment.type.includes('pdf') ? (
                  <FileText size={16} className="text-blue-600" />
                ) : (
                  <File size={16} className="text-gray-600" />
                )}
                <span className="text-sm text-gray-700 flex-1 truncate">
                  {attachment.name}
                </span>
                <span className="text-xs text-gray-500">
                  ({(attachment.size / 1024).toFixed(1)}KB)
                </span>
                <button
                  onClick={() => handleDownload(attachment.url, attachment.name)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                  title="Baixar arquivo"
                >
                  <Download size={14} className="text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;