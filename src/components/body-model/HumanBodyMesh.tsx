"use client";

import { useRef } from "react";
import type { Group } from "three";

export function HumanBodyMesh() {
  const groupRef = useRef<Group>(null);

  // Simple procedural human body using basic shapes
  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.52, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[0.35, 0.45, 0.18]} />
        <meshStandardMaterial color="#4a90d9" transparent opacity={0.6} />
      </mesh>

      {/* Pelvis */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.3, 0.15, 0.16]} />
        <meshStandardMaterial color="#4a90d9" transparent opacity={0.6} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.28, 1.35, 0]}>
        <cylinderGeometry args={[0.035, 0.03, 0.25, 8]} />
        <meshStandardMaterial color="#d4a574" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.32, 1.1, 0]}>
        <cylinderGeometry args={[0.03, 0.025, 0.25, 8]} />
        <meshStandardMaterial color="#d4a574" transparent opacity={0.7} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.28, 1.35, 0]}>
        <cylinderGeometry args={[0.035, 0.03, 0.25, 8]} />
        <meshStandardMaterial color="#d4a574" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.32, 1.1, 0]}>
        <cylinderGeometry args={[0.03, 0.025, 0.25, 8]} />
        <meshStandardMaterial color="#d4a574" transparent opacity={0.7} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.1, 0.72, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.35, 8]} />
        <meshStandardMaterial color="#4a6fa5" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-0.1, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.3, 8]} />
        <meshStandardMaterial color="#4a6fa5" transparent opacity={0.6} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.1, 0.72, 0]}>
        <cylinderGeometry args={[0.05, 0.04, 0.35, 8]} />
        <meshStandardMaterial color="#4a6fa5" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.1, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.3, 8]} />
        <meshStandardMaterial color="#4a6fa5" transparent opacity={0.6} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.1, 0.22, 0.03]}>
        <boxGeometry args={[0.07, 0.04, 0.12]} />
        <meshStandardMaterial color="#4a6fa5" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.1, 0.22, 0.03]}>
        <boxGeometry args={[0.07, 0.04, 0.12]} />
        <meshStandardMaterial color="#4a6fa5" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
