import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Science3DModelProps {
  category: string;
  isDarkMode: boolean;
}

const Science3DModel: React.FC<Science3DModelProps> = ({ category, isDarkMode }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xD4AF37, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Group to hold the model
    const group = new THREE.Group();
    scene.add(group);

    // Create model based on category
    const brandGold = 0xD4AF37;
    const accentColor = isDarkMode ? 0xffffff : 0x1A1A1A;

    if (category === 'Physics') {
      // Bohr Model (Atom)
      const nucleusGeo = new THREE.SphereGeometry(0.5, 32, 32);
      const nucleusMat = new THREE.MeshPhongMaterial({ color: brandGold });
      const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
      group.add(nucleus);

      // Electrons
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.5, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.3 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.random() * Math.PI;
        ring.rotation.y = Math.random() * Math.PI;
        group.add(ring);

        const electronGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const electronMat = new THREE.MeshPhongMaterial({ color: brandGold });
        const electron = new THREE.Mesh(electronGeo, electronMat);
        
        // Add electron to a pivot to rotate it
        const pivot = new THREE.Object3D();
        pivot.rotation.x = ring.rotation.x;
        pivot.rotation.y = ring.rotation.y;
        scene.add(pivot);
        
        electron.position.x = 1.5;
        pivot.add(electron);
        
        // Store pivot for animation
        (pivot as any).isElectronPivot = true;
        (pivot as any).speed = 0.02 + Math.random() * 0.03;
      }
    } else if (category === 'Biology') {
      // DNA Helix
      const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);
      const sphereMat1 = new THREE.MeshPhongMaterial({ color: brandGold });
      const sphereMat2 = new THREE.MeshPhongMaterial({ color: accentColor });

      for (let i = 0; i < 20; i++) {
        const y = (i - 10) * 0.3;
        const angle = i * 0.5;
        
        const s1 = new THREE.Mesh(sphereGeo, sphereMat1);
        s1.position.set(Math.cos(angle), y, Math.sin(angle));
        group.add(s1);

        const s2 = new THREE.Mesh(sphereGeo, sphereMat2);
        s2.position.set(Math.cos(angle + Math.PI), y, Math.sin(angle + Math.PI));
        group.add(s2);

        // Connector
        const lineGeo = new THREE.CylinderGeometry(0.02, 0.02, 2, 8);
        const lineMat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.2 });
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.position.y = y;
        line.rotation.z = Math.PI / 2;
        line.rotation.y = angle;
        group.add(line);
      }
    } else if (category === 'Neuroscience') {
      // Neural Network (Sphere of points)
      const pointsGeo = new THREE.IcosahedronGeometry(1.5, 2);
      const pointsMat = new THREE.PointsMaterial({ color: brandGold, size: 0.05 });
      const points = new THREE.Points(pointsGeo, pointsMat);
      group.add(points);

      // Glowing core
      const coreGeo = new THREE.SphereGeometry(0.8, 32, 32);
      const coreMat = new THREE.MeshPhongMaterial({ 
        color: brandGold, 
        transparent: true, 
        opacity: 0.2,
        emissive: brandGold,
        emissiveIntensity: 0.5
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);
    } else if (category === 'Chemistry') {
      // Molecular structure (Methane-like)
      const centerGeo = new THREE.SphereGeometry(0.4, 32, 32);
      const centerMat = new THREE.MeshPhongMaterial({ color: brandGold });
      const center = new THREE.Mesh(centerGeo, centerMat);
      group.add(center);

      const atoms = [
        [1, 1, 1], [-1, -1, 1], [1, -1, -1], [-1, 1, -1]
      ];

      atoms.forEach(pos => {
        const atomGeo = new THREE.SphereGeometry(0.2, 16, 16);
        const atomMat = new THREE.MeshPhongMaterial({ color: accentColor });
        const atom = new THREE.Mesh(atomGeo, atomMat);
        atom.position.set(pos[0] * 0.8, pos[1] * 0.8, pos[2] * 0.8);
        group.add(atom);

        // Bond
        const bondGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8);
        const bondMat = new THREE.MeshPhongMaterial({ color: accentColor, transparent: true, opacity: 0.5 });
        const bond = new THREE.Mesh(bondGeo, bondMat);
        
        // Position and rotate bond
        bond.position.set(pos[0] * 0.4, pos[1] * 0.4, pos[2] * 0.4);
        bond.lookAt(new THREE.Vector3(pos[0] * 0.8, pos[1] * 0.8, pos[2] * 0.8));
        bond.rotateX(Math.PI / 2);
        group.add(bond);
      });
    }

    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      group.rotation.x += 0.002;

      scene.traverse((child) => {
        if ((child as any).isElectronPivot) {
          child.rotation.z += (child as any).speed;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [category, isDarkMode]);

  return <div ref={mountRef} className="w-full h-full min-h-[300px]" />;
};

export default Science3DModel;
