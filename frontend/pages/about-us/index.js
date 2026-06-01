import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../blocks/Header/Header';
import Footer from '../../blocks/Footer/Footer';
import AboutContent from '../../blocks/AboutContent/AboutContent';
import Loader from '../../components/Loader/Loader';

export default function AboutUsPage() {
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
        <title>About Us | DreamCup Elite Performance Fantasy</title>
        <meta
          name="description"
          content="DreamCup is a performance-driven fantasy platform engineered for those who demand more than luck."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--dc-background)', color: 'var(--dc-on-surface)' }}>
          <Header />
          <AboutContent />
          <Footer />
        </div>
      )}
    </>
  );
}
