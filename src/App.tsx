import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Text,
  IconButton,
  Progress,
  Button,
  Flex,
  Card,
  CardHeader,
  CardBody,
  useToast,
} from '@chakra-ui/react';
import { ArrowLeft } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MultipleChoiceQuestion from './components/MultiChoice';
import DraggableItem from './components/DragAbleItem';
import DroppableZone from './components/DropAbleZone';
import { questions } from './constants/questions';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    selected: string;
  } | null>(null);
  const [droppedItems, setDroppedItems] = useState<{ [key: string]: string }>(
    {}
  );
  const [matches, setMatches] = useState<{ [key: string]: boolean }>({});
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const toast = useToast();

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  // Multiple Choice functionality
  const handleMultipleChoiceAnswer = (selected: string) => {
    const isCorrect = selected === currentQ.correctAnswer;
    setFeedback({ correct: isCorrect, selected });
    if (isCorrect) {
      setScore((prev) => prev + currentQ.points);
    }
  };

  // Drag and Drop functionality
  const handleDragDrop = (
    item: { id: string; text: string },
    definition: string
  ) => {
    setDroppedItems((prev) => ({ ...prev, [definition]: item.text }));

    if (currentQ.type === 'drag-drop' && currentQ.matches) {
      const isCorrect = currentQ.matches[item.text] === definition;
      setMatches((prev) => ({ ...prev, [definition]: isCorrect }));
    }
  };
  //  Continue functionality
  const handleContinue = () => {
    if (
      currentQ.type === 'drag-drop' &&
      Object.values(matches).every((match) => match === true) &&
      Object.keys(matches).length === currentQ.definitions?.length
    ) {
      setScore((prev) => prev + currentQ.points);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setFeedback(null);
      setDroppedItems({});
      setMatches({});
    } else {
      setIsQuizComplete(true);
    }
  };
  //  Back functionality
  const handleGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setFeedback(null);
      setDroppedItems({});
      setMatches({});
    } else {
      toast({
        title: 'Already at the first question',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // restart quiz functionality
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFeedback(null);
    setDroppedItems({});
    setMatches({});
    setIsQuizComplete(false);
  };

  // Check if all drag items have been placed
  const allItemsPlaced =
    currentQ.type === 'drag-drop' &&
    currentQ.definitions &&
    Object.keys(droppedItems).length === currentQ.definitions.length;

  //  Render Quiz
  if (isQuizComplete) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Container maxW="container.sm" py={12}>
          <Card variant="outline">
            <CardHeader>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color="purple.600"
                textAlign="center"
              >
                Quiz Complete!
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={8}>
                <Box textAlign="center">
                  <Text fontSize="xl" mb={2}>
                    Your Score
                  </Text>
                  <Text fontSize="4xl" fontWeight="bold" color="purple.600">
                    {score} / {totalPoints}
                  </Text>
                  <Text fontSize="lg" color="gray.600">
                    ({Math.round((score / totalPoints) * 100)}%)
                  </Text>
                </Box>

                <Box bg="purple.50" p={6} borderRadius="lg" w="100%">
                  <Text fontSize="lg" fontWeight="semibold" mb={4}>
                    Performance Summary
                  </Text>
                  <VStack align="stretch" spacing={2}>
                    <Text>Questions Attempted: {questions.length}</Text>
                    <Text>Total Points Available: {totalPoints}</Text>
                    <Text>Points Earned: {score}</Text>
                  </VStack>
                </Box>

                <Button
                  w="100%"
                  colorScheme="purple"
                  onClick={handleRestartQuiz}
                  size="lg"
                >
                  Take Quiz Again
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Box minH="100vh" bg="gray.50">
        <Container maxW="container.sm" py={6}>
          <VStack spacing={6}>
            {/* Header */}
            <Flex w="100%" justify="space-between" align="center">
              <IconButton
                icon={<ArrowLeft size={20} />}
                aria-label="Go back"
                variant="ghost"
                onClick={handleGoBack}
              />
              <Text fontSize="sm" color="gray.600">
                Question {currentQuestion + 1} of {questions.length}
              </Text>
              <Box w={8} />
            </Flex>

            {/* Progress and Points */}
            <Progress
              value={progress}
              w="100%"
              colorScheme="purple"
              size="sm"
              borderRadius="full"
            />

            {/* Points Banner */}
            <Flex
              w="100%"
              bg="purple.600"
              color="white"
              p={4}
              borderRadius="lg"
              justify="space-between"
            >
              <Text>Goal: {currentQ.points} points</Text>
              <Text>Current Points: {score}</Text>
            </Flex>

            {/* Question Card */}
            <Card w="100%" variant="outline">
              <CardHeader>
                <Text color="purple.500" fontSize="sm" mb={2}>
                  {currentQ.category}
                </Text>
                <Text fontSize="lg" fontWeight="medium">
                  {currentQ.question}
                </Text>
              </CardHeader>
              <CardBody>
                {currentQ.type === 'multiple-choice' ? (
                  <MultipleChoiceQuestion
                    question={currentQ.question}
                    options={currentQ.options || []}
                    onAnswer={handleMultipleChoiceAnswer}
                    feedback={feedback}
                    correctFeedback={currentQ.correctFeedback}
                    incorrectFeedback={currentQ.incorrectFeedback}
                  />
                ) : (
                  <VStack spacing={4} align="stretch">
                    <Box>
                      {currentQ.definitions?.map((definition) => (
                        <DroppableZone
                          key={definition}
                          definition={definition}
                          onDrop={handleDragDrop}
                          isCorrect={matches[definition] ?? null}
                        />
                      ))}
                    </Box>
                    <Flex gap={4} flexWrap="wrap">
                      {currentQ.terms?.map((term) => (
                        <DraggableItem
                          key={term.id}
                          id={term.id}
                          text={term.text}
                          isDropped={Object.values(droppedItems).includes(
                            term.text
                          )}
                        />
                      ))}
                    </Flex>
                  </VStack>
                )}
              </CardBody>
            </Card>

            {/* Continue Button - Show for multiple choice when feedback is correct, 
                or for drag-drop when all items are placed (regardless of correctness) */}
            {(currentQ.type === 'multiple-choice'
              ? feedback?.correct
              : allItemsPlaced) && (
              <Button
                w="100%"
                colorScheme="purple"
                onClick={handleContinue}
                rightIcon={<Text>→</Text>}
              >
                Continue
              </Button>
            )}
          </VStack>
        </Container>
      </Box>
    </DndProvider>
  );
};

export default QuizApp;
