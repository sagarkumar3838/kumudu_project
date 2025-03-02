// src/Frame.js
import React from 'react';

const Frame = ({ selectedGods }) => {
  const frameHeightPx = 960; // 10 inches
  const frameWidthPx = 576; // 6 inches

  return (
    <div
      className="border-4 border-gray-400 rounded-lg relative mx-auto overflow-hidden"
      style={{
        width: `${frameWidthPx}px`,
        height: `${frameHeightPx}px`,
        position: 'relative',
      }}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Frame Preview</ h2>
      {selectedGods.map((god, index) => (
        <div key={index} className="absolute" style={{ top: `${Math.random() * (frameHeightPx - 50)}px`, left: `${Math.random() * (frameWidthPx - 50)}px` }}>
          <img src={`/path/to/${god}.png`} alt={god} className="w-12 h-12" />
        </div>
      ))}
    </div>
  );
};

export default Frame;