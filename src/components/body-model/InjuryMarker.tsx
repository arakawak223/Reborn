"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import type { InjuryRecord } from "@/lib/mock-data";

function getSeverityColor(severity: number): string {
  if (severity <= 3) return "#facc15";
  if (severity <= 6) return "#f97316";
  return "#ef4444";
}

export function InjuryMarker({
  injury,
  position,
  onClick,
  isSelected,
}: {
  injury: InjuryRecord;
  position: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<Mesh>(null);
  const color = getSeverityColor(injury.severity);
  const scale = 0.02 + (injury.severity / 10) * 0.03;

  useFrame(() => {
    if (meshRef.current && injury.is_primary) {
      const s = scale + Math.sin(Date.now() * 0.005) * 0.005;
      meshRef.current.scale.setScalar(s / scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      scale={scale}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isSelected ? 0.8 : 0.4}
        transparent
        opacity={isSelected ? 1 : 0.8}
      />
    </mesh>
  );
}
