import { Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import ArroRight from '@mui/icons-material/ArrowRight';
import { styled } from '@mui/material/styles';
import { rules, categories, questions } from './InformationData';

const PaperWrapper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

function InformationPage() {
  return (
    <PaperWrapper>
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
    </PaperWrapper>
  );
}

export default InformationPage;
