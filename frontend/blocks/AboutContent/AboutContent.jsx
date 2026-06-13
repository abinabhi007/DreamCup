import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './AboutContent.module.scss';
import Link from 'next/link';

export default function AboutContent() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const team = [
    {
      name: 'Marcus Thorne',
      role: 'Chief Data Architect',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6zsUd7K_l5Em01XJaTe55cp-ODCb-cJP_-zEkyQN9so2ToNTgioKTurYr4qr3vSsmcXhfCcv1h2vWAIkLxLpbdT8V2QsN1RAcQmfi-IMwnEOOuRV9icAmLwRUtNxg1mkz1fJstt05NY1A7fhZTIa6rBOUM-RX_kZSzlSHtbzbRmbNRqweb7iG5kz5COPdKiAwYRXXhHqxLPjnwQU_8sKHAt5Sb-T5gHQvRt1YO95zwoW_glX5Y-3P5r3F5KOecojFo1PdskLuOaQ'
    },
    {
      name: 'Elena Vance',
      role: 'Strategy Lead',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALw_v57DAzWv79IBrR-vczyRKrW1_LY4jVSYPXXTdfOTLeSF_b8WEA-L1_insShsofoZgV-08rolyK9ZXFL_qUruvzwUnsfAlBiZ8UxAuKlCJZmL0xkKrWK9WXGmLdlJc6t99ugn1fv6Nez6MHrPmO1cBxOMBsyauYOJtvdN3QFPZR9DnjZ3xfKWf1EUaDvSjmDJbAYBC-RxNZ1hLVTuMO9iuH3quvNYBBKk2_YnE4z3WLhUsVRVSSnVQQyi9jAjR0fg3UXMVxAMI'
    },
    {
      name: 'Julian Reyes',
      role: 'Lead Engineer',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpV6qTV1PobgvXeZ5PLK3iEzALMUUi5ZhRVJ7ZSfXCrjFECI72qbCRlzyCYh2Zh9RgTULrkpmOXhVN69PHAXNStRioLjlHS3FiTCahOzB0A-kGjPFXSMsM2t3gGjCEs--QaPYiwMgqh49_LS8PJGe-HmZGG_fH8cAqQrMCQNsHMFAZAq5AOwUJcWpoC5fhtsA7L-iYqbnqxYWUhB-ZXJLauHiIdJ360143D6H4BWafArY51jGoGvy_CyPymsqfM7mpRDT7sK8TvvE'
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Analytics',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNJ3CfZy5wfg2CsyYL2gdzQlv1GS40pzB8ox2GfueJubMu32icP1bH_I9QxQigfxu60xpPM6OVSUxvVJZz4ks-tVs5wZiXaQnxDW-UjcmuTgAms5sHn9GR8tV2DicL_uGbfdxHYj1Dhi9JeXVjaCc_Ub6nZVDM4-XJUzpl_BtFzdAX2IPr4eaHVa5OMvaPkMDaJ4dBw-Jm7GRhyx3iAScjERiRfzmg-60WC6J17wELUrniEaTZqeGAx_7G5hx7cq2mJ2R6nXsXkP0'
    }
  ];

  const faqs = [
    {
      question: "How do rewards work?",
      answer: "Rewards are distributed based on your final season standing and tier. Premium tier managers are eligible for physical experiences and cash prizes, which are automatically distributed via our secure wallet system within 48 hours of league conclusion."
    },
    {
      question: "Is the data really real-time?",
      answer: "Yes. We partner directly with world-leading sports data providers to bring you sub-second updates. Our interface is optimized to reflect every pass, tackle, and goal as it happens on the pitch."
    },
    {
      question: "Can I create my own private league?",
      answer: "Absolutely. DreamCup supports highly customizable private leagues where you can set your own scoring rules, draft format, and invitation criteria for your friends or colleagues."
    }
  ];

  return (
    <div className={styles.mainContainer}>
      
      
      {/* Section 1: Hero */}
      <motion.section 
        className={styles.heroSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.heroGlows}>
          <div className={styles.glowTop}></div>
          <div className={styles.glowBottom}></div>
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>THE PINNACLE OF FANTASY FOOTBALL</span>
          <h1 className={styles.heroTitle}>
            The Ultimate Destination for <span>Elite Managers</span>
          </h1>
          <p className={styles.heroDesc}>
            DreamCup is a performance-driven fantasy platform engineered for those who demand more than luck. We combine high-stakes competition with professional-grade data analytics.
          </p>
          <div className={styles.heroActions}>
            <button className={styles.primaryBtn}>Join the Elite</button>
            <button className={styles.secondaryBtn}>View Live Leaderboard</button>
          </div>
        </div>
      </motion.section>

      {/* Section 2: Mission */}
      <motion.section 
        className={styles.missionSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.missionInner}>
          <div className={styles.missionText}>
            <h2 className={styles.missionTitle}>Empowering Fans Through Data-Driven Competition</h2>
            <p className={styles.missionDesc}>
              Our mission is to bridge the gap between casual fandom and professional analysis. We provide every manager with the tools, insights, and global stage required to prove their mastery of the beautiful game.
            </p>
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>2.5M+</span>
                <span className={styles.statLabel}>Active Managers</span>
              </div>
              <div className={styles.statItem} style={{ marginLeft: 24 }}>
                <span className={styles.statValue}>$10M+</span>
                <span className={styles.statLabel}>Prize Pools</span>
              </div>
            </div>
          </div>
          <div className={styles.missionImageWrap}>
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9jj2epWpA3vJD3k4eTfEndX-gaQ7WSEZ9UsoytwJzZiUEM5-WHS-TYcq_s-mSxE-fHvcOVKuRbLLoJe1Ju4UO53P0h78GHggx7YwxsWB8tFZDMj7HCpJbaz_Jz4YoF4hMiNLikIdxj3Jz6IgDvnCJNqX4CO1bwWDYkABqMlYLtf7zWjJm6YtRH3ksoGl9nyZII3ibQXCsXS4nB6L_4Yoa2oDGhCc_JwoX88HLCZ_uehrBKtP1qXf9zTEnIqArWXWxm0_DqXtf9as" 
              alt="Stadium" 
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.imageOverlay}></div>
          </div>
        </div>
      </motion.section>

      {/* Section 3: Platform Features */}
      <motion.section 
        className={styles.featuresSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.featuresInner}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>Engineered for Performance</h2>
            <p className={styles.sectionSubtitle}>The tools you need to dominate your league.</p>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIconWrap}>
                <span className={`material-symbols-outlined ${styles.featureIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
              </div>
              <h3 className={styles.featureTitle}>Real-time Analytics</h3>
              <p className={styles.featureDesc}>Live xG data, player heatmaps, and predictive performance scoring updated every second during match play.</p>
            </div>
            
            <div className={styles.featureCardGold}>
              <div className={styles.featureIconWrap}>
                <span className={`material-symbols-outlined ${styles.featureIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
              </div>
              <h3 className={styles.featureTitle}>Global Leagues</h3>
              <p className={styles.featureDesc}>Compete in massive international tournaments or create private elite tiers for you and your inner circle.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIconWrap}>
                <span className={`material-symbols-outlined ${styles.featureIcon}`} style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
              <h3 className={styles.featureTitle}>Secure Draft System</h3>
              <p className={styles.featureDesc}>Our proprietary blockchain-backed draft engine ensures total fairness and instant prize distribution.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 4: Why Choose DreamCup (Bento) */}
      <motion.section 
        className={styles.bentoSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.bentoInner}>
          <div className={styles.bentoHeader}>
            <h2 className={styles.bentoTitle}>The DreamCup Edge</h2>
          </div>
          <div className={styles.bentoGrid}>
            
            <div className={styles.bentoCard1}>
              <Image 
                className={styles.bentoBg} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR-J4eqdZzqP_-3vAe12AhbjfhIC3oddDhTqWRiSMq-V-mi3OTno5uPQJUNZNR64-q7moEy-H5-kSxvVWcr0S0VvjUHgcH-U45bk6d-nKI7X0MFrC8vYEN9PmHqc1yVhbjWbOrg3jIAp4t4uuXoupKSNY8YI5P2MRzrop1atrSVmTqL3lNTTSw9RvwTGBqTJR7Tuf50Q6Svcg_xeucOFC-OpGLNtrN8gocO7Ra7PfFHVANVt7oD9lGsAc2kZTdvlwN_B4lmxeBeyM" 
                alt="Trophy" 
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.bentoContent}>
                <h3 className={styles.bentoTitle1}>Exclusive Rewards</h3>
                <p className={styles.bentoDesc1}>Win once-in-a-lifetime experiences, from VIP World Cup tickets to signed memorabilia and crypto prizes.</p>
              </div>
            </div>

            <div className={styles.bentoCard2}>
              <div className={styles.bentoTextWrap}>
                <h3 className={styles.bentoTitle2}>Expert Insights</h3>
                <p className={styles.bentoDesc2}>Weekly scouting reports and tactical breakdowns from former UEFA A-licensed coaches and data scientists.</p>
              </div>
              <span className={`material-symbols-outlined ${styles.bentoIconLg}`}>insights</span>
            </div>

            <div className={styles.bentoCard3}>
              <div className={styles.bentoTextWrap}>
                <h3 className={styles.bentoTitle2}>Community First</h3>
                <p className={styles.bentoDesc2}>Connect with a global network of tactical experts in our exclusive 'War Rooms' and integrated Discord tiers.</p>
              </div>
              <span className={`material-symbols-outlined ${styles.bentoIconLg}`}>groups</span>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Section 5: Team Section */}
      <motion.section 
        className={styles.teamSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.teamInner}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle}>Elite Performance Specialists</h2>
            <p className={styles.sectionSubtitle}>The architects behind the platform.</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member, idx) => (
              <div key={idx} className={styles.teamMember}>
                <div className={`${styles.memberImgWrap} ${idx === 0 ? styles.memberImgGold : ''}`}>
                  <Image className={styles.memberImg} src={member.image} alt={member.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <h4 className={styles.memberName}>{member.name}</h4>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 6: FAQ */}
      <motion.section 
        className={styles.faqSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.faqInner}>
          <div className={styles.sectionHeaderCenter}>
            <h2 className={styles.sectionTitle} style={{ fontSize: 32 }}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>Everything you need to know about the elite experience.</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={activeFaq === index ? styles.faqItemActive : styles.faqItem}
              >
                <button className={styles.faqBtn} onClick={() => toggleFaq(index)}>
                  <span className={styles.faqQuestion}>{faq.question}</span>
                  <span className={`material-symbols-outlined ${styles.faqIcon}`}>expand_more</span>
                </button>
                <div className={styles.faqContent}>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 7: CTA */}
      <motion.section 
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.ctaBg}></div>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Ready to Lead Your Team to Glory?</h2>
          <button className={styles.ctaBtn}>Create Your Dream Team Now</button>
        </div>
      </motion.section>

    </div>
  );
}
