import React from 'react';

export const Keyboard: React.FC = () => {
  const beige = "#dedbd2";
  const keyColor = "#eceae4";
  const darkGrey = "#57534e";

  // Helper to create key rows
  const KeyRow = ({ count, width, z }: {count: number, width: number, z: number}) => (
    <group position={[0, 0, z]}>
      {Array.from({ length: count }).map((_, i) => {
        const spacing = width + 0.4;
        const x = (i - (count - 1) / 2) * spacing;
        return (
          <mesh key={i} position={[x, 0, 0]} castShadow receiveShadow>
             <boxGeometry args={[width, 0.6, 2.4]} />
             <meshStandardMaterial color={keyColor} />
          </mesh>
        );
      })}
    </group>
  );

  return (
    <group>
        {/* --- KEYBOARD --- */}
        <group rotation={[0.1, 0, 0]}> 
            {/* Chassis */}
            <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
                <boxGeometry args={[48, 1.6, 20]} />
                <meshStandardMaterial color={beige} />
            </mesh>
            
            {/* Key Bed (Darker inset) */}
            <mesh position={[0, 1.7, -1]} receiveShadow>
                 <boxGeometry args={[44, 0.2, 16]} />
                 <meshStandardMaterial color="#a8a29e" />
            </mesh>

            {/* Individual Keys */}
            <group position={[0, 2.0, 0]}>
                <KeyRow count={12} width={2.6} z={-5} /> {/* F Keys */}
                <KeyRow count={12} width={2.6} z={-2} /> {/* Numbers */}
                <KeyRow count={11} width={2.8} z={1} />  {/* QWERTY */}
                <KeyRow count={10} width={3.0} z={4} />  {/* ASDF */}
                {/* Spacebar Row */}
                <mesh position={[0, 0, 7]} castShadow>
                    <boxGeometry args={[20, 0.6, 2.4]} />
                    <meshStandardMaterial color={keyColor} />
                </mesh>
            </group>

            {/* Cable */}
            <mesh position={[0, 0.5, -10]} rotation={[Math.PI/2, 0, 0]}>
                <cylinderGeometry args={[0.25, 0.25, 8]} />
                <meshStandardMaterial color={darkGrey} />
            </mesh>
        </group>

        {/* --- MOUSE --- */}
        <group position={[35, 0, 5]} rotation={[0, -0.3, 0]}>
             <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                 <boxGeometry args={[8, 3, 12]} />
                 <meshStandardMaterial color={beige} />
             </mesh>
             {/* Left Button */}
             <mesh position={[-2, 3.1, -2]}>
                 <boxGeometry args={[3.5, 0.2, 5]} />
                 <meshStandardMaterial color={keyColor} />
             </mesh>
             {/* Right Button */}
             <mesh position={[2, 3.1, -2]}>
                 <boxGeometry args={[3.5, 0.2, 5]} />
                 <meshStandardMaterial color={keyColor} />
             </mesh>
             {/* Cable */}
             <mesh position={[0, 0.2, -6]} rotation={[Math.PI/2, 0, 0]}>
                 <cylinderGeometry args={[0.15, 0.15, 8]} />
                 <meshStandardMaterial color={darkGrey} />
             </mesh>
        </group>
    </group>
  );
};