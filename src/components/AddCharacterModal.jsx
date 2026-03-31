import React, { useState } from 'react';

const AddCharacterModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Protagonist');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onAdd({ name, role, description });
    setName('');
    setRole('Protagonist');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/20 backdrop-blur-md">
      {/* The Modal */}
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(31,27,25,0.08)] flex flex-col">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none paper-grain rounded-xl overflow-hidden"></div>
        
        <div className="px-10 pt-10 pb-6 relative z-10">
          <h2 className="font-headline text-3xl text-on-surface tracking-tight">Add Character</h2>
          <p className="font-label text-xs text-on-surface-variant uppercase tracking-[0.15em] opacity-60 mt-1">Define a soul within your story</p>
        </div>
        
        <div className="px-10 pb-8 flex-1 overflow-y-auto max-h-[716px] space-y-8 relative z-10">
          {/* Section: Name */}
          <div className="space-y-3">
            <label className="font-label text-[0.6875rem] uppercase tracking-widest text-on-surface-variant font-bold">Character Name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 px-0 py-2 font-headline text-xl text-on-surface placeholder:text-on-surface-variant/30 transition-colors" 
              placeholder="Enter character name" 
              type="text" 
            />
          </div>
          
          {/* Section: Role */}
          <div className="space-y-4">
            <label className="font-label text-[0.6875rem] uppercase tracking-widest text-on-surface-variant font-bold">Narrative Role</label>
            <div className="flex flex-wrap gap-2">
              {['Protagonist', 'Antagonist', 'Supporting', 'Other'].map(r => (
                  <button 
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-5 py-2 rounded-full text-xs font-label font-semibold tracking-wide transition-all shadow-sm ${role === r ? 'bg-primary text-on-primary' : 'border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container'}`}>
                    {r}
                  </button>
              ))}
            </div>
          </div>
          
          {/* Section: Description */}
          <div className="space-y-3">
            <label className="font-label text-[0.6875rem] uppercase tracking-widest text-on-surface-variant font-bold">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container-low/30 border-0 border-b border-outline-variant/40 focus:border-primary focus:ring-0 p-4 font-body text-sm text-on-surface leading-relaxed placeholder:text-on-surface-variant/30 transition-all resize-none rounded-t-lg" 
              placeholder="Write a short description of this character..." 
              rows="4"
            ></textarea>
          </div>
          
        </div>
        
        {/* Footer Actions */}
        <div className="px-10 py-8 bg-surface-container-low/40 flex items-center justify-end gap-6 relative z-10 rounded-b-xl">
          <button onClick={onClose} className="font-label text-xs uppercase tracking-[0.15em] text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label text-xs uppercase tracking-[0.15em] font-bold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
            Save Character
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCharacterModal;
