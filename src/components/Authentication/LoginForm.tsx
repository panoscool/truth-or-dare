import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import useAuthentication from '../../hooks/useAuthentication';
import { Box, Button, Typography, TextField } from '@mui/material';
import Layout from '../Layout';

function LoginForm() {
  const navigate = useNavigate();
  const { signIn } = useAuthentication();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await signIn(values.email, values.password);

      navigate('/');
    } catch (err) {
      console.error((err as any).message);
      setError((err as any).message);
    }
  }

  return (
    <Layout>
      <Typography variant="h6" textAlign="center" pt={4} pb={6}>
        Login
      </Typography>

      <Typography color="error">{error && error}</Typography>

      <form onSubmit={handleSubmit} autoComplete="off">
        <Box mb={3}>
          <TextField
            required
            type="email"
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
          />
        </Box>
        <Box mb={3}>
          <TextField
            required
            type="password"
            name="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
          />
        </Box>

        <Box mt={2} mb={4}>
          <Typography variant="body2" color="textSecondary" component={Link} to="/forgot-password">
            Forgot password?
          </Typography>
        </Box>

        <Button fullWidth type="submit" color="primary" variant="contained">
          Login
        </Button>

        <Box mt={2} mb={4}>
          <Typography variant="body2" color="textSecondary">
            Don't have account?{' '}
            <Typography variant="body2" color="textSecondary" component={Link} to="/register">
              Register
            </Typography>
          </Typography>
        </Box>
      </form>
      <SocialLogin />
    </Layout>
  );
}

export default LoginForm;
