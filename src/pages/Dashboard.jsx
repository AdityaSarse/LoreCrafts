import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      <div className="fixed inset-0 pointer-events-none paper-grain z-0"></div>
      {/* SideNavBar Component */}
      <aside className="fixed left-0 top-0 h-full flex flex-col py-6 bg-[#fbf2ee] dark:bg-stone-950 h-screen w-64 border-none z-40 transition-all duration-300">
        <div className="px-8 mb-12">
          <div className="flex items-center space-x-3 mb-1">
            <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
            </div>
            <div>
              <h1 className="font-serif text-xl italic text-[#735b24]">The Scriptorium</h1>
              <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/60">AI Novel Maker</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {/* Active Tab: Library */}
          <a className="flex items-center space-x-3 text-[#735b24] dark:text-[#c8a96a] border-l-4 border-[#c8a96a] pl-4 py-3 bg-[#eae1dd]/40 dark:bg-stone-800/40 shadow-[0_0_15px_rgba(200,169,106,0.2)] font-sans text-sm font-medium tracking-wide transition-all duration-300" href="#">
            <span className="material-symbols-outlined" data-icon="auto_stories" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
            <span>Library</span>
          </a>
          <a className="flex items-center space-x-3 text-[#1f1b19]/70 dark:text-[#fbf2ee]/70 pl-5 py-3 hover:bg-[#eae1dd] dark:hover:bg-stone-900 transition-all duration-300 font-sans text-sm font-medium tracking-wide" href="#">
            <span className="material-symbols-outlined" data-icon="edit_note">edit_note</span>
            <span>Drafts</span>
          </a>
          <a className="flex items-center space-x-3 text-[#1f1b19]/70 dark:text-[#fbf2ee]/70 pl-5 py-3 hover:bg-[#eae1dd] dark:hover:bg-stone-900 transition-all duration-300 font-sans text-sm font-medium tracking-wide" href="#">
            <span className="material-symbols-outlined" data-icon="groups">groups</span>
            <span>Characters</span>
          </a>
          <a className="flex items-center space-x-3 text-[#1f1b19]/70 dark:text-[#fbf2ee]/70 pl-5 py-3 hover:bg-[#eae1dd] dark:hover:bg-stone-900 transition-all duration-300 font-sans text-sm font-medium tracking-wide" href="#">
            <span className="material-symbols-outlined" data-icon="public">public</span>
            <span>Worlds</span>
          </a>
          <a className="flex items-center space-x-3 text-[#1f1b19]/70 dark:text-[#fbf2ee]/70 pl-5 py-3 hover:bg-[#eae1dd] dark:hover:bg-stone-900 transition-all duration-300 font-sans text-sm font-medium tracking-wide" href="#">
            <span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
            <span>Archive</span>
          </a>
        </nav>
        <div className="px-6 mt-auto space-y-2">
          <button 
            onClick={() => navigate('/create')}
            className="w-full bg-primary text-on-primary py-3 rounded-xl font-label text-sm font-bold tracking-tight shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
            New Story
          </button>
          <div className="pt-6 border-t border-outline-variant/10">
            <a className="flex items-center space-x-3 text-[#1f1b19]/70 dark:text-[#fbf2ee]/70 pl-5 py-2 hover:text-primary transition-colors font-sans text-xs font-medium" href="#">
              <span className="material-symbols-outlined text-lg" data-icon="settings">settings</span>
              <span>Settings</span>
            </a>
            <a className="flex items-center space-x-3 text-[#1f1b19]/70 dark:text-[#fbf2ee]/70 pl-5 py-2 hover:text-primary transition-colors font-sans text-xs font-medium" href="#">
              <span className="material-symbols-outlined text-lg" data-icon="account_circle">account_circle</span>
              <span>Profile</span>
            </a>
          </div>
        </div>
      </aside>
      <main className="ml-64 min-h-screen relative z-10">
        {/* TopNavBar Component */}
        <header className="flex justify-between items-center w-full px-12 py-6 max-w-none sticky top-0 bg-[#fff8f5]/80 backdrop-blur-md dark:bg-stone-900/80 z-30">
          <div className="flex items-baseline space-x-6">
            <h2 className="text-3xl font-headline font-bold text-[#1f1b19] dark:text-[#fbf2ee] tracking-tight">Your Library</h2>
            <nav className="hidden md:flex space-x-8">
              <a className="text-[#735b24] dark:text-[#c8a96a] border-b-2 border-[#c8a96a] pb-1 font-label text-sm font-semibold tracking-wide" href="#">Library</a>
              <a className="text-[#1f1b19]/60 dark:text-[#fbf2ee]/60 hover:text-[#735b24] font-label text-sm font-medium tracking-wide transition-colors" href="#">Drafts</a>
              <a className="text-[#1f1b19]/60 dark:text-[#fbf2ee]/60 hover:text-[#735b24] font-label text-sm font-medium tracking-wide transition-colors" href="#">Characters</a>
              <a className="text-[#1f1b19]/60 dark:text-[#fbf2ee]/60 hover:text-[#735b24] font-label text-sm font-medium tracking-wide transition-colors" href="#">Worlds</a>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-highest transition-colors font-label text-sm text-on-surface-variant">
                <span>Recently opened</span>
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-on-surface-variant hover:bg-[#eae1dd] rounded-full transition-colors">
                <span className="material-symbols-outlined" data-icon="filter_list">filter_list</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-[#eae1dd] rounded-full transition-colors">
                <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              </button>
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-container">
                <img alt="User Profile Avatar" className="w-full h-full object-cover" data-alt="close-up portrait of a thoughtful man in a library with warm lighting and blurred books in background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-PPUxmX1ttXH7EYvEaL-9bD9rXYcRMQOON19VBKKmuR0cJoVjaCoBJoMleKAcsGdvEGGej7fzPQGQ02_M-M_uevOqAWfcouZU0Dj_rUIVZ1wQgnZdDgLxQnDGuaVcuLI4NCFloNNY0lkCFBW0aaH8Jc7jZJRirThzF9zsB3Ai4sxlGELXD_-3_2qU6kZpf0JYAoBKsUGw4EIk_TDvC_73Cb7ASWB7-qAm38hHd6Ezc7fELO-Sctf8iSpoOLZwYIHgi4q4kKnISF0" />
              </div>
            </div>
          </div>
        </header>
        {/* Main Content Canvas */}
        <div className="px-12 py-8 max-w-7xl mx-auto">
          {/* Featured Section (Asymmetry) */}
          <section className="mb-16">
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl bg-surface-container-low h-[400px] flex items-center shadow-sm">
              <div className="w-1/2 p-16 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold tracking-widest uppercase mb-4">Current Focus</span>
                <h3 className="text-5xl font-headline font-bold text-on-surface mb-4 leading-tight">The Shadows of Aethelgard</h3>
                <p className="text-on-surface-variant/80 font-body text-lg mb-8 max-w-md leading-relaxed">Chapter 14: The Whispering Gallery. Word count: 42,803. Last edited 2 hours ago.</p>
                <button className="flex items-center space-x-3 bg-primary text-on-primary px-8 py-4 rounded-xl font-label font-bold text-base shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all">
                  <span className="material-symbols-outlined">edit</span>
                  <span>Resume Writing</span>
                </button>
              </div>
              <div className="absolute right-0 top-0 w-3/5 h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-transparent to-transparent z-10"></div>
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" data-alt="cinematic mountain landscape at night with stars and a small glowing cabin in the distance soft moody lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk4o9JEs_2B4IavU3TG0qqsiFW1WNF9i8TPMpf61v3t9HfvJ5tyD6h3LSfMZWwISeo2JhJXZUCSch-qRt2uw3iiWa0BOjynQZZ3HgtmYCIyTHGBzPeHNYNuDLuSH1rDzax4vWcZ8UoouxkfMe_oiU2FsNnvvgs6zEDYlOwb67IwOvj98aY4WtMKL-jRLnL-51tk0gTRl710eR2Q8dmITkbWEjzUUexrDgR1A7hqOJTXwDGVVTPPU-zDhQSoZZn5Om3a6bdCutXR_M" />
              </div>
            </div>
          </section>
          {/* Library Grid */}
          <section>
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-headline font-bold text-on-surface">Your Collection</h3>
              <div className="h-[1px] flex-1 mx-8 bg-outline-variant/20"></div>
              <div className="flex space-x-2">
                <button className="p-2 bg-surface-container-highest rounded-lg"><span className="material-symbols-outlined text-primary">grid_view</span></button>
                <button className="p-2 hover:bg-surface-container rounded-lg transition-colors"><span className="material-symbols-outlined text-on-surface-variant/50">view_list</span></button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {/* Book Card 1 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-r-xl rounded-l-md overflow-hidden bg-surface-container-highest book-shadow book-hover transition-all duration-500 relative flex flex-col">
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/10 z-10"></div>
                  <div className="flex-1 relative">
                    <img className="w-full h-full object-cover opacity-80 mix-blend-multiply" data-alt="macro detail of old weathered leather book cover with gold filigree and embossed textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkbGEkqBc0ueTXe4KSYk7k3pxrcekimWFUs_kWiT3doeRi9WBIfTl4Z-8CnpqQrWku7QKluDUzxMxf3xndMyUPlG_6h_1dxQuiQthcqC-P_4PYHg5omkTxwkTv64I3zzyiDrxDKUpgXiYHRBr_OWNnTn_phSf2vhBSF0tyGwzxhAXRaMznn8SUPMo1Kwn7ooFC6IShvaAARNscHeTT5g_yVYvJ6sWmOX9-ZH6wXxIVErpbKJ4Pd-xhuz6ecEl5bSHMZCqeoFnpXcU" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-[10px] font-label font-bold tracking-widest text-primary-fixed uppercase mb-2">Epic Fantasy</span>
                      <h4 className="text-2xl font-headline font-bold text-white leading-tight">Empire of Dust</h4>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h5 className="font-label font-bold text-on-surface text-sm">Empire of Dust</h5>
                    <p className="text-[11px] text-on-surface-variant/70 font-medium">Last edited 3 days ago</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-tertiary-container/20 text-tertiary uppercase tracking-tighter">Draft</span>
                </div>
              </div>
              {/* Book Card 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-r-xl rounded-l-md overflow-hidden bg-surface-container-highest book-shadow book-hover transition-all duration-500 relative flex flex-col">
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/10 z-10"></div>
                  <div className="flex-1 relative">
                    <img className="w-full h-full object-cover opacity-80 mix-blend-multiply" data-alt="abstract watercolor painting in shades of deep indigo and gold leaf highlights representing a nebula" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCszg45ZBIXNjmslWlb_yA3jj9fTrQdNd9edLr4TAt8kzJP1pCkx2wm_PmrA4UoDdlnNX4-yMSQgB_vahosd3PlT5D2zXiruoeGHHvCUE69fGt4vlEZbo6tnnIo6UuKIfB2yHX11HNJmGAByDBmTHB1Q_ytDwLDUNhbUDFjWiTdiTjYnvu03sp8FVKnvBJ4_4nqpnV3XQ2wgo2OVOOyYLtsWyqAURwxNRm_j_dXnyaFYF2HVh8SaxZ4B1mGszNjsX8jLICa8uTL8lc" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-[10px] font-label font-bold tracking-widest text-primary-fixed uppercase mb-2">Sci-Fi Noir</span>
                      <h4 className="text-2xl font-headline font-bold text-white leading-tight">Neon Silence</h4>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h5 className="font-label font-bold text-on-surface text-sm">Neon Silence</h5>
                    <p className="text-[11px] text-on-surface-variant/70 font-medium">Last edited 1 week ago</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-primary-container/20 text-primary uppercase tracking-tighter">Completed</span>
                </div>
              </div>
              {/* Book Card 3 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-r-xl rounded-l-md overflow-hidden bg-surface-container-highest book-shadow book-hover transition-all duration-500 relative flex flex-col">
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/10 z-10"></div>
                  <div className="flex-1 relative">
                    <img className="w-full h-full object-cover opacity-80 mix-blend-multiply" data-alt="close-up of dried flowers pressed between pages of an old yellowed book soft morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy1q9duTW6-xUejBzEnSwF9Wc6M6_CO2dZGbpuxH2VNDmKcMUSaSvbZNdh8OsvrGbuIjcb6TWWC4jKsosKkp1GOtZ197aPewtDu3LIKyY0KbpIN031NzIvroi-d-1HN2wPNBRetOwoRZfipn9VTMBR-Zc29x44Mj13BOppwf_nQzPNnn2oXs11qUP0ZdDkKpJg7p4csPxLOcQ0uSPq4XmqYQ51jnfWN8GFuz3WEXcQlyTjGqxcfxMFvcy-kyrvVQqA5pqCd72dMXI" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-[10px] font-label font-bold tracking-widest text-primary-fixed uppercase mb-2">Romance</span>
                      <h4 className="text-2xl font-headline font-bold text-white leading-tight">Autumn's Echo</h4>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h5 className="font-label font-bold text-on-surface text-sm">Autumn's Echo</h5>
                    <p className="text-[11px] text-on-surface-variant/70 font-medium">Last edited 4 hours ago</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-tertiary-container/20 text-tertiary uppercase tracking-tighter">Draft</span>
                </div>
              </div>
              {/* Book Card 4 */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-r-xl rounded-l-md overflow-hidden bg-surface-container-highest book-shadow book-hover transition-all duration-500 relative flex flex-col">
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/10 z-10"></div>
                  <div className="flex-1 relative">
                    <img className="w-full h-full object-cover opacity-80 mix-blend-multiply" data-alt="dramatic dark stormy sea with white foam crashing against jagged rocks at night" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHEvTmiP-8ngAvihOlQNUkf3AFXMZFyRKtlGLBLHUI8XBbLBxEDZogiWyIXlBHl0ff8WTpqejUchzzsMzrCBtbgcssLe90hXFT5-Rn3Mlo4HepHdksfRBSNdJqblNT-yyiUv7LfJlEL5pLVHtMh1iVU05oszaqHQbRgjb0dPe4h7HtUYfFDqYOXBpm15v3RSGq3dp0VWFliF7Ezk8kz-1LS19SKTztw4EKQzgy20AJsrPqV2Z9dMkL4g2kvVwyP5yZGM2EZ0EeBZc" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-[10px] font-label font-bold tracking-widest text-primary-fixed uppercase mb-2">Thriller</span>
                      <h4 className="text-2xl font-headline font-bold text-white leading-tight">The Tide Keeper</h4>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-start">
                  <div>
                    <h5 className="font-label font-bold text-on-surface text-sm">The Tide Keeper</h5>
                    <p className="text-[11px] text-on-surface-variant/70 font-medium">Last edited 1 month ago</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-tertiary-container/20 text-tertiary uppercase tracking-tighter">Draft</span>
                </div>
              </div>
            </div>
          </section>
          {/* Ink-Well Action Chip (Contextual FAB) */}
          <button className="fixed bottom-12 right-12 w-16 h-16 rounded-full bg-tertiary text-on-tertiary shadow-2xl shadow-tertiary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
            <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-12" style={{ fontVariationSettings: "'FILL' 1" }}>ink_pen</span>
            <span className="absolute right-20 bg-tertiary text-on-tertiary px-4 py-2 rounded-lg text-sm font-label font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Ask the Muse AI</span>
          </button>
        </div>
        {/* Footer Info */}
        <footer className="px-12 py-12 border-t border-outline-variant/10 mt-16 flex justify-between items-center opacity-60">
          <p className="font-label text-xs">Bibliotheca AI © 2024. Crafted for storytellers.</p>
          <div className="flex space-x-6">
            <a className="text-xs font-label hover:text-primary transition-colors" href="#">Documentation</a>
            <a className="text-xs font-label hover:text-primary transition-colors" href="#">Privacy Policy</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
