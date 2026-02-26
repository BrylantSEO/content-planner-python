import React from "react";

export default function Layout({ children }) {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;700&family=Bebas+Neue&family=Syncopate:wght@400;700&display=swap');
        
        * {
          font-family: 'Fira Code', monospace;
        }
        
        body {
          background-color: #000000;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        ::selection {
          background: #FFD700;
          color: #000;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #ff00ff;
          border-radius: 0;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FFD700;
        }

        .font-display {
          font-family: 'Bebas Neue', sans-serif;
        }
        .font-rebel {
          font-family: 'Syncopate', sans-serif;
        }
        .font-mono {
          font-family: 'Fira Code', monospace;
        }

        .glitch-text {
          text-shadow: 2px 0 #ff00ff, -2px 0 #FFD700;
        }

        .brutalist-border {
          border: 4px solid white;
          box-shadow: 8px 8px 0px #ff00ff;
        }

        .brutalist-border-yellow {
          border: 4px solid white;
          box-shadow: 8px 8px 0px #FFD700;
        }

        .scanline {
          position: relative;
          overflow: hidden;
        }
        .scanline::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 51%
          );
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>
      <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];` }} />
      {children}
    </div>
  );
}