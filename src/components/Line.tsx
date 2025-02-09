import { motion } from "framer-motion";
import { useState } from "react";

export default function Line() {
  const [hover, setHover] = useState(false);

  return (
    <svg
      viewBox="0 0 850 500"
      className="w-full h-auto" // Tailwind classes here
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.path
        d="M0 250 Q425 250, 845 250"
        animate={{
          d: hover
            ? "M0 250 Q425 150, 845 250"
            : "M0 250 Q425 250, 845 250",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ stroke: "currentColor", color: "white", strokeWidth: 2, fill: "none" }} // Style with inline styles
      />
    </svg>
  );
}