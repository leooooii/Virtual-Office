import React, { useState } from 'react';
import { useCursor, useTexture } from '@react-three/drei';

export const Monitor: React.FC = () => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);
  
  // Matrix / Binary Code Texture
  const screenTexture = useTexture("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop");

  const plasticColor = "#e5e5e5"; // Classic Beige
  
  // Specs - Adjusted for more CRT 4:3 look
  const CASE_W = 46;
  const CASE_H = 10;
  const CASE_D = 42;
  
  // 4:3 Aspect Ratio for monitor body
  const MON_W = 40; 
  const MON_H = 34;
  const MON_D = 38;

  return (
    <group 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
    >
      {/* 1. Desktop Case (Base) */}
      <group position={[0, CASE_H/2, 0]}>
          <mesh castShadow receiveShadow>
              <boxGeometry args={[CASE_W, CASE_H, CASE_D]} />
              <meshStandardMaterial color={plasticColor} roughness={0.6} />
          </mesh>
          
          {/* Front Details */}
          <group position={[0, 0, CASE_D/2 + 0.2]}>
              <mesh position={[12, 1.5, 0]}>
                  <boxGeometry args={[14, 0.6, 0.2]} />
                  <meshStandardMaterial color="#333" />
              </mesh>
              <mesh position={[-16, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
                   <cylinderGeometry args={[1.5, 1.5, 0.6]} />
                   <meshStandardMaterial color="#404040" />
              </mesh>
              <mesh position={[-6, -1.5, 0]}>
                  <planeGeometry args={[10, 0.3]} />
                  <meshStandardMaterial color="#a8a29e" />
              </mesh>
          </group>
      </group>

      {/* 2. CRT Monitor (Stacked) */}
      <group position={[0, CASE_H, 0]}>
          {/* Swivel */}
          <mesh position={[0, 1.5, 0]} castShadow>
              <cylinderGeometry args={[14, 16, 3]} />
              <meshStandardMaterial color={plasticColor} />
          </mesh>

          {/* Main Box */}
          <group position={[0, 1.5 + MON_H/2, 0]}>
              <mesh castShadow receiveShadow>
                  <boxGeometry args={[MON_W, MON_H, MON_D]} />
                  <meshStandardMaterial color={plasticColor} />
              </mesh>
              
              {/* Tapered Back */}
              <mesh position={[0, 0, -MON_D/2 - 6]} castShadow>
                  <boxGeometry args={[MON_W - 8, MON_H - 12, 12]} />
                  <meshStandardMaterial color={plasticColor} />
              </mesh>

              {/* Screen Inset */}
              <group position={[0, 0, MON_D/2 + 0.1]}>
                   <mesh>
                       <boxGeometry args={[MON_W - 4, MON_H - 4, 1]} />
                       <meshStandardMaterial color="#d4d4d8" />
                   </mesh>
                   
                   {/* Lit Screen */}
                   <mesh position={[0, 0, 0.6]}>
                       <planeGeometry args={[MON_W - 8, MON_H - 8]} />
                       <meshStandardMaterial 
                            map={screenTexture} 
                            emissiveMap={screenTexture}
                            emissiveIntensity={1.5}
                            color="#fff"
                       />
                   </mesh>
              </group>
          </group>
      </group>
    </group>
  );
};