import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  ContactShadows,
  SoftShadows,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import { Desk } from './models/Desk';
import { Monitor } from './models/Monitor';
import { Keyboard } from './models/Keyboard';
import { Accessories } from './models/Accessories';
import { Chair } from './models/Chair';
import { Lamp } from './models/Lamp';
import { RecordPlayer } from './models/RecordPlayer';

interface SceneProps {
  onFocusChange: (name: string) => void;
  isFreeView: boolean;
  setIsFreeView: (v: boolean) => void;
}

const CameraRig = ({ 
    targetPosition, 
    targetLookAt, 
    active 
}: { 
    targetPosition: THREE.Vector3, 
    targetLookAt: THREE.Vector3, 
    active: boolean 
}) => {
    useFrame((state) => {
        if (!active) return;
        state.camera.position.lerp(targetPosition, 0.05);
        const controls = state.controls as any;
        if (controls) {
            controls.target.lerp(targetLookAt, 0.05);
            controls.update();
        }
    });
    return null;
};

export const Scene: React.FC<SceneProps> = ({ onFocusChange, isFreeView, setIsFreeView }) => {
  // Overview: Higher angle (Y=110) to see layout better
  const [view, setView] = useState({
      pos: new THREE.Vector3(0, 110, 180), 
      target: new THREE.Vector3(0, 40, 0),
      name: "Overview"
  });
  
  const [lampOn, setLampOn] = useState(true);

  const handleFocus = (name: string, pos: [number, number, number], lookAt: [number, number, number]) => {
      setIsFreeView(false); 
      setView({
          pos: new THREE.Vector3(...pos),
          target: new THREE.Vector3(...lookAt),
          name: name
      });
      onFocusChange(name);
  };

  const resetView = (e: any) => {
      e.stopPropagation();
      handleFocus("Overview", [0, 110, 180], [0, 40, 0]);
  };

  const DESK_HEIGHT = 75;

  return (
    <>
      <CameraRig 
        targetPosition={view.pos} 
        targetLookAt={view.target} 
        active={!isFreeView} 
      />
      
      <OrbitControls 
        makeDefault
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 1.9} 
        minDistance={20}
        maxDistance={300}
        enablePan={isFreeView} 
        enableZoom={true}
        enableRotate={true}
        enableDamping={isFreeView} 
      />

      {/* --- LIGHTING --- */}
      <color attach="background" args={['#d4d4d8']} />
      <fog attach="fog" args={['#d4d4d8', 50, 500]} />

      <ambientLight intensity={0.4} color="#ffffff" />
      
      <directionalLight 
        position={[80, 120, 100]} 
        intensity={0.8} 
        color="#ffffb3" 
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize={[2048, 2048]}
      >
        <orthographicCamera attach="shadow-camera" args={[-200, 200, 200, -200]} />
      </directionalLight>

      <directionalLight position={[-100, 60, -60]} intensity={0.3} color="#eef" />

      {/* Lamp SpotLight */}
      {lampOn && (
        <spotLight
            position={[75, DESK_HEIGHT + 45, 0]} 
            target-position={[0, DESK_HEIGHT, 10]}
            intensity={1200}
            angle={0.7}
            penumbra={0.4}
            distance={120}
            decay={1.5}
            color="#ffecb3"
            castShadow
        />
      )}

      {/* Contact Shadows slightly raised to sit on carpet */}
      <ContactShadows position={[0, 0.6, 0]} opacity={0.6} scale={400} blur={2.5} far={10} color="#1a1a1a" />
      <SoftShadows size={25} samples={12} focus={0.5} />

      {/* --- OBJECTS --- */}
      <group position={[0, 0, 0]}>
        
        {/* CARPET - Widened and shifted left */}
        <mesh position={[-20, 0.25, 50]} receiveShadow>
            <boxGeometry args={[360, 0.5, 200]} />
            <meshStandardMaterial color="#334155" roughness={0.9} />
        </mesh>

        {/* DESK */}
        <group onClick={(e) => { e.stopPropagation(); handleFocus("Desk", [0, 130, 90], [0, DESK_HEIGHT, 0]); }}>
            <Desk />
        </group>

        {/* CHAIR */}
        <group 
            position={[45, 0, 75]} 
            rotation={[0, -0.4, 0]}
            scale={1.3} 
            onClick={(e) => { e.stopPropagation(); handleFocus("Chair", [90, 70, 110], [45, 45, 75]); }}
        >
            <Chair />
        </group>
        
        {/* SIDE TABLE & RECORD PLAYER */}
        <group 
            position={[-140, 0, 20]} 
            rotation={[0, 0.4, 0]}
            onClick={(e) => { 
                e.stopPropagation(); 
                // Zoom in on the record player top view (Adjusted for standard side-table height ~60)
                handleFocus("Record Player", [-140, 100, 40], [-140, 60, 20]); 
            }}
        >
            <RecordPlayer isFocus={view.name === "Record Player"} />
        </group>

        {/* --- DESKTOP ITEMS --- */}
        <group position={[0, DESK_HEIGHT, 0]}>
             
             {/* ACCESSORIES */}
             <group 
                position={[-75, 0, -5]} 
                rotation={[0, 0.1, 0]}
                onClick={(e) => { e.stopPropagation(); handleFocus("Accessories", [-75, DESK_HEIGHT + 45, 35], [-75, DESK_HEIGHT + 10, -5]); }}
             >
                <Accessories />
             </group>

             {/* MONITOR */}
             <group 
                position={[0, 0, -15]} 
                onClick={(e) => { 
                    e.stopPropagation(); 
                    // Adjusted to be closer and eye-level with the screen
                    handleFocus("Computer", [0, 103, 60], [0, 103, -15]); 
                }}
             >
                 <Monitor />
             </group>
             
             {/* KEYBOARD */}
             <group 
                position={[0, 0, 28]} 
                onClick={(e) => { e.stopPropagation(); handleFocus("Keyboard", [0, DESK_HEIGHT + 35, 45], [0, DESK_HEIGHT, 28]); }}
             >
                 <Keyboard />
             </group>

             {/* LAMP */}
             <group 
                position={[75, 0, -5]} 
                rotation={[0, -0.4, 0]}
                onClick={(e) => { e.stopPropagation(); handleFocus("Lamp", [85, DESK_HEIGHT + 40, 30], [75, DESK_HEIGHT + 15, -5]); }}
             >
                <Lamp isOn={lampOn} toggle={() => setLampOn(!lampOn)} />
             </group>
        </group>

        {/* PLANT */}
        <group 
            position={[130, 0, -50]} 
            rotation={[0, -0.2, 0]}
            scale={1.4}
            onClick={(e) => { 
                e.stopPropagation(); 
                // Adjusted for a better angle showing the whole plant
                handleFocus("Plant", [170, 60, 0], [130, 40, -50]); 
            }}
        >
             {/* Modern Ceramic Pot */}
            <mesh position={[0, 12, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[12, 10, 24, 32]} />
                <meshStandardMaterial color="#fafafa" roughness={0.2} /> 
            </mesh>
            {/* Soil */}
            <mesh position={[0, 22, 0]} rotation={[-Math.PI/2, 0, 0]}>
                <circleGeometry args={[11]} />
                <meshStandardMaterial color="#1a1a1a" /> 
            </mesh>
            
            {/* Leaves */}
            <group position={[0, 22, 0]}>
                 <mesh position={[0, 25, 0]}>
                     <cylinderGeometry args={[1.5, 2, 50]} />
                     <meshStandardMaterial color="#4d3528" />
                 </mesh>
                 {[
                    { y: 10, r: 0, s: 1 },
                    { y: 20, r: 2, s: 1.1 },
                    { y: 30, r: 4, s: 0.9 },
                    { y: 38, r: 1, s: 0.8 },
                    { y: 45, r: 3, s: 0.7 },
                 ].map((leaf, i) => (
                    <group key={i} position={[0, leaf.y, 0]} rotation={[0, leaf.r, 0.5]}>
                        <mesh position={[8, 0, 0]} rotation={[0, 0, -0.2]} castShadow receiveShadow>
                            <sphereGeometry args={[8 * leaf.s, 32, 16]} />
                            <meshStandardMaterial 
                                color="#1e3a8a" 
                                emissive="#064e3b"
                                emissiveIntensity={0.2}
                                roughness={0.3}
                            />
                        </mesh>
                        <mesh position={[4, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                            <cylinderGeometry args={[0.3, 0.5, 8]} />
                            <meshStandardMaterial color="#4d3528" />
                        </mesh>
                    </group>
                 ))}
            </group>
        </group>
        
        {/* Reset Trigger Floor */}
        <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.1, 0]} onClick={resetView}>
            <planeGeometry args={[1000, 1000]} />
            <meshBasicMaterial visible={false} />
        </mesh>

      </group>
    </>
  );
};