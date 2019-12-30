import uuidv4 from 'uuid/v4';

const truth = [
  {
    id: uuidv4(),
    value: 'Name 10 body parts that your partner likes to kiss.',
    appeared: false
  },
  {
    id: uuidv4(),
    value:
      'Say a list of 10 items or things you bought and never used or regretted buying.',
    appeared: false
  },
  {
    id: uuidv4(),
    value: 'What was the most embarrassing moment of your life?',
    appeared: false
  },
  {
    id: uuidv4(),
    value:
      'Have you ever been humiliated? Explain what happened and how you felt.',
    appeared: false
  }
]

const dare = [
  {
    id: uuidv4(),
    value:
      'Very affectionately kiss another participant (the rest can choose whom).',
    appeared: false
  },
  {
    id: uuidv4(),
    value: 'Give a massage to a companion for 5 minutes.',
    appeared: false
  },
  {
    id: uuidv4(),
    value:
      'Asks for money on the street telling a funny story and nothing credible and board 50$.',
    appeared: false
  }
]

export { truth, dare };
