import { useState, useEffect } from 'react';
import Head from 'next/head';
import SideNav from '../../blocks/SideNav/SideNav';
import LeaderboardContent from '../../blocks/LeaderboardContent/LeaderboardContent';
import Loader from '../../components/Loader/Loader';

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate premium leaderboard data fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Global Leaderboard | DreamCup Elite</title>
        <meta
          name="description"
          content="View the global fantasy rankings of the world's most elite managers competing for the DreamCup."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
          {/*Persistent Sidebar Navigation*/}
          <SideNav />

          {/*Main Leaderboard Content*/}
          <LeaderboardContent />
        </div>
      )}
    </>
  );
}
