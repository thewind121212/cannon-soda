import React from "react";

type Props = {};

export default function BigText({}: Props) {
  return (
    <section className="min-h-screen w-screen overflow-hidden bg-[#FE6334] text-[#FEE823]">
      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7]">
        <div className="text-[34vw]">Soda</div>
        <div className="grid gap-[3vw] text-[34vw] md:flex md:text-[11vw]">
          <span className="inline-block">that</span>
          <span className="inline-block max-md:text-[27vw]">make</span>
          <span className="inline-block max-md:text-[40vw]">you</span>
        </div>
        <div className="text-[32vw]">smile</div>
      </h2>
    </section>
  );
}
