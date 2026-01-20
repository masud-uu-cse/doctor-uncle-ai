import { useEffect, useRef } from 'react';
import { Message } from '@/types/health';
import { Bot, User } from 'lucide-react';

interface ChatHistoryProps {
  messages: Message[];
}

export const ChatHistory = ({ messages }: ChatHistoryProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 pb-4">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex gap-3 animate-fade-in-up ${
            message.role === 'user' ? 'flex-row-reverse' : ''
          }`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Avatar */}
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === 'ai'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {message.role === 'ai' ? (
              <span className="text-sm">👨‍⚕️</span>
            ) : (
              <User className="h-4 w-4" />
            )}
          </div>

          {/* Message Bubble */}
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === 'ai'
                ? 'bg-chat-ai text-chat-ai-foreground rounded-tl-sm'
                : 'bg-chat-user text-chat-user-foreground rounded-tr-sm'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
            <span className="text-[10px] opacity-60 mt-1 block">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
