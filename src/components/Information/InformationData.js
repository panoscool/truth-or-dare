import cuid from 'cuid';

export const rules = [
  { id: cuid(), rule: 'Wherever you play the game, and whoever you play it with, make sure you follow the rules.' },
  { id: cuid(), rule: 'One person in the group is asked “truth or dare?” by another.' },
  { id: cuid(), rule: 'If they pick ‘truth’, the other player will ask a question and the player has to answer it truthfully.' },
  { id: cuid(), rule: 'If they pick “dare”, the other player will ask them to do something daring, and the player has to do it.' },
  { id: cuid(), rule: 'If the dare is too uncomfortable or embarrassing the player can ask for another.' },
  { id: cuid(), rule: 'Once they tell the truth or do the dare, they can pick another player and ask them “truth or dare?”.' },
  { id: cuid(), rule: 'Remember that the objective of the game is to have fun and not humiliate anyone. After all, the people you would be playing the game with are your friends.' }
];

export const categories = [
  { id: cuid(), category: 'Funny: Casual questions to relax and laugh with friends, schoolmates or colleagues. 🙂' },
  { id: cuid(), category: 'Challenging: A list of funny and embarrassing questions to challenge each other. 😬' },
  { id: cuid(), category: 'Uncensored: For couples or adults players. By logging in you confirm you can access this category. 😈' }
];

export const questions = [
  { id: cuid(), info: 'All questions, preexisting or created by users are public to everyone with or without account.' },
  { id: cuid(), info: 'To add your own questions, you should have an account and be logged in with one of the three available options.' }
];
