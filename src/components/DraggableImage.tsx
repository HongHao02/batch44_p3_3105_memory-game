// src/DraggableImage.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableImageProps {
  id: number;
  src: string;
}

const DraggableImage: React.FC<DraggableImageProps> = ({ id, src }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'IMAGE',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img ref={drag} src={src} alt="person" style={{ opacity: isDragging ? 0.5 : 1 }} />
  );
};

export default DraggableImage;
