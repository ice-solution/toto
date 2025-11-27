import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([
    { role: 'bot', text: '你好，我是杜乾彰師傅的 AI 助手。請問今天有什麼可以在玄學或靈性上協助您？' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const response = await getChatResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-black text-white p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-[350px] md:w-[400px] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[600px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="font-serif tracking-widest text-sm">杜師傅 AI 助理</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-[400px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 text-sm rounded-lg ${msg.role === 'user' ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg text-xs text-gray-500 flex items-center gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="輸入您的問題..."
              className="flex-1 bg-gray-50 border-none outline-none text-sm p-2 rounded focus:ring-1 focus:ring-black"
            />
            <button onClick={handleSend} disabled={loading} className="text-black disabled:opacity-30">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
