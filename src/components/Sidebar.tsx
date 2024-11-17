import React from 'react';
import { MessageSquare, Plus, Scale } from 'lucide-react';
import { Chat } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  chats: Chat[];
  currentChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
  onNewChat: () => void;
  isDemo?: boolean;
  onLogoClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  chats, 
  currentChat, 
  onChatSelect,
  onNewChat,
  isDemo,
  onLogoClick
}) => {
  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:relative lg:translate-x-0 z-30 w-64 h-screen transition-transform duration-300 ease-in-out`}
    >
      <div className="h-full bg-white border-r border-gray-100 flex flex-col">
        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            <span>Nova Consulta</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3">
          <div className="space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentChat?.id === chat.id
                    ? 'bg-gray-100 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageSquare size={18} />
                <span className="text-sm font-medium truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div 
          onClick={onLogoClick}
          className="p-4 border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Scale size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Assistente Jurídico</p>
              <p className="text-xs text-gray-500">
                {isDemo ? 'Modo Demonstração' : 'Pronto para auxiliar'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;