"use client";
import React, { useEffect } from "react";
import { Bounded } from "@/components/Bounded";
import { View } from "@react-three/drei";
import SkyDiveSence from "@/components/SkyDiveSence";

import { useInView } from "react-intersection-observer";
import { useEditorConfigContext } from "@payloadcms/richtext-lexical/client";

type Props = {
  content: any;
};

export default function Skydive({ content }: Props) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {});

  return (
    <Bounded className="skydive h-screen">
      <h2 className="sr-only">{content.sentence}</h2>
      <View className="z-50 h-screen w-screen">
        <SkyDiveSence sentence={content.sentence} flavor={content.flavor} />
      </View>
    </Bounded>
  );
}
