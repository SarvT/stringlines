// import React, { useState, useRef, useEffect } from 'react';

// const ElasticString = () => {
//   const [curvePoint, setCurvePoint] = useState({ x: 0, y: 250 });
//   const containerRef = useRef(null);
//   const stringWidth = 800;
//   const stringHeight = 500;
//   const elasticityFactor = 0.5; // Controls how much the string bends
//   const maxDeflection = 100; // Maximum bend amount

//   const handleMouseMove = (e) => {
//     if (!containerRef.current) return;
    
//     const rect = containerRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
    
//     // Calculate the deflection based on distance from the center line
//     const centerY = stringHeight / 2;
//     const distanceFromCenter = y - centerY;
    
//     // Determine deflection direction based on cursor position
//     const deflectionDirection = distanceFromCenter > 0 ? -1 : 1;
    
//     // Calculate deflection amount based on proximity to string
//     const deflectionAmount = Math.min(
//       Math.abs(distanceFromCenter) * elasticityFactor,
//       maxDeflection
//     );

//     setCurvePoint({
//       x,
//       y: centerY + (deflectionAmount * deflectionDirection)
//     });
//   };

//   const handleMouseLeave = () => {
//     // Reset string to center when mouse leaves
//     setCurvePoint({ x: 0, y: stringHeight / 2 });
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className="w-full h-full bg-gray-900 rounded-lg shadow-lg"
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//     >
//       <svg 
//         width={stringWidth} 
//         height={stringHeight}
//         className="w-full h-full"
//         viewBox={`0 0 ${stringWidth} ${stringHeight}`}
//       >
//         {/* String path */}
//         <path
//           d={`M0 ${stringHeight/2} Q ${curvePoint.x} ${curvePoint.y}, ${stringWidth} ${stringHeight/2}`}
//           className="stroke-white fill-none"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
        
//         {/* Optional: Visual indicator of control point */}
//         <circle
//           cx={curvePoint.x}
//           cy={curvePoint.y}
//           r="4"
//           className="fill-red-500 opacity-50"
//         />
//       </svg>
//     </div>
//   );
// };

// export default ElasticString;

import { useState, useRef, MouseEvent } from 'react';

const ElasticString = () => {
  const [curvePoint, setCurvePoint] = useState({ x: 0, y: 250 });
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the div
  const stringWidth = 800;
  const stringHeight = 500;
  const elasticityFactor = 0.5;
  const maxDeflection = 100;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => { // Type the event
    if (!containerRef.current) return;

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
  };

  const handleMouseLeave = () => {
    setCurvePoint({ x: 0, y: stringHeight / 2 });
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
        <path
          d={`M0 ${stringHeight / 2} Q ${curvePoint.x} ${curvePoint.y}, ${stringWidth} ${stringHeight / 2}`}
          className="stroke-white fill-none"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle
          cx={curvePoint.x}
          cy={curvePoint.y}
          r="4"
          className="fill-red-500 opacity-50"
        />
      </svg>
    </div>
  );
};

export default ElasticString;