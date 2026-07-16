import { Suspense, useEffect, useRef, type MutableRefObject } from "react";
import { Html, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Box3, Group, PerspectiveCamera as ThreePerspectiveCamera, Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type ThreeDViewerCanvasProps = {
  readonly modelUrl: string;
  readonly label: string;
  readonly reducedMotion: boolean;
};

type FramedModelProps = {
  readonly modelUrl: string;
  readonly controlsRef: MutableRefObject<OrbitControlsImpl | null>;
  readonly cameraRef: MutableRefObject<ThreePerspectiveCamera | null>;
};

function LoadingModel() {
  return (
    <Html center>
      <div className="rounded-full border border-border bg-card px-md py-xs text-xs text-muted">Loading model...</div>
    </Html>
  );
}

function FramedModel({ modelUrl, cameraRef, controlsRef }: FramedModelProps) {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF(modelUrl);

  useEffect(() => {
    const group = groupRef.current;
    const camera = cameraRef.current;

    if (!group || !camera) {
      return undefined;
    }

    const bounds = new Box3().setFromObject(group);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z, 1);
    const distance = maxDimension * 1.8;

    group.position.set(-center.x, -center.y, -center.z);
    camera.position.set(0, maxDimension * 0.25, distance);
    camera.near = Math.max(distance / 100, 0.01);
    camera.far = distance * 100;
    camera.updateProjectionMatrix();
    controlsRef.current?.target.set(0, 0, 0);
    controlsRef.current?.update();

    return () => {
      useGLTF.clear(modelUrl);
    };
  }, [cameraRef, controlsRef, modelUrl]);

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export function ThreeDViewerCanvas({ modelUrl, label, reducedMotion }: ThreeDViewerCanvasProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const cameraRef = useRef<ThreePerspectiveCamera | null>(null);

  return (
    <div aria-label={label} className="h-[min(32rem,70vh)] min-h-[22rem] w-full" role="img" tabIndex={0}>
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <color args={["#09090b"]} attach="background" />
        <PerspectiveCamera fov={45} makeDefault position={[0, 0, 4]} ref={cameraRef} />
        <ambientLight intensity={0.75} />
        <directionalLight intensity={1.1} position={[3, 4, 5]} />
        <Suspense fallback={<LoadingModel />}>
          <FramedModel cameraRef={cameraRef} controlsRef={controlsRef} modelUrl={modelUrl} />
        </Suspense>
        <OrbitControls
          autoRotate={false}
          enableDamping={!reducedMotion}
          enablePan
          enableRotate
          enableZoom
          makeDefault
          maxDistance={24}
          minDistance={0.5}
          ref={controlsRef}
        />
      </Canvas>
    </div>
  );
}
