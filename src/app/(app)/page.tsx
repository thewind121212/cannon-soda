import React from "react";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import AlternatingText from "@/components/layout/AlternatingText";
import { notFound } from "next/navigation";
import BigText from "@/components/layout/BigText";
import Carousel from "@/components/layout/Carousel";
import SkyDive from "@/components/layout/Skydive";
import Hero from "@/components/layout/hero";

const Page = async () => {
  const payload = await getPayloadHMR({
    config,
  });

  const data: any = await payload.findGlobal({
    slug: "homepage",
  });

  !data && notFound();

  const content = data.blockContent[0];
  const contentSkyDive = data.blockContent[1];
  const contentCarousel = data.blockContent[2];
  const contentAlternatingText = data.blockContent[3];

  return (
    <div>
      <Hero content={content} />
      <SkyDive content={contentSkyDive} />
      <Carousel
        heading={contentCarousel.heading}
        price={contentCarousel.price}
      />
      <AlternatingText content={contentAlternatingText} />
      <BigText />
    </div>
  );
};

export default Page;
