import { useEffect, useRef } from "react";
import ThreeGlobe from "three-globe";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  PointLight,
  MeshPhongMaterial,
  Mesh,
  Group,
  Vector3,
  Quaternion,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import countries from "../../data/globe-data-min.json";

const TransactionGlobeNew = () => {
  const mountRef = useRef(null);
  const globeRef = useRef(null);
  const transactionGroupRef = useRef(new Group()); // Group for transactions

  // Create a text mesh for the $ sign
  const createTextMesh = (text, position, font) => {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 8, // Adjust size based on your needs
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: false,
    });

    const textMaterial = new MeshPhongMaterial({ color: 0xffd700 }); // Gold color
    const textMesh = new Mesh(textGeometry, textMaterial);
    textMesh.position.copy(position); // Set the position
    return textMesh;
  };

  // Add a transaction marker on the globe at the specified lat/lng
  const addTransaction = (lat, lng, font) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const globeRadius = 100;
    const textOffset = 4; // Reduced offset for closer placement to the globe surface

    // Calculate the position on the globe's surface
    const surfacePosition = new Vector3(
      -globeRadius * Math.sin(phi) * Math.cos(theta),
      globeRadius * Math.cos(phi),
      globeRadius * Math.sin(phi) * Math.sin(theta)
    );

    // Calculate the normal vector at this position
    const normal = surfacePosition.clone().normalize();

    // Calculate the position for the $ sign
    const position = surfacePosition
      .clone()
      .add(normal.multiplyScalar(textOffset));

    const text = "$";
    const textMesh = createTextMesh(text, position, font);

    // Calculate the rotation to make the $ sign perpendicular to the globe surface
    const up = new Vector3(0, 1, 0);
    const quaternion = new Quaternion();
    quaternion.setFromUnitVectors(up, normal);
    textMesh.setRotationFromQuaternion(quaternion);

    // Rotate the $ sign 270 degrees (3π/2 radians) around its local Z-axis
    textMesh.rotateOnAxis(new Vector3(1, 0, 0), Math.PI / 2);

    // Add the $ sign to the transaction group
    transactionGroupRef.current.add(textMesh);
  };

  useEffect(() => {
    const width = 800;
    const height = 600;

    const scene = new Scene();
    scene.background = new Color(0x000814); // Dark background

    const camera = new PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 300;

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new AmbientLight(0xffffff, 0.8));
    const dLight = new DirectionalLight(0xffffff, 0.9);
    dLight.position.set(-1, 1, 1);
    camera.add(dLight);
    scene.add(camera);

    const dLight1 = new PointLight(0x8566cc, 0.5);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);

    // Creating the Globe
    const Globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.25)
      .hexPolygonColor((e) => {
        if (["KOR", "JPN", "CHN"].includes(e.properties.ISO_A3)) {
          return "rgba(255,255,255, 1)";
        } else {
          return "rgba(255,255,255, 0.7)";
        }
      });

    globeRef.current = Globe;

    // Rotate the globe initially to a specific position
    Globe.rotateY(-Math.PI * (5 / 9));
    Globe.rotateZ(-Math.PI / 6);

    const globeMaterial = Globe.globeMaterial();
    globeMaterial.color = new Color(0x3a228a);
    globeMaterial.emissive = new Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 5;
    globeMaterial.metalness = 0.3;
    globeMaterial.roughness = 0.4;

    scene.add(Globe);
    scene.add(transactionGroupRef.current); // Keep transactions static relative to the globe

    // Load the font for $ sign
    const loader = new FontLoader();
    loader.load("/assets/fonts/helvetiker_regular.typeface.json", (font) => {
      // Adding transactions
      addTransaction(40.7128, -74.006, font); // New York
      addTransaction(51.5074, -0.1278, font); // London
    });

    // Orbit controls to allow rotating the globe

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.8;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4.5;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    // Render loop to keep the globe rotating and scene rendering
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate(); // Start animation loop

    // Cleanup on component unmount
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(Globe);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "800px",
        height: "600px",
        margin: "0 auto",
      }}
    />
  );
};

export default TransactionGlobeNew;
