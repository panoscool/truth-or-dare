import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import ArroRight from '@material-ui/icons/ArrowRight';
import { rules, categories, questions } from './InformationData';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

function InformationPage() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Don’t Break The Rules</Typography>
      <List dense>
        {rules.map((r) => (
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
        {categories.map((c) => (
          <ListItem key={c.id}>
            <ListItemIcon>
              <ArroRight />
            </ListItemIcon>
            <ListItemText primary={c.category} />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Questions Info</Typography>
      <List dense>
        {questions.map((d) => (
          <ListItem key={d.id}>
            <ListItemIcon>
              <ArroRight />
            </ListItemIcon>
            <ListItemText primary={d.info} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default InformationPage;
