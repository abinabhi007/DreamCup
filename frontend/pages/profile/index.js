import { useState, useEffect } from 'react';
import Head from 'next/head';
import SideNav from '../../blocks/SideNav/SideNav';
import ProfileContent from '../../blocks/ProfileContent/ProfileContent';
import Loader from '../../components/Loader/Loader';
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    
    // Simulate premium dashboard initialization loader 
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Profile | DreamCup Elite</title>
        <meta
          name="description"
          content="View your DreamCup Elite performance stats, best rank achievements, point charts, and manager history info."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Profile | DreamCup Elite" />
        <meta
          property="og:description"
          content="Track your progress on the global stage. View stats, achievements, and points history."
        />
        <meta property="og:type" content="website" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
          {/*Persistent Sidebar Navigation*/}
          <SideNav />

          {/*Main Profile Dashboard Panel*/}
          <ProfileContent />
        </div>
      )}
    </>
  );
}
