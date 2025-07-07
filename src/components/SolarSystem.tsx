
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useSolarSystem } from '../contexts/SolarSystemContext';
import * as THREE from 'three';

const Sun: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#FDB813" />
      <pointLight position={[0, 0, 0]} intensity={2} distance={100} />
    </mesh>
  );
};

interface PlanetProps {
  planet: {
    name: string;
    size: number;
    distance: number;
    speed: number;
    color: string;
    description: string;
  };
  index: number;
}

const Planet: React.FC<PlanetProps> = ({ planet, index }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { isPaused, setSelectedPlanet } = useSolarSystem();

  useFrame((state) => {
    if (!isPaused && groupRef.current && meshRef.current) {
      // Orbital movement
      groupRef.current.rotation.y += planet.speed * 0.01;
      
      // Planet rotation
      meshRef.current.rotation.y += 0.02;
    }
  });

  const handleClick = () => {
    setSelectedPlanet(index);
    console.log(`Selected ${planet.name}: ${planet.description}`);
  };

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        position={[planet.distance, 0, 0]}
        onClick={handleClick}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <sphereGeometry args={[planet.size, 16, 16]} />
        <meshStandardMaterial color={planet.color} />
      </mesh>
      
      {/* Orbital path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.distance - 0.05, planet.distance + 0.05, 64]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

const SolarSystem: React.FC = () => {
  const { planets } = useSolarSystem();

  return (
    <Canvas
      camera={{ position: [0, 10, 20], fov: 75 }}
      style={{ background: 'radial-gradient(circle, #000011 0%, #000000 100%)' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />
      
      {/* Background stars */}
      <Stars radius={200} depth={50} count={2000} factor={4} saturation={0} fade />
      
      {/* Sun */}
      <Sun />
      
      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet key={planet.name} planet={planet} index={index} />
      ))}
      
      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.5}
        panSpeed={0.5}
        rotateSpeed={0.3}
      />
    </Canvas>
  );
};

export default SolarSystem;
