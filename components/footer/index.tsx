import { IoLogoGithub as Github } from 'react-icons/io';
import { FiTwitter as Twitter } from 'react-icons/fi';
import { SiUdemy as Udemy } from 'react-icons/si';
import { metadata } from 'config';
import { footer } from './styles'
import { leakedList} from '@shared/style-helpers'
import Footprint from '@components/footprint'

const Footer = () => (
  <footer css={footer}>
    <ul css={leakedList}>
      <li>
        <a
          href={metadata.author.githubUrl}
          aria-label="To Github"
          target="_blank"
          rel="noopener"
        >
          <Github />
        </a>
      </li>
      <li>
        <a
          href={metadata.author.twitterUrl}
          aria-label="To Twitter"
          target="_blank"
          rel="noopener"
        >
          <Twitter />
        </a>
      </li>
      <li>
        <a
          href={metadata.author.udemyUrl}
          aria-label="To Udemy"
          target="_blank"
          rel="noopener"
        >
          <Udemy />
        </a>
      </li>
    </ul>
    <Footprint />
  </footer>
);

export default Footer;
