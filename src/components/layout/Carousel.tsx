"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { WavyCircles } from "../WavyCircles";
import { Group } from "three";
import gsap from "gsap";
import { SodaCanProps } from "../SodaCan";
import { ArrowIcon } from "../ArrowIcon";
import {
  Center,
  Environment,
  PresentationControls,
  View,
} from "@react-three/drei";
import { useCarouselStore } from "@/hooks/useStore";
import FloatingCanCarousel from "../FloatingCanCarousel";

const SPINS_ON_CHANGE = 8;

export const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

type Props = {
  heading: string;
  price: string;
};

export default function Carousel({ heading, price }: Props) {
  const { currentFlavorIndex, setCurrentFlavorIndex } = useCarouselStore();

  const sodaCanRefS = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRefS.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRefS.current.rotation,
      {
        ...sodaCanRefS.current.rotation,
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 2 }, 0.7);
  }

  useEffect(() => {
    if (sodaCanRefS.current) {
      sodaCanRefS.current.position.x = 0;
      sodaCanRefS.current.position.y = 0;
      sodaCanRefS.current.position.z = 0;
    }
  }, []);

  return (
    <section
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
      id="carousel"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] py-12 opacity-50" />
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />
      <h2 className="relative text-center text-5xl font-bold">{heading}</h2>
      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* left */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="left"
          label="Previous Flavor"
        />
        {/* cans */}
        <View
          className="z-[60] aspect-square h-[70vmin] min-h-40"
          style={{ touchAction: "none" }}
        >
          <Center position={[0, 0, 1.5]}>
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              azimuth={[-Infinity, Infinity]}
              polar={[-Math.PI / 2, Math.PI / 2]}
            >
              <FloatingCanCarousel
                ref={sodaCanRefS}
                floatIntensity={0.3}
                rotationIntensity={1}
                flavorIndex={currentFlavorIndex}
              />
            </PresentationControls>
          </Center>
          <Environment
            files={["/hdrs/field.hdr"]}
            environmentIntensity={3}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight position={[0, 1, 1]} intensity={6} />
        </View>
        {/* right */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Flavor"
        />
      </div>
      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <p className="mt-2 text-2xl font-normal opacity-90">{price}</p>
      </div>
    </section>
  );
}

function ArrowButton({
  direction,
  label,
  onClick,
}: {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="z-50 size-12 rounded-full border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon
        className={clsx("size-full", direction === "right" && "-scale-x-100")}
      />

      <span className="sr-only">{label}</span>
    </button>
  );
}
