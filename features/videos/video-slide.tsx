"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play } from "lucide-react";

interface VideoSlideProps {
  video: { src: string; poster: string; caption: string };
  isActive: boolean;
  muted: boolean;
}

export function VideoSlide({ video, isActive, muted }: VideoSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isActive && !paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isActive, paused]);

  useEffect(() => {
    if (!isActive) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setPaused(false);
      setProgress(0);
      /* eslint-enable react-hooks/set-state-in-effect */
      const el = videoRef.current;
      if (el) el.currentTime = 0;
    }
  }, [isActive]);

  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    setProgress((el.currentTime / el.duration) * 100);
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      setPaused(false);
      el.play().catch(() => undefined);
    } else {
      setPaused(true);
      el.pause();
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0B1729] cursor-pointer" onClick={togglePlay}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={video.src}
        poster={video.poster}
        loop
        playsInline
        muted={muted}
        preload={isActive ? "auto" : "metadata"}
        onTimeUpdate={handleTimeUpdate}
        aria-label={video.caption}
      />

      {/* Premium progress bar — thin, brand gradient */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 z-10 h-[3px] bg-white/10">
        <div
          className="h-full transition-[width] duration-100 ease-linear"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #2563EB, #38BDF8, #60A5FA)",
          }}
        />
      </div>

      {/* Play hint — subtle */}
      {paused && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
            <Play className="h-6 w-6 fill-white text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
