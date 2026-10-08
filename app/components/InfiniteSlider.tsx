"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

export type SliderBrand = {
  name: string;
  logo: StaticImageData;
  url?: string;
};

export function InfiniteSlider({ brands }: { brands: SliderBrand[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const setSpeed = (rate: number) => {
    trackRef.current?.getAnimations().forEach((animation) => {
      animation.updatePlaybackRate(rate);
    });
  };

  const group = (hidden = false) => (
    <div className="brand-group" aria-hidden={hidden || undefined}>
      {brands.map((brand) => {
        const content = (
          <>
            <Image src={brand.logo} alt={hidden ? "" : `Logo ${brand.name}`} sizes="180px" />
            <span>{brand.name}</span>
          </>
        );

        return brand.url ? (
          <a key={brand.name} href={brand.url} target="_blank" rel="noopener noreferrer" aria-label={`Visitar site de ${brand.name}`} tabIndex={hidden ? -1 : undefined}>
            {content}
          </a>
        ) : (
          <div className="brand-item" key={brand.name}>{content}</div>
        );
      })}
    </div>
  );

  return (
    <div className="infinite-slider" onMouseEnter={() => setSpeed(0.32)} onMouseLeave={() => setSpeed(1)} onFocusCapture={() => setSpeed(0.32)} onBlurCapture={() => setSpeed(1)}>
      <div className="brand-track" ref={trackRef}>{group()}{group(true)}</div>
    </div>
  );
}
