// src/GodSelector.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const gods = [
  { id: '1', name: 'God 1', imageUrl: '/images/GOD1.jpeg' },
  { id: '2', name: 'God 2', imageUrl: '/images/GOD2.jpeg' },
  { id: '3', name: 'God 3', imageUrl: '/images/GOD3.jpeg' },
];

const GodSelector = ({ selectedGods, setSelectedGods }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newSelectedGods = Array.from(selectedGods);
    const [removed] = newSelectedGods.splice(result.source.index, 1);
    newSelectedGods.splice(result.destination.index, 0, removed);
    setSelectedGods(newSelectedGods);
  };

  const handleSelectGod = (god) => {
    if (!selectedGods.includes(god)) {
      setSelectedGods([...selectedGods, god]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Select Your Gods</h2>
        <div className="flex space-x-4 mb-4">
          {gods.map((god) => (
            <div
              key={god.id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-200 flex flex-col items-center"
              onClick={() => handleSelectGod(god.name)}
            >
              <img src={god.imageUrl} alt={god.name} className="w-16 h-16 mb-2" />
              <span>{god.name}</span>
            </div>
          ))}
        </div>

        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="border-2 border-dashed border-gray-400 w-64 h-64 flex flex-col items-center justify-center"
            >
              <h3 className="text-lg font-semibold">Your Selected Gods</h3>
              {selectedGods.map((god, index) => (
                <Draggable key={god} draggableId={god} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 border rounded bg-white mb-2 shadow flex items-center"
                    >
                      <img src={gods.find(g => g.name === god).imageUrl} alt={god} className="w-8 h-8 mr-2" />
                      {god}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default GodSelector;