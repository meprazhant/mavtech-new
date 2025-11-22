"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center, Text, Stars } from "@react-three/drei";
import * as THREE from "three";

function useScrollProgress() {
    const scroll = useRef(0);
    const scrollPixels = useRef(0);

    useEffect(() => {
        const update = () => {
            const doc = document.documentElement;
            const body = document.body;
            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                doc.clientHeight,
                doc.scrollHeight,
                doc.offsetHeight
            );
            scrollPixels.current = window.scrollY;
            const p = window.scrollY / (height - window.innerHeight || 1);
            scroll.current = THREE.MathUtils.clamp(p, 0, 1);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);
    return { scroll, scrollPixels };
}

function Logo({ onReady, modelUrl, scrollRef, scrollPixelsRef, debug = false, floating = true }) {
    const gltf = useGLTF(modelUrl);
    const group = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (!gltf || !gltf.scene) return;

        const p = scrollRef.current || 0;
        const total = 3;
        const seg = Math.min(total - 1, Math.floor(p * total));
        const localT = THREE.MathUtils.clamp((p - seg / total) * total, 0, 1);

        gltf.scene.traverse((child) => {
            if (!child.isMesh || !child.material) return;

            const colors = [
                new THREE.Color("orange"),
                new THREE.Color("blue"),
                new THREE.Color("green"),
            ];

            const nextIndex = Math.min(seg + 1, colors.length - 1);
            child.material.color.lerpColors(colors[seg], colors[nextIndex], localT);

            const glow = Math.sin((p + seg) * Math.PI) * 0.4;
            child.material.emissive = child.material.color.clone().multiplyScalar(glow);
        });
    });

    useEffect(() => {
        if (!gltf || !gltf.scene) return;
        gltf.scene.updateMatrixWorld(true);
    }, [gltf]);

    const bars = useMemo(() => {
        if (!gltf || !gltf.scene) return null;

        const meshes = [];
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                const mesh = child;
                const box = new THREE.Box3().setFromObject(mesh);
                const center = new THREE.Vector3();
                box.getCenter(center);
                const size = new THREE.Vector3();
                box.getSize(size);
                meshes.push({ mesh, box, center, size });
            }
        });

        if (meshes.length === 0) return null;
        meshes.sort((a, b) => a.center.x - b.center.x);

        if (meshes.length <= 3) return meshes.slice(0, 3);

        const xs = meshes.map((m) => m.center.x);
        const sortedXs = xs.slice().sort((a, b) => a - b);
        const centroids = [
            sortedXs[0],
            sortedXs[Math.floor(sortedXs.length / 2)],
            sortedXs[sortedXs.length - 1],
        ];

        let changed = true;
        let groups = [[], [], []];
        for (let iter = 0; iter < 10 && changed; iter++) {
            groups = [[], [], []];
            for (const m of meshes) {
                const d0 = Math.abs(m.center.x - centroids[0]);
                const d1 = Math.abs(m.center.x - centroids[1]);
                const d2 = Math.abs(m.center.x - centroids[2]);
                const idx = d0 < d1 ? (d0 < d2 ? 0 : 2) : (d1 < d2 ? 1 : 2);
                groups[idx].push(m);
            }

            changed = false;
            for (let i = 0; i < 3; i++) {
                if (groups[i].length === 0) continue;
                const newC = groups[i].reduce((s, m) => s + m.center.x, 0) / groups[i].length;
                if (Math.abs(newC - centroids[i]) > 1e-4) {
                    centroids[i] = newC;
                    changed = true;
                }
            }
        }

        const grouped = groups
            .map((g) => {
                if (g.length === 0) return null;
                const box = g[0].box.clone();
                for (let i = 1; i < g.length; i++) box.union(g[i].box);
                const center = new THREE.Vector3();
                box.getCenter(center);
                const size = new THREE.Vector3();
                box.getSize(size);
                return { box, center, size };
            })
            .filter(Boolean);

        grouped.sort((a, b) => a.center.x - b.center.x);

        if (grouped.length < 3) {
            return meshes
                .slice()
                .sort((a, b) => b.size.x - a.size.x)
                .slice(0, 3)
                .map((m) => ({ box: m.box, center: m.center, size: m.size }));
        }

        return grouped.slice(0, 3);
    }, [gltf]);

    useEffect(() => {
        if (!bars || bars.length < 1) return;

        const cleaned = bars.map((b) => ({
            center: b.center.clone(),
            size: b.size.clone(),
            box: b.box.clone(),
        }));

        onReady?.(cleaned);
    }, [bars, onReady]);

    //
    // ⭐ MAIN ANIMATION LOOP
    //
    useFrame((state, delta) => {
        if (!group.current) return;

        const p = scrollRef?.current || 0;
        const scrollPx = scrollPixelsRef?.current || 0;

        // 📱 Detect mobile viewport
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

        // 🌟 SCALE LOGIC
        let targetScale = 0.2;

        if (scrollPx < 500) {
            const transition = scrollPx / 500;
            targetScale = THREE.MathUtils.lerp(0.2, 1.0, transition);
        } else {
            const total = 3;
            const seg = Math.min(total - 1, Math.floor(p * total));
            const localT = THREE.MathUtils.clamp((p - seg / total) * total, 0, 1);

            if (localT < 0.5) {
                const t = THREE.MathUtils.smoothstep(localT / 0.5, 0, 1);
                targetScale = THREE.MathUtils.lerp(1.0, 1.8, t);
            } else {
                const t = (localT - 0.5) / 0.5;
                const pulse = Math.sin(t * Math.PI * 2) * 0.05;
                targetScale = 1.8 + pulse;
            }
        }

        // 🌟 HOVER SCALE BOOST
        if (hovered) {
            targetScale = Math.max(targetScale, 0.3); // exact 0.2 → 0.3
        }

        const newScale = THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.08);
        group.current.scale.set(newScale, newScale, newScale);

        // 🌟 POSITION LOGIC
        let targetX = 0;
        let targetY = 0;

        if (scrollPx < 500) {
            const t = THREE.MathUtils.smoothstep(scrollPx / 500, 0, 1);

            if (isMobile) {
                // 📱 Mobile: start centered (x=0) and ~40px from top
                targetX = THREE.MathUtils.lerp(0, 0, t);  // Always centered
                targetY = THREE.MathUtils.lerp(1.5, 0, t); // ~40px from top visually
            } else {
                // 🖥️ Desktop: original top-left positioning
                targetX = THREE.MathUtils.lerp(-1.8, 0, t);
                targetY = THREE.MathUtils.lerp(2.1, 0, t);
            }
        }

        group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.08);

        const floatingY = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
        const baseY = targetY + (floating ? floatingY : 0);

        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, baseY, 0.08);

        // 🌟 ROTATION — only when scroll OR hover
        if (scrollPx > 5 || hovered) {
            group.current.rotation.y += delta * 0.4;
        } else {
            // ⭐ Smoothly reset rotation when back at top
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0, 0.08);
        }
    });

    return (
        <group
            ref={group}
            scale={[0.5, 0.5, 0.5]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Center>
                <primitive object={gltf.scene} />
            </Center>
        </group>
    );
}


