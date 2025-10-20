import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

// Utility function for className merging
const cn = (...classes) => classes.filter(Boolean).join(" ");

// MouseEnter Context
const MouseEnterContext = createContext(undefined);

// CardContainer Component
export const CardContainer = ({ children, className, containerClassName }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef.current)
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("py-2 flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

// CardBody Component
export const CardBody = ({ children, className }) => (
  <div
    className={cn(
      "[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
      className
    )}
  >
    {children}
  </div>
);

// CardItem Component
export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    ref.current.style.transform = isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Custom hook for mouse enter
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

// ✅ Compact Tooltip Component
export const Tooltip = ({ stats, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const hideTimeout = useRef(null);

  useEffect(() => {
    if (showTooltip && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipHeight = 90; // reduced height
      let topPos = rect.top - tooltipHeight - 2; // reduced gap
      if (topPos < 6) topPos = 6;

      setPosition({
        top: topPos,
        left: rect.left + rect.width / 2,
      });
    }
  }, [showTooltip]);

  const handleEnter = () => {
    clearTimeout(hideTimeout.current);
    setShowTooltip(true);
  };

  const handleLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 100);
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="relative inline-block"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </div>

      {showTooltip &&
        createPortal(
          <div
            ref={tooltipRef}
            className="fixed z-[9999] w-36 pointer-events-auto" // smaller width
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: "translate(-50%, 0)",
            }}
          >
            <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-md shadow-lg p-1.5 text-[10px] border border-gray-700 relative">
              <div className="font-semibold text-center mb-1 text-[11px]">Stats</div>
              <div className="space-y-0.5">
                {Object.entries(stats || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="capitalize text-[10px]">{key}:</span>
                    <span
                      className={
                        key.toLowerCase() === "betrayal"
                          ? "text-red-400 font-semibold text-[10px]"
                          : value >= 0
                          ? "text-green-400 font-semibold text-[10px]"
                          : "text-red-400 font-semibold text-[10px]"
                      }
                    >
                      {value >= 0 ? "+" : ""}
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[1px]">
                <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
