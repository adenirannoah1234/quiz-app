import React, { useRef } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import { DraggableItemType } from '../types/types';

interface DroppableZoneProps {
  definition: string;
  onDrop: (item: DraggableItemType, definition: string) => void;
  isCorrect: boolean | null;
}

const DroppableZone: React.FC<DroppableZoneProps> = ({
  definition,
  onDrop,
  isCorrect,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'term',
    drop: (item: DraggableItemType) => onDrop(item, definition),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(ref);
  return (
    <Box
      ref={ref}
      p={4}
      borderWidth="2px"
      borderRadius="md"
      borderColor={isOver ? 'purple.500' : 'gray.200'}
      bg={
        isCorrect === true
          ? 'green.100'
          : isCorrect === false
          ? 'red.100'
          : 'white'
      }
      transition="all 0.2s"
      minH="80px"
    >
      <Text fontSize="sm" color="gray.600">
        {definition}
      </Text>
    </Box>
  );
};

export default DroppableZone;
