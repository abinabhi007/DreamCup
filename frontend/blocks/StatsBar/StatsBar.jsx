import styles from './StatsBar.module.scss';

const STATS = [
  { value: '1M+',   label: 'Active Players' },
  { value: '500k+', label: 'Fantasy Teams' },
  { value: '$1M+',  label: 'Total Prize Pool' },
];

export default function StatsBar() {
  return (
    <section className={styles.statsBar}>
      <div className={styles.inner}>
        {STATS.map((s, i) => (
          <div key={s.label} className={`${styles.statItem}${i !== STATS.length - 1 ? ' ' + styles.divided : ''}`}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
