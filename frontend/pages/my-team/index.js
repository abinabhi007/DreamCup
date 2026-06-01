import { useState, useEffect } from 'react';
import Head from 'next/head';
import SideNav from '../../blocks/SideNav/SideNav';
import MyTeamContent from '../../blocks/MyTeamContent/MyTeamContent';
import Loader from '../../components/Loader/Loader';

export default function MyTeamPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Build Team | DreamCup Elite Performance</title>
        <meta
          name="description"
          content="Build your elite fantasy team. Draft players, set formations, and manage your budget."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && (
        <div style={{ display: 'block', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
          {/*Persistent Sidebar Navigation*/}
          <SideNav />

          {/*Main Build Team Content*/}
          <MyTeamContent />
        </div>
      )}
    </>
  );
}
