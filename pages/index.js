import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../blocks/Header/Header';
import Hero from '../blocks/Hero/Hero';
import StatsBar from '../blocks/StatsBar/StatsBar';
import ElitePlayerPool from '../blocks/ElitePlayerPool/ElitePlayerPool';
import HowItWorks from '../blocks/HowItWorks/HowItWorks';
import UpcomingMatches from '../blocks/UpcomingMatches/UpcomingMatches';
import Testimonials from '../blocks/Testimonials/Testimonials';
import CtaBanner from '../blocks/CtaBanner/Ctabanner';
import Footer from '../blocks/Footer/Footer';
import Loader from '../components/Loader/Loader';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate premium app initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>DreamCup | Elite Performance Fantasy Football</title>
        <meta
          name="description"
          content="Join over 1 million managers worldwide on DreamCup — the ultimate fantasy football platform. Draft elite athletes, track real-time performance, and win high-stakes prizes."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="DreamCup | Elite Performance Fantasy Football" />
        <meta
          property="og:description"
          content="Draft elite athletes, track real-time performance, and win high-stakes prizes in the ultimate fantasy football ecosystem."
        />
        <meta property="og:type" content="website" />
      </Head>

      <Loader isLoading={loading} />

      {/* ── Fixed Header / Navigation ── */}
      <Header />

      {/* ── Page Sections ── */}
      <main id="main-content">
        {/* 1. Hero — full-screen stadium backdrop + headline + CTAs */}
        <Hero />

        {/* 2. Stats Bar — platform metrics */}
        <StatsBar />

        {/* 3. Elite Player Pool — featured players + leaderboard */}
        <ElitePlayerPool />

        {/* 4. How DreamCup Works — 3-step explainer */}
        <HowItWorks />

        {/* 5. Upcoming High-Stakes Matches */}
        <UpcomingMatches />

        {/* 6. Testimonials — Words from the Elite */}
        <Testimonials />

        {/* 7. CTA Banner — Ready to Enter the Arena */}
        <CtaBanner />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
