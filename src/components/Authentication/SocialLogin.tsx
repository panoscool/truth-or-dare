import { Button, Typography } from '@mui/material';
import Google from '../Icons/Google';
import Twitter from '../Icons/Twitter';
import useAuthentication from '../../hooks/useAuthentication';
import useTheme from '../../hooks/useTheme';

function SocialLogin() {
  const { setModal } = useTheme();
  const { socialLogin } = useAuthentication();

  async function handleSocialLogin(selectedProvider: any) {
    try {
      setModal(null);

      await socialLogin(selectedProvider);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Typography>- OR -</Typography>
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
    </div>
  );
}

export default SocialLogin;
