import { useState, useEffect } from 'react';
import Head from 'next/head';
import SideNav from '../../blocks/SideNav/SideNav';
import MatchesContent from '../../blocks/MatchesContent/MatchesContent';
import Loader from '../../components/Loader/Loader';

export default function MatchesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Match Center | DreamCup Elite</title>
        <meta
          name="description"
          content="Live matches, expected lineups, win probabilities and timeline predictions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
          {/*Persistent Sidebar Navigation*/}
          <SideNav />

          {/*Main Matches Content*/}
          <MatchesContent />
        </div>
      )}
    </>
  );
}
