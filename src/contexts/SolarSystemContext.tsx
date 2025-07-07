
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Planet {
  name: string;
  size: number;
  distance: number;
  speed: number;
  color: string;
  description: string;
}

interface SolarSystemContextType {
  planets: Planet[];
  updatePlanetSpeed: (index: number, speed: number) => void;
  isPaused: boolean;
  togglePause: () => void;
  selectedPlanet: number | null;
  setSelectedPlanet: (index: number | null) => void;
}

const SolarSystemContext = createContext<SolarSystemContextType | undefined>(undefined);

export const useSolarSystem = () => {
  const context = useContext(SolarSystemContext);
  if (!context) {
    throw new Error('useSolarSystem must be used within a SolarSystemProvider');
  }
  return context;
};

const initialPlanets: Planet[] = [
  { name: 'Mercury', size: 0.3, distance: 4, speed: 4.7, color: '#8C7853', description: 'Closest planet to the Sun' },
  { name: 'Venus', size: 0.4, distance: 5.5, speed: 3.5, color: '#FFC649', description: 'Hottest planet in the solar system' },
  { name: 'Earth', size: 0.5, distance: 7, speed: 3.0, color: '#6B93D6', description: 'Our home planet' },
  { name: 'Mars', size: 0.4, distance: 8.5, speed: 2.4, color: '#CD5C5C', description: 'The Red Planet' },
  { name: 'Jupiter', size: 1.2, distance: 12, speed: 1.3, color: '#D8CA9D', description: 'Largest planet in the solar system' },
  { name: 'Saturn', size: 1.0, distance: 15, speed: 0.9, color: '#FAD5A5', description: 'Famous for its rings' },
  { name: 'Uranus', size: 0.8, distance: 18, speed: 0.7, color: '#4FD0E3', description: 'Ice giant tilted on its side' },
  { name: 'Neptune', size: 0.8, distance: 21, speed: 0.5, color: '#4B70DD', description: 'Windiest planet' }
];

export const SolarSystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [planets, setPlanets] = useState<Planet[]>(initialPlanets);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);

  const updatePlanetSpeed = (index: number, speed: number) => {
    setPlanets(prev => prev.map((planet, i) => 
      i === index ? { ...planet, speed } : planet
    ));
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <SolarSystemContext.Provider value={{
      planets,
      updatePlanetSpeed,
      isPaused,
      togglePause,
      selectedPlanet,
      setSelectedPlanet
    }}>
      {children}
    </SolarSystemContext.Provider>
  );
};
