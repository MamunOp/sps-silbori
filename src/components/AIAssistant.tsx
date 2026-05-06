import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { askSchoolAI } from '../services/aiService';
import { useAuth } from '../lib/AuthContext';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello! I am Lumina. How can I help you today with admissions or school information?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await askSchoolAI(userMsg, { role: profile?.role, name: profile?.displayName });
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="mb-4 w-80 md:w-96"
          >
            <Card className="shadow-2xl border-none overflow-hidden bg-white/90 backdrop-blur-xl">
              <CardHeader className="bg-neutral-900 py-4 px-5 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/10 rounded-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-sm text-white font-bold tracking-tight">Lumina Assistant</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="h-[400px] overflow-y-auto p-4 space-y-4 font-sans text-sm">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                      m.role === 'user' 
                        ? 'bg-neutral-900 text-white rounded-tr-none' 
                        : 'bg-neutral-100 text-neutral-800 rounded-tl-none font-serif italic'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-neutral-100 px-4 py-2 rounded-2xl rounded-tl-none">
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-3 bg-neutral-50/50 border-t border-neutral-100">
                <div className="flex w-full items-center gap-2">
                  <Input 
                    placeholder="Ask about admissions..." 
                    className="flex-1 bg-white"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button size="icon" className="bg-neutral-900 shrink-0" onClick={handleSend} disabled={loading}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-14 h-14 rounded-full bg-neutral-900 shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center p-0"
      >
        <Bot className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
}
