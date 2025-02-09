# StringLines 
![logo](https://github.com/user-attachments/assets/fc4aaf33-9122-4fa5-a66e-4d77b9301057)

[VISIT](https://stringlines.vercel.app/)

This project is a React application that renders dynamic SVG lines that interact with the user's mouse cursor. Built with TypeScript and Tailwind CSS, it provides an engaging visual effect as users move their cursor across the screen.

## Features

- **Interactive SVG Lines**: The SVG elements respond to cursor movement, creating a dynamic effect.
- **React & TypeScript**: Built with a strong type system for maintainability and scalability.
- **Tailwind CSS**: Used for styling, ensuring a clean and responsive design.

## Demo

<!-- ![Preview](https://your-demo-image-url.com) -->

## Installation

To get started with the project, follow these steps:

### Prerequisites
- Node.js & npm (or yarn)

### Setup
```sh
# Clone the repository
git clone https://github.com/sarvt/stringlines.git
cd stringlines

# Install dependencies
npm install  # or yarn install
```

### Run the Project
```sh
npm run dev  # or yarn dev
```

The development server will start at `http://localhost:5173` (or another available port).

## Project Structure
```sh
interactive-svg-lines/
├── src/
│   ├── components/
│   │   ├── Elasty.tsx # Main component rendering the SVG
│   │   ├── other.ts # Other components
│   ├── App.tsx # Entry point of the application
│   ├── main.tsx # Renders App component
│   ├── index.css # Global styles
├── public/
│   ├── index.html # Main HTML file
├── tailwind.config.js # TailwindCSS configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Project metadata and dependencies
└── README.md # Project documentation
```

## Implementation Overview
The project features an SVG `<line>` element that updates dynamically based on mouse movements. The component listens for `mousemove` events and adjusts the line's attributes accordingly.

### Example Code (InteractiveSVG.tsx)
```tsx
import React, { useState, useEffect } from "react";

const InteractiveSVG: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="50" x2={mousePos.x} y2={mousePos.y} stroke="white" strokeWidth="2" />
    </svg>
  );
};

export default InteractiveSVG;
```

## Deployment
To build the project for production:
```sh
npm run build  # or yarn build
```
This will generate optimized static assets in the `dist/` folder.

## License
This project is open-source under the [MIT License](LICENSE).

---

