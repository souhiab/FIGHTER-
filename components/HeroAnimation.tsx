import React, { useEffect, useState } from 'react';

const HeroAnimation: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 100), // Start
      setTimeout(() => setStep(2), 1200), // Shield Lift
      setTimeout(() => setStep(3), 2000), // Sword Plant
      setTimeout(() => setStep(4), 2800), // Text Glow
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[500px] max-h-[500px] drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Defs for glow */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shield (Fades in at step 2) */}
        <path
          d="M200 350C200 350 320 280 320 150L200 100L80 150C80 280 200 350 200 350Z"
          className={`transition-all duration-1000 ease-out ${
            step >= 2 ? 'opacity-100 fill-brand-dark stroke-brand-gold' : 'opacity-0 translate-y-10'
          }`}
          strokeWidth="4"
        />

        {/* Sword (Strikes down at step 3) */}
        <g
          className={`transition-all duration-500 ease-out ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
          }`}
        >
          <rect x="195" y="50" width="10" height="220" className="fill-gray-300" />
          <rect x="170" y="80" width="60" height="10" className="fill-brand-gold" />
          <path d="M195 270 L200 300 L205 270 Z" className="fill-gray-300" />
        </g>

        {/* Letters (Fade in at step 4) */}
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          className={`font-heading font-bold text-6xl fill-white transition-opacity duration-1000 ${
            step >= 4 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ filter: step >= 4 ? 'url(#glow)' : 'none' }}
        >
          BF
        </text>
      </svg>
    </div>
  );
};

export default HeroAnimation;