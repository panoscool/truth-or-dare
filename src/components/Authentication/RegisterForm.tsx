import { useState } from 'react';
import SocialLogin from './SocialLogin';
import useAuthentication from '../../hooks/useAuthentication';
import Layout from '../Layout';
import { Typography, Button, Box, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();
  const { signup } = useAuthentication();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // It has effect, otherwise createdUser will be undefined
      const createdUser = await signup(values.email, values.password);
      // @ts-ignore
      await createdUser.user.updateProfile({ displayName: values.displayName });

      navigate('/');
    } catch (err) {
      console.error((err as any).message);
      setError((err as any).message);
    }
  }

  return (
    <Layout>
      <Typography variant="h6" textAlign="center" pt={4} pb={6}>
        Register
      </Typography>

      <Typography color="error">{error && error}</Typography>

      <form onSubmit={handleSubmit} autoComplete="off">
        <Box mb={3}>
          <TextField
            required
            type="text"
            name="displayName"
            label="Name"
            value={values.displayName}
            onChange={handleChange}
          />
        </Box>
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

        <Button fullWidth type="submit" color="primary" variant="contained">
          Register
        </Button>

        <Box mt={2} mb={4}>
          <Typography variant="body2" color="textSecondary">
            Have account?{' '}
            <Typography variant="body2" color="textSecondary" component={Link} to="/login">
              Login
            </Typography>
          </Typography>
        </Box>
      </form>
      <SocialLogin />
    </Layout>
  );
}

export default RegisterForm;
