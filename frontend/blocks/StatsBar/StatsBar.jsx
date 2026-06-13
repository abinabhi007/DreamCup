import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import styles from './StatsBar.module.scss';

const STATS = [
  { value: 1, prefix: '', suffix: 'M+', label: 'Active Players' },
  { value: 500, prefix: '', suffix: 'k+', label: 'Fantasy Teams' },
  { value: 1, prefix: '$', suffix: 'M+', label: 'Total Prize Pool' },
];

export default function StatsBar() {
  return (
    <motion.section 
      className={styles.statsBar}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className={styles.inner}>
        {STATS.map((s, i) => (
          <div key={s.label} className={`${styles.statItem}${i !== STATS.length - 1 ? ' ' + styles.divided : ''}`}>
            <span className={styles.statValue}>
              <CountUp start={0} end={s.value} prefix={s.prefix} suffix={s.suffix} duration={2.5} enableScrollSpy={true} scrollSpyOnce={true} />
            </span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
