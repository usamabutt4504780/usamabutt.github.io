"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ThreeCharacterProps = {
  className?: string;
  interactionToken?: number;
  isSpeaking?: boolean;
};

function addMesh(
  parent: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  position: [number, number, number],
  scale?: [number, number, number],
) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  if (scale) mesh.scale.set(...scale);
  parent.add(mesh);
  return mesh;
}

export default function ThreeCharacter({
  className = "",
  interactionToken = 0,
  isSpeaking = false,
}: ThreeCharacterProps) {
  const canvasMount = useRef<HTMLDivElement>(null);
  const waveUntil = useRef(0);
  const speakingRef = useRef(isSpeaking);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    speakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    if (interactionToken === 0) return;
    const now = performance.now();
    waveUntil.current = now + 1800;
  }, [interactionToken]);

  useEffect(() => {
    const mount = canvasMount.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0.12, 8.6);
    camera.lookAt(0, 0.05, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch (error) {
      console.error("The Three.js character could not initialize WebGL.", error);
      setWebglError(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight("#d1fae5", "#14221e", 2.1);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight("#f3f4f6", 3.2);
    keyLight.position.set(-3.5, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight("#10b981", 28, 12);
    rimLight.position.set(2.5, 1.6, -2.2);
    scene.add(rimLight);

    const blue = new THREE.MeshStandardMaterial({ color: "#10b981", metalness: 0.55, roughness: 0.27 });
    const blueDark = new THREE.MeshStandardMaterial({ color: "#12352d", metalness: 0.38, roughness: 0.34 });
    const suit = new THREE.MeshStandardMaterial({ color: "#9ca3af", metalness: 0.22, roughness: 0.34 });
    const suitShadow = new THREE.MeshStandardMaterial({ color: "#4b5563", metalness: 0.24, roughness: 0.36 });
    const visor = new THREE.MeshPhysicalMaterial({
      color: "#111827",
      metalness: 0.45,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const glow = new THREE.MeshStandardMaterial({
      color: "#d1fae5",
      emissive: "#10b981",
      emissiveIntensity: 2.8,
      roughness: 0.2,
    });
    const dark = new THREE.MeshStandardMaterial({ color: "#0b0f19", roughness: 0.26 });

    const starPositions = new Float32Array(210 * 3);
    for (let i = 0; i < 210; i += 1) {
      starPositions[i * 3] = (Math.random() - 0.5) * 8.5;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      starPositions[i * 3 + 2] = -1.5 - Math.random() * 3;
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: "#6ee7b7", size: 0.018, transparent: true, opacity: 0.72 }),
    );
    scene.add(stars);

    const orbitMaterial = new THREE.MeshBasicMaterial({ color: "#10b981", transparent: true, opacity: 0.3 });
    const orbit = addMesh(scene, new THREE.TorusGeometry(1.75, 0.008, 6, 120), orbitMaterial, [0, 0.04, -0.8], [
      1,
      1.15,
      1,
    ]);
    orbit.rotation.z = -0.26;
    const orbitFar = addMesh(
      scene,
      new THREE.TorusGeometry(2.08, 0.006, 6, 120),
      new THREE.MeshBasicMaterial({ color: "#9ca3af", transparent: true, opacity: 0.16 }),
      [0, 0.04, -1.1],
      [1, 0.78, 1],
    );
    orbitFar.rotation.z = 0.3;

    const platform = addMesh(
      scene,
      new THREE.TorusGeometry(0.86, 0.013, 8, 90),
      new THREE.MeshBasicMaterial({ color: "#10b981", transparent: true, opacity: 0.62 }),
      [0, -1.51, 0],
    );
    platform.rotation.x = -0.12;

    const character = new THREE.Group();
    character.position.y = -0.05;
    scene.add(character);

    const torso = new THREE.Group();
    character.add(torso);
    addMesh(torso, new THREE.CapsuleGeometry(0.43, 0.57, 7, 16), suit, [0, 0.02, 0], [1, 1, 0.82]);
    addMesh(torso, new THREE.CylinderGeometry(0.17, 0.19, 0.2, 18), suitShadow, [0, 0.46, 0]);
    addMesh(torso, new THREE.SphereGeometry(0.17, 18, 12), blue, [0, 0.3, 0.39], [1, 0.68, 0.36]);

    const chestPanel = addMesh(torso, new THREE.BoxGeometry(0.43, 0.3, 0.055), blueDark, [0, 0.05, 0.345]);
    chestPanel.rotation.x = -0.12;
    addMesh(torso, new THREE.BoxGeometry(0.21, 0.045, 0.025), glow, [0, 0.11, 0.38]);
    for (const x of [-0.11, 0, 0.11]) {
      addMesh(torso, new THREE.SphereGeometry(0.024, 10, 8), glow, [x, -0.02, 0.382]);
    }
    addMesh(torso, new THREE.BoxGeometry(0.27, 0.07, 0.04), suitShadow, [0, -0.48, 0.14]);

    const head = new THREE.Group();
    head.position.set(0, 0.98, 0);
    character.add(head);
    addMesh(head, new THREE.SphereGeometry(0.56, 36, 28), suit, [0, 0, 0], [0.94, 1.05, 0.84]);
    addMesh(head, new THREE.SphereGeometry(0.39, 32, 20), visor, [0, -0.04, 0.403], [1, 0.73, 0.34]);
    const visorTrim = addMesh(
      head,
      new THREE.TorusGeometry(0.33, 0.027, 8, 48),
      blue,
      [0, -0.04, 0.5],
      [1, 0.76, 1],
    );
    visorTrim.rotation.z = Math.PI;

    for (const x of [-0.125, 0.125]) {
      addMesh(head, new THREE.SphereGeometry(0.043, 16, 12), glow, [x, 0.005, 0.526], [0.82, 1.08, 0.52]);
    }
    const smile = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.065, -0.13, 0.53),
      new THREE.Vector3(0, -0.158, 0.54),
      new THREE.Vector3(0.065, -0.13, 0.53),
    ]);
    const smileMesh = addMesh(head, new THREE.TubeGeometry(smile, 12, 0.012, 6, false), glow, [0, 0, 0]);
    const speakingMouth = addMesh(
      head,
      new THREE.SphereGeometry(1, 16, 12),
      dark,
      [0, -0.14, 0.54],
      [0.075, 0.018, 0.018],
    );
    speakingMouth.visible = false;

    addMesh(head, new THREE.CylinderGeometry(0.018, 0.024, 0.16, 10), blue, [0.03, 0.61, 0]);
    addMesh(head, new THREE.SphereGeometry(0.052, 16, 12), glow, [0.03, 0.7, 0]);
    addMesh(head, new THREE.SphereGeometry(0.06, 16, 12), suitShadow, [-0.48, 0.02, 0]);
    addMesh(head, new THREE.SphereGeometry(0.06, 16, 12), suitShadow, [0.48, 0.02, 0]);

    const createArm = (side: -1 | 1) => {
      const arm = new THREE.Group();
      arm.position.set(side * 0.52, 0.3, 0);
      torso.add(arm);
      addMesh(arm, new THREE.SphereGeometry(0.18, 16, 12), blue, [0, 0, 0], [1, 0.92, 0.88]);
      addMesh(arm, new THREE.CapsuleGeometry(0.135, 0.37, 5, 12), suit, [side * 0.035, -0.29, 0]);
      addMesh(arm, new THREE.SphereGeometry(0.11, 14, 10), suitShadow, [side * 0.075, -0.55, 0]);
      addMesh(arm, new THREE.CapsuleGeometry(0.105, 0.28, 5, 12), suit, [side * 0.08, -0.76, 0]);
      addMesh(arm, new THREE.SphereGeometry(0.13, 16, 12), suit, [side * 0.09, -0.97, 0.02], [
        1,
        0.78,
        0.88,
      ]);
      addMesh(arm, new THREE.SphereGeometry(0.04, 10, 8), glow, [side * 0.09, -0.97, 0.13], [
        1,
        0.8,
        0.5,
      ]);
      return arm;
    };
    const leftArm = createArm(-1);
    const rightArm = createArm(1);
    addMesh(torso, new THREE.SphereGeometry(0.11, 14, 10), suit, [-0.23, -0.54, 0.01]);
    addMesh(torso, new THREE.SphereGeometry(0.11, 14, 10), suit, [0.23, -0.54, 0.01]);
    for (const side of [-1, 1] as const) {
      addMesh(
        character,
        new THREE.CapsuleGeometry(0.16, 0.46, 5, 12),
        blueDark,
        [side * 0.23, -0.77, 0],
      );
      addMesh(character, new THREE.SphereGeometry(0.19, 16, 12), suit, [side * 0.23, -1.12, 0.1], [
        1.25,
        0.63,
        1.55,
      ]);
      addMesh(character, new THREE.BoxGeometry(0.1, 0.045, 0.025), glow, [side * 0.23, -1.11, 0.28]);
    }
    addMesh(torso, new THREE.BoxGeometry(0.58, 0.07, 0.04), suitShadow, [0, 0.39, 0.2]);

    const pointerTarget = new THREE.Vector2(0, 0);
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = mount.getBoundingClientRect();
      pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.55;
      pointerTarget.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.3;
      mount.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      mount.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    };
    const handlePointerLeave = () => {
      pointerTarget.set(0, 0);
      mount.style.setProperty("--pointer-x", "50%");
      mount.style.setProperty("--pointer-y", "50%");
    };
    mount.addEventListener("pointermove", handlePointerMove);
    mount.addEventListener("pointerleave", handlePointerLeave);

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    });
    resizeObserver.observe(mount);

    let animationFrame = 0;
    let elapsed = 0;
    let previousTime = 0;
    let inView = false;
    const render = (time: number) => {
      animationFrame = 0;
      if (!inView || document.visibilityState !== "visible") return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      elapsed += delta;

      if (!reducedMotion) {
        character.position.y = -0.05 + Math.sin(elapsed * 1.35) * 0.045;
        character.rotation.y += (pointerTarget.x - character.rotation.y) * 0.045;
        character.rotation.x += (pointerTarget.y - character.rotation.x) * 0.045;
        head.rotation.y += (pointerTarget.x * 0.55 - head.rotation.y) * 0.06;
        head.rotation.x += (-pointerTarget.y * 0.45 - head.rotation.x) * 0.06;
        leftArm.rotation.z = Math.sin(elapsed * 1.4) * 0.035;
        const speaking = speakingRef.current;
        smileMesh.visible = !speaking;
        speakingMouth.visible = speaking;
        speakingMouth.scale.y = speaking ? 0.025 + Math.abs(Math.sin(elapsed * 15)) * 0.065 : 0.018;
        if (time < waveUntil.current) {
          rightArm.rotation.z = 2.3 + Math.sin(elapsed * 13) * 0.24;
        } else {
          rightArm.rotation.z += (Math.sin(elapsed * 1.2) * 0.035 - rightArm.rotation.z) * 0.08;
        }
        stars.rotation.z = elapsed * 0.012;
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };
    const startRendering = () => {
      if (animationFrame || !inView || document.visibilityState !== "visible") return;
      previousTime = 0;
      animationFrame = window.requestAnimationFrame(render);
    };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) startRendering();
      else if (animationFrame) window.cancelAnimationFrame(animationFrame);
    });
    visibilityObserver.observe(mount);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") startRendering();
      else if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeEventListener("pointerleave", handlePointerLeave);
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Points)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`character-scene reveal ${className}`.trim()}>
      <div className="character-canvas" ref={canvasMount} aria-hidden="true" />
      <div className="character-vignette" aria-hidden="true" />
      <div className="character-label">
        <span className="character-label-dot" />
        <span>CREATIVE SYSTEMS ENGINEER</span>
      </div>
      <div className="character-note">
        <span className="character-note-icon" aria-hidden="true">✳</span>
        <span><b>Ready when you are.</b><small>Choose a question to start a conversation.</small></span>
      </div>
      {webglError && <p className="character-fallback">This interactive 3D scene needs WebGL support.</p>}
      <p className="character-caption"><span>BUILT WITH CURIOSITY</span><span>✳&nbsp; THREE.JS / 01</span></p>
      <p className="character-sr-only">A friendly, interactive 3D engineer character in a blue futuristic scene. Move your pointer to look around. The character waves and speaks when you choose a question.</p>
    </div>
  );
}
