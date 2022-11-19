import { Box, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

const BoxWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2, 0),
  opacity: 0.5,
  transition: 'opacity 0.3s ease-in-out',

  '&:hover': {
    opacity: 1,
  },
}));

const ShareIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.5),
}));

function SocialShare() {
  const size = 32;
  const url = 'https://tord.vercel.app/';
  const title = 'TorD - The Ultimate Truth or Dare Game';

  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        url,
        text: 'Let the game begin!',
      });
    } catch (err) {
      console.error(`Error sharing: ${err}`);
    }
  };

  return (
    <BoxWrapper>
      <FacebookShareButton title={title} url={url} hashtag="#truthordare">
        <FacebookIcon size={size} round />
      </FacebookShareButton>

      <TwitterShareButton title={title} url={url} hashtags={['truthordare', 'tord', 'tordgame']}>
        <TwitterIcon size={size} round />
      </TwitterShareButton>

      <WhatsappShareButton title={title} url={url}>
        <WhatsappIcon size={size} round />
      </WhatsappShareButton>

      <RedditShareButton title={title} url={url}>
        <RedditIcon size={size} round />
      </RedditShareButton>

      <div>
        <ShareIconButton
          onClick={handleShare}
          disableFocusRipple
          disableRipple
          disableTouchRipple
          aria-label="share"
          size="small"
        >
          <ShareRoundedIcon fontSize="small" />
        </ShareIconButton>
      </div>
    </BoxWrapper>
  );
}

export default SocialShare;
