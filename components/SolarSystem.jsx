// pages/index.js
"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function SolarSystem() {
  const mountRef = useRef(null);
  // Increase defaults so planets move faster; you can still tweak via state if you add UI later
  const [orbitSpeed, setOrbitSpeed] = useState(4.5);
  const [rotationSpeed, setRotationSpeed] = useState(4.0);
  const [showOrbits, setShowOrbits] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // Fixed top-down camera
  camera.position.set(0, 80, 0);
  camera.lookAt(0, 0, 0);
    
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Improve color and lighting for GLTF PBR materials
  try {
    if (typeof THREE['sRGBEncoding'] !== 'undefined') renderer.outputEncoding = THREE['sRGBEncoding'];
    if (typeof THREE['ACESFilmicToneMapping'] !== 'undefined') renderer.toneMapping = THREE['ACESFilmicToneMapping'];
    renderer.toneMappingExposure = 1.0;
    renderer.physicallyCorrectLights = true;
  } catch (e) {
    // ignore in older three.js versions
  }
  mountRef.current.appendChild(renderer.domElement);
    
  // Camera is fixed at the top; no orbit controls.
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
  const centerLight = new THREE.PointLight(0x444444, 0.5, 100);
  scene.add(centerLight);

  // Directional light from above to better illuminate models in top-down camera
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
  dirLight.position.set(0, 100, 50);
  dirLight.castShadow = false;
  scene.add(dirLight);
  // Hemisphere light helps PBR materials look correct under ambient lighting
  const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 0.6);
  hemi.position.set(0, 50, 0);
  scene.add(hemi);
    
    // Add stars background
    const addStars = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.1,
        sizeAttenuation: true
      });
      
      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
      }
      
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
    };
    
    addStars();
    
    // Planet data - Only 4 planets with larger sizes
    const planets = [
      { 
        name: 'Earth', 
        radius: 2.5,  // Larger size
        distance: 15, 
        color: 0x6b93d6, 
        orbitSpeed: 0.005, 
        rotationSpeed: 0.015,
        texture: null
      },
      { 
        name: 'Mars', 
        radius: 2.2,  // Larger size
        distance: 25, 
        color: 0xc1440e, 
        orbitSpeed: 0.004, 
        rotationSpeed: 0.014,
        texture: null
      },
      { 
        name: 'Jupiter', 
        radius: 4.0,  // Larger size
        distance: 40, 
        color: 0xd8ca9d, 
        orbitSpeed: 0.002, 
        rotationSpeed: 0.025,
        texture: null
      },
      { 
        name: 'Saturn', 
        radius: 3.5,  // Larger size
        distance: 55, 
        color: 0xe3cfab, 
        orbitSpeed: 0.0015, 
        rotationSpeed: 0.02,
        texture: null,
        hasRing: true 
      }
    ];
    
  // Create planets and orbits — try loading models from public/models/*.glb
    const planetMeshes = [];
    const orbitLines = [];
    const loader = new GLTFLoader();

  // Simple on-screen status overlay to show per-model load status (helps debug)
  const statusOverlay = document.createElement('div');
  statusOverlay.style.position = 'absolute';
  statusOverlay.style.top = '12px';
  statusOverlay.style.right = '12px';
  statusOverlay.style.padding = '8px 12px';
  statusOverlay.style.background = 'rgba(0,0,0,0.5)';
  statusOverlay.style.color = 'white';
  statusOverlay.style.fontSize = '12px';
  statusOverlay.style.borderRadius = '8px';
  statusOverlay.style.zIndex = '9999';
  statusOverlay.style.maxWidth = '200px';
  statusOverlay.innerHTML = '<strong>Model status</strong><br/>';
  mountRef.current.style.position = 'relative';
  mountRef.current.appendChild(statusOverlay);

  // Container for labels that follow planets
  const labelContainer = document.createElement('div');
  labelContainer.style.position = 'absolute';
  labelContainer.style.left = '0';
  labelContainer.style.top = '0';
  labelContainer.style.pointerEvents = 'none';
  mountRef.current.appendChild(labelContainer);

  const trails = []; // store trail data per planet
  const nowStart = performance.now();
  planets.forEach(planet => {
      // Orbit line
      const orbitGeometry = new THREE.RingGeometry(planet.distance - 0.1, planet.distance + 0.1, 64);
      const orbitMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4444ff, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);
      orbitLines.push(orbit);

      // Use a group as the planet container so we can swap in a model when loaded
      const planetGroup = new THREE.Group();

      // Random starting position on orbit
      const startAngle = Math.random() * Math.PI * 2;
      planetGroup.position.x = Math.cos(startAngle) * planet.distance;
      planetGroup.position.z = Math.sin(startAngle) * planet.distance;
      // Randomized motion params for less uniform orbits
      const radialJitterAmp = (Math.random() * 0.6 - 0.3) * Math.max(0.5, planet.radius);
      const radialJitterFreq = 0.2 + Math.random() * 0.8;
      const verticalAmp = Math.max(0.2, planet.radius * (0.1 + Math.random() * 0.5));
      const verticalFreq = 0.2 + Math.random() * 0.8;
      const phase = Math.random() * Math.PI * 2;

      planetGroup.userData = {
        ...planet,
        angle: startAngle,
        radialJitterAmp,
        radialJitterFreq,
        verticalAmp,
        verticalFreq,
        phase
      };

  scene.add(planetGroup);
  planetMeshes.push(planetGroup);

  // create a label for this planet
  const labelEl = document.createElement('div');
  labelEl.style.position = 'absolute';
  labelEl.style.padding = '2px 6px';
  labelEl.style.background = 'rgba(0,0,0,0.6)';
  labelEl.style.color = 'white';
  labelEl.style.fontSize = '11px';
  labelEl.style.borderRadius = '4px';
  labelEl.style.transform = 'translate(-50%, -50%)';
  labelEl.textContent = planet.name;
  labelContainer.appendChild(labelEl);
  // store reference for updates
  planetGroup.userData.labelEl = labelEl;

      // Add a simple placeholder so the planet position is visible while loading
      const placeholderGeo = new THREE.SphereGeometry(Math.max(planet.radius * 0.5, 0.1), 12, 12);
      const placeholderMat = new THREE.MeshBasicMaterial({ color: planet.color, wireframe: true, opacity: 0.9, transparent: true });
      const placeholder = new THREE.Mesh(placeholderGeo, placeholderMat);
      planetGroup.add(placeholder);

      // Create a trail (line) for this planet — a short white additive glow
      const TRAIL_LEN = 40;
      const trailPoints = [];
      for (let i = 0; i < TRAIL_LEN; i++) {
        trailPoints.push(new THREE.Vector3(planetGroup.position.x, planetGroup.position.y, planetGroup.position.z));
      }
      const trailPositions = new Float32Array(TRAIL_LEN * 3);
      const trailIndices = new Float32Array(TRAIL_LEN);
      for (let i = 0; i < TRAIL_LEN; i++) trailIndices[i] = i / Math.max(1, (TRAIL_LEN - 1));
      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
      trailGeo.setAttribute('aIndex', new THREE.BufferAttribute(trailIndices, 1));

      // ShaderMaterial for smooth per-vertex fading trail (additive glow)
      const trailMat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(0xffffff) },
          uOpacity: { value: 0.9 }
        },
        vertexShader: `attribute float aIndex; varying float vIndex; void main() { vIndex = aIndex; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mvPosition; }`,
        fragmentShader: `uniform vec3 uColor; uniform float uOpacity; varying float vIndex; void main() { float alpha = smoothstep(1.0, 0.0, vIndex); gl_FragColor = vec4(uColor, alpha * uOpacity); }`,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const trailLine = new THREE.Line(trailGeo, trailMat);
      scene.add(trailLine);
      trails.push({ points: trailPoints, geo: trailGeo, line: trailLine, len: TRAIL_LEN });

  // Attempt to load model from /models/{name}.glb (lowercase)
  const modelPath = `/models/${planet.name.toLowerCase()}.glb`;
  console.log('Loading model:', modelPath);

  // status element for this planet
  const statusEl = document.createElement('div');
  statusEl.style.marginTop = '6px';
  statusEl.textContent = `${planet.name}: Loading`;
  statusOverlay.appendChild(statusEl);
      loader.load(
        modelPath,
        (gltf) => {
          console.log('Model loaded:', modelPath);
          const model = gltf.scene;
          // Log bounding box and size for debugging
          const bboxDebug = new THREE.Box3().setFromObject(model);
          const sizeDebug = new THREE.Vector3();
          bboxDebug.getSize(sizeDebug);
          console.log(`${planet.name} bbox size:`, sizeDebug);
          // Compute bounding box to center and scale model to roughly match planet.radius
          const bbox = new THREE.Box3().setFromObject(model);
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const desiredDiameter = (planet.radius || 1) * 2;
          const scaleFactor = desiredDiameter / maxDim;

          // Center the model geometry
          const center = new THREE.Vector3();
          bbox.getCenter(center);
          model.position.x -= center.x;
          model.position.y -= center.y;
          model.position.z -= center.z;

          // Apply scale but avoid extremely small scales
          const appliedScale = Math.max(scaleFactor * 0.9, 0.01);
          model.scale.setScalar(appliedScale);
          console.log(`${planet.name} scaleFactor:`, scaleFactor, 'appliedScale:', appliedScale);

          model.traverse((n) => {
            if (n.isMesh) {
              n.castShadow = true;
              n.receiveShadow = true;
              // Ensure color textures use sRGB so they display correctly
              const mats = Array.isArray(n.material) ? n.material : [n.material];
              mats.forEach((m) => {
                if (!m) return;
                if (m.map) {
                  try { if (typeof THREE['sRGBEncoding'] !== 'undefined') m.map.encoding = THREE['sRGBEncoding']; } catch (e) {}
                }
                if (m.emissiveMap) {
                  try { if (typeof THREE['sRGBEncoding'] !== 'undefined') m.emissiveMap.encoding = THREE['sRGBEncoding']; } catch (e) {}
                }
                m.needsUpdate = true;
              });
            }
          });

          // Remove placeholder and add the processed model to the group
          if (placeholder.parent) {
            planetGroup.remove(placeholder);
            try { placeholder.geometry.dispose(); } catch (e) {}
            try { placeholder.material.dispose(); } catch (e) {}
          }
          planetGroup.add(model);
          statusEl.textContent = `${planet.name}: Loaded`;

          // Add ring if needed (models may already include rings)
          if (planet.hasRing) {
            const ringGeometry = new THREE.RingGeometry(planet.radius + 0.5, planet.radius + 2.5, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({ 
              color: 0xf0e6d2, 
              side: THREE.DoubleSide,
              opacity: 0.7,
              transparent: true
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            planetGroup.add(ring);
          }
        },
        undefined,
        (err) => {
          console.error('Failed to load model:', modelPath, err);
          // Fallback to simple sphere if model fails to load
          const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
          const material = new THREE.MeshPhongMaterial({ 
            color: planet.color,
            shininess: 30,
            specular: 0x222222
          });
          const planetMesh = new THREE.Mesh(geometry, material);
          if (placeholder.parent) {
            planetGroup.remove(placeholder);
            try { placeholder.geometry.dispose(); } catch (e) {}
            try { placeholder.material.dispose(); } catch (e) {}
          }
          planetGroup.add(planetMesh);
          statusEl.textContent = `${planet.name}: Failed (fallback sphere)`;

          if (planet.hasRing) {
            const ringGeometry = new THREE.RingGeometry(planet.radius + 0.5, planet.radius + 2.5, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({ 
              color: 0xf0e6d2, 
              side: THREE.DoubleSide,
              opacity: 0.7,
              transparent: true
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            planetMesh.add(ring);
          }
        }
      );
    });
    
    // Central point indicator (replaces sun)
    const centerGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const centerMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x888888,
      transparent: true,
      opacity: 0.5
    });
    const centerPoint = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(centerPoint);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update planet positions and rotations with jitter and trails
      const t = (performance.now() - nowStart) / 1000;
  planetMeshes.forEach((planet, idx) => {
        const data = planet.userData;

        // Orbital motion around center (0,0,0)
        data.angle += data.orbitSpeed * orbitSpeed;
        // Base circular position
        const baseX = Math.cos(data.angle) * data.distance;
        const baseZ = Math.sin(data.angle) * data.distance;

        // Radial jitter
        const radialOffset = Math.sin(t * data.radialJitterFreq + data.phase) * data.radialJitterAmp;
        const r = data.distance + radialOffset;
        planet.position.x = Math.cos(data.angle) * r;
        planet.position.z = Math.sin(data.angle) * r;

        // Vertical bobbing for depth
        planet.position.y = Math.sin(t * data.verticalFreq + data.phase) * data.verticalAmp;

        // Rotation around own axis
        planet.rotation.y += data.rotationSpeed * rotationSpeed;

  // Update trail: push current position, shift array, write to buffer
        const trail = trails[idx];
        if (trail) {
          // push current position to front
          trail.points.pop();
          trail.points.unshift(new THREE.Vector3(planet.position.x, planet.position.y, planet.position.z));
          // write into buffer with fading alpha simulated via opacity on material
          const posAttr = trail.geo.getAttribute('position');
          for (let i = 0; i < trail.len; i++) {
            const p = trail.points[i];
            posAttr.array[i * 3 + 0] = p.x;
            posAttr.array[i * 3 + 1] = p.y;
            posAttr.array[i * 3 + 2] = p.z;
          }
          posAttr.needsUpdate = true;
          // subtle pulsing opacity
          if (trail.line && trail.line.material && trail.line.material.uniforms) {
            trail.line.material.uniforms.uOpacity.value = 0.6 + 0.15 * Math.sin(t * 2 + idx);
          }
        }
        // update label screen position
        const labelEl = planet.userData.labelEl;
        if (labelEl) {
          const vec = new THREE.Vector3();
          vec.setFromMatrixPosition(planet.matrixWorld);
          vec.project(camera);
          const x = (vec.x * 0.5 + 0.5) * mountRef.current.clientWidth;
          const y = ( - vec.y * 0.5 + 0.5) * mountRef.current.clientHeight;
          labelEl.style.left = `${x}px`;
          labelEl.style.top = `${y}px`;
        }
      });
      
      // Update orbit visibility
      orbitLines.forEach(orbit => {
        orbit.visible = showOrbits;
      });
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // remove overlay and labels
      try { if (statusOverlay && statusOverlay.parentNode) statusOverlay.parentNode.removeChild(statusOverlay); } catch (e) {}
      try { if (labelContainer && labelContainer.parentNode) labelContainer.parentNode.removeChild(labelContainer); } catch (e) {}
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [orbitSpeed, rotationSpeed, showOrbits]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      
      {/* No controls or panels — camera is fixed at the top */}
    </div>
  );
}