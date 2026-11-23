import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Shared pointer state in normalized device coords (-1..1) plus a smoothed
// scroll offset. Updated by PointerTracker (desktop mouse + mobile touch drag)
// and ScrollTracker, consumed inside useFrame by the scene group.
const pointer = { x: 0, y: 0 };
const scroll = { v: 0 };

function PointerTracker() {
  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (isTouch) {
      let active = false;
      let lastX = 0;
      let lastY = 0;

      const onStart = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        active = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      };
      const onMove = (e: TouchEvent) => {
        if (!active || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - lastX;
        const dy = e.touches[0].clientY - lastY;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        pointer.x = THREE.MathUtils.clamp(pointer.x + dx / window.innerWidth, -1, 1);
        pointer.y = THREE.MathUtils.clamp(pointer.y - dy / window.innerHeight, -1, 1);
      };
      const onEnd = () => { active = false; };

      el.addEventListener('touchstart', onStart, { passive: true });
      el.addEventListener('touchmove', onMove, { passive: true });
      el.addEventListener('touchend', onEnd);
      return () => {
        el.removeEventListener('touchstart', onStart);
        el.removeEventListener('touchmove', onMove);
        el.removeEventListener('touchend', onEnd);
      };
    }

    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => { pointer.x = 0; pointer.y = 0; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [gl]);
  return null;
}

function ScrollTracker() {
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scroll.v = THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}

const tmp = new THREE.Vector3();

function ReactiveGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (!group.current) return;
    // Smoothly chase the pointer so motion eases instead of snapping.
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.5, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.32, 0.06);
    // Gentle parallax drift driven by page scroll.
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scroll.v * 1.6, 0.05);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.4, 0.05);
  });
  return <group ref={group}>{children}</group>;
}

function FloatingGem({
  position,
  color,
  scale = 1,
  speed = 1,
  follow = 0.5,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  follow?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const base = useRef(new THREE.Vector3(...position));

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.2 * speed;
    ref.current.rotation.y = t * 0.3 * speed;
    // Each gem drifts toward the pointer by its own `follow` weight, so the
    // cluster feels layered rather than rigid.
    tmp.set(
      base.current.x + pointer.x * follow,
      base.current.y + pointer.y * follow,
      base.current.z
    );
    ref.current.position.lerp(tmp, 0.08);
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.15} envMapIntensity={1.2} />
      </mesh>
    </Float>
  );
}

function WaterPlane() {
  const ref = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => new THREE.PlaneGeometry(40, 40, 80, 80), []);
  const original = useMemo(() => geo.attributes.position.array.slice(), [geo]);

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const t = state.clock.elapsedTime;
    const rippleX = pointer.x * 3;
    const rippleY = pointer.y * 3;
    for (let i = 0; i < arr.length; i += 3) {
      const x = original[i];
      const y = original[i + 1];
      const d = Math.sqrt((x - rippleX) ** 2 + (y - rippleY) ** 2);
      arr[i + 2] =
        Math.sin(x * 0.4 + t * 0.8) * 0.25 +
        Math.cos(y * 0.5 + t * 0.6) * 0.2 +
        Math.sin(d * 1.5 - t * 3) * 0.12 * Math.exp(-d * 0.15);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={ref} geometry={geo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]}>
      <meshStandardMaterial
        color="#0d7faa"
        metalness={0.6}
        roughness={0.2}
        transparent
        opacity={0.85}
        envMapIntensity={1.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CrystalTorus({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  const base = useRef(new THREE.Vector3(...position));
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.4;
    ref.current.rotation.z = t * 0.15;
    tmp.set(base.current.x + pointer.x * 0.7, base.current.y + pointer.y * 0.7, base.current.z);
    ref.current.position.lerp(tmp, 0.08);
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={ref} scale={0.9}>
        <torusGeometry args={[1, 0.32, 32, 100]} />
        <MeshTransmissionMaterial
          thickness={0.8}
          roughness={0.05}
          transmission={1}
          ior={1.35}
          chromaticAberration={0.6}
          backside
          color="#c8f2ff"
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <PointerTracker />
      <ScrollTracker />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} color="#ffe9c2" castShadow />
      <pointLight position={[-6, 3, -4]} intensity={40} color="#28bce6" distance={20} />
      <pointLight position={[6, -1, 4]} intensity={25} color="#d4a857" distance={18} />

      <ReactiveGroup>
        <WaterPlane />
        <FloatingGem position={[-3.2, 1.2, -1]} color="#d4a857" scale={0.7} speed={0.8} follow={0.6} />
        <FloatingGem position={[3, 0.4, -2]} color="#52d2f7" scale={0.5} speed={1.1} follow={0.9} />
        <FloatingGem position={[2.4, 2.2, 1]} color="#f5e9cf" scale={0.35} speed={1.3} follow={1.1} />
        <FloatingGem position={[-2, -0.6, 1.5]} color="#159fcf" scale={0.45} speed={0.9} follow={0.75} />
        <CrystalTorus position={[0, 1.4, -0.5]} />
      </ReactiveGroup>

      <ContactShadows position={[0, -2.55, 0]} opacity={0.4} scale={24} blur={2.4} far={4} color="#04141d" />
      <Environment preset="sunset" />
      <fog attach="fog" args={['#04141d', 8, 20]} />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 7], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
}
