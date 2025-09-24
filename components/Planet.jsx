// components/Planet.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';

function Planet({ 
  name, 
  modelPath, 
  position, 
  scale = 1, 
  rotationSpeed = 1, 
  orbitSpeed = 1,
  orbitRadius = 0,
  showLabel = false 
}) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const { scene } = useGLTF(modelPath);

  useFrame((state, delta) => {
    if (planetRef.current) {
      // Rotate planet around its own axis
      planetRef.current.rotation.y += delta * rotationSpeed;
      
      // Orbital motion
      if (orbitRadius > 0) {
        orbitRef.current.rotation.y += delta * orbitSpeed;
        planetRef.current.position.x = Math.cos(orbitRef.current.rotation.y) * orbitRadius;
        planetRef.current.position.z = Math.sin(orbitRef.current.rotation.y) * orbitRadius;
      }
    }
  });

  return (
    <group position={position}>
      <group ref={orbitRef}>
        <primitive 
          ref={planetRef} 
          object={scene} 
          scale={scale}
        />
      </group>
      {showLabel && (
        <Text
          position={[0, scale * 2, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}
    </group>
  );
}

export default Planet;