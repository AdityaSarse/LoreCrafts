import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StoryChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { story_id } = location.state || {};

  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const endRef = useRef(null);

  useEffect(() => {
    if (!story_id) {
       navigate('/create');
       return;
    }
    fetchStory();
  }, [story_id, navigate]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const fetchStory = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/story/${story_id}`);
      const data = await res.json();
      
      if (data.chat_history && data.chat_history.length > 0) {
        setMessages(data.chat_history);
        setIsTyping(false);
      } else {
        const sumRes = await fetch(`http://127.0.0.1:8000/story/${story_id}/summary`, { method: 'POST' });
        const sumData = await sumRes.json();
        
        const initialMsg = {
           role: 'ai',
           content: `[Context: ${sumData.summary}]\n\nDirection: ${sumData.chapter1_direction}\n\nWhat do you think? Shall we refine this or generate your first chapter?`
        };
        setMessages([initialMsg]);
        setIsTyping(false);
      }
    } catch (err) {
      console.error(err);
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if(!inputMsg.trim() || isTyping) return;
    
    const userMsg = inputMsg;
    setInputMsg("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);
    
    try {
       const res = await fetch(`http://127.0.0.1:8000/story/${story_id}/refine`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ message: userMsg })
       });
       const data = await res.json();
       setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
    } catch(err) {
       console.error("Error sending message", err);
    } finally {
       setIsTyping(false);
    }
  };

  const handleGenerateChapter = async () => {
      setIsTyping(true);
      try {
         const res = await fetch(`http://127.0.0.1:8000/story/${story_id}/generate-chapter`, { method: 'POST' });
         if (!res.ok) throw new Error("Generation failed");
         const data = await res.json();
         // For now, we visually drop the chapter text into the chat as a system message
         setMessages(prev => [...prev, { role: 'ai', content: `📖 **SUCCESS**\n\n${data.content}` }]);
      } catch(err) {
         console.error(err);
         alert("Failed to generate chapter");
      } finally {
         setIsTyping(false);
      }
  };

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container/30 min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 z-50 w-full flex justify-between items-center px-8 py-4 bg-[#fff8f5] dark:bg-[#1f1b19]">
        <div className="flex items-center gap-8">
          <span className="font-['Newsreader'] italic font-bold text-[#735b24] dark:text-[#c8a96a] text-2xl">The Digital Atelier</span>
          <div className="hidden md:flex gap-6">
            <a className="text-[#1f1b19]/60 dark:text-[#eae1dd]/60 font-['Newsreader'] tracking-tight text-lg hover:text-[#735b24] transition-colors duration-300" href="#">Manuscripts</a>
            <a className="text-[#1f1b19]/60 dark:text-[#eae1dd]/60 font-['Newsreader'] tracking-tight text-lg hover:text-[#735b24] transition-colors duration-300" href="#">Library</a>
            <a className="text-[#1f1b19]/60 dark:text-[#eae1dd]/60 font-['Newsreader'] tracking-tight text-lg hover:text-[#735b24] transition-colors duration-300" href="#">Archive</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#735b24] p-2 hover:bg-surface-container transition-all rounded-full" data-icon="settings">settings</button>
          <img alt="Writer's Profile" className="w-8 h-8 rounded-full border border-outline-variant/30 object-cover" data-alt="profile portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Fq0WeihJGsDm1NeemaKIiL01kz56qA91Sxff23mwdzsnssQnl-nWHhQ-eI-PwVolLFCdYwiyl7HWq2BVRvo-eZnVwy-35hLVRZ-q-U2-lUOJFBIE_EDZ_cYAAzofb6i1GLKHwDLFe7EwLtiIOjdy24WdjEVhoE1NaX0__-_TX6YEnOxnjhAkgNDy9uLxXjvLl17Z0BCVFCqjSkvjq78Xyw8IFUK_eXsJwt5oL9qFSM-IsaV0YAGxmvaB8Ws5Dfe5EymWWTDxr0M" />
        </div>
      </nav>

      {/* SideNavBar (Scriptorium) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#fbf2ee] dark:bg-[#2d2825] flex-col py-8 px-4 gap-6 pt-24 z-40">
        <div className="mb-4 px-4">
          <h2 className="font-['Newsreader'] text-xl text-[#735b24]">The Scriptorium</h2>
          <p className="font-['Manrope'] text-[10px] font-medium uppercase tracking-wider text-on-surface-variant/60">AI Novel Maker</p>
        </div>
        <nav className="flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 border-[#fea7a5] bg-[#fff8f5]/50 dark:bg-[#1f1b19]/30 text-[#735b24] font-['Manrope'] text-sm font-medium uppercase tracking-wider" href="#">
            <span className="material-symbols-outlined" data-icon="book_5">book_5</span> Current Story
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#1f1b19]/40 hover:bg-[#eae1dd] transition-all font-['Manrope'] text-sm font-medium uppercase tracking-wider" href="#">
            <span className="material-symbols-outlined" data-icon="menu_book">menu_book</span> World Bible
          </a>
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#1f1b19]/40 hover:bg-[#eae1dd] transition-all font-['Manrope'] text-sm font-medium uppercase tracking-wider" href="#">
            <span className="material-symbols-outlined" data-icon="group">group</span> Characters
          </a>
        </nav>
        <div className="mt-auto px-4">
          <button onClick={() => navigate('/create')} className="w-full py-3 bg-primary text-on-primary rounded-lg font-label text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-all cursor-pointer">
            New Manuscript
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="pt-24 pb-56 px-6 lg:ml-64 min-h-screen flex flex-col items-center">
        {/* Header Section */}
        <header className="text-center max-w-2xl mb-12">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-primary mb-2">Refine Your Story</h1>
          <p className="font-body text-on-surface-variant/70 text-lg">Shape the beginning before it unfolds</p>
        </header>

        {/* Chat Area Container */}
        <section className="w-full max-w-3xl space-y-10 relative">
          
          {messages.map((msg, idx) => (
            msg.role === 'ai' ? (
                <div key={idx} className="flex flex-col gap-4 animate-in fade-in duration-500">
                    <div className="flex items-center gap-3 px-2">
                        <span className="material-symbols-outlined text-tertiary" data-icon="ink_pen" style={{ fontVariationSettings: "'FILL' 1" }}>ink_pen</span>
                        <span className="font-label text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/40">The Atelier Muse</span>
                    </div>
                    <div className="bg-surface-container-low rounded-xl p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden">
                        <div className="paper-texture absolute inset-0 pointer-events-none opacity-50"></div>
                        <p className="font-headline text-xl leading-relaxed text-on-surface italic relative z-10 whitespace-pre-wrap">
                            "{msg.content}"
                        </p>
                    </div>
                </div>
            ) : (
                <div key={idx} className="flex flex-col items-end gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="bg-surface-container-highest rounded-xl p-6 max-w-[80%] shadow-sm">
                        <p className="font-body text-on-surface leading-relaxed relative z-10">
                            {msg.content}
                        </p>
                    </div>
                    <div className="px-4">
                        <span className="font-label text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant/40">Author</span>
                    </div>
                </div>
            )
          ))}

          {isTyping && (
             <div className="flex items-center gap-3 px-2 opacity-60 animate-pulse">
                <span className="material-symbols-outlined text-tertiary" data-icon="ink_pen">ink_pen</span>
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Muse is contemplating...</span>
             </div>
          )}
          
          <div ref={endRef}></div>

        </section>
      </main>

      {/* Fixed Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 flex flex-col items-center z-50">
        {/* Primary FAB Area */}
        <div className="w-full max-w-3xl flex justify-end mb-4 px-6 pointer-events-none">
          <button 
             onClick={handleGenerateChapter}
             disabled={isTyping}
             className="pointer-events-auto flex items-center gap-3 bg-primary-container text-on-primary-container disabled:opacity-50 px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform border border-primary/20 group cursor-pointer">
            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform" data-icon="auto_awesome" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span className="font-label text-sm font-extrabold uppercase tracking-widest">Generate Chapter 1</span>
          </button>
        </div>
        
        {/* Input Area */}
        <div className="w-full max-w-4xl bg-white/80 dark:bg-[#1f1b19]/90 backdrop-blur-xl border-t border-outline-variant/20 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative z-20">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <div className="flex-1 relative">
              <input 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isTyping}
                className="w-full bg-transparent border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 font-body py-3 text-lg placeholder:text-on-surface-variant/40" 
                placeholder="Add your idea or refine the story..." 
                type="text" 
              />
            </div>
            <button 
               onClick={handleSend}
               disabled={!inputMsg.trim() || isTyping}
               className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-on-primary disabled:opacity-50 hover:opacity-90 active:scale-95 transition-all cursor-pointer">
              <span className="material-symbols-outlined" data-icon="send">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-24 right-12 w-64 h-64 bg-secondary-container/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-48 left-24 w-48 h-48 bg-tertiary-container/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default StoryChat;
