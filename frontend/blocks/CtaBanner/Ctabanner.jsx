import styles from './CtaBanner.module.scss';

export default function CtaBanner() {
  return (
    <section className={styles.section}>
      <div className={`${styles.inner} glass-panel`}>
        <div className={styles.gradientBg} />
        <div className={styles.content}>
          <h2 className={styles.headline}>Ready to Enter the Arena?</h2>
          <p className={styles.subtext}>
            Join the world's most competitive fantasy league today. Your dream team is waiting.
          </p>
          <button className={styles.ctaBtn}>
            GET STARTED NOW
          </button>
        </div>
      </div>
    </section>
  );
}
