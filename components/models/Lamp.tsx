import React, { useState } from 'react';
import { useCursor } from '@react-three/drei';

interface LampProps {
  isOn: boolean;
  toggle: () => void;
}

export const Lamp: React.FC<LampProps> = ({ isOn, toggle }) => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const metalColor = "#475569"; // Slate
  const shadeColor = "#334155"; // Darker

  return (
    <group 
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
      onClick={(e) => { e.stopPropagation(); toggle(); }}
    >
      {/* Heavy Base */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[9, 10, 3, 32]} />
        <meshStandardMaterial color={metalColor} />
      </mesh>
      
      {/* Switch */}
      <mesh position={[0, 3, 5]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[2, 1, 3]} />
          <meshStandardMaterial color={isOn ? "#22c55e" : "#94a3b8"} />
      </mesh>

      {/* Arm Structure */}
      <group position={[0, 3, 0]}>
          {/* Lower Pivot */}
          <mesh rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[2, 2, 6]} />
              <meshStandardMaterial color="#cbd5e1" />
          </mesh>

          {/* Lower Arms (Parallel bars style) */}
          <group rotation={[0.4, 0, 0]}> {/* Lean forward 23 deg */}
              <mesh position={[-1.5, 12, 0]}>
                 <cylinderGeometry args={[0.6, 0.6, 24]} />
                 <meshStandardMaterial color={metalColor} />
              </mesh>
              <mesh position={[1.5, 12, 0]}>
                 <cylinderGeometry args={[0.6, 0.6, 24]} />
                 <meshStandardMaterial color={metalColor} />
              </mesh>
              
              {/* Middle Pivot */}
              <group position={[0, 24, 0]}>
                  <mesh rotation={[0, 0, Math.PI/2]}>
                      <cylinderGeometry args={[2, 2, 6]} />
                      <meshStandardMaterial color="#cbd5e1" />
                  </mesh>

                  {/* Upper Arm */}
                  <group rotation={[1.2, 0, 0]}> {/* Angle down relative to lower arm */}
                       <mesh position={[0, 10, 0]}>
                           <cylinderGeometry args={[0.8, 0.8, 20]} />
                           <meshStandardMaterial color={metalColor} />
                       </mesh>

                       {/* Head Pivot */}
                       <group position={[0, 20, 0]} rotation={[-1.6, 0, 0]}> {/* Point down */}
                           <mesh rotation={[0, 0, Math.PI/2]}>
                               <cylinderGeometry args={[1.5, 1.5, 4]} />
                               <meshStandardMaterial color="#cbd5e1" />
                           </mesh>
                           
                           {/* Lamp Head */}
                           <group position={[0, 4, 0]}>
                                <mesh castShadow>
                                    <cylinderGeometry args={[4, 8, 10, 32, 1, true]} />
                                    <meshStandardMaterial color={shadeColor} side={2} />
                                </mesh>
                                {/* Bulb Cap */}
                                <mesh position={[0, 5, 0]}>
                                    <sphereGeometry args={[4, 32, 16, 0, Math.PI*2, 0, Math.PI/2]} />
                                    <meshStandardMaterial color={shadeColor} />
                                </mesh>
                                {/* Glowing Bulb */}
                                <mesh position={[0, 0, 0]}>
                                    <sphereGeometry args={[3]} />
                                    <meshStandardMaterial 
                                        color="#fff"
                                        emissive="#ffecb3"
                                        emissiveIntensity={isOn ? 4 : 0}
                                    />
                                </mesh>
                           </group>
                       </group>
                  </group>
              </group>
          </group>
      </group>
    </group>
  );
};