import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion } from "framer-motion";

const Elasty = () => {
  const [curvePoint, setCurvePoint] = useState({ x: 425, y: 250 });
  const containerRef = useRef<HTMLDivElement>(null);
  const stringWidth = 850;
  const stringHeight = 500;
  const elasticityFactor = 0.5;
  const maxDeflection = 100;
  const dampingFactor = 0.9;
  const [velocity, setVelocity] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsInteracting(true);
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerY = stringHeight / 2;
    const distanceFromCenter = y - centerY;
    const deflectionDirection = distanceFromCenter > 0 ? -1 : 1;
    const deflectionAmount = Math.min(
      Math.abs(distanceFromCenter) * elasticityFactor,
      maxDeflection
    );

    setCurvePoint({
      x,
      y: centerY + deflectionAmount * deflectionDirection,
    });
    setVelocity(deflectionAmount * deflectionDirection/10);
  };

  useEffect(() => {
    if (!isInteracting) {
      const interval = setInterval(() => {
        setCurvePoint((prev) => {
          const newY = prev.y + velocity;
          setVelocity(velocity * dampingFactor);
          if (Math.abs(velocity) < 0.1) {
            clearInterval(interval);
            return { x: 425, y: 250 };
          }
          return { x: prev.x, y: newY };
        });
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isInteracting, velocity]);

  const handleMouseLeave = () => {
    setIsInteracting(false);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-900 rounded-lg shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        width={stringWidth}
        height={stringHeight}
        className="w-full h-full"
        viewBox={`0 0 ${stringWidth} ${stringHeight}`}
      >
        <motion.path
          d={`M0 ${stringHeight / 2} Q ${curvePoint.x} ${curvePoint.y}, ${stringWidth} ${stringHeight / 2}`}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="stroke-white fill-none"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <motion.circle
          cx={curvePoint.x}
          cy={curvePoint.y}
          r="4"
          className="fill-red-500 opacity-50"
        />
      </svg>
    </div>
  );
};

export default Elasty;
