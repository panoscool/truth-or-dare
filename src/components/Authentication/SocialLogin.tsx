import { Box, Button, Typography } from '@mui/material';
import Google from '../Icons/Google';
import Twitter from '../Icons/Twitter';
import useAuthentication from '../../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function SocialLogin({ setLoading }: Props) {
  const navigate = useNavigate();
  const { socialLogin } = useAuthentication();

  async function handleSocialLogin(selectedProvider: any) {
    try {
      setLoading(true);
      await socialLogin(selectedProvider);

      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box mt={8} pb={6}>
      <Typography variant="body2" textAlign="center" pb={4}>
        - OR -
      </Typography>

      <Box display="flex" justifyContent="center" flexDirection="column" gap={2}>
        <Button
          onClick={() => handleSocialLogin('google')}
          startIcon={<Google height="28px" />}
          variant="outlined"
          fullWidth
        >
          Continue with Google
        </Button>

        <Button
          onClick={() => handleSocialLogin('twitter')}
          startIcon={<Twitter height="28px" />}
          variant="outlined"
          fullWidth
        >
          Continue with Twitter
        </Button>
      </Box>
    </Box>
  );
}

export default SocialLogin;
