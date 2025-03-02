import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CaursalFrame from "./CaursalFrame";
import { HorizontalScrollCarousel } from "./CaursalFrame";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const gods = [
  { id: '1', name: 'God 1', imageUrl: '/images/GOD1.jpeg' },
  { id: '2', name: 'God 2', imageUrl: '/images/GOD2.jpeg' },
  { id: '3', name: 'God 3', imageUrl: '/images/GOD3.jpeg' },
];

// Array of lamp images
const lampImages = [
  { id: '1', name: 'Lamp 1', imageUrl: '/images/LAMP1.jpeg' },
  { id: '2', name: 'Lamp 2', imageUrl: '/images/LAMP2.jpeg' },
  { id: '3', name: 'Lamp 3', imageUrl: '/images/LAMP3.jpeg' },
];

const FrameCustomizer = () => {
  const [frameHeightInches, setFrameHeightInches] = useState(24);
  const [frameWidthInches, setFrameWidthInches] = useState(42);
  const [godHeightInches, setGodHeightInches] = useState(8);
  const [godWidthInches, setGodWidthInches] = useState(6);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showGodSelector, setShowGodSelector] = useState(false);
  const [selectedGods, setSelectedGods] = useState([]);
  const [selectedLamps, setSelectedLamps] = useState([]); // State for selected lamps
  const [showLamps, setShowLamps] = useState(false); // State for lamp visibility

  const scaleFactor = 20; // Conversion factor from inches to pixels
  const frameHeightPx = frameHeightInches * scaleFactor;
  const frameWidthPx = frameWidthInches * scaleFactor;
  const godHeightPx = godHeightInches * scaleFactor;
  const godWidthPx = godWidthInches * scaleFactor;

  const location = useLocation();

  const onDragEndGods = (result) => {
    if (!result.destination) return;

    const newSelectedGods = Array.from(selectedGods);
    const [removed] = newSelectedGods.splice(result.source.index, 1);
    newSelectedGods.splice(result.destination.index, 0, removed);
    setSelectedGods(newSelectedGods);
  };

  const onDragEndLamps = (result) => {
    if (!result.destination) return;

    const newSelectedLamps = Array.from(selectedLamps);
    const [removed] = newSelectedLamps.splice(result.source.index, 1);
    newSelectedLamps.splice(result.destination.index, 0, removed);
    setSelectedLamps(newSelectedLamps);
  };

  const handleSelectGod = (god) => {
    if (!selectedGods.includes(god)) {
      setSelectedGods([...selectedGods, god]);
    } else {
      setSelectedGods(selectedGods.filter(selectedGod => selectedGod !== god));
    }
  };

  const handleSelectLamp = (lamp) => {
    if (!selectedLamps.includes(lamp)) {
      setSelectedLamps([...selectedLamps, lamp]);
    } else {
      setSelectedLamps(selectedLamps.filter(selectedLamp => selectedLamp !== lamp));
    }
  };

  return (
    <>
      <div className="flex flex-row-reverse gap-4 items-center p-6 bg-gray-100">
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md mb-6">
          <h2 className="text-md font-semibold mb-4">Enter Frame Details</h2>
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-700 font-medium">Height (inches)</label>
              <input
                type="number"
                value={frameHeightInches}
                onChange={(e) => setFrameHeightInches(Math.max(12, parseFloat(e.target.value) || 12))}
                className="w-[80%] border p-2 rounded mt-1"
                min="12"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Width (inches)</label>
              <input
                type="number"
                value={frameWidthInches}
                onChange={(e) => setFrameWidthInches(Math.max(24, parseFloat(e.target.value) || 24))}
                className="w-[80%] border p-2 rounded mt-1"
                min="24"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Number of Gods</label>
              <input
                type="number"
                value={selectedGods.length}
                readOnly
                className="w-[80%] border p-2 rounded mt-1"
              />
            </div>
          </div>
          <h2 className="text-md font-semibold mb-4 mt-4">God Size</h2>
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-700 font-medium">Height (inches)</label>
              <input
                type="number"
                value={godHeightInches}
                onChange={(e) => setGodHeightInches(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-[80%] border p-2 rounded mt-1"
                min="1"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Width (inches)</label>
              <input
                type="number"
                value={godWidthInches}
                onChange={(e) => setGodWidthInches(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-[80%] border p-2 rounded mt-1"
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl text-center overflow-hidden">
          <h2 className="text-lg font-semibold mb-4">Frame Preview</h2>
          <DragDropContext onDragEnd={onDragEndGods}>
            <Droppable droppableId="frameDroppable">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="relative bg-black rounded-lg mx-auto overflow-hidden z-40"
                  style={{
                    width: `${frameWidthPx}px`,
                    height: `${frameHeightPx}px`,
                    backgroundImage: selectedCard ? `url(${selectedCard.url})` : "none",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="relative border-none w-full h-full">
                    {/* Four corner decorations */}
                    <img
                      src="/images/corner2.png"
                      alt="Corner Decoration"
                      className="absolute top-0 left-8 w-40 h-60 z-10"
                      style={{
                        transform: 'translate(-10%, -10%)',
                      }}
                    />
                    <img
                      src="/images/corner2.png"
                      alt="Corner Decoration"
                      className="absolute -top-4 right-2 w-40 h-60 z-10"
                      style={{
                        transform: 'translate(-10%, -10%) rotate(90deg)',
                      }}
                    />
                    <img
                      src="/images/corner2.png"
                      alt="Corner Decoration"
                      className="absolute -bottom-16 left-10 w-40 h-60 z-10"
                      style={{
                        transform: 'translate(-10%, -10%) rotate(-90deg)',
                      }}
                    />
                    <img
                      src="/images/corner2.png"
                      alt="Corner Decoration"
                      className="absolute -bottom-2 right-8 w-40 h-60 z-10"
                      style={{
                        transform: 'translate(10%, 10%) rotate(180deg)',
                      }}
                    />
                  </div>

                  {selectedGods.map((god, index) => (
                    <Draggable key={god.id} draggableId={god.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="absolute flex items-center justify-center"
                          style={{
                            width: `${godWidthPx}px`,
                            height: `${godHeightPx}px`,
                            top: `${(frameHeightPx - godHeightPx) / 2}px`,
                            left: `${(frameWidthPx - (selectedGods.length * godWidthPx + (selectedGods.length - 1) * 20)) / 2 + index * (godWidthPx + 20)}px`,
                          }}
                        >
                          <img src={gods.find(g => g.id === god.id).imageUrl} alt={god.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  
                  {/* Display selected lamps */}
                  {showLamps && (
                    lampImages.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`Lamp ${index + 1}`} 
                        className="absolute" 
                        style={{
                          width: '10%', // Adjust width as needed
                          height: 'auto', // Maintain aspect ratio
                          top: `${(frameHeightPx - 50) / 2}px`,
                          left: `${(frameWidthPx - (lampImages.length * 50 + (lampImages.length - 1) * 20)) /  2 + index * (50 + 20)}px`,
                          objectFit: 'contain', // Ensures the image maintains its aspect ratio
                        }} 
                      />
                    ))
                  )}
                  
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <div className="text-center flex mt-4 justify-center space-x-4">
        <button
          onClick={() => setShowCarousel(!showCarousel)}
          className="bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600 transition"
        >
          {showCarousel ? "Style Your Frame" : "Select Frames"}
        </button>

        <button
          onClick={() => setShowLamps(!showLamps)} // Toggle lamp visibility
          className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition"
        >
          {showLamps ? "Hide Lamps" : "Show Lamps"}
        </button>

        <button
          onClick={() => setShowGodSelector(!showGodSelector)}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
        >
          {showGodSelector ? "Hide God Selector" : "Show God Selector"}
        </button>
      </div>

      {showCarousel && (
        <div className="min-w-full mt-4">
          <HorizontalScrollCarousel setSelectedCard={setSelectedCard} />
        </div>
      )}

      {showGodSelector && (
        <div className="min-w-full mt-8">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Select Your Gods</h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="godsDroppable">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex space-x-4 mb-4"
                  >
                    {gods.map((god) => (
                      <Draggable key={god.id} draggableId={god.id} index={gods.indexOf(god)}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-4 border rounded cursor-pointer hover:bg-gray-200 flex flex-col items-center ${
                              selectedGods.includes(god) ? "border-purple-600" : "border-gray-300"
                            }`}
                            onClick={() => handleSelectGod(god)}
                          >
                            <img src={god.imageUrl} alt={god.name} className="w-16 h-16 mb-2" />
                            <span>{god.name}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      )}

      {location.pathname === "/carousel" && (
        <CaursalFrame
          width={frameWidthPx}
          height={frameHeightPx}
          onClose={() => {
            window.history.back();
          }}
        />
      )}
    </>
  );
};

export default FrameCustomizer;