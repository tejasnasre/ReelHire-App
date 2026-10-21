"use client";

import { Cancel01Icon, PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps } from "react";
import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

export type VideoPlayerProps = ComponentProps<typeof MediaController>;

export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
  <MediaController
    style={{
      ...style,
    }}
    {...props}
  />
);

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
  <MediaControlBar {...props} />
);

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const VideoPlayerTimeRange = ({
  className,
  ...props
}: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange
    className={cn(
      "[--media-range-thumb-opacity:0] [--media-range-track-height:2px]",
      className,
    )}
    {...props}
  />
);

export type VideoPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>;

export const VideoPlayerTimeDisplay = ({
  className,
  ...props
}: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;

export const VideoPlayerVolumeRange = ({
  className,
  ...props
}: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

export const VideoPlayerPlayButton = ({
  className,
  ...props
}: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton className={cn("", className)} {...props} />
);

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
>;

export const VideoPlayerSeekBackwardButton = ({
  className,
  ...props
}: VideoPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
>;

export const VideoPlayerSeekForwardButton = ({
  className,
  ...props
}: VideoPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const VideoPlayerMuteButton = ({
  className,
  ...props
}: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton className={cn("", className)} {...props} />
);

export type VideoPlayerContentProps = ComponentProps<"video">;

export const VideoPlayerContent = ({
  className,
  ...props
}: VideoPlayerContentProps) => (
  <video className={cn("mb-0 mt-0", className)} {...props} />
);

type Box = { top: number; left: number; width: number; height: number };

// Where the 16:9 player sits once open: centered, inside the viewport.
const getPlayerBox = (): Box => {
  const width = Math.min(
    window.innerWidth - 32,
    1280,
    ((window.innerHeight - 96) * 16) / 9,
  );
  const height = (width * 9) / 16;
  return {
    width,
    height,
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
  };
};

// The trigger's rect as a clip-path inset on the player box, so the player
// grows out of (and collapses back into) whatever was clicked.
const getStartClip = (trigger: DOMRect, player: Box, radius: number) => {
  const pct = (value: number, total: number) =>
    `${Math.min(Math.max((value / total) * 100, 0), 100)}%`;
  const top = pct(trigger.top - player.top, player.height);
  const right = pct(
    player.left + player.width - trigger.right,
    player.width,
  );
  const bottom = pct(
    player.top + player.height - trigger.bottom,
    player.height,
  );
  const left = pct(trigger.left - player.left, player.width);
  return `inset(${top} ${right} ${bottom} ${left} round ${radius}px)`;
};

export type Skiper67Props = {
  /** Video played in the fullscreen player. */
  src: string;
  poster?: string;
  /** What gets clicked: a thumbnail, a device mockup, a card. */
  children: React.ReactNode;
  /** Corner radius of the trigger, so the open animation starts flush with it. */
  radius?: number;
  /** Cursor-following "Play" label. Turn off when the trigger is already a labelled button. */
  playHint?: boolean;
  /** Button component to render as the trigger, e.g. a styled design-system button. */
  as?: React.ElementType<React.ComponentProps<"button">>;
  label?: string;
  className?: string;
};

export const Skiper67 = ({
  src,
  poster,
  children,
  radius = 12,
  playHint = true,
  as: Trigger = "button",
  label = "Play video",
  className,
}: Skiper67Props) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [popover, setPopover] = useState<{ box: Box; clip: string } | null>(
    null,
  );

  const SPRING = {
    mass: 0.1,
  };

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!playHint || e.pointerType !== "mouse") return;
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  const open = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const box = getPlayerBox();
    setPopover({
      box,
      clip: getStartClip(trigger.getBoundingClientRect(), box, radius),
    });
  };

  const close = () => {
    setPopover(null);
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <Trigger
        ref={triggerRef}
        type="button"
        aria-label={playHint ? label : undefined}
        aria-haspopup="dialog"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          opacity.set(0);
        }}
        onClick={open}
        className={cn(
          "relative",
          playHint &&
            "block text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4",
          className,
        )}
      >
        {children}
        {playHint && (
          <>
            <motion.span
              aria-hidden
              style={{ x, y, opacity }}
              className="pointer-events-none absolute left-0 top-0 z-50 hidden [@media(hover:hover)]:block"
            >
              <span className="flex -translate-x-1/2 -translate-y-1/2 select-none items-center gap-2 p-2 text-sm font-medium text-white mix-blend-exclusion">
                <HugeiconsIcon icon={PlayIcon} size={16} className="fill-white" />
                Play
              </span>
            </motion.span>
            {/* No cursor to follow on touch screens: show a fixed badge instead. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-50 hidden place-items-center [@media(hover:none)]:grid"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-black/55 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-md">
                <HugeiconsIcon icon={PlayIcon} size={14} className="fill-white" />
                Play
              </span>
            </span>
          </>
        )}
      </Trigger>
      {/* Portal out: a transformed or overflow-clipped ancestor (like a
          hero layout) would otherwise trap the fixed overlay. */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {popover && (
              <VideoPopOver
                src={src}
                poster={poster}
                label={label}
                box={popover.box}
                startClip={popover.clip}
                radius={radius}
                onClose={close}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

const VideoPopOver = ({
  src,
  poster,
  label,
  box,
  startClip,
  radius,
  onClose,
}: {
  src: string;
  poster?: string;
  label: string;
  box: Box;
  startClip: string;
  radius: number;
  onClose: () => void;
}) => {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const endClip = `inset(0% 0% 0% 0% round ${Math.min(radius, 16)}px)`;

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Lock page scroll, move focus into the dialog and close on Escape.
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const spring = reduceMotion
    ? { duration: 0.2 }
    : { duration: 1, type: "spring" as const, stiffness: 100, damping: 20 };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-101"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3, delay: reduceMotion ? 0 : 0.5 } }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-lg"
        onClick={onClose}
      />
      <motion.div
        initial={{
          clipPath: reduceMotion ? endClip : startClip,
          opacity: reduceMotion ? 0 : 1,
        }}
        animate={{ clipPath: endClip, opacity: 1 }}
        exit={{
          clipPath: reduceMotion ? endClip : startClip,
          opacity: 0,
          transition: {
            ...spring,
            opacity: { duration: 0.2, delay: reduceMotion ? 0 : 0.8 },
          },
        }}
        transition={spring}
        style={{
          top: box.top,
          left: box.left,
          width: box.width,
          height: box.height,
        }}
        className="absolute overflow-hidden bg-black"
      >
        <VideoPlayer style={{ width: "100%", height: "100%" }}>
          <VideoPlayerContent
            src={src}
            poster={poster}
            autoPlay
            playsInline
            slot="media"
            className="w-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-3 top-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 focus-visible:outline-2 focus-visible:outline-white"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
          </button>
          <VideoPlayerControlBar className="absolute bottom-0 left-1/2 flex w-full max-w-7xl -translate-x-1/2 items-center justify-center px-5 mix-blend-exclusion md:px-10 md:py-5">
            <VideoPlayerPlayButton className="h-4 bg-transparent" />
            <VideoPlayerTimeRange className="bg-transparent" />
            <VideoPlayerMuteButton className="size-4 bg-transparent" />
          </VideoPlayerControlBar>
        </VideoPlayer>
      </motion.div>
    </div>
  );
};
