import React, { useState } from 'react';
import { useCursor } from '@react-three/drei';

export const Desk: React.FC = () => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  // Updated Materials
  const topColor = "#3f3f46"; // Darker Grey Zinc-700
  const bodyColor = "#e4e4e7"; // Lighter Zinc-200
  const handleColor = "#71717a";

  // New Larger Dimensions
  const WIDTH = 200;
  const DEPTH = 90;
  const HEIGHT = 75;
  const TOP_THICKNESS = 4;
  const LEG_WIDTH = 6;

  return (
    <group 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
    >
      {/* 1. Desktop Surface */}
      <mesh position={[0, HEIGHT - TOP_THICKNESS/2, 0]} castShadow receiveShadow>
        <boxGeometry args={[WIDTH, TOP_THICKNESS, DEPTH]} />
        <meshStandardMaterial color={topColor} roughness={0.6} />
      </mesh>
      
      {/* 2. Left Cabinet (Drawers) */}
      <group position={[-WIDTH/2 + 25, (HEIGHT - TOP_THICKNESS)/2, 0]}>
          {/* Main Box */}
          <mesh castShadow receiveShadow>
              <boxGeometry args={[45, HEIGHT - TOP_THICKNESS, DEPTH - 10]} />
              <meshStandardMaterial color={bodyColor} />
          </mesh>

          {/* Drawer Fronts - Slight offset Z to prevent clipping */}
          <group position={[0, 0, (DEPTH - 10)/2 + 0.5]}>
               {[18, 0, -18].map((yPos, i) => (
                 <group key={i} position={[0, yPos, 0]}>
                    <mesh castShadow>
                      <boxGeometry args={[40, 15, 1.5]} />
                      <meshStandardMaterial color={bodyColor} />
                    </mesh>
                    <mesh position={[0, 0, 1]}>
                      <boxGeometry args={[15, 1, 1]} />
                      <meshStandardMaterial color={handleColor} />
                    </mesh>
                 </group>
               ))}
          </group>
      </group>

      {/* 3. Right Leg (Solid Panel) */}
      <group position={[WIDTH/2 - LEG_WIDTH/2 - 10, (HEIGHT - TOP_THICKNESS)/2, 0]}>
          <mesh castShadow receiveShadow>
              <boxGeometry args={[LEG_WIDTH, HEIGHT - TOP_THICKNESS, DEPTH - 10]} />
              <meshStandardMaterial color={bodyColor} />
          </mesh>
      </group>

      {/* 4. Modesty Panel (Back) */}
      <mesh 
        position={[0, HEIGHT - 25, -DEPTH/2 + 5]} 
        castShadow
      >
          <boxGeometry args={[WIDTH - 60, 30, 2]} />
          <meshStandardMaterial color={bodyColor} />
      </mesh>

    </group>
  );
};