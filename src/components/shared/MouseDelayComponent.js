import { useEffect, useState, useRef } from 'react';

export default function MouseDelayComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false); // Track if mouse is moving
  const [shouldMove, setShouldMove] = useState(false); // Track when to start moving
  const [particles, setParticles] = useState([]); // Track pixie dust particles
  const elementRef = useRef(null);
  const delay = 0.25; // The delay factor for movement acceleration
  const stopDelay = 200; // 0.2s delay before movement starts

  useEffect(() => {
    let timeout;

    const handleMouseMove = (event) => {
      setTargetPosition({ x: event.clientX, y: event.clientY });
      clearTimeout(timeout); // Clear timeout so it doesn't fire multiple times
      setIsMoving(true);
      setShouldMove(false); // Reset movement trigger

      // Set timeout to trigger delayed movement after the mouse stops
      timeout = setTimeout(() => {
        setShouldMove(true); // Start moving after 0.2s delay
      }, stopDelay);

      // Create fewer pixie dust particles
      createParticles(event.clientX, event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const smoothMovement = () => {
      if (shouldMove) {
        // Move the red circle towards the target position smoothly
        setMousePosition((prevPosition) => ({
          x: prevPosition.x + (targetPosition.x - prevPosition.x) * delay,
          y: prevPosition.y + (targetPosition.y - prevPosition.y) * delay,
        }));

        // Check if the red circle has arrived at the final target position
        if (
          Math.abs(mousePosition.x - targetPosition.x) < 1 &&
          Math.abs(mousePosition.y - targetPosition.y) < 1
        ) {
          setMousePosition({ x: targetPosition.x, y: targetPosition.y });
          setIsMoving(false); // Stop movement once it's close enough
        }
      }

      requestAnimationFrame(smoothMovement); // Continue animation loop
    };

    requestAnimationFrame(smoothMovement);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [targetPosition, shouldMove, mousePosition]);

  // Function to create lightweight pixie dust particles
  const createParticles = (x, y) => {
    const newParticles = Array.from({ length: 2 }).map(() => ({
      id: Math.random(),
      x,
      y,
      size: Math.random() * 10 + 2, // Small particles
      opacity: Math.random() * (0.7 - Number.EPSILON), // random opacity btw 0 and 1
    }));

    setParticles((prevParticles) => [...prevParticles, ...newParticles]);

    // Clean up particles after 1 second
    setTimeout(() => {
      setParticles((prevParticles) => prevParticles.slice(2)); // Remove old particles after 1 second
    }, 100);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        cursor: 'none', // Hide the cursor
      }}
    >
      {/* Pixie dust particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: `rgba(34, 197, 94, ${particle.opacity})`, // Subtle yellow color
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'fadeout 1s forwards', // Fade out after 1 second
            zIndex: '1000',
          }}
          />
        ))}

      {/* Red circle */}
      <div
        ref={elementRef}
        style={{
          display: 'none',
          position: 'absolute',
          zIndex: '1000',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: '10px',
          height: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(-50%, -50%)`,
          transition: isMoving ? 'none' : 'transform 0.2s ease-out', // Smooth transition
        }}
      />
    </div>
  );
}

