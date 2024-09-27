"use client";
import React from "react";
import { Bounded } from "@/components/Bounded";
import { TextSplitter } from "@/components/TextSplitter";
import Button from "@/components/Button";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { View } from "@react-three/drei";
import Sence from "./Sence";
import { Bubbles } from "../Bubbles";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useStore } from "@/hooks/useStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  content: any;
};

export default function Hero({ content }: Props) {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (isDesktop && !ready) return;
      const introTl = gsap.timeline();

      introTl
        .set(".hero", {
          opacity: 1,
        })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 1,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          {
            backgroundColor: "#FDE047",
          },
          {
            backgroundColor: "#D9F99D",
            overwrite: "auto",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 0.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
        });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded className="hero opacity-0">
      {isDesktop && (
        <View className="hero-sence ffpointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Sence />
          <Bubbles />
        </View>
      )}
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 lg:text-[13rem]">
              <TextSplitter
                text={content.heading}
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>
            <p className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              {content.subHeading}
            </p>
            <p className="hero-body text-2xl font-normal text-sky-950">
              {content.body}
            </p>
            <Button
              className="hero-button mt-12"
              buttonText={content.buttonText}
              buttonLink={content.buttonLink}
            />
          </div>
        </div>
        <div className="text-side relative z-[80] grid h-screen place-items-center gap-4 md:grid-cols-2">
          <Image
            src={content.cansImage.url}
            width={1920}
            height={1080}
            className="h-auto w-auto md:hidden"
            alt={content.cansImage.text}
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <TextSplitter text={content.secondHeading} />
            </h2>
            <p className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              {content.secondBody}
            </p>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
