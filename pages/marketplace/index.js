import { useState, useEffect } from 'react';
import Head from 'next/head';
import SideNav from '../../blocks/SideNav/SideNav';
import MarketplaceContent from '../../blocks/MarketplaceContent/MarketplaceContent';
import Loader from '../../components/Loader/Loader';

export default function MarketplacePage() {
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
        <title>Player Marketplace | DreamCup Elite Performance</title>
        <meta
          name="description"
          content="Discover from 4,281 professional athletes worldwide and build your elite fantasy team."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
          {/*Persistent Sidebar Navigation*/}
          <SideNav />

          {/*Main Marketplace Content*/}
          <MarketplaceContent />
        </div>
      )}
    </>
  );
}
