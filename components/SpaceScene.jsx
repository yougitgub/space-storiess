'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function MouseStars({ count = 2000, radius = 80 }) {
  const group = useRef();
  const geometryRef = useRef();
  const positions = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // build positions once
  useEffect(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // distribute points inside a spherical shell for nicer spread
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = radius * (0.5 + Math.random() * 0.5);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    positions.current = pos;
    if (geometryRef.current) {
      geometryRef.current.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    }
  }, [count, radius]);

  // track pointer movement and map to -1..1
  useEffect(() => {
    const onPointerMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  // animate group rotation/position smoothly toward mouse
  useFrame(() => {
    if (!group.current) return;
    const targetX = mouse.current.y * 0.15; // small tilt
    const targetY = mouse.current.x * 0.15;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry ref={geometryRef}>
          {/* positions will be attached in the effect */}
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.6} sizeAttenuation={true} depthWrite={false} />
      </points>
    </group>
  );
}

export default function SpaceScene() {
  return (
    <div className='fixed inset-0 z-0'>

    <Canvas style={{ height: '100vh', width: '100vw' }} >
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />

      <MouseStars count={2000} radius={80} />

      

      <OrbitControls enableZoom={false} />
    </Canvas>
    </div>
  );
}
