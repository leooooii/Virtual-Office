import React, { useState } from 'react';
import { useCursor } from '@react-three/drei';

export const Chair: React.FC = () => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  // Materials
  const leather = "#854d0e"; // Saddle Brown
  const metal = "#333"; // Dark Metal
  const plastic = "#111";

  return (
    <group 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
    >
        {/* 1. THE BASE (Wheels & Star) */}
        {/* Center hub at y=4 */}
        <group position={[0, 0, 0]}>
            <mesh position={[0, 6, 0]}>
                <cylinderGeometry args={[4, 4, 4]} />
                <meshStandardMaterial color={plastic} />
            </mesh>

            {/* 5 Legs */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
                <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
                    {/* Leg Arm */}
                    <mesh position={[0, 5, 12]} rotation={[0.2, 0, 0]}>
                        <boxGeometry args={[3, 2, 22]} />
                        <meshStandardMaterial color={plastic} />
                    </mesh>
                    {/* Wheel */}
                    <mesh position={[0, 2, 22]} rotation={[Math.PI/2, 0, 0]}>
                        <cylinderGeometry args={[2, 2, 1.5]} />
                        <meshStandardMaterial color={metal} />
                    </mesh>
                </group>
            ))}
        </group>

        {/* 2. GAS CYLINDER */}
        <mesh position={[0, 16, 0]}>
            <cylinderGeometry args={[2.5, 2.5, 20]} />
            <meshStandardMaterial color={metal} metalness={0.6} roughness={0.3} />
        </mesh>

        {/* 3. SEAT MECHANISM (Under seat) */}
        <mesh position={[0, 26.5, 0]}>
            <boxGeometry args={[15, 3, 15]} />
            <meshStandardMaterial color={metal} />
        </mesh>

        {/* 4. SEAT CUSHION */}
        {/* Rounded rectangle box */}
        <mesh position={[0, 31, 0]} castShadow>
            <boxGeometry args={[32, 6, 30]} />
            <meshStandardMaterial color={leather} roughness={0.6} />
        </mesh>

        {/* 5. BACKREST CONNECTION (Spine) */}
        {/* Goes from Mechanism up to Backrest */}
        <group position={[0, 32, -12]}>
             <mesh position={[0, 10, -2]} rotation={[0.2, 0, 0]}>
                 <boxGeometry args={[8, 20, 2]} />
                 <meshStandardMaterial color={plastic} />
             </mesh>
        </group>

        {/* 6. BACKREST */}
        <group position={[0, 48, -16]} rotation={[0.1, 0, 0]}>
            <mesh castShadow>
                <boxGeometry args={[28, 22, 5]} />
                <meshStandardMaterial color={leather} roughness={0.6} />
            </mesh>
        </group>
        
        {/* 7. ARM RESTS (Loops) */}
        <group position={[0, 32, 0]}>
            {/* Left */}
            <mesh position={[-18, 5, 0]}>
                <boxGeometry args={[2, 8, 16]} />
                <meshStandardMaterial color={plastic} />
            </mesh>
             {/* Right */}
            <mesh position={[18, 5, 0]}>
                <boxGeometry args={[2, 8, 16]} />
                <meshStandardMaterial color={plastic} />
            </mesh>
        </group>

    </group>
  );
};