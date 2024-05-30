// src/DroppableName.tsx
import React from 'react';
import { useDrop } from 'react-dnd';

interface DroppableNameProps {
  id: number;
  name: string;
  onDrop: (id: number, droppedId: number) => void;
}

const DroppableName: React.FC<DroppableNameProps> = ({ id, name, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'IMAGE',
    drop: (item: { id: number }) => {
      onDrop(id, item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightgreen' : 'white' }}>
      {name}
    </div>
  );
};

export default DroppableName;
