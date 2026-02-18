import React from "react";

interface ProfessionalDualSectionProps {
  leftTitle: string;
  leftText: string;
  rightTitle: string;
  rightText: string;
}

export default function ProfessionalDualSection({
  leftTitle,
  leftText,
  rightTitle,
  rightText,
}: ProfessionalDualSectionProps) {
  return (
    <section className="w-full bg-[#0b0b0d] py-20">
      <div className="w-full">
        <div className="grid lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="bg-[#111114] border-r border-gray-800 px-8 sm:px-12 lg:px-16 py-14 flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              {leftTitle}
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              {leftText}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#16161a] px-8 sm:px-12 lg:px-16 py-14 flex flex-col">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              {rightTitle}
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              {rightText}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
