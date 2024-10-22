// src/components/StarryNight.js
import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const StarryNight = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "#000000",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: false,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 1,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.3,
        },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 2,
        random: true,
      },
    },
    detectRetina: true,
  };

  return (
    <div className="relative w-screen h-screen">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0"
      />
    </div>
  );
};

export default StarryNight;
