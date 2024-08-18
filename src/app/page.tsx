'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat"
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="overflow-auto">
        {messages.map(m => (
          <div key={m.id} className={`whitespace-pre-wrap ${m.role === 'user' ? 'user-message' : 'ai-message'}`}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event, {
          data: {
            prompt: input
          }
        });
      }}>
        <input
          className="fixed bg-slate-800 text-white bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}