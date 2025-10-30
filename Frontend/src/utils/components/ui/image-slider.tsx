import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState, ReactNode } from "react";

interface ImagesSliderProps {
  children: ReactNode;
  overlay?: ReactNode | boolean;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}

const images = [
  "/banner1.avif",
  "/banner2.avif",
  "/banner3.avif",
  "/banner4.avif",
];

export const ImagesSlider: React.FC<ImagesSliderProps> = ({
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  // --- Load images once on mount
  useEffect(() => {
    setLoading(true);
    const loadPromises = images.map(
      (image) =>
        new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.src = image;
          img.decoding = "async";
          img.loading = "eager";
          img.onload = () => resolve(image);
          img.onerror = reject;
        })
    );

    Promise.all(loadPromises)
      .then((imgs) => {
        setLoadedImages(imgs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load images", error);
        setLoading(false);
      });
  }, []);

  // --- Navigation handlers
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // --- Autoplay + keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrevious();
    };
    window.addEventListener("keydown", handleKeyDown);

    let interval: ReturnType<typeof setInterval> | undefined;
    if (autoplay) {
      interval = setInterval(handleNext, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [autoplay]);

  // --- Motion animation setup
  const slideTransition = {
    duration: 1,
    ease: [0.645, 0.045, 0.355, 1.0],
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold bg-black bg-opacity-75 z-50">
          Loading...
        </div>
      )}

      {/* Overlay */}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
        />
      )}

      {/* All images (prevent refetching) */}
      {areImagesLoaded &&
        loadedImages.map((image, index) => (
          <motion.img
            key={image}
            src={image}
            alt={`slide-${index}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 1.05,
              y:
                direction === "up"
                  ? index === currentIndex
                    ? 0
                    : "-3%"
                  : index === currentIndex
                  ? 0
                  : "3%",
            }}
            transition={slideTransition}
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{
              zIndex: index === currentIndex ? 30 : 10,
            }}
          />
        ))}

      {/* Child content (texts/buttons/overlays) */}
      {areImagesLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};
