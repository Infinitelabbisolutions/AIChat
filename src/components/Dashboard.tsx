import React, { useState } from 'react';
import { Menu, X, Plus, Scale, FileText } from 'lucide-react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import ModuleGrid from './ModuleGrid';
import ProcessList from './ProcessList';
import { Chat, GeneratedProcess, Message, LegalCategory } from '../types';

interface DashboardProps {
  isDemo?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isDemo = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<'chat' | 'processes' | 'modules'>('modules');
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [generatedProcesses, setGeneratedProcesses] = useState<GeneratedProcess[]>([]);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  const handleNewChat = () => {
    setCurrentChat(null);
    setCurrentView('modules');
  };

  const handleGenerateProcess = async (chat: Chat, processTitle: string) => {
    const newProcess: GeneratedProcess = {
      id: Date.now().toString(),
      title: processTitle,
      chatId: chat.id,
      createdAt: new Date(),
      fileName: `${processTitle.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      status: 'pending',
      type: chat.category,
      pages: Math.floor(Math.random() * 100) + 1
    };
    setGeneratedProcesses([...generatedProcesses, newProcess]);

    setTimeout(() => {
      setGeneratedProcesses(prev => 
        prev.map(p => p.id === newProcess.id ? {
          ...p,
          status: 'completed',
          downloadUrl: `https://example.com/files/${p.id}.pdf`
        } : p)
      );
    }, 3000);
  };

  const handleDownloadProcess = (process: GeneratedProcess) => {
    if (process.downloadUrl) {
      const link = document.createElement('a');
      link.href = process.downloadUrl;
      link.download = process.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDeleteProcess = (process: GeneratedProcess) => {
    setGeneratedProcesses(prev => prev.filter(p => p.id !== process.id));
  };

  const handleSendMessage = (chatId: string, content: string, attachments?: File[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      attachments: attachments?.map(file => ({
        id: Math.random().toString(),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        size: file.size
      }))
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setCurrentChat(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage]
    } : null);

    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        content: 'Entendi sua solicitação. Vou analisar os detalhes fornecidos e ajudar você com o processo. Pode me fornecer mais informações sobre o caso?',
        role: 'assistant',
        timestamp: new Date()
      };

      const updatedChatsWithAI = updatedChats.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, aiResponse]
          };
        }
        return chat;
      });

      setChats(updatedChatsWithAI);
      setCurrentChat(prev => prev ? {
        ...prev,
        messages: [...prev.messages, aiResponse]
      } : null);
    }, 1000);
  };

  const handleModuleSelect = (title: string, category: LegalCategory) => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title,
      messages: [],
      createdAt: new Date(),
      category,
      status: 'active'
    };
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
    setCurrentView('chat');
  };

  const handleTitleChange = (chatId: string, newTitle: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
    setCurrentChat(prev => prev?.id === chatId ? { ...prev, title: newTitle } : prev);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {isDemo && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 z-50">
          <p className="text-sm">
            Modo Demonstração - Funcionalidades limitadas. 
            <button onClick={() => window.location.href = '/'} className="ml-2 underline hover:text-blue-100">
              Cadastre-se para acesso completo
            </button>
          </p>
        </div>
      )}
      
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        chats={isDemo ? [] : chats}
        currentChat={currentChat}
        onChatSelect={setCurrentChat}
        onNewChat={handleNewChat}
        isDemo={isDemo}
        onLogoClick={handleLogoClick}
      />
      
      <main className={`flex-1 flex flex-col overflow-hidden ${isDemo ? 'pt-10' : ''}`}>
        <nav className={`bg-white border-b border-gray-100 p-4 flex justify-between items-center ${isDemo ? 'mt-0' : ''}`}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div 
            onClick={handleLogoClick}
            className="flex-1 px-4 flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Scale className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Assistente Jurídico
            </h1>
          </div>
          {!isDemo && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('processes')}
                className={`p-2 rounded-lg flex items-center gap-2 transition-colors ${
                  currentView === 'processes'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText size={20} />
                <span className="hidden sm:inline">Processos</span>
              </button>
              <button
                onClick={handleNewChat}
                className="p-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-gray-700"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Nova Consulta</span>
              </button>
            </div>
          )}
        </nav>

        {currentView === 'processes' && !isDemo ? (
          <ProcessList
            processes={generatedProcesses}
            onDownload={handleDownloadProcess}
            onDelete={handleDeleteProcess}
          />
        ) : currentView === 'modules' || !currentChat ? (
          <ModuleGrid onModuleSelect={handleModuleSelect} isDemo={isDemo} />
        ) : (
          <ChatArea
            currentChat={currentChat}
            onGenerateProcess={handleGenerateProcess}
            onSendMessage={handleSendMessage}
            onTitleChange={handleTitleChange}
            isDemo={isDemo}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;