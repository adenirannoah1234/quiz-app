import React from 'react';
import { VStack, Button, Text } from '@chakra-ui/react';
import { MultipleChoiceQuestionProps } from '../types/types';

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  options,
  onAnswer,
  feedback,
  correctFeedback = 'Correct!',
  incorrectFeedback = 'Incorrect. Try again!',
}) => {
  return (
    <VStack gap={5} width="100%">
      <Text fontSize="lg">{question}</Text>
      {options.map((option, index) => (
        <Button
          key={index}
          onClick={() => onAnswer(option)}
          width="100%"
          p={4}
          textAlign="left"
          borderRadius="lg"
          variant="outline"
          bg={
            feedback?.selected === option
              ? feedback.correct
                ? 'green.100'
                : 'red.100'
              : 'white'
          }
          borderColor={
            feedback?.selected === option
              ? feedback.correct
                ? 'green.500'
                : 'red.500'
              : 'gray.200'
          }
          _hover={{
            borderColor: 'purple.500',
          }}
        >
          {option}
        </Button>
      ))}
      {feedback && (
        <Text color={feedback.correct ? 'green.500' : 'red.500'}>
          {feedback.correct ? correctFeedback : incorrectFeedback}
        </Text>
      )}
    </VStack>
  );
};

export default MultipleChoiceQuestion;
