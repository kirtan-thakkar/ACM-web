"use client";
import React from 'react';

const ClipPathTitle = ({ title, color, bg, className, borderColor }) => {
  return (
    <div className="relative flex justify-center w-full my-1 md:my-2">
      <div
        style={{
          clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
          borderColor: borderColor,
          color: color,
        }}
        className={`${className} border-[3px] md:border-[4px] text-nowrap opacity-0`}
      >
        <div
          className="px-6 py-3 md:px-14 md:py-4 font-bold text-xl md:text-5xl uppercase tracking-tighter"
          style={{
            backgroundColor: bg,
          }}
        >
          <h2
            style={{
              color: color,
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default ClipPathTitle;
