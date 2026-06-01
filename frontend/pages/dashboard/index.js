import { useState, useEffect } from 'react';
import Head from 'next/head';
import SideNav from '../../blocks/SideNav/SideNav';
import DashboardContent from '../../blocks/DashboardContent/DashboardContent';
import Loader from '../../components/Loader/Loader';

export default function DashboardPage() {
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
        <title>Dashboard | DreamCup Elite Performance</title>
        <meta
          name="description"
          content="Your elite fantasy dashboard. View your active lineup, performance trends, and upcoming fixtures."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && (
        <div style={{ display: 'block', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
          {/*Persistent Sidebar Navigation*/}
          <SideNav />

          {/*Main Dashboard Content*/}
          <DashboardContent />
        </div>
      )}
    </>
  );
}
