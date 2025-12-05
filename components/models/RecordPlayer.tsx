import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

// REPLACE THIS WITH YOUR LOCAL OR REMOTE MP3 URL
const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"; // Lo-fi chill placeholder

interface RecordPlayerProps {
    isFocus: boolean;
}

export const RecordPlayer: React.FC<RecordPlayerProps> = ({ isFocus }) => {
  const [hovered, setHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const recordRef = useRef<THREE.Group>(null);
  const armPivotRef = useRef<THREE.Group>(null);
  
  useCursor(hovered);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
        audio.pause();
        audio.currentTime = 0;
    };
  }, []);

  // Handle Play/Pause
  useEffect(() => {
      if (audioRef.current) {
          if (isPlaying) {
              audioRef.current.play().catch(e => console.log("Audio play failed (interaction required):", e));
          } else {
              audioRef.current.pause();
          }
      }
  }, [isPlaying]);

  // Animations
  useFrame((state, delta) => {
      // 1. Rotate Record
      if (isPlaying && recordRef.current) {
          recordRef.current.rotation.y -= delta * 2; // Spin speed
      }

      // 2. Move Tonearm
      if (armPivotRef.current) {
          // Target angle: -0.6 (playing) vs 0 (resting)
          const targetAngle = isPlaying ? -0.55 : 0; 
          armPivotRef.current.rotation.y = THREE.MathUtils.lerp(
              armPivotRef.current.rotation.y,
              targetAngle,
              delta * 3 // Animation speed
          );
      }
  });

  const woodColor = "#78350f"; // Walnut
  const baseColor = "#e5e5e5"; // Silver/White
  const vinylColor = "#111111"; // Black

  // Dimensions - Adjusted to normal side table height (~60cm total)
  const LEG_HEIGHT = 35; 
  const LEG_Y = LEG_HEIGHT / 2;
  const CABINET_Y = LEG_HEIGHT + 12.5; // Leg height + half cabinet height (25/2)
  const PLAYER_Y = LEG_HEIGHT + 25; // Top of cabinet

  return (
    <group>
        {/* --- THE STAND (Side Table) --- */}
        <group position={[0, 0, 0]}>
            {/* Legs */}
            <mesh position={[-20, LEG_Y, -20]}>
                <boxGeometry args={[4, LEG_HEIGHT, 4]} />
                <meshStandardMaterial color={woodColor} />
            </mesh>
            <mesh position={[20, LEG_Y, -20]}>
                <boxGeometry args={[4, LEG_HEIGHT, 4]} />
                <meshStandardMaterial color={woodColor} />
            </mesh>
            <mesh position={[-20, LEG_Y, 20]}>
                <boxGeometry args={[4, LEG_HEIGHT, 4]} />
                <meshStandardMaterial color={woodColor} />
            </mesh>
            <mesh position={[20, LEG_Y, 20]}>
                <boxGeometry args={[4, LEG_HEIGHT, 4]} />
                <meshStandardMaterial color={woodColor} />
            </mesh>
            
            {/* Cabinet Body */}
            <mesh position={[0, CABINET_Y, 0]} castShadow receiveShadow>
                <boxGeometry args={[50, 25, 50]} />
                <meshStandardMaterial color={woodColor} roughness={0.6} />
            </mesh>
            
            {/* Vinyl Storage (Slotted appearance on front) */}
            <group position={[0, CABINET_Y, 25.1]}>
                {[0, 1].map(i => (
                    <mesh key={i} position={[i === 0 ? -12 : 12, 0, 0]}>
                        <planeGeometry args={[20, 20]} />
                        <meshStandardMaterial color="#3f2e24" />
                    </mesh>
                ))}
            </group>
        </group>

        {/* --- RECORD PLAYER UNIT --- */}
        <group 
            position={[0, PLAYER_Y, 0]} 
            onPointerOver={() => setHover(true)} 
            onPointerOut={() => setHover(false)}
            onClick={(e) => { 
                e.stopPropagation(); 
                setIsPlaying(!isPlaying); 
            }}
        >
            {/* Player Base */}
            <mesh position={[0, 2, 0]} castShadow>
                <boxGeometry args={[42, 4, 36]} />
                <meshStandardMaterial color={baseColor} />
            </mesh>
            
            {/* Platter (Under Record) */}
            <mesh position={[-5, 4.2, 0]}>
                <cylinderGeometry args={[14, 14, 0.5, 32]} />
                <meshStandardMaterial color="#404040" />
            </mesh>

            {/* The Vinyl Record */}
            <group ref={recordRef} position={[-5, 4.6, 0]}>
                {/* Disc */}
                <mesh receiveShadow>
                    <cylinderGeometry args={[13.8, 13.8, 0.2, 64]} />
                    <meshStandardMaterial color={vinylColor} roughness={0.2} />
                </mesh>
                {/* Grooves effect (Ring) */}
                <mesh position={[0, 0.11, 0]} rotation={[-Math.PI/2, 0, 0]}>
                    <ringGeometry args={[5, 13, 32]} />
                    <meshStandardMaterial color="#222" opacity={0.5} transparent />
                </mesh>
                {/* Label */}
                <mesh position={[0, 0.12, 0]}>
                    <cylinderGeometry args={[4.5, 4.5, 0.1, 32]} />
                    <meshStandardMaterial color="#ef4444" /> {/* Red Label */}
                </mesh>
                 {/* Spindle hole */}
                 <mesh position={[0, 0.13, 0]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
                    <meshStandardMaterial color="#fff" /> 
                </mesh>
            </group>

            {/* Tone Arm Mechanism */}
            <group position={[15, 4, 10]}>
                {/* Arm Base */}
                <mesh position={[0, 1, 0]}>
                    <cylinderGeometry args={[2.5, 3, 2, 16]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                
                {/* Pivot Group */}
                <group ref={armPivotRef} position={[0, 2, 0]}> 
                    {/* The Arm stick */}
                    <mesh position={[-8, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                        <cylinderGeometry args={[0.4, 0.4, 18, 8]} />
                        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
                    </mesh>
                    {/* Counterweight */}
                    <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                        <cylinderGeometry args={[1.2, 1.2, 2.5, 16]} />
                        <meshStandardMaterial color="#525252" />
                    </mesh>
                    {/* Cartridge (Head) */}
                    <mesh position={[-17.5, 0, 0.5]} rotation={[0, 0.2, 0]}>
                        <boxGeometry args={[2.5, 1.2, 1.5]} />
                        <meshStandardMaterial color="#111" />
                    </mesh>
                </group>

                {/* Arm Rest */}
                <mesh position={[-3, 1.5, 2]}>
                    <cylinderGeometry args={[0.5, 0.5, 3]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            </group>

            {/* Controls */}
            <group position={[15, 4.2, -10]}>
                 <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 0.5]} />
                    <meshStandardMaterial color="#d4d4d8" />
                 </mesh>
                  <mesh position={[0, 0, 4]}>
                    <cylinderGeometry args={[1.5, 1.5, 0.5]} />
                    <meshStandardMaterial color="#d4d4d8" />
                 </mesh>
            </group>

            {/* Status Light */}
            <mesh position={[18, 4.1, 15]}>
                <sphereGeometry args={[0.6]} />
                <meshStandardMaterial 
                    color={isPlaying ? "#10b981" : "#ef4444"} 
                    emissive={isPlaying ? "#10b981" : "#ef4444"}
                    emissiveIntensity={2}
                />
            </mesh>

        </group>
    </group>
  );
};