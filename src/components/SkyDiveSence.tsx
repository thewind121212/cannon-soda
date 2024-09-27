import React, { useEffect } from "react";
import { useRef } from "react";
import * as THREE from "three";
import FloatingCan from "./FloatingCan";
import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  sentence: string | null;
  flavor: any;
};

export default function SkyDiveSence({ sentence, flavor }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudGroupRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 105 * (Math.PI / 180);

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(distance),
  });

  useGSAP(() => {
    if (
      !cloudGroupRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current ||
      !canRef.current ||
      !wordsRef.current
    )
      return;
    gsap.set(cloudGroupRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, { ...getXYPositions(4) });
    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPositions(-7), z: 2 },
    );
    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });
    const DISTANCE = 15;
    const DURATION = 6;
    gsap.to([cloud1Ref.current.position, cloud2Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });
    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * -2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });
    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * -2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
      delay: DURATION / 2,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
      },
    });

    scrollTl.to("body", {
      backgroundColor: "#C0F0F5",
      overwrite: "auto",
      duration: 0.1,
    });

    scrollTl
      .to(cloudGroupRef.current.position, { z: 0, duration: 0.3 }, 0)
      .to(canRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYPositions(-7), z: -7 },
          ],
          stagger: 0.3,
        },
        0,
      )
      .to(canRef.current.position, {
        ...getXYPositions(-4),
        duration: 0.5,
        ease: "back.in(1.7)",
      })
      .to(cloudGroupRef.current.position, { z: 7, duration: 0.5 });
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0}
          floatIntensity={3}
          floatSpeed={3}
          key={flavor.name + "skydive"}
        ></FloatingCan>
      </group>
      {/* clouds */}
      <Clouds ref={cloudGroupRef as any}>
        <Cloud ref={cloud1Ref as any} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref as any} bounds={[10, 10, 2]} />
      </Clouds>
      {/* text */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color={"#c5c0f5"} />}
      </group>
      <ambientLight intensity={2} color={"#9DDEFA"} />
      <pointLight intensity={30} color="#8C0413" decay={0.6} />
      <Environment files={["/hdrs/field.hdr"]} environmentIntensity={2} />
    </group>
  );
}

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(" ");

  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true);

  return words.map((word: string, wordIndex: number) => (
    <Text
      key={`${wordIndex}-${word}`}
      scale={isDesktop ? 1 : 0.5}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
    >
      {word}
    </Text>
  ));
}