function ScrollCamera({ scrollRef, scrollPixelsRef, targets }) {
    const { camera, size } = useThree();
    const camPos = new THREE.Vector3();
    const camLookAt = new THREE.Vector3();

    const basePos = new THREE.Vector3(0, 0, 6);

    useEffect(() => {
        camera.near = 0.01;
        camera.far = 1000;
        camera.updateProjectionMatrix();
    }, [camera]);

    useFrame(() => {
        const p = scrollRef.current || 0;
        const scrollPx = scrollPixelsRef.current || 0;

        if (!targets || targets.length < 3) {
            camera.position.lerp(basePos, 0.08);
            camera.lookAt(0, 0, 0);
            return;
        }

        const total = 3;
        const seg = Math.min(total - 1, Math.floor(p * total));
        const localT = THREE.MathUtils.clamp((p - (seg / total)) * total, 0, 1);

        const targetSection = targets[seg];
        const zoomDistance = 2.5;
        const zoomPos = new THREE.Vector3(
            targetSection.center.x,
            targetSection.center.y,
            targetSection.center.z + zoomDistance
        );

        let finalPos = new THREE.Vector3();
        let finalLookAt = new THREE.Vector3();

        // In first 500px, keep camera at base position but adjust look-at
        if (scrollPx < 500) {
            finalPos.copy(basePos);
            camera.position.copy(basePos);
            camera.lookAt(0, 0, 0);
            return;
        }

        // After 500px, continue with original zoom animation
        if (localT < 0.5) {
            const t = THREE.MathUtils.smoothstep(localT / 0.5, 0, 1);
            finalPos.lerpVectors(basePos, zoomPos, t);
            finalLookAt.lerpVectors(new THREE.Vector3(0, 0, 0), targetSection.center, t);
        } else {
            const t = (localT - 0.5) / 0.5;
            finalPos.copy(zoomPos);
            const parallaxOffset = Math.sin(t * Math.PI) * 0.15;
            finalPos.x += parallaxOffset;
            finalLookAt.copy(targetSection.center);
        }

        camPos.copy(camera.position).lerp(finalPos, 0.06);
        camera.position.copy(camPos);

        camLookAt.lerp(finalLookAt, 0.06);
        camera.lookAt(camLookAt);
    });

    return null;
}

export default function ModelView({ modelUrl: MODEL_URL }) {
    const { scroll: scrollRef, scrollPixels: scrollPixelsRef } = useScrollProgress();
    const [targets, setTargets] = useState(null);

    useEffect(() => {
        // Create tall scrollable content
        document.body.style.height = '400vh';
        return () => {
            document.body.style.height = 'auto';
        };
    }, []);

    return (
        <>
            <Canvas
                style={{
                    position: "fixed",
                    inset: 0,
                    width: "100vw",
                    height: "100vh",
                    pointerEvents: "none",
                }}
                camera={{ position: [0, 0, 6], fov: 45 }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight intensity={1.2} position={[5, 5, 5]} />
                <pointLight position={[0, -10, 10]} intensity={0.4} />

                <Stars radius={60} depth={40} count={1000} factor={4} fade />

                <Suspense fallback={null}>
                    <Logo
                        modelUrl={MODEL_URL}
                        scrollRef={scrollRef}
                        scrollPixelsRef={scrollPixelsRef}
                        onReady={(bars) => {
                            const plain = bars.map((b) => ({
                                center: b.center.clone(),
                                size: b.size.clone(),
                                box: b.box.clone(),
                            }));
                            setTargets(plain);
                        }}
                    />
                </Suspense>

                <ScrollCamera scrollRef={scrollRef} scrollPixelsRef={scrollPixelsRef} targets={targets} />
            </Canvas>
        </>
    );
}



