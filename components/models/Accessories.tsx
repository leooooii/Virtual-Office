import React from 'react';

export const Accessories: React.FC = () => {
  return (
    <group> 
      {/* 1. DOCUMENT TRAYS (Stacked) */}
      <group position={[-10, 0, 0]}>
         <Tray y={0} />
         <Tray y={6} />
         
         {/* Paper Sheets */}
         <mesh position={[0, 0.5, 0]} rotation={[0, 0.05, 0]}>
             <boxGeometry args={[22, 0.8, 30]} />
             <meshStandardMaterial color="#fff" />
         </mesh>
         <mesh position={[0, 6.5, 0]} rotation={[0, -0.05, 0]}>
             <boxGeometry args={[22, 1.2, 30]} />
             <meshStandardMaterial color="#fff" />
         </mesh>
      </group>

      {/* 2. BINDERS (Standing upright) */}
      <group position={[25, 0, -10]} rotation={[0, -0.2, 0]}>
          <Binder x={0} color="#78350f" /> {/* Brown */}
          <Binder x={7} color="#0f172a" /> {/* Black */}
          <Binder x={14} color="#7f1d1d" /> {/* Red */}
      </group>

      {/* 3. MUG */}
      <group position={[35, 0, 20]}>
          <mesh position={[0, 4, 0]} castShadow>
              <cylinderGeometry args={[3.5, 3.5, 8, 32]} />
              <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          <mesh position={[0, 7.5, 0]} rotation={[-Math.PI/2, 0, 0]}>
              <circleGeometry args={[3]} />
              <meshStandardMaterial color="#3f2e24" />
          </mesh>
          <mesh position={[3.5, 4, 0]} rotation={[0, 0, Math.PI/2]}>
              <torusGeometry args={[2, 0.5, 12, 24, Math.PI]} />
              <meshStandardMaterial color="#f5f5f5" />
          </mesh>
      </group>
    </group>
  );
};

const Tray: React.FC<{y: number}> = ({ y }) => {
    return (
        <group position={[0, y, 0]}>
            {/* Bottom */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
                <boxGeometry args={[26, 0.5, 34]} />
                <meshStandardMaterial color="#a8a29e" />
            </mesh>
            {/* Sides */}
            <mesh position={[-12.5, 2.5, 0]} castShadow>
                <boxGeometry args={[1, 5, 34]} />
                <meshStandardMaterial color="#a8a29e" />
            </mesh>
             <mesh position={[12.5, 2.5, 0]} castShadow>
                <boxGeometry args={[1, 5, 34]} />
                <meshStandardMaterial color="#a8a29e" />
            </mesh>
             <mesh position={[0, 2.5, -16.5]} castShadow>
                <boxGeometry args={[26, 5, 1]} />
                <meshStandardMaterial color="#a8a29e" />
            </mesh>
        </group>
    )
}

const Binder: React.FC<{x: number, color: string}> = ({ x, color }) => {
    return (
        <group position={[x, 15, 0]}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[6, 30, 24]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            <mesh position={[0, 5, 12.1]}>
                <boxGeometry args={[4, 8, 0.1]} />
                <meshStandardMaterial color="#fff" />
            </mesh>
        </group>
    )
}