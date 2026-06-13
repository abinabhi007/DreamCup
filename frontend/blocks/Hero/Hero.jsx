import { motion } from 'framer-motion';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background image + overlays */}
      <div className={styles.heroBg} />
      <div className={styles.heroOverlay} />
      <div className="hero-gradient" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} />

      <motion.div 
        className={styles.heroInner}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Live badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--dc-tertiary)' }}>Trophy</span>
          <span>WORLD CUP SEASON IS LIVE</span>
        </div>

        {/* Headline */}
        <h1 className={styles.headline}>
          Build Your Dream Team.<br />
          <span className={styles.headlineGold}>Chase World Cup Glory.</span>
        </h1>

        {/* Subtext */}
        <p className={styles.subtext}>
          Join over 1 million managers worldwide. Draft elite athletes, track real-time performance,
          and win high-stakes prizes in the ultimate fantasy football ecosystem.
        </p>

        {/* CTA buttons */}
        <div className={styles.ctaRow}>
          <a href="/my-team" className={styles.btnPrimary} id="hero-create-team">
            Create Team &nbsp;
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>sports_soccer</span>
          </a>
          <a href="/leaderboard" className={styles.btnOutline} id="hero-leaderboard">
            View Leaderboard
          </a>
        </div>
      </motion.div>
    </section>
  );
}
