import { useState, useEffect } from 'react';
import Head from 'next/head';
import SideNav from '../../blocks/SideNav/SideNav';
import RulesContent from '../../blocks/RulesContent/RulesContent';
import Loader from '../../components/Loader/Loader';

export default function RulesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Rules | DreamCup Elite</title>
        <meta
          name="description"
          content="Master the mechanics of elite management. Learn the DreamCup fantasy game rules."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && (
        <div style={{ display: 'block', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
          <SideNav />
          <RulesContent />
        </div>
      )}
    </>
  );
}
