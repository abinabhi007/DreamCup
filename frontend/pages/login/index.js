import { useState, useEffect } from 'react';
import Head from 'next/head';
import Login from '../../blocks/Login/Login';
import Loader from '../../components/Loader/Loader';

export default function LoginPage() {
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
        <title>DreamCup | Elite Performance Login</title>
        <meta
          name="description"
          content="Sign in to your DreamCup account. Draft elite athletes, track real-time performance, and manage your premium fantasy football squad."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="DreamCup | Elite Performance Login" />
        <meta
          property="og:description"
          content="Access your DreamCup dashboard. Manage your ultimate fantasy football team and view live scores."
        />
        <meta property="og:type" content="website" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && <Login />}
    </>
  );
}
