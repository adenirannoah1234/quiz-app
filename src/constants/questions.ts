
interface Question {
    id: string;
    type: 'multiple-choice' | 'drag-drop';
    question: string;
    category: string;
    points: number;
    options?: string[];
    correctAnswer?: string;
    correctFeedback?: string;
    incorrectFeedback?: string;
    terms?: { id: string; text: string }[];
    definitions?: string[];
    matches?: { [key: string]: string };
  }
  
  export const questions: Question[] = [
    {
      id: '1',
      type: 'multiple-choice',
      category: 'Science',
      question: 'What do plants need for photosynthesis?',
      points: 30,
      options: [
        'Oxygen & Sugar',
        'Sunlight, Water & Carbon Dioxide',
        'Protein & Salt',
        'Nitrogen & Phosphorus',
      ],
      correctAnswer: 'Sunlight, Water & Carbon Dioxide',
      correctFeedback: 'Right! Plants use sunlight, water, and carbon dioxide to create glucose through photosynthesis.',
      incorrectFeedback: 'Think again! Plants need energy from the sun, water, and carbon dioxide to make their own food.',
    },
    {
      id: '2',
      type: 'drag-drop',
      category: 'Mathematics',
      question: 'Match the Algebraic Terms!',
      points: 40,
      terms: [
        { id: 't1', text: 'Variable' },
        { id: 't2', text: 'Constant' },
        { id: 't3', text: 'Expression' },
        { id: 't4', text: 'Equation' },
      ],
      definitions: [
        "A fixed number that doesn't change",
        'A symbol that represents a value',
        'A combination of numbers and operations',
        'A statement that two expressions are equal',
      ],
      matches: {
        Variable: 'A symbol that represents a value',
        Constant: "A fixed number that doesn't change",
        Expression: 'A combination of numbers and operations',
        Equation: 'A statement that two expressions are equal',
      },
    },
    {
      id: '3',
      type: 'multiple-choice',
      category: 'Geography',
      question: 'Which is the largest ocean on Earth?',
      points: 25,
      options: [
        'Atlantic Ocean',
        'Indian Ocean',
        'Pacific Ocean',
        'Arctic Ocean',
      ],
      correctAnswer: 'Pacific Ocean',
      correctFeedback: 'Correct! The Pacific Ocean is the largest and deepest ocean on Earth.',
      incorrectFeedback: 'That\'s not right. The Pacific Ocean is the largest, covering more than 30% of Earth\'s surface.',
    },
    {
      id: '4',
      type: 'drag-drop',
      category: 'Language',
      question: 'Match the Parts of Speech!',
      points: 35,
      terms: [
        { id: 'l1', text: 'Noun' },
        { id: 'l2', text: 'Verb' },
        { id: 'l3', text: 'Adjective' },
        { id: 'l4', text: 'Adverb' },
      ],
      definitions: [
        'Describes how, when, or where something is done',
        'Names a person, place, thing, or idea',
        'Shows action or state of being',
        'Describes a noun or pronoun',
      ],
      matches: {
        Noun: 'Names a person, place, thing, or idea',
        Verb: 'Shows action or state of being',
        Adjective: 'Describes a noun or pronoun',
        Adverb: 'Describes how, when, or where something is done',
      },
    },
    {
      id: '5',
      type: 'multiple-choice',
      category: 'History',
      question: 'In which year did World War II end?',
      points: 30,
      options: ['1943', '1944', '1945', '1946'],
      correctAnswer: '1945',
      correctFeedback: 'Correct! World War II ended in 1945 with the surrender of Japan in September.',
      incorrectFeedback: 'That\'s incorrect. World War II ended in 1945, not in that year.',
    },
    {
      id: '6',
      type: 'multiple-choice',
      category: 'Science',
      question: 'What is the chemical symbol for Gold?',
      points: 20,
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 'Au',
      correctFeedback: 'Correct! "Au" comes from the Latin word "aurum," meaning gold.',
      incorrectFeedback: 'Incorrect. The symbol "Au" comes from the Latin word for gold, "aurum."',
    },
  ];