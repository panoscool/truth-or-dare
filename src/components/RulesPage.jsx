import React from 'react';
import cuid from 'cuid';

const rules_list = [
  {
    id: cuid(),
    rule:
      'Wherever you play the game, and whoever you play it with, make sure you follow the rules.'
  },
  {
    id: cuid(),
    rule: 'One person in the group is asked “truth or dare?” by another.'
  },
  {
    id: cuid(),
    rule:
      'If they pick ‘truth’, the other player will ask a question and the player has to answer it truthfully.'
  },
  {
    id: cuid(),
    rule:
      'If they pick “dare”, the other player will ask them to do something daring, and the player has to do it.'
  },
  {
    id: cuid(),
    rule:
      'If the dare is too uncomfortable or embarrassing the player can ask for another.'
  },
  {
    id: cuid(),
    rule:
      'Once they tell the truth or do the dare, they can pick another player and ask them truth or dare.'
  },
  {
    id: cuid(),
    rule:
      'Remember that the objective of the game is to have fun and not humiliate anyone. After all, the people you would be playing the game with are your friends.'
  }
];

function RulesPage() {
  return (
    <div>
      <h1>Don’t Break The Rules</h1>
      <p>
        <ul>
          {rules_list.map(r => (
            <li key={r.id}>{r.name}</li>
          ))}
        </ul>
      </p>
    </div>
  );
}

export default RulesPage;
