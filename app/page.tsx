'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { streamComponent } from './actions';

interface Message {
  role: 'user' | 'assistant';
  content: React.ReactNode;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input) return;

    // Add user message to the state
    setMessages(prev => [...prev, { role: 'user', content: input }]);

    // Get assistant's response and update state
    const response = await streamComponent(input);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);

    setInput(''); // Reset input field
  };

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-4 w-full text-center">Streaming React Components Example</h1>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-20 w-1/2 mx-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white p-2 rounded-lg max-w-sm'
                  : 'w-full'
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input container (fixed at the bottom) */}
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 w-full flex items-center bg-black p-4 border-t border-neutral-800"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border border-neutral-600 rounded-lg p-2 mr-2 bg-neutral-900 text-white"
          placeholder="Enter your message"
        />
        <Button type="submit" className="p-2">
          Send
        </Button>
      </form>
    </div>
  );
}