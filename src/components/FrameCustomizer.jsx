import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CaursalFrame from "./CaursalFrame";
import { HorizontalScrollCarousel } from "./CaursalFrame";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import { FcFrame } from "react-icons/fc";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { RiImageAddLine } from "react-icons/ri";
import { RxDimensions } from "react-icons/rx";


const gods = [
  { id: '1', name: 'God 1', imageUrl: '/images/god1.png' },
  { id: '2', name: 'God 2', imageUrl: '/images/god2.png' },
  { id: '3', name: 'God 3', imageUrl: '/images/god3.png' },
];

const lamps = [
  { id: '1', name: 'Lamp 1', imageUrl: '/images/Lamp1.png' },
  { id: '2', name: 'Lamp 2', imageUrl: '/images/Lamp2.png' },
  { id: '3', name: 'Lamp 3', imageUrl: '/images/Lamp5.png' },
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
  const [showLamps, setShowLamps] = useState(false);
  const [selectedLamps, setSelectedLamps] = useState([]);
  const [framePreview, setFramePreview] = useState(false);

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

  const renderCombinedImages = () => {
    const combinedImages = [];
    
    selectedGods.forEach((god, index) => {
      combinedImages.push(god); // Add the god image
      if (index < selectedGods.length - 1 && selectedLamps.length > 0) {
        combinedImages.push(selectedLamps[index % selectedLamps.length]); // Cycle through lamps
      }
    });
    
    return combinedImages.map((item, index) => {
      const isLamp = !item.imageUrl; // Check if the item is a lamp
      const imageUrl = isLamp ? lamps.find(l => l.name === item)?.imageUrl : item.imageUrl; // Get the imageUrl for lamps
  
      // Set the width of the god and lamp independently
      const godWidth = godWidthPx; // Width of the god
      const lampWidth = 80; // Fixed width for the lamp (in pixels)
      
      // Set height based on whether the item is a god or a lamp
      const height = isLamp ? godHeightPx * 0.50 : godHeightPx; // Lamps are 50% the height of gods
  
      const top = isLamp 
        ? (frameHeightPx - height) / 2 + (godHeightPx - height) / 2 // Center lamps vertically with adjustment
        : (frameHeightPx - height) / 2; // Center gods vertically
  
      return (
        <Draggable key={item.id || item.name} draggableId={item.id || item.name} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="absolute flex items-center justify-center"
              style={{
                width: `${isLamp ? lampWidth : godWidth}px`, // Use fixed width for lamps
                height: `${height}px`,
                top: `${top}px`,
                left: `${(frameWidthPx - (combinedImages.length * (isLamp ? lampWidth : godWidth) + (combinedImages.length - 1) * 20)) / 2 + index * ((isLamp ? lampWidth : godWidth) + 20)}px`,
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt={item.name || item} className="w-full h-full object-cover" />
              ) : null}
            </div>
          )}
        </Draggable>
      );
    });
  };


  return (
    <>
      <div className="flex flex-row gap-4 items-center p-6 bg-gray-100">

        {/* button section  */}
        <div className="text-center flex flex-col  items-center justify-center space-y-1 ">
        <button
        onClick={() => setFramePreview(!framePreview)}
        className="bg-indigo-100 text-white px-1 py-2 rounded shadow hover:bg-indigo-600 transition flex items-center space-x-2"
      >
        <RxDimensions style={{ fontSize: '2rem', margin: "1px" }} />
        <span>{framePreview ? "" : ""}</span>
      </button>
      <h3>Dimensions</h3>
        <button
      onClick={() => setShowCarousel(!showCarousel)}
      className="bg-indigo-100 text-white px-1 py-2 rounded shadow hover:bg-indigo-600 transition flex items-center space-x-2"
    >
      {/* Icon for the first button */}
      <FcFrame style={{ fontSize: showCarousel ? '2rem' : '2rem', margin:"1px" }} /> {/* Adjust sizes as needed */}
      <span>{showCarousel ? "" : ""}</span>
    </button>
    <h3>Frames</h3>

      <button
        onClick={() => setShowGodSelector(!showGodSelector)}
       className="bg-indigo-100 text-white px-1 py-2 rounded shadow hover:bg-indigo-600 transition flex items-center space-x-2"
      >
         {/* Icon for the second button */}
         <HiOutlineUserGroup  style={{ fontSize: showCarousel ? '2rem' : '2rem' , margin:"1px" }} /> {/* Adjust sizes as needed */}
        <span>{showGodSelector ? "" : ""}</span>
        
      </button>
      <h3>god</h3>

      <button
        onClick={() => setShowLamps(!showLamps)}
        className="bg-indigo-100 text-white px-1 py-2 rounded shadow hover:bg-indigo-600 transition flex items-center space-x-2"
      >
        {/* Icon for the third button */}
        <RiImageAddLine  style={{ fontSize: showCarousel ? '2rem' : '2rem' , margin:"1px" }} /> {/* Adjust sizes as needed */}
        <span>{showLamps ? "" : ""}</span>
      </button>
      <h3>Accessories</h3>
    </div>

    {framePreview && (
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-5xl text-center overflow-hidden mt-4">
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
                      className="absolute -top-3 left-8 w-36  z-10"
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

                  {renderCombinedImages()}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
        
        {framePreview && (
          <div className="bg-white p-6 shadow-lg rounded-lg w-[25%] max-w-md mb-6">
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
        )}

       

        

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
            <DragDropContext onDragEnd={onDragEndGods}>
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

      {showLamps && (
        <div className="min-w-full mt-12">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Select Your Lamps</h2>
            <DragDropContext onDragEnd={onDragEndLamps}>
              <Droppable droppableId="lampsDroppable">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex space-x-4 mb-4"
                  >
                    {lamps.map((lamp) => (
                      <Draggable key={lamp.id} draggableId={lamp.id} index={lamps.indexOf(lamp)}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-4 border rounded cursor-pointer hover:bg-gray-200 flex flex-col items-center ${
                              selectedLamps.includes(lamp.name) ? "border-purple-600" : "border-gray-300"
                            }`}
                            onClick={() => handleSelectLamp(lamp.name)}
                          >
                            <img src={lamp.imageUrl} alt={lamp.name} className="w-16 h-16 mb-2" />
                            <span>{lamp.name}</span>
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