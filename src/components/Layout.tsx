import { Container, Paper } from '@mui/material';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="sm" component={Paper}>
      {children}
    </Container>
  );
}

export default Layout;
