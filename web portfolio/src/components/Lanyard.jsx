/* eslint-disable react/no-unknown-property */
'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, AdaptiveDpr } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Import foto dari folder assets
import fotoLanyardImg from '../assets/fotolanyard.jpeg'; 

// Aset model dari folder public/
const cardGLB = '/card.glb';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ gravity = [0, -40, 0], fov = 20, transparent = true }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [inView, setInView] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // OPTIMIZATION: Pause rendering entirely when the Lanyard section is not visible
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin: '200px 0px', threshold: 0 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        // OPTIMIZATION: Halt the WebGL frameloop when scrolled out of view immediately
        frameloop={inView ? 'always' : 'never'}
        // OPTIMIZATION: Allow higher pixel ratio up to 2 for sharp mobile screens (Retina)
        camera={{ position: [0, isMobile ? 2 : 0, isMobile ? 22 : 16], fov: fov }}
        dpr={[1, 2]} 
        // Request higher performance GL context
        gl={{ alpha: transparent, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          // Set pixel alignment/encoding for sharper textures
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <React.Suspense fallback={null}>
          <AdaptiveDpr pixelated />
          <ambientLight intensity={Math.PI} />
          {/* OPTIMIZATION: Pause heavy rapier physics calculations when off-screen */}
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 60 : 1 / 60} paused={!inView}>
            <Band isMobile={isMobile} />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </React.Suspense>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  
  const { gl, size } = useThree(); 
  const { nodes, materials } = useGLTF(cardGLB);
  
  const textureFoto = useTexture(fotoLanyardImg);
  textureFoto.wrapS = textureFoto.wrapT = THREE.ClampToEdgeWrapping;
  textureFoto.minFilter = THREE.LinearMipmapLinearFilter;
  textureFoto.magFilter = THREE.LinearFilter;
  textureFoto.anisotropy = gl.capabilities.getMaxAnisotropy();

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  const frontMatRef = useRef();

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.4, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  const customShader = useMemo(() => ({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uHover;
      uniform vec2 uRepeat;
      varying vec2 vUv;
      void main() {
        vec2 uv = (vUv - 0.5) * uRepeat + 0.5;
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
          discard;
        }
        vec4 texColor = texture2D(uTexture, uv);
        float grayscale = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
        vec3 finalColor = mix(vec3(grayscale), texColor.rgb, uHover);
        gl_FragColor = vec4(finalColor, texColor.a);
      }
    `
  }), []);

  const frontUniforms = useMemo(() => ({
    uTexture: { value: textureFoto },
    uHover: { value: 0.0 }, 
    uRepeat: { value: new THREE.Vector2(1, 1) }
  }), [textureFoto]);

  useFrame((state, delta) => {
    if (frontMatRef.current) {
      frontMatRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        frontMatRef.current.uniforms.uHover.value, 
        hovered ? 1.0 : 0.0, 
        delta * 10
      );

      if (textureFoto.image) {
        const imageAspect = textureFoto.image.width / textureFoto.image.height;
        const planeAspect = 0.58 / 0.84;
        if (imageAspect > planeAspect) {
          frontMatRef.current.uniforms.uRepeat.value.set(planeAspect / imageAspect, 1.0);
        } else {
          frontMatRef.current.uniforms.uRepeat.value.set(1.0, imageAspect / planeAspect);
        }
      }
    }

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      {/* FIX 2: Menaikkan titik gantung (anchor) dari 4 menjadi 5.5 khusus di HP agar lanyard tidak menjuntai terlalu ke bawah */}
      <group position={[0, isMobile ? 5.5 : 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.3, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[0.6, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[0.9, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25} position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial color="#EBE6E0" clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.1} />
            </mesh>
            
            <mesh position={[0, 0.5, 0.012]}>
              <planeGeometry args={[0.58, 0.84]} />
              <shaderMaterial
                ref={frontMatRef}
                vertexShader={customShader.vertexShader}
                fragmentShader={customShader.fragmentShader}
                uniforms={frontUniforms}
                transparent={true}
              />
            </mesh>

            <mesh position={[0, 0.5, -0.012]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.58, 0.84]} />
              <meshPhysicalMaterial color="#EBE6E0" roughness={0.4} />
            </mesh>

            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial 
          color="black" 
          depthTest={false} 
          resolution={[size.width, size.height]} 
          lineWidth={1} 
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardGLB);
useTexture.preload(fotoLanyardImg);