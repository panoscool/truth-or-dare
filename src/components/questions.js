import cuid from 'cuid';

const truth = [
  {
    id: cuid(),
    question: 'Name 10 body parts that your partner likes to kiss.',
    category: 'funny'
  },
  {
    id: cuid(),
    question:
      'Say a list of 10 items or things you bought and never used or regretted buying.',
    category: 'funny'
  },
  {
    id: cuid(),
    question: 'What was the most embarrassing moment of your life?',
    category: 'funny'
  },
  {
    id: cuid(),
    question:
      'Have you ever been humiliated? Explain what happened and how you felt.',
    category: 'funny'
  },
  {
    id: cuid(),
    question: 'Describe the strangest dream you’ve had in your life.',
    category: 'funny'
  },
  {
    id: cuid(),
    question:
      'What is the quality or characteristic that would like to change about you?',
    category: 'funny'
  },
  {
    id: cuid(),
    question:
      'Have you fallen in love with a friend of your partner? Has anyone noticed?',
    category: 'funny'
  }
];

const dare = [
  {
    id: cuid(),
    question:
      'Very affectionately kiss another participant (the rest can choose whom).',
    category: 'funny'
  },
  {
    id: cuid(),
    question:
      'What is the quality or characteristic that would like to change about you?',
    category: 'funny'
  },
  {
    id: cuid(),
    question: 'Give a massage to a companion for 5 minutes.',
    category: 'funny'
  },
  {
    id: cuid(),
    question:
      'Asks for money on the street telling a funny story and nothing credible and board 50$.',
    category: 'funny'
  }
];

export { truth, dare };
