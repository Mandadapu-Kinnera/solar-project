
import React, { useState } from 'react';
import { useSolarSystem } from '../contexts/SolarSystemContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Info, Settings } from 'lucide-react';

const ControlPanel: React.FC = () => {
  const { planets, updatePlanetSpeed, isPaused, togglePause, selectedPlanet } = useSolarSystem();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-20 bg-blue-600 hover:bg-blue-700"
        size="lg"
      >
        <Settings className="w-5 h-5 mr-2" />
        Controls
      </Button>

      {/* Control Panel */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 max-h-96 overflow-y-auto z-20 bg-gray-900 border-gray-700 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              Solar System Controls
              <Button
                onClick={togglePause}
                size="sm"
                variant={isPaused ? "default" : "secondary"}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Adjust orbital speeds and control the simulation
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Planet Speed Controls */}
            {planets.map((planet, index) => (
              <div key={planet.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: planet.color }}
                    />
                    <span className="text-sm font-medium">{planet.name}</span>
                    {selectedPlanet === index && (
                      <Badge variant="secondary" className="text-xs">
                        Selected
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {planet.speed.toFixed(1)}x
                  </span>
                </div>
                
                <Slider
                  value={[planet.speed]}
                  onValueChange={([value]) => updatePlanetSpeed(index, value)}
                  max={10}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>
            ))}

            {/* Planet Info */}
            {selectedPlanet !== null && (
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">{planets[selectedPlanet].name}</span>
                </div>
                <p className="text-sm text-gray-300">
                  {planets[selectedPlanet].description}
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
              <p>• Click on planets to select them</p>
              <p>• Drag to rotate the view</p>
              <p>• Scroll to zoom in/out</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ControlPanel;
