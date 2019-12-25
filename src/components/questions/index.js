import uuidv4 from 'uuid/v4';

const truth = [
  {
    id: uuidv4(),
    value: 'Name 10 body parts that your partner likes to kiss.',
    category: 'adults',
    appeared: false
  },
  {
    id: uuidv4(),
    value:
      'Say a list of 10 items or things you bought and never used or regretted buying.',
    category: 'funny',
    appeared: false
  },
  {
    id: uuidv4(),
    value: 'What was the most embarrassing moment of your life?',
    category: 'funny',
    appeared: false
  },
  {
    id: uuidv4(),
    value:
      'Have you ever been humiliated? Explain what happened and how you felt.',
    category: 'challenging',
    appeared: false
  },
  {
    id: uuidv4(),
    value: 'Describe the strangest dream you’ve had in your life.',
    category: 'challenging',
    appeared: false
  },
  {
    id: uuidv4(),
    value:
      'What is the quality or characteristic that would like to change about you?',
    category: 'challenging',
    appeared: false
  },
  {
    id: uuidv4(),
    value:
      'Have you fallen in love with a friend of your partner? Has anyone noticed?',
    category: 'adults',
    appeared: false
  }
];

const dare = [
  {
    id: uuidv4(),
    value:
      'Very affectionately kiss another participant (the rest can choose whom).',
    category: 'funny',
    appeared: false
  },
  {
    id: uuidv4(),
    value: 'Give a massage to a companion for 5 minutes.',
    category: 'challenging',
    appeared: false
  },
  {
    id: uuidv4(),
    value:
      'Asks for money on the street telling a funny story and nothing credible and board 50$.',
    category: 'adults',
    appeared: false
  }
];

export { truth, dare };
