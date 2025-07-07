
import React from 'react';
import SolarSystem from '../components/SolarSystem';
import ControlPanel from '../components/ControlPanel';
import { SolarSystemProvider } from '../contexts/SolarSystemContext';

const Index = () => {
  return (
    <SolarSystemProvider>
      <div className="min-h-screen bg-black overflow-hidden relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Interactive Solar System
          </h1>
          <p className="text-gray-300 text-center text-sm">
            Explore the planets and adjust their orbital speeds
          </p>
        </div>

        {/* 3D Solar System */}
        <div className="w-full h-screen">
          <SolarSystem />
        </div>

        {/* Control Panel */}
        <ControlPanel />
      </div>
    </SolarSystemProvider>
  );
};

export default Index;
