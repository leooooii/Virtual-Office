import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Overview");
  const [isFreeView, setIsFreeView] = useState(false);

  return (
    <div className="relative w-full h-full font-sans text-gray-800 selection:bg-cyan-200">
      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1" style={{ fontFamily: '"Times New Roman", serif' }}>
          LEO OFFICE
        </h1>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">
          Digital Workspace
        </p>
        
        <div className="flex flex-col gap-3 pointer-events-auto">
          {/* Status Panel */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-5 shadow-sm border border-gray-200 w-64 transition-all">
            <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Focus</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide border ${isFreeView ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                    {isFreeView ? 'Free Roam' : 'Locked'}
                </span>
            </div>
            <p className="text-2xl font-serif italic text-gray-900 mb-1">
              {activeItem}
            </p>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              {isFreeView 
                ? "Pan to explore. Scroll to zoom. Select an object to focus." 
                : "Camera locked. Click background to return to Overview."}
            </p>

            {/* Artistic Interactive Hints */}
            <div className="mt-6 pt-5 border-t border-gray-200/60">
                <p className="text-[10px] font-serif italic text-gray-400 mb-3">Interactions</p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 group cursor-pointer transition-opacity opacity-70 hover:opacity-100">
                        <span className="w-6 h-[1px] bg-gray-400 group-hover:bg-gray-800 transition-colors"></span>
                        <span className="text-xs font-serif text-gray-700">Toggle Desk Lamp</span>
                    </li>
                    <li className="flex items-center gap-3 group cursor-pointer transition-opacity opacity-70 hover:opacity-100">
                         <span className="w-6 h-[1px] bg-gray-400 group-hover:bg-gray-800 transition-colors"></span>
                        <span className="text-xs font-serif text-gray-700">Play Vinyl Record</span>
                    </li>
                </ul>
            </div>
          </div>

          {/* Controls */}
          <button 
            onClick={() => setIsFreeView(!isFreeView)}
            className="group bg-gray-900 text-white text-xs font-serif italic tracking-wide py-3 px-5 rounded-lg shadow-lg hover:bg-black transition-all text-left flex items-center justify-between"
          >
            <span>{isFreeView ? "Reset Camera" : "Free View"}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas
        shadows
        dpr={[1, 2]}
        className="w-full h-full bg-[#e0e0e0]"
      >
        <Suspense fallback={null}>
            <Scene 
                onFocusChange={setActiveItem} 
                isFreeView={isFreeView} 
                setIsFreeView={setIsFreeView} 
            />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;