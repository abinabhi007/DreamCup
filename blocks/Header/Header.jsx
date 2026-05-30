import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={styles.header}
        style={scrolled ? { background: 'rgba(16,20,21,0.95)' } : {}}
      >
        <nav className={styles.nav}>
          {/* Logo */}
          <div className={styles.logoWrap}>
            <img src="/premium_logo.png" alt="DreamCup Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            <span className={styles.logoText}>DreamCup</span>
          </div>

          {/* Nav Links (Desktop) */}
          <div className={styles.navLinks}>
            <a href="#" className={`${styles.navLink} ${styles.active}`}>Lobby</a>
            <a href="#" className={styles.navLink}>My Teams</a>
            <a href="#" className={styles.navLink}>Leaderboard</a>
            <a href="#" className={styles.navLink}>Matches</a>
            <a href="#" className={styles.navLink}>Rules</a>
          </div>

          {/* Right Icons */}
          <div className={styles.actions}>
            <span className={`material-symbols-outlined ${styles.iconBtn}`}>notifications</span>
            <span className={`material-symbols-outlined ${styles.iconBtn}`}>account_circle</span>
            <span className={`material-symbols-outlined ${styles.iconBtn} ${styles.hideMobile}`}>settings</span>
            {/* Mobile Hamburger */}
            <span 
              className={`material-symbols-outlined ${styles.iconBtn} ${styles.showMobile}`}
              onClick={() => setMenuOpen(true)}
            >
              menu
            </span>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div className={styles.sidebarOverlay} onClick={() => setMenuOpen(false)}>
          <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            <div className={styles.sidebarHeader}>
              <div className={styles.logoWrap}>
                <img src="/premium_logo.png" alt="DreamCup Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
                <span className={styles.logoText}>DreamCup</span>
              </div>
              <span 
                className={`material-symbols-outlined ${styles.iconBtn}`} 
                onClick={() => setMenuOpen(false)}
              >
                close
              </span>
            </div>
            
            <div className={styles.sidebarLinks}>
              <a href="#" className={`${styles.sidebarLink} ${styles.active}`}>Lobby</a>
              <a href="#" className={styles.sidebarLink}>My Teams</a>
              <a href="#" className={styles.sidebarLink}>Leaderboard</a>
              <a href="#" className={styles.sidebarLink}>Matches</a>
              <a href="#" className={styles.sidebarLink}>Rules</a>
              <a href="#" className={styles.sidebarLink}>Settings</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
