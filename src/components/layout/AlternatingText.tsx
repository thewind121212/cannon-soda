"use client";
import React from "react";
import { Bounded } from "../Bounded";
import AlternatingTextSence from "../AlternatingTextSence";
import { View } from "@react-three/drei";
import clsx from "clsx";

type Props = {
  content: any;
};

export default function AlternatingText({ content }: Props) {
  const { textGroup } = content;
  return (
    <Bounded className="alternating-text-container relative bg-yellow-300 text-sky-950">
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <AlternatingTextSence />
          </View>
          {textGroup.map((text: any, index: number) => {
            return (
              <div
                key={text.id}
                className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
              >
                <div
                  className={clsx(
                    index % 2 === 0 ? "col-start-1" : "col-start-2",
                    "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/20",
                  )}
                >
                  <h2 className="text-balance text-6xl font-bold">
                    {text.heading}
                  </h2>
                  <p className="mt-4 text-xl">{text.subHeading}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Bounded>
  );
}
