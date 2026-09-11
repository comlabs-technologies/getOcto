"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { Dialog } from "@/components/primitives/dialog";
import { media } from "@/lib/media";

type VideoModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function useVideoModal() {
  const context = useContext(VideoModalContext);
  if (!context) {
    throw new Error("useVideoModal must be used inside <VideoModalProvider>");
  }
  return context;
}

/**
 * Owns the single YouTube dialog shared by the hero preview and the case-study
 * poster. The iframe is only created while the dialog is open, so nothing from
 * YouTube is requested on first paint.
 */
export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ open, close, isOpen }),
    [open, close, isOpen],
  );

  return (
    <VideoModalContext.Provider value={value}>
      {children}
      <VideoModal open={isOpen} onClose={close} />
    </VideoModalContext.Provider>
  );
}

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      label="Rho customer story"
      overlayClassName="bg-black/90 px-page py-16"
      surfaceClassName="w-full max-w-[1120px]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-2 right-2 z-10 inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-black/55 text-white/80 transition-colors duration-[160ms] hover:bg-black/80 hover:text-white md:-top-12 md:right-0 md:border-transparent md:bg-transparent"
      >
        <X size={20} aria-hidden="true" />
      </button>
      <div
        className="relative w-full overflow-hidden bg-black"
        style={{ aspectRatio: "16 / 9" }}
      >
        {open ? (
          <iframe
            src={media.rhoYouTube}
            title="How Rho automates QA and deploys agents to run customer ops"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : null}
      </div>
    </Dialog>
  );
}
