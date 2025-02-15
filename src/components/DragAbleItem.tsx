import React, { useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';
// import { DraggableItemType } from '../types/types';

interface DraggableItemProps {
  id: string;
  text: string;
  isDropped: boolean;
}
const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  text,
  isDropped,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'term',
    item: { id, text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <Box
      ref={ref}
      bg="gray.800"
      color="white"
      px={4}
      py={2}
      borderRadius="md"
      textAlign="center"
      cursor="move"
      opacity={isDragging ? 0.5 : 1}
      display={isDropped ? 'none' : 'block'}
    >
      {text}
    </Box>
  );
};

export default DraggableItem;
