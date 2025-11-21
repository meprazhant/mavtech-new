"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onLoadingComplete }) {
  const [isZooming, setIsZooming] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Progress + loading messages
  const loadingTexts = [
    "Loading components...",
    "Getting fonts ready...",
    "Optimizing layout...",
    "Finalizing setup...",
  ];

  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Progress bar simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        return next >= 100 ? 100 : next;
      });
    }, 70);

    // Rotate loading texts
    const textInterval = setInterval(() => {
      setTextIndex((prev) =>
        prev + 1 < loadingTexts.length ? prev + 1 : prev
      );
    }, 700);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  // Main zoom-hide timing
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsZooming(true);

      const timer2 = setTimeout(() => {
        setIsHidden(true);
        if (onLoadingComplete) onLoadingComplete();
      }, 1000); // Zoom duration

      return () => clearTimeout(timer2);
    }, 4600); // allow MT animation + loading bar to play for 4.6s

    return () => clearTimeout(timer1);
  }, [onLoadingComplete]);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex invert flex-col items-center justify-center transition-all duration-[2000ms] ${
        isZooming ? "scale-[50]" : "scale-100"
      }`}
      style={{
        backgroundImage: 'url("https://i.ibb.co/kghN5sgx/loading.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Animated MT TEXT */}
      {!isZooming && (
        <div className="flex flex-col items-center justify-center text-center bg-[#fff] h-full w-full px-6">
          <img
            src="https://i.ibb.co/S7cfNkk1/Untitled-design.gif"
            alt="Loading animation"
            className={`
              w-[20vw] min-w-[150px] h-auto
              animate-[fadeIn_0.6s_ease-out,scalePop_0.8s_0.6s_ease-out]
            `}
          />

          {/* Loading message */}
          <p className="mt-4 text-[#65a30d] text-xl opacity-80 transition-all duration-300">
            {loadingTexts[textIndex]}
          </p>

          {/* PROGRESS BAR */}
          <div className="mt-6 w-[60vw] max-w-md h-3 bg-[#65a30d]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-150"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Tailwind keyframes inside a style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes scalePop {
          0% { transform: scale(1); }
          40% { transform: scale(1.15); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
