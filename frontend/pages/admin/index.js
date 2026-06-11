import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SideNav from '../../blocks/SideNav/SideNav';
import AdminContent from '../../blocks/AdminContent/AdminContent';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Admin Console | DreamCup Elite</title>
        <meta name="description" content="Manage DreamCup parameters and trigger calculations" />
      </Head>
      
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
        <SideNav />
        <AdminContent />
      </div>
    </>
  );
}
