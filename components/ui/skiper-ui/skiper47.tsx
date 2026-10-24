"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useSyncExternalStore } from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Skiper47 = () => {
  const images = [
    {
      src: "/images/x.com/11.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_001 className="" images={images} showPagination loop />
    </div>
  );
};

export { Skiper47 };

const Carousel_001 = ({
  images = [],
  slides,
  className,
  slideClassName,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  autoplayDelay = 1500,
  spaceBetween = 40,
  slidesPerView = 2.43,
  visibleSides,
}: {
  images?: { src: string; alt: string }[];
  /** Arbitrary slide content, used instead of `images`. */
  slides?: { key: string; node: React.ReactNode }[];
  className?: string;
  /** Replaces the default image slide sizing. */
  slideClassName?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  /** Show only this many slides on each side of the active one; the rest fade out. */
  visibleSides?: number;
}) => {
  const reduceMotion = useReducedMotion();
  // Swiper reads the clock while it sets up, which Next.js won't allow during
  // prerender, so it only mounts in the browser.
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const css = `
  .Carousal_001 {
    padding-bottom: 50px !important;
    --swiper-theme-color: var(--foreground);
    --swiper-pagination-bullet-inactive-color: var(--muted-foreground);
  }
  `;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("w-3xl relative", className)}
    >
      <style>{css}</style>

      {!isClient ? (
        // Same footprint as the mounted carousel (first slide centered, room
        // for pagination) so nothing shifts when Swiper takes over.
        <div className="Carousal_001 flex justify-center overflow-hidden">
          <div className={cn("shrink-0", slideClassName)}>
            {slides ? (
              slides[0]?.node
            ) : images[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="!h-[320px] h-full w-full border object-cover"
                src={images[0].src}
                alt={images[0].alt}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay && !reduceMotion
              ? {
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={loop}
          slidesPerView={slidesPerView}
          onProgress={(swiper) => {
            if (visibleSides === undefined) return;
            // Coverflow keeps each slide's distance from the active one in
            // `progress`; fade slides out over the step past the limit.
            for (const slide of swiper.slides) {
              const distance = Math.abs((slide as HTMLElement & { progress: number }).progress);
              const opacity = Math.min(1, Math.max(0, visibleSides + 1 - distance));
              slide.style.opacity = String(opacity);
              slide.style.pointerEvents = opacity === 0 ? "none" : "";
            }
          }}
          coverflowEffect={{
            rotate: 0,
            slideShadows: false,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                  // Keeps the dot row short when slides are duplicated for looping.
                  dynamicBullets: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_001"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {slides
            ? slides.map((slide) => (
                <SwiperSlide key={slide.key} className={slideClassName}>
                  {slide.node}
                </SwiperSlide>
              ))
            : images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className={cn("!h-[320px] w-full border", slideClassName)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-full w-full object-cover"
                    src={image.src}
                    alt={image.alt}
                  />
                </SwiperSlide>
              ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      )}
    </motion.div>
  );
};

export { Carousel_001 };

/**
 * Skiper 47 Carousel_001 — React + Swiper
 * Built with Swiper.js - Read docs to learn more https://swiperjs.com/
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
