import React from 'react';
import cuid from 'cuid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ArroRight from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

const rules_list = [
  { id: cuid(), rule: 'Wherever you play the game, and whoever you play it with, make sure you follow the rules.' },
  { id: cuid(), rule: 'One person in the group is asked “truth or dare?” by another.' },
  { id: cuid(), rule: 'If they pick ‘truth’, the other player will ask a question and the player has to answer it truthfully.' },
  { id: cuid(), rule: 'If they pick “dare”, the other player will ask them to do something daring, and the player has to do it.' },
  { id: cuid(), rule: 'If the dare is too uncomfortable or embarrassing the player can ask for another.' },
  { id: cuid(), rule: 'Once they tell the truth or do the dare, they can pick another player and ask them truth or dare.' },
  { id: cuid(), rule: 'Remember that the objective of the game is to have fun and not humiliate anyone. After all, the people you would be playing the game with are your friends.' }
];

const categories_breakdown = [
  { id: cuid(), category: "Funny: Casual questions to relax and laugh with friends, schoolmates or colleagues. 🙂" },
  { id: cuid(), category: "Challenging: A list of funny and embarrassing questions to challenge each other. 😬" },
  { id: cuid(), category: "Uncensored: For hardcore players only that can face any question or challenge assigned to them. 😈" }
];

function InformationPage() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Don’t Break The Rules</Typography>
      <List dense>
        {rules_list.map(r => (
          <ListItem key={r.id}>
            <ListItemIcon>
              <ArroRight />
            </ListItemIcon>
            <ListItemText primary={r.rule} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Categories Breakdown</Typography>
      <List dense>
        {categories_breakdown.map(c => (
          <ListItem key={c.id}>
            <ListItemIcon>
              <ArroRight />
            </ListItemIcon>
            <ListItemText primary={c.category} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default InformationPage;
