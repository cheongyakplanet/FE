'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { BotMessageSquare, MessagesSquare, Send, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import { useTokenStore } from '@/stores/auth-store';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ from: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' }]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken } = useTokenStore();
  const isLoggedIn = !!accessToken;
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    const cleanToken = accessToken.replace(/^Bearer\s/, '');

    ws.current = new WebSocket(`wss://run.blu2print.site:8082/ws/chat?token=${cleanToken}`);

    ws.current.onmessage = (event) => {
      const reply = event.data;
      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    };

    return () => {
      ws.current?.close();
    };
  }, [accessToken]);

  const handleSend = () => {
    if (!input.trim() || ws.current?.readyState !== WebSocket.OPEN) return;

    setMessages((prev) => [...prev, { from: 'user', text: input.trim() }]);

    ws.current.send(
      JSON.stringify({
        type: 'chat',
        message: input.trim(),
      }),
    );

    setInput('');
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-10 z-50">
      {isOpen ? (
        <Card className="max-h-[70vh] w-[360px] shadow-xl">
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex space-x-2">
                <MessagesSquare size={20} />
                <p className="font-semibold">챗봇</p>
                {isLoggedIn ? (
                  <p className="flex items-center text-xs text-gray-400"> 하루 최대 15회까지 이용하실 수 있어요.</p>
                ) : (
                  <p></p>
                )}
              </div>
              <button onClick={() => setIsOpen(false)} className="text-sm text-gray-500">
                <X size={16} />
              </button>
            </div>

            {!isLoggedIn ? (
              <div className="py-10 text-center text-sm text-gray-500">
                로그인 후 챗봇을 이용하실 수 있어요
                <br />
                <Link href="signin" className="text-blue-400 hover:underline">
                  로그인 하러 가기
                </Link>
              </div>
            ) : (
              <>
                <div className="h-[400px] space-y-2 overflow-y-auto rounded bg-gray-50 p-2">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={cn('flex', msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                      <div
                        className={cn(
                          'inline-block max-w-[75%] break-words rounded-xl px-3 py-2 text-sm',
                          msg.from === 'user' ? 'bg-blue-200 text-black' : 'bg-gray-200 text-black',
                        )}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={scrollRef} />
                </div>
                <div className="mt-3 flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                        handleSend();
                      }
                    }}
                    placeholder="메시지를 입력하세요"
                  />

                  <Button onClick={handleSend} className="border border-gray-300 bg-white text-black hover:bg-gray-100">
                    <Send />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger
              onClick={() => setIsOpen(true)}
              className="rounded-full bg-blue-600 px-4 py-2 text-white shadow-lg"
            >
              <BotMessageSquare />
            </TooltipTrigger>
            <TooltipContent className="rounded-xl border border-gray-200 bg-white text-black">
              <p>챗봇이 도와드려요</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default Chatbot;
