import { useEffect, useState } from 'react';
import styles from './Loader.module.scss';

export default function Loader({ isLoading }) {
  const [mounted, setMounted] = useState(false);
  const [render, setRender] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setRender(false), 600); // wait for fade out animation
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!mounted || !render) return null;

  return (
    <div className={`${styles.overlay} ${!isLoading ? styles.hidden : ''}`}>
      <div className={styles.ballWrap}>
        <div className={styles.ring}></div>
        <span className={`material-symbols-outlined ${styles.ball}`}>sports_soccer</span>
      </div>
      <div className={styles.text}>Get ready...</div>
    </div>
  );
}
