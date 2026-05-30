import styles from './HowItWorks.module.scss';

const STEPS = [
  {
    id: 'sign-up',
    icon: 'person_add',
    iconClass: 'iconBlue',
    label: '1. Sign Up',
    desc: 'Create your professional profile and join the global community of elite performance managers.',
  },
  {
    id: 'draft-team',
    icon: 'groups',
    iconClass: 'iconGold',
    label: '2. Draft Team',
    desc: 'Use your budget to draft real players. Analyze stats, track injuries, and optimize your tactical lineup.',
  },
  {
    id: 'compete-win',
    icon: 'military_tech',
    iconClass: 'iconTeal',
    label: '3. Compete & Win',
    desc: 'Climb the leaderboard based on real-match performance and win exclusive prizes every matchday.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Heading */}
        <div className={styles.heading}>
          <h2 className={styles.title}>How DreamCup Works</h2>
          <p className={styles.subtitle}>
            Master the game with our professional-grade drafting and scoring system designed for the ultimate sports fan.
          </p>
        </div>

        {/* Steps */}
        <div className={styles.stepsGrid}>
          {STEPS.map((step) => (
            <div key={step.id} className={styles.step}>
              <div className={`${styles.iconWrap} ${styles[step.iconClass]}`}>
                <span className="material-symbols-outlined" style={{ fontSize: 40 }}>{step.icon}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.label}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
