import { useEffect, useRef } from "react";
import ThreeGlobe from "three-globe";
import * as THREE from "three";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  PointLight,
  MeshBasicMaterial,
  Mesh,
  SphereGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import countries from "../../data/globe-data-min.json";

const TransactionGlobe = () => {
  const mountRef = useRef(null);
  const globeRef = useRef(null);
  const transactionBarsRef = useRef([]);

  useEffect(() => {
    // Scene setup
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 600;

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    scene.add(new AmbientLight(0xffffff, 0.3));
    scene.background = new Color(0x040d21);

    const dLight = new DirectionalLight(0xffffff, 1.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    const dLight1 = new DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);

    const dLight2 = new PointLight(0x8566cc, 0.5);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    scene.add(camera);
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    // Globe setup
    const Globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereAltitude(0.25)
      .hexPolygonColor((e) => {
        if (["KOR", "JPN", "CHN"].includes(e.properties.ISO_A3)) {
          return "rgba(255,255,255, 1)";
        } else {
          return "rgba(255,255,255, 0.7)";
        }
      });

    globeRef.current = Globe;

    Globe.rotateY(-Math.PI * (5 / 9));
    Globe.rotateZ(-Math.PI / 6);
    const globeMaterial = Globe.globeMaterial();
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;
    globeMaterial.specular = new THREE.Color(0x6666ff);

    scene.add(Globe);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.8;
    controls.maxDistance = 500;
    controls.minDistance = 200;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4.5;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    // Function to convert lat/long to 3D coordinates
    const getPos = (lat, lng, radius) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((180 - lng) * Math.PI) / 180;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    };

    // Function to check if a point is on land
    const isOnLand = (lat, lng) => {
      const country = countries.features.find((f) => {
        if (f.geometry.type === "Polygon") {
          return inside([lng, lat], f.geometry.coordinates[0]);
        } else if (f.geometry.type === "MultiPolygon") {
          return f.geometry.coordinates.some((poly) =>
            inside([lng, lat], poly[0])
          );
        }
        return false;
      });
      return !!country;
    };

    // Helper function for point-in-polygon algorithm
    const inside = (point, vs) => {
      let x = point[0],
        y = point[1];
      let inside = false;
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0],
          yi = vs[i][1];
        let xj = vs[j][0],
          yj = vs[j][1];
        let intersect =
          yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    };
    const transactions = [
      { lat: 37.7749, lng: -122.4194, amount: 500 }, // San Francisco
      { lat: 51.5074, lng: -0.1278, amount: 300 }, // London
      { lat: 40.7128, lng: -74.006, amount: 450 }, // New York
      { lat: 35.6895, lng: 139.6917, amount: 800 }, // Tokyo
      { lat: -33.8688, lng: 151.2093, amount: 600 }, // Sydney
      { lat: 48.8566, lng: 2.3522, amount: 750 }, // Paris
      { lat: 34.0522, lng: -118.2437, amount: 550 }, // Los Angeles
      { lat: 19.4326, lng: -99.1332, amount: 350 }, // Mexico City
      { lat: 55.7558, lng: 37.6173, amount: 900 }, // Moscow
      { lat: 1.3521, lng: 103.8198, amount: 400 }, // Singapore
      { lat: 52.52, lng: 13.405, amount: 700 }, // Berlin
      { lat: -26.2041, lng: 28.0473, amount: 450 }, // Johannesburg
      { lat: 39.9042, lng: 116.4074, amount: 800 }, // Beijing
      { lat: -34.6037, lng: -58.3816, amount: 600 }, // Buenos Aires
      { lat: 31.2304, lng: 121.4737, amount: 700 }, // Shanghai
      { lat: 41.9028, lng: 12.4964, amount: 350 }, // Rome
      { lat: 22.3964, lng: 114.1095, amount: 550 }, // Hong Kong
      { lat: -23.5505, lng: -46.6333, amount: 650 }, // São Paulo
      { lat: 35.6762, lng: 139.6503, amount: 500 }, // Yokohama
      { lat: 28.7041, lng: 77.1025, amount: 400 }, // Delhi
      { lat: 37.5665, lng: 126.978, amount: 450 }, // Seoul
      { lat: 59.9343, lng: 30.3351, amount: 300 }, // Saint Petersburg
      { lat: 45.5017, lng: -73.5673, amount: 650 }, // Montreal
      { lat: 40.4168, lng: -3.7038, amount: 550 }, // Madrid
      { lat: -37.8136, lng: 144.9631, amount: 500 }, // Melbourne
      { lat: 49.2827, lng: -123.1207, amount: 600 }, // Vancouver
      { lat: 13.7563, lng: 100.5018, amount: 700 }, // Bangkok
      { lat: 41.0082, lng: 28.9784, amount: 900 }, // Istanbul
      { lat: -6.2088, lng: 106.8456, amount: 450 }, // Jakarta
      { lat: 25.276, lng: 55.2962, amount: 650 }, // Dubai
      { lat: -22.9068, lng: -43.1729, amount: 550 }, // Rio de Janeiro
      { lat: 43.6532, lng: -79.3832, amount: 350 }, // Toronto
      { lat: 12.9716, lng: 77.5946, amount: 600 }, // Bangalore
      { lat: 50.1109, lng: 8.6821, amount: 400 }, // Frankfurt
      { lat: -12.0464, lng: -77.0428, amount: 450 }, // Lima
      { lat: 60.1695, lng: 24.9354, amount: 500 }, // Helsinki
      { lat: 35.6895, lng: 139.6917, amount: 300 }, // Tokyo
      { lat: 45.815, lng: 15.9819, amount: 550 }, // Zagreb
      { lat: -1.2921, lng: 36.8219, amount: 650 }, // Nairobi
      { lat: 22.5726, lng: 88.3639, amount: 400 }, // Kolkata
      { lat: 4.711, lng: -74.0721, amount: 750 }, // Bogotá
      { lat: 30.0444, lng: 31.2357, amount: 500 }, // Cairo
    ];

    const createTransactionBar = () => {
      // Use a random transaction from the transactions array
      const transaction =
        transactions[Math.floor(Math.random() * transactions.length)];
      const { lat, lng, amount } = transaction; // Destructure lat, lng, and amount

      const position = getPos(lat, lng, Globe.getGlobeRadius());

      // Normalize the amount
      const maxAmount = Math.max(...transactions.map((t) => t.amount)); // Calculate the maximum amount
      const normalizedHeight = (amount / maxAmount) * 10; // Scale the height based on the maximum amount (adjust 10 as needed)

      // Create the bar with normalized height
      const geometry = new THREE.CylinderGeometry(
        0.5,
        0.5,
        normalizedHeight,
        8
      ); // Adjust the divisor to scale the height
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cylinder = new Mesh(geometry, material);
      cylinder.position.copy(position);

      // Align the cylinder to point outwards from the globe's center
      cylinder.lookAt(Globe.position);
      cylinder.rotateX(Math.PI / 2);

      Globe.add(cylinder);

      transactionBarsRef.current.push({
        cylinder,
        startTime: Date.now(),
      });
    };

    // Animation loop
    const animate = () => {
      const currentTime = Date.now();
      transactionBarsRef.current.forEach((bar, index) => {
        const elapsedTime = (currentTime - bar.startTime) / 1000; // Time in seconds
        const maxHeight = 20;
        const growthDuration = 5; // Time to reach max height in seconds

        if (elapsedTime < growthDuration) {
          const newHeight = (elapsedTime / growthDuration) * maxHeight;
          bar.cylinder.scale.y = newHeight;
        } else if (elapsedTime > growthDuration + 5) {
          // Remove bar after it's been at full height for 5 seconds
          Globe.remove(bar.cylinder);
          transactionBarsRef.current.splice(index, 1);
        }
      });

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Create new transaction bar every second
    const intervalId = setInterval(createTransactionBar, 1000);

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", onWindowResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(Globe);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", aspectRatio: "1/1" }} />;
};

export default TransactionGlobe;
