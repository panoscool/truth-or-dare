import cuid from 'cuid';

const truth = [
  {
    id: cuid(),
    value: 'Name 10 body parts that your partner likes to kiss.',
    category: 'adults',
    appeared: false
  },
  {
    id: cuid(),
    value:
      'Say a list of 10 items or things you bought and never used or regretted buying.',
    category: 'funny',
    appeared: false
  },
  {
    id: cuid(),
    value: 'What was the most embarrassing moment of your life?',
    category: 'funny',
    appeared: false
  },
  {
    id: cuid(),
    value:
      'Have you ever been humiliated? Explain what happened and how you felt.',
    category: 'challenging',
    appeared: false
  },
  {
    id: cuid(),
    value: 'Describe the strangest dream you’ve had in your life.',
    category: 'challenging',
    appeared: false
  },
  {
    id: cuid(),
    value:
      'What is the quality or characteristic that would like to change about you?',
    category: 'challenging',
    appeared: false
  },
  {
    id: cuid(),
    value:
      'Have you fallen in love with a friend of your partner? Has anyone noticed?',
    category: 'adults',
    appeared: false
  }
];

const dare = [
  {
    id: cuid(),
    value:
      'Very affectionately kiss another participant (the rest can choose whom).',
    category: 'funny',
    appeared: false
  },
  {
    id: cuid(),
    value: 'Give a massage to a companion for 5 minutes.',
    category: 'challenging',
    appeared: false
  },
  {
    id: cuid(),
    value:
      'Asks for money on the street telling a funny story and nothing credible and board 50$.',
    category: 'adults',
    appeared: false
  }
];

export { truth, dare };
