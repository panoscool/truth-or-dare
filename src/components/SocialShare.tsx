import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
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

function SocialShare() {
  const url = 'https://tord.vercel.app/';
  const title = 'TorD - The Ultimate Truth or Dare Game';

  return (
    <BoxWrapper>
      <FacebookShareButton title={title} url={url} hashtag="#truthordare">
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton title={title} url={url} hashtags={['tord', 'truthordare', 'tordgame']}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <WhatsappShareButton title={title} url={url}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <RedditShareButton title={title} url={url}>
        <RedditIcon size={32} round />
      </RedditShareButton>
    </BoxWrapper>
  );
}

export default SocialShare;
