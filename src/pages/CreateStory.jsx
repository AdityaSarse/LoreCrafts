import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCharacterModal from '../components/AddCharacterModal';

const CreateStory = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    chapter1_name: '',
    genre: 'Fantasy',
    era: 'Medieval',
    plot: '',
    description: '',
    characters: []
  });

  const handleAddCharacter = (char) => {
    setFormData((prev) => ({
      ...prev,
      characters: [...prev.characters, char]
    }));
  };

  const handleStartStory = async () => {
    // Basic validation
    if (!formData.title) {
        alert("Please enter a title for your masterpiece.");
        return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('http://127.0.0.1:8000/story/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error("Failed to create story on backend.");
      
      const data = await res.json();
      navigate('/chat', { state: { story_id: data.story_id } });
    } catch (err) {
      console.error(err);
      alert("Error starting story. Make sure your FastAPI backend is running via uvicorn.");
    } finally {
      setIsLoading(false);
    }
  };

  const genres = ['Fantasy', 'Horror', 'Mystery', 'Sci-fi', 'Romance'];
  const eras = ['Medieval', 'Modern', 'Future', 'Custom'];

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen relative">
      {/* Top Navigation */}
      <nav className="bg-[#fff8f5] dark:bg-[#1f1b19] flex justify-between items-center w-full px-12 py-6 max-w-none fixed top-0 z-50">
        <div className="text-2xl font-serif italic text-[#735b24] dark:text-[#c8a96a] font-['Newsreader'] tracking-tight">The Digital Atelier</div>
        <div className="hidden md:flex space-x-8 items-center font-['Newsreader'] tracking-tight">
          <a className="text-[#1f1b19]/60 dark:text-[#eae1dd]/60 hover:text-[#735b24] dark:hover:text-[#c8a96a] transition-colors duration-300" href="#">Manuscripts</a>
          <a className="text-[#1f1b19]/60 dark:text-[#eae1dd]/60 hover:text-[#735b24] dark:hover:text-[#c8a96a] transition-colors duration-300" href="#">Library</a>
          <a className="text-[#1f1b19]/60 dark:text-[#eae1dd]/60 hover:text-[#735b24] dark:hover:text-[#c8a96a] transition-colors duration-300" href="#">Archive</a>
        </div>
        <div className="flex items-center space-x-6">
          <span className="material-symbols-outlined text-primary cursor-pointer" data-icon="auto_stories">auto_stories</span>
          <span className="material-symbols-outlined text-primary cursor-pointer" data-icon="settings">settings</span>
          <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
            <img alt="Author Profile" className="w-full h-full object-cover" data-alt="close-up portrait of a thoughtful writer with a slight smile in soft natural morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2ZPvxCJqI2-BY359ATFWW1Ee5-lKBIi_qSWAcqLCt7OSIWUZKtnqDtzROpiEs_4oQN6IKqF5NFIEueVv_i6ffFVpGXp6UMjPi20FIVKO0zG23Ljl-7bVMKXnvzuoxxaA5NA87XKN_KDES4yw8TDuA_YDVaiDZVvTZCnWNrf-31UKyKjEWgOog95A6BdN5A_qygfFE4O_tbD1u9jALs1XMKHBkWgAQjWvuFkGmgAN6svaC0yJmafXntXLia7JLV930lCZgk9pXugE" />
          </div>
        </div>
      </nav>
      {/* Main Content Flow */}
      <main className="pt-32 pb-40 px-6 max-w-4xl mx-auto space-y-24 relative z-10">
        {/* Section 1: Basic Info */}
        <section className="flex flex-col items-center text-center space-y-8">
          <div className="w-full">
            <input 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-transparent text-center font-headline text-5xl md:text-7xl font-light border-none placeholder:text-outline-variant/30 text-on-background focus:ring-0" 
              placeholder="Untitled Masterpiece" 
              type="text" 
            />
            <div className="h-[1px] w-32 bg-primary/20 mx-auto mt-4"></div>
          </div>
          <div className="w-full max-w-md">
            <input 
              value={formData.chapter1_name}
              onChange={(e) => setFormData({...formData, chapter1_name: e.target.value})}
              className="w-full bg-transparent text-center font-headline text-2xl italic border-none placeholder:text-outline-variant/50 text-on-surface-variant focus:ring-0" 
              placeholder="Chapter 1: The First Breath" 
              type="text" 
            />
          </div>
        </section>
        
        {/* Section 2: Dramatis Personae */}
        <section className="space-y-10">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-headline text-4xl text-primary">Dramatis Personae</h2>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mt-2">The Souls Inhabiting Your World</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg font-label text-sm font-semibold hover:bg-primary hover:text-on-primary transition-all duration-300 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
              <span>Add Character</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.characters.length === 0 && (
                <div className="col-span-1 md:col-span-2 text-center text-on-surface-variant py-8 border border-dashed border-outline-variant/30 rounded-xl">
                    <p className="font-body opacity-60">No souls inhabit this world yet.</p>
                </div>
            )}
            {formData.characters.map((char, index) => (
                <div key={index} className="bg-surface-container-low p-6 rounded-xl manuscript-shadow transition-transform hover:scale-[1.01] cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary" data-icon="person">person</span>
                    </div>
                    <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-tighter px-2 py-1 rounded">{char.role}</span>
                  </div>
                  <h3 className="font-headline text-xl font-semibold mb-1">{char.name}</h3>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed opacity-80">{char.description}</p>
                </div>
            ))}
          </div>
        </section>
        
        {/* Section 3: Story Settings */}
        <section className="space-y-12">
          <div>
            <h2 className="font-headline text-3xl">Foundations of Reality</h2>
            <div className="h-1 w-12 bg-primary mt-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Genre */}
            <div className="space-y-6">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Narrative Genre</label>
              <div className="flex flex-wrap gap-3">
                {genres.map(g => (
                    <button 
                      key={g} 
                      onClick={() => setFormData({...formData, genre: g})}
                      className={`px-6 py-2 rounded-full text-sm font-label transition-all ${formData.genre === g ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface hover:bg-primary-container hover:border-primary-container'}`}>
                        {g}
                    </button>
                ))}
              </div>
            </div>
            {/* Time Period */}
            <div className="space-y-6">
              <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Temporal Setting</label>
              <div className="flex flex-wrap gap-3">
                {eras.map(e => (
                    <button 
                      key={e} 
                      onClick={() => setFormData({...formData, era: e})}
                      className={`px-6 py-2 rounded-full text-sm font-label transition-all ${formData.era === e ? 'bg-primary-container text-on-primary-container border border-primary-container' : 'border border-outline-variant text-on-surface hover:bg-primary-container'}`}>
                        {e}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Section 4: Story Details */}
        <section className="space-y-12 bg-surface-container-lowest p-10 rounded-2xl manuscript-shadow border border-outline-variant/10">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="font-headline text-2xl">The Loom of the Plot</label>
              <textarea 
                value={formData.plot}
                onChange={(e) => setFormData({...formData, plot: e.target.value})}
                className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary py-4 text-lg font-body placeholder:text-outline-variant/50 resize-none" 
                placeholder="Where does the journey begin, and what shadows loom over the path?" 
                rows="4"
              ></textarea>
            </div>
            <div className="space-y-4">
              <label className="font-headline text-2xl">The Atlas of the World</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary py-4 text-lg font-body placeholder:text-outline-variant/50 resize-none" 
                placeholder="Describe the atmosphere, the laws of nature, and the architecture of the setting..." 
                rows="6"
              ></textarea>
            </div>
          </div>
        </section>
        
        {/* Action Footer */}
        <footer className="flex items-center justify-between pt-12">
          <button className="text-on-surface-variant font-label text-sm uppercase tracking-widest hover:text-primary transition-colors">Discard Draft</button>
          <button 
            onClick={handleStartStory}
            disabled={isLoading}
            className="group flex items-center space-x-4 bg-primary text-on-primary px-10 py-5 rounded-xl font-headline text-xl shadow-lg hover:bg-on-primary-container disabled:opacity-70 transition-all cursor-pointer">
            <span>{isLoading ? 'Weaving...' : 'Inscribe the First Words'}</span>
            {!isLoading && <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" data-icon="ink_pen">ink_pen</span>}
          </button>
        </footer>
      </main>
      
      {/* Side Navigation (Mobile Hidden) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-20 flex-col items-center py-10 bg-surface-container-low space-y-10 z-20">
        <div className="w-10 h-10 flex items-center justify-center text-primary font-serif text-xl border border-primary/20 rounded">A</div>
        <div className="flex-1 flex flex-col space-y-8">
          <span className="material-symbols-outlined text-primary/40 cursor-pointer hover:text-primary transition-colors" data-icon="edit_note" title="Drafting">edit_note</span>
          <span className="material-symbols-outlined text-primary cursor-pointer" data-icon="groups" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }} title="Characters">groups</span>
          <span className="material-symbols-outlined text-primary/40 cursor-pointer hover:text-primary transition-colors" data-icon="public" title="World Building">public</span>
          <span className="material-symbols-outlined text-primary/40 cursor-pointer hover:text-primary transition-colors" data-icon="tune" title="Settings">tune</span>
        </div>
      </aside>
      
      {/* Dynamic Add Character Modal */}
      <AddCharacterModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddCharacter}
      />

      {/* Background Decoration */}
      <div className="fixed top-0 right-0 w-1/3 h-full -z-10 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/4 right-[-10%] w-full aspect-square border-[0.5px] border-primary/30 rounded-full"></div>
        <div className="absolute top-1/3 right-[-5%] w-full aspect-square border-[0.5px] border-primary/20 rounded-full scale-110"></div>
      </div>
    </div>
  );
};

export default CreateStory;
