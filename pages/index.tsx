import Head from 'next/head';
import Header from '../components/header'

export default function Home() {
  return (
    <>
      <Head>
        <title>All About NextJS</title>
      </Head>
      <main>
        <Header />
      </main>
    </>
  );
}
