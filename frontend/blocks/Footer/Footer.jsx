import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.colLeft}>
          <div className={styles.brand}>
            <img src="/premium_logo.png" alt="DreamCup Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            <span>DreamCup</span>
          </div>
          <p className={styles.brandDesc}>
            The ultimate destination for elite performance fantasy sports. Professional tools for professional fans.
          </p>
        </div>

        <div className={styles.links}>
          <a href="#" className={styles.link}>Terms of Service</a>
          <a href="#" className={styles.link}>Privacy Policy</a>
          <a href="#" className={styles.link}>Help Center</a>
          <a href="#" className={styles.link}>Contact Us</a>
          <a href="#" className={styles.link}>Sponsorships</a>
        </div>

        <div className={styles.socials}>
          <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>sports_soccer</span>
          <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>public</span>
          <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>share</span>
        </div>
      </div>
      
      <div className={styles.copyright}>
        © 2026 DreamCup Elite Performance Fantasy. All rights reserved by <Link href="https://abinhn.vercel.app" target='_blank'> ABIN</Link>
      </div>
    </footer>
  );
}
