
export interface QuizCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  quizCount: number;
}

export interface QuizQuestion {
  id: number;
  topic?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  questions: QuizQuestion[];
  timeLimit: number; // in minutes
  createdBy: string;
  createdAt: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
}

export interface QuizResult {
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  date: string;
  answers: {
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
}

export const quizCategories: QuizCategory[] = [
  {
    id: 'gen-ai',
    name: 'Generative AI',
    description: 'Learn about the latest in generative artificial intelligence and its applications.',
    image: 'placeholder.svg',
    quizCount: 3
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Explore the fundamentals of machine learning and data science.',
    image: 'placeholder.svg',
    quizCount: 2
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    description: 'Dive into cloud technologies, services, and architecture.',
    image: 'placeholder.svg',
    quizCount: 2
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Learn about the latest trends in cybersecurity and data protection.',
    image: 'placeholder.svg',
    quizCount: 1
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Master the latest frameworks and technologies in web development.',
    image: 'placeholder.svg',
    quizCount: 2
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    description: 'Understand blockchain technology and its applications.',
    image: 'placeholder.svg',
    quizCount: 1
  }
];

export const sampleQuizzes: Quiz[] = [
  {
    id: 'gen-ai-basics',
    title: 'Generative AI Fundamentals',
    description: 'Test your knowledge on the basics of generative artificial intelligence.',
    categoryId: 'gen-ai',
    questions: [
      {
        id: 1,
        question: 'What is Generative AI?',
        options: [
          'Software that creates new content based on patterns in training data',
          'A machine that produces electricity',
          'A type of computer virus',
          'A programming language'
        ],
        correctAnswer: 0,
        explanation: 'Generative AI refers to algorithms that create new content based on patterns learned from existing data.'
      },
      {
        id: 2,
        question: 'Which of the following is an example of a generative AI model?',
        options: [
          'Microsoft Excel',
          'GPT-4',
          'Google Chrome',
          'Linux'
        ],
        correctAnswer: 1,
        explanation: 'GPT-4 (Generative Pre-trained Transformer 4) is a large language model developed by OpenAI that can generate human-like text.'
      },
      {
        id: 3,
        question: 'What technology powers most modern text-generating AI?',
        options: [
          'Blockchain',
          'Transformers',
          'Quantum computing',
          'Internet of Things'
        ],
        correctAnswer: 1,
        explanation: 'Transformer architecture is the foundation of modern language models like GPT, BERT, and others.'
      },
      {
        id: 4,
        question: 'Which of these is NOT a common application of generative AI?',
        options: [
          'Creating artwork',
          'Writing stories',
          'Physical manufacturing of goods',
          'Generating music'
        ],
        correctAnswer: 2,
        explanation: 'While generative AI can design physical objects, it cannot physically manufacture goods, which requires physical machines and materials.'
      },
      {
        id: 5,
        question: 'What does "hallucination" refer to in the context of generative AI?',
        options: [
          'When AI models generate content that is factually incorrect or made up',
          'When AI becomes self-aware',
          'A type of training methodology',
          'The process of generating images'
        ],
        correctAnswer: 0,
        explanation: 'Hallucination refers to when AI models confidently generate content that is factually incorrect or completely fabricated.'
      }
    ],
    timeLimit: 10,
    createdBy: 'Admin',
    createdAt: '2023-01-15',
    difficulty: 'Easy',
    tags: ['AI', 'Basics', 'Technology']
  },
  {
    id: 'ml-algorithms',
    title: 'Machine Learning Algorithms',
    description: 'Test your knowledge of various machine learning algorithms and their applications.',
    categoryId: 'machine-learning',
    questions: [
      {
        id: 1,
        question: 'What type of learning algorithm is K-means?',
        options: [
          'Supervised Learning',
          'Unsupervised Learning',
          'Reinforcement Learning',
          'Semi-supervised Learning'
        ],
        correctAnswer: 1,
        explanation: 'K-means is an unsupervised learning algorithm used for clustering.'
      },
      {
        id: 2,
        question: 'Which algorithm is used for classification problems?',
        options: [
          'Linear Regression',
          'K-means',
          'Random Forest',
          'Principal Component Analysis'
        ],
        correctAnswer: 2,
        explanation: 'Random Forest is an ensemble learning method used for classification and regression.'
      },
      {
        id: 3,
        question: 'What does SVM stand for in machine learning?',
        options: [
          'Statistical Variance Method',
          'Support Vector Machine',
          'Simple Vector Model',
          'Standard Variable Mode'
        ],
        correctAnswer: 1,
        explanation: 'Support Vector Machine (SVM) is a supervised learning algorithm used for classification and regression tasks.'
      },
      {
        id: 4,
        question: 'Which of the following is NOT a type of neural network?',
        options: [
          'Convolutional Neural Network (CNN)',
          'Recurrent Neural Network (RNN)',
          'Direct Acyclic Network (DAN)',
          'Long Short-Term Memory (LSTM)'
        ],
        correctAnswer: 2,
        explanation: 'Direct Acyclic Network (DAN) is not a standard type of neural network; the others are common neural network architectures.'
      },
      {
        id: 5,
        question: 'Which algorithm is best suited for time series prediction?',
        options: [
          'K-means',
          'Naive Bayes',
          'ARIMA',
          'Decision Tree'
        ],
        correctAnswer: 2,
        explanation: 'ARIMA (AutoRegressive Integrated Moving Average) is specifically designed for time series forecasting.'
      }
    ],
    timeLimit: 15,
    createdBy: 'Admin',
    createdAt: '2023-02-10',
    difficulty: 'Medium',
    tags: ['Machine Learning', 'Algorithms', 'Data Science']
  }
];

export const leaderboardData = [
  { id: 1, username: 'AIWhiz', score: 950, quizzesTaken: 12 },
  { id: 2, username: 'DataNinja', score: 920, quizzesTaken: 10 },
  { id: 3, username: 'CodeMaster', score: 890, quizzesTaken: 11 },
  { id: 4, username: 'TechGuru', score: 860, quizzesTaken: 9 },
  { id: 5, username: 'AlgoExpert', score: 830, quizzesTaken: 8 },
  { id: 6, username: 'PyDeveloper', score: 800, quizzesTaken: 10 },
  { id: 7, username: 'CloudArchitect', score: 780, quizzesTaken: 7 },
  { id: 8, username: 'DevSecOps', score: 750, quizzesTaken: 9 },
  { id: 9, username: 'WebWizard', score: 730, quizzesTaken: 8 },
  { id: 10, username: 'MLEngineer', score: 710, quizzesTaken: 6 },
];
