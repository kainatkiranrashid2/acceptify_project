import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

const CONTINENTS = {
  northAmerica: {
    minLat: 15,
    maxLat: 85,
    minLon: -170,
    maxLon: -50,
    color: "#00BFFF", // Bright blue
    name: "North America",
  },
  southAmerica: {
    minLat: -60,
    maxLat: 15,
    minLon: -80,
    maxLon: -35,
    color: "#FFD700", // Golden yellow
    name: "South America",
  },
  europe: {
    minLat: 35,
    maxLat: 70,
    minLon: -10,
    maxLon: 40,
    color: "#1E90FF", // Dodger blue
    name: "Europe",
  },
  africa: {
    minLat: -35,
    maxLat: 35,
    minLon: -20,
    maxLon: 50,
    color: "#FFA500", // Orange
    name: "Africa",
  },
  asia: {
    minLat: 0,
    maxLat: 75,
    minLon: 40,
    maxLon: 180,
    color: "#00CED1", // Dark turquoise
    name: "Asia",
  },
  oceania: {
    minLat: -50,
    maxLat: 0,
    minLon: 110,
    maxLon: 180,
    color: "#FF69B4", // Hot pink
    name: "Oceania",
  },
  antarctica: {
    minLat: -90,
    maxLat: -60,
    minLon: -180,
    maxLon: 180,
    color: "#FFFFFF", // White
    name: "Antarctica",
  },
};

function isPointInContinent(lat, lon) {
  for (const [continentKey, bounds] of Object.entries(CONTINENTS)) {
    if (
      lat >= bounds.minLat &&
      lat <= bounds.maxLat &&
      lon >= bounds.minLon &&
      lon <= bounds.maxLon
    ) {
      return { color: bounds.color, name: bounds.name };
    }
  }
  return null;
}

function Particle({
  position,
  color,
  continent,
  hoveredPosition,
  onHover,
  onLeave,
}) {
  const meshRef = useRef();
  const originalPosition = useRef(position.clone());

  useFrame(() => {
    if (meshRef.current) {
      if (hoveredPosition) {
        const distanceToHover =
          originalPosition.current.distanceTo(hoveredPosition);
        const maxDistance = 0.4;

        if (distanceToHover < maxDistance) {
          const direction = originalPosition.current
            .clone()
            .sub(hoveredPosition)
            .normalize();
          const scaleFactor = 1 - distanceToHover / maxDistance;
          const pushDistance = scaleFactor * 0.2;

          const newPosition = originalPosition.current
            .clone()
            .add(direction.multiplyScalar(pushDistance));
          meshRef.current.position.lerp(newPosition, 0.1);
        } else {
          meshRef.current.position.lerp(originalPosition.current, 0.1);
        }
      } else {
        // When not hovering, always move back to the original position
        meshRef.current.position.lerp(originalPosition.current, 0.1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(position, continent);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onLeave();
      }}>
      <sphereGeometry args={[0.02, 8, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </mesh>
  );
}

function ContinentLabel({ continent, position }) {
  if (!continent) return null;

  return (
    <Html position={position}>
      <div className="px-2 py-1 bg-black bg-opacity-50 text-white rounded text-sm whitespace-nowrap">
        {continent}
      </div>
    </Html>
  );
}

function Particles() {
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const groupRef = useRef();

  const particles = useMemo(() => {
    const particleData = [];
    const numParticles = 12000; // Increased from 6000 to 12000
    const radius = 1.5;

    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.PI * 2 * Math.random();

      const lat = 90 - (phi * 180) / Math.PI;
      const lon = (theta * 180) / Math.PI - 180;

      const continentInfo = isPointInContinent(lat, lon);

      if (continentInfo) {
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        particleData.push({
          position: new THREE.Vector3(x, y, z),
          color: continentInfo.color,
          continent: continentInfo.name,
        });
      }
    }
    return particleData;
  }, []);

  useFrame(() => {
    if (groupRef.current && !isHovering) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  const handleHover = (position, continent) => {
    setHoveredInfo({ position, continent });
    setIsHovering(true);
  };

  const handleLeave = () => {
    setHoveredInfo(null);
    setIsHovering(false);
  };

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <Particle
          key={index}
          position={particle.position}
          color={particle.color}
          continent={particle.continent}
          hoveredPosition={hoveredInfo?.position}
          onHover={handleHover}
          onLeave={handleLeave}
        />
      ))}
      {hoveredInfo && (
        <ContinentLabel
          continent={hoveredInfo.continent}
          position={hoveredInfo.position}
        />
      )}
    </group>
  );
}

export default function ParticleGlobeNew() {
  return (
    <div className="h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 4] }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={3} />
        <Particles />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={4} />
      </Canvas>
    </div>
  );
}
