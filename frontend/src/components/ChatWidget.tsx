import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ArrowRight, Quote, Ticket, User, Phone, MessageSquare } from 'lucide-react';



export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isRaisingTicket, setIsRaisingTicket] = useState(false);
  const [ticketForm, setTicketForm] = useState(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('bk_authorized_user') : null;
    const user = userStr ? JSON.parse(userStr) : {};
    return { 
      name: user.name !== 'Guest' ? (user.name || '') : '', 
      phone: user.phone !== '0000000000' ? (user.phone || '') : '', 
      issue: '' 
    };
  });
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: 'OFFICIAL COMMUNICATION: I am the Chief Academic Dean at BK Career Academy. I am authorized to provide strategic guidance for UPSC, MPSC, and related administrative recruitment protocols. State your query clearly.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      // Show popup after 2 seconds
      const showTimer = setTimeout(() => {
        setShowPopup(true);
        // Hide popup after 5 seconds of being shown
        const hideTimer = setTimeout(() => {
          setShowPopup(false);
        }, 3000);
        return () => clearTimeout(hideTimer);
      }, 2000);
      
      return () => clearTimeout(showTimer);
    } else {
      setShowPopup(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isRaisingTicket]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "ADMINISTRATIVE ERROR: Connection to protocol server lost." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "COMMUNICATION FAILURE: Direct all inquiries to the official hotline." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRaiseTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketForm)
      });
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'bot', text: `✅ OFFICIAL RECORD: Ticket Raised. Ref Name: ${ticketForm.name}. Response expected within 24 operational hours. JAY HIND.` }]);
        setIsRaisingTicket(false);
        setTicketForm({ name: '', phone: '', issue: '' });
      }
    } catch (err: any) {
      console.error('Ticket Error:', err);
      setMessages(prev => [...prev, { role: 'bot', text: `ERROR: Protocol submission failed. Contact headquarters directly.` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[90]">
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10, x: 20 }}
            className="absolute bottom-24 right-0 w-72 bg-ink/95 backdrop-blur-md text-white p-6 border-l-8 border-brand shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl pointer-events-none"
          >
            <div className="text-[10px] font-mono text-brand uppercase tracking-widest mb-1">Academic Guidance</div>
            <div className="text-sm font-display font-bold leading-tight">Aspirant, how can we assist your strategic preparation today?</div>
            {/* Triangle Tip */}
            <div className="absolute bottom-[-10px] right-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-ink" />
          </motion.div>
        )}

        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-24 right-0 w-[calc(100vw-2rem)] sm:w-96 bg-white border-2 border-ink overflow-hidden flex flex-col h-[500px] shadow-2xl"
          >
            <div className="p-4 bg-ink flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 border-2 border-brand bg-white flex items-center justify-center overflow-hidden shrink-0 p-1 rounded-full shadow-inner"
                >
                  <img src="/Ashok%20stambh.png" alt="Ashok Stambh" className="w-full h-full object-contain opacity-90" style={{ filter: 'grayscale(100%) contrast(120%)' }} />
                </motion.div>
                <div>
                  <div className="text-white font-display font-bold text-sm uppercase">Chief Academic Dean</div>
                  <div className="text-brand/60 text-[10px] uppercase font-mono tracking-widest">Official Channel • JAY HIND</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-brand hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-background scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 px-4 text-[13px] ${msg.role === 'user' ? 'bg-brand text-ink font-semibold' : 'bg-white border-2 border-ink/10 text-ink'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {!isRaisingTicket && (
                <div className="flex justify-start">
                  <button 
                    onClick={() => setIsRaisingTicket(true)}
                    className="flex items-center gap-2 bg-ink text-brand px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider hover:bg-brand hover:text-ink transition-all"
                  >
                    <Ticket size={14} /> Raise a Ticket
                  </button>
                </div>
              )}

              {isRaisingTicket && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-2 border-brand p-4 space-y-3"
                >
                  <div className="text-[11px] font-bold text-ink uppercase flex items-center gap-2">
                    <Ticket size={14} className="text-brand" /> New Support Ticket
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <User size={12} className="absolute left-3 top-3 text-muted" />
                        <input 
                          placeholder="Full Name (e.g. Rohan Mane)"
                          className="w-full pl-8 pr-3 py-2 border border-ink/20 text-xs focus:border-brand outline-none"
                          value={ticketForm.name}
                          onChange={e => setTicketForm({...ticketForm, name: e.target.value})}
                        />
                    </div>
                    <div className="relative">
                      <Phone size={12} className="absolute left-3 top-3 text-muted" />
                        <input 
                          placeholder="Contact No (e.g. 9890xxxxxx)"
                          type="tel"
                          maxLength={10}
                          className="w-full pl-8 pr-3 py-2 border border-ink/20 text-xs focus:border-brand outline-none"
                          value={ticketForm.phone}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setTicketForm({...ticketForm, phone: val});
                          }}
                        />
                    </div>
                    <div className="relative">
                      <MessageSquare size={12} className="absolute left-3 top-3 text-muted" />
                      <textarea 
                        placeholder="Describe your issue..."
                        className="w-full pl-8 pr-3 py-2 border border-ink/20 text-xs focus:border-brand outline-none h-16 resize-none"
                        value={ticketForm.issue}
                        onChange={e => setTicketForm({...ticketForm, issue: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleRaiseTicket}
                      disabled={!ticketForm.name || ticketForm.phone.length !== 10 || !ticketForm.issue}
                      className="flex-grow bg-brand text-ink py-2 text-[11px] font-bold uppercase disabled:opacity-50"
                    >
                      Submit Ticket
                    </button>
                    <button 
                      onClick={() => setIsRaisingTicket(false)}
                      className="px-3 border-2 border-ink text-[11px] font-bold uppercase"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-2 border-2 border-ink/10 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-brand animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-brand animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              )}
            </div>

            {!isRaisingTicket && (
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t-2 border-ink flex gap-2">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Submit your administrative query..."
                className="flex-grow bg-background border-2 border-ink px-4 py-2.5 text-xs outline-none focus:border-brand"
              />
              <button type="submit" className="w-10 h-10 bg-brand text-ink flex items-center justify-center hover:bg-ink hover:text-brand transition-colors">
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? {
          y: [0, -4, 0],
          skewX: [0, 2, 0, -2, 0]
        } : { y: 0, scale: 1 }}
        transition={!isOpen ? {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        } : { duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden shadow-2xl border-4 border-ink bg-brand p-0 relative group"
      >
        {isOpen ? <X size={28} strokeWidth={3} className="text-white" /> : (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Premium Badge Container */}
            <div className="w-[46px] h-[46px] bg-white rounded-full flex items-center justify-center relative z-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-ink/10">
              <img 
                src="/Ashok%20stambh.png" 
                alt="Ashok Stambh" 
                className="w-8 h-8 object-contain opacity-90"
                style={{ filter: 'grayscale(100%) contrast(120%)' }}
              />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-brand rounded-full -z-10 blur-md"
            />
          </div>
        )}
      </motion.button>
    </div>
  );
}
