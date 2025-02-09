import { motion } from "framer-motion";
import { MouseEvent, useState } from "react";

export default function Link() {
  const [pathD, setPathD] = useState("M0 250 Q425 250, 845 250");

  const handleMouseMove = (event:MouseEvent<SVGSVGElement>) => {
    const { clientY } = event;
    const svgRect = event.currentTarget.getBoundingClientRect();
    const relativeY = clientY - svgRect.top;

    const bendDirection = relativeY < 250 ? 350 : 150; // Bend based on cursor position
    setPathD(`M0 250 Q425 ${bendDirection}, 845 250`);
  };

  return (
    <svg
      viewBox="0 0 850 500"
      className="w-full h-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPathD("M0 250 Q425 250, 845 250")}
    >
      <motion.path
        d={pathD}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="stroke-current text-white stroke-[2px] fill-none"
      />
    </svg>
  );
}
