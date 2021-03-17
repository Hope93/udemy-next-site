import Image from 'next/image';
import { wrapper, profilePic, text } from './styles';

const ShortBio = () => (
  <section css={wrapper}>
    <Image css={profilePic} src="/peter-quill.jpeg" width={225} height={300} />
    <p css={text}>Peter Jason Quill's biography goes here</p>
  </section>
);

export default ShortBio;
