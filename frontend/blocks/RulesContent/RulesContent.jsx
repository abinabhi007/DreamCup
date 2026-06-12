import { useState } from 'react';
import styles from './RulesContent.module.scss';
import Link from 'next/link';

export default function RulesContent() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How are tie-breakers calculated?",
      answer: "In the event of a tie in total points, the team with the fewest total transfers made over the season will be ranked higher. If still tied, the team with the highest single Gameweek score takes priority."
    },
    {
      question: "When does the league lock?",
      answer: "The league locks exactly 90 minutes before the kickoff of the first match of the Gameweek. Any transfers or captain changes made after this time will apply to the subsequent Gameweek."
    },
    {
      question: "How is prize distribution handled?",
      answer: "Prizes for Global and Private leagues are distributed within 48 hours of the final match verification of the season. Elite Tier members receive automated transfers to their connected wallet/bank account."
    }
  ];

  return (
    <div className={styles.mainLayout}>

      <main className={styles.pageContent}>
        {/* Hero Header */}
        <header className={styles.heroHeader}>
          <div
            className={styles.heroBg}
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7FAr5rcoSFj-AkQ7F2z1Sw7kj6iFtykHHC7uP7QP4sYf0DBRWmo_nL3z3I4o_COdPlz-iBQtixzmhNa_SlkF4grgI_PTovVjNgBTOR3sh8YOh-k_Wu0KmuBC3G79I3Q2SHu29MpM3ZniENYpZIs9D_2t5E_lwq9gbC8n0SmfBSEZ7FJth933kCUIq65_MYihWHw3ewfiFaAyE4PWXE_lvlSXmGPBpb4bMTWHRY5bRzgmJNvw_LJPudvidDgGmRdfC7LU5cmaLhEs')" }}
          ></div>
          <div className={styles.heroOverlay}>
            <div className={styles.heroTag}>
              <span>The Playbook</span>
            </div>
            <h1 className={styles.heroTitle}>Fantasy Game Rules</h1>
            <p className={styles.heroDesc}>Master the mechanics of elite management. Every point counts in the climb to the DreamCup throne.</p>
          </div>
        </header>

        {/* Rules Bento Grid */}
        <section className={styles.rulesGrid}>

          {/* Team Building */}
          <div className={styles.teamBuildingPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelIcon}>
                <span className="material-symbols-outlined">groups</span>
              </div>
              <div>
                <h2 className={styles.panelTitle}>Team Building Rules</h2>
                <p className={styles.panelSubtitle}>Drafting your elite 15-player squad</p>
              </div>
            </div>

            <div className={styles.positionsGrid}>
              <div className={styles.positionCard}>
                <p className={styles.posLabel}>Goalkeepers</p>
                <p className={styles.posValue}>2</p>
              </div>
              <div className={styles.positionCard}>
                <p className={styles.posLabel}>Defenders</p>
                <p className={styles.posValue}>5</p>
              </div>
              <div className={styles.positionCard}>
                <p className={styles.posLabel}>Midfielders</p>
                <p className={styles.posValue}>5</p>
              </div>
              <div className={styles.positionCard}>
                <p className={styles.posLabel}>Forwards</p>
                <p className={styles.posValue}>3</p>
              </div>
            </div>

            <p className={styles.teamNote}>Total of 15 players must be selected. There are no restrictions on the number of players you can select from a single real-world club.</p>
          </div>

          {/* Budget */}
          <div className={styles.budgetPanel}>
            <div className={styles.budgetGlow}></div>
            <div className={styles.budgetIconWrap}>
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>payments</span>
            </div>
            <h3 className={styles.budgetLabel}>Total Budget</h3>
            <div className={styles.budgetValue}>£100.0M</div>
            <p className={styles.budgetDesc}>Manage your finances with precision. Player values fluctuate based on market performance.</p>
          </div>

          {/* Scoring System */}
          <div className={styles.scoringPanel}>
            <div className={styles.scoringHeader}>
              <div>
                <h2 className={styles.panelTitle} style={{ marginBottom: 4 }}>Scoring System</h2>
                <p className={styles.panelSubtitle}>Every action on the pitch defines your ranking.</p>
              </div>
              <div className={styles.scoringPills}>
                <span className={styles.scoringPill}>Defenders/GK</span>
                <span className={styles.scoringPill}>Midfielders</span>
                <span className={styles.scoringPill}>Forwards</span>
              </div>
            </div>

            <div className={styles.scoringGrid}>
              <div className={styles.scoringCard}>
                <div className={styles.scoringCardTitleRow}>
                  <span className={styles.scoringCardTitle}>Goal</span>
                  <span className={styles.scoringCardPts}>+4 - +6</span>
                </div>
                <p className={styles.scoringCardDesc}>Points vary by player position. Forwards earn 4, Defenders earn 6.</p>
              </div>

              <div className={styles.scoringCard}>
                <div className={styles.scoringCardTitleRow}>
                  <span className={styles.scoringCardTitle}>Assist</span>
                  <span className={styles.scoringCardPts}>+3</span>
                </div>
                <p className={styles.scoringCardDesc}>Awarded for the final pass or shot leading to a goal.</p>
              </div>

              <div className={styles.scoringCard}>
                <div className={styles.scoringCardTitleRow}>
                  <span className={styles.scoringCardTitle}>Clean Sheet</span>
                  <span className={styles.scoringCardPts}>+4</span>
                </div>
                <p className={styles.scoringCardDesc}>Earned by GK and Defenders if no goals are conceded.</p>
              </div>

              <div className={styles.scoringCard}>
                <div className={styles.scoringCardTitleRow}>
                  <span className={styles.scoringCardTitle}>Saves</span>
                  <span className={styles.scoringCardPts}>+1</span>
                </div>
                <p className={styles.scoringCardDesc}>Goalkeepers earn 1 point for every 3 saves made.</p>
              </div>
            </div>
          </div>

          {/* Captain Multiplier */}
          <div className={styles.captainPanel}>
            <div className={styles.captainWrap}>
              <div className={styles.captainBadgeWrap}>
                <div className={styles.captainGlow}></div>
                <div className={styles.captainBadge}>2X / 1.5X</div>
              </div>
              <div>
                <h3 className={styles.captainTitle}>Captain & Vice-Captain</h3>
                <p className={styles.captainDesc}>Assign the armband to your top performers. Your Captain earns double points (2x) and your Vice-Captain earns a 1.5x multiplier every Gameweek.</p>
              </div>
            </div>
          </div>

          {/* Transfer Rules */}
          <div className={styles.transferPanel}>
            <div className={styles.transferHeader}>
              <span className={`material-symbols-outlined ${styles.transferIcon}`}>sync_alt</span>
              <h3 className={styles.transferTitle}>Transfer Protocol</h3>
            </div>

            <div className={styles.transferList}>
              <div className={styles.transferRow}>
                <span className={styles.transferRowLabel}>Weekly Free Moves</span>
                <span className={styles.transferRowValue}>UNLIMITED</span>
              </div>
              <div className={styles.transferRow}>
                <span className={styles.transferRowLabel}>Point Deductions</span>
                <span className={styles.transferRowValue}>NONE</span>
              </div>
              <div className={styles.transferRow}>
                <span className={styles.transferRowLabel}>Budget Constraint</span>
                <span className={styles.transferRowValue}>STRICT £100.0M</span>
              </div>
            </div>

            <p className={styles.transferNote}>You can transfer players freely without point deductions as long as you stay within your budget and position limits.</p>
          </div>

        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${activeFaq === index ? styles.faqItemActive : ''}`}
              >
                <button className={styles.faqBtn} onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className={`material-symbols-outlined ${styles.faqIcon}`}>expand_more</span>
                </button>
                <div className={styles.faqContent}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <h2 className={styles.footerTitle}>DreamCup Elite</h2>
            <p className={styles.footerCopy}>© 2026 DreamCup Elite. Designed and Developed by <Link href="https://abinhn.vercel.app" target='_blank' style={{color:"#ffe16d",textDecoration:"none"}}> Abin HN</Link></p>
          </div>
          <div className={styles.footerLinks}>
            <Link href="#" className={styles.footerLink}>Terms of Service</Link>
            <Link href="#" className={styles.footerLink}>Privacy Policy</Link>
            <Link href="#" className={styles.footerLink}>Fair Play</Link>
            <Link href="#" className={styles.footerLink}>Affiliates</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
