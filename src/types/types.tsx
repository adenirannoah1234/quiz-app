export interface MultipleChoiceQuestionProps {
  question: string;
  options: string[];
  onAnswer: (selected: string) => void;
  feedback: Feedback | null;
  correctFeedback?: string;
  incorrectFeedback?: string;
}

export interface DraggableItemType {
  id: string;
  text: string;
}

export interface BaseQuestion {
  id: string;
  type: 'multiple-choice' | 'drag-drop';
  question: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: string;
}

export interface DragDropQuestion extends BaseQuestion {
  type: 'drag-drop';
  items: DraggableItemType[];
  definitions: Record<string, string>;
}

export interface Feedback {
  selected: string;
  correct: boolean;
}

export interface DroppedItems {
  [key: string]: DraggableItemType;
}

export type Question = MultipleChoiceQuestion | DragDropQuestion;
