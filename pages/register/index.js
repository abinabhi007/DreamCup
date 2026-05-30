import { useState, useEffect } from 'react';
import Head from 'next/head';
import Register from '../../blocks/Register/Register';
import Loader from '../../components/Loader/Loader';

export default function RegisterPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate premium app initialization loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>DreamCup | Join the Elite</title>
        <meta
          name="description"
          content="Create a new account on DreamCup — the ultimate premium fantasy football platform. Build your elite squad and compete with managers worldwide."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="DreamCup | Join the Elite" />
        <meta
          property="og:description"
          content="Sign up for DreamCup to draft elite performance squads and compete for grand glory."
        />
        <meta property="og:type" content="website" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && <Register />}
    </>
  );
}
