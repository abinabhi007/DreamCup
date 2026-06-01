import styles from './ElitePlayerPool.module.scss';

const LEADERBOARD = [
  {
    rank: '01',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdyaqpfqOhMncbLvsEyFiAlhPtd4iYTCWWiaMEkjyOsT4VujBv0jNrBIKupvo68wAnTojjAzYaBnjSr1on1kpc-mcDm3clvaW-Cln6zNStwk7UK_-LJu_JLbm5our8Nvmg4eAxlJ4chg9u9fQjB9dGLIJZK-uZ5LCFgiH7nqHT-GuvqpSL84gdsufCH0q2B_nCQbrG_vSxOkKeddwInyDBDPa0KvzKgCuh36iwdwIRTCjByUy749uUfFrJM6Zo1BeixHiVO3IcIls',
    name: 'EliteStriker99',
    meta: '4 Teams · UK',
    pts: '3,450 pts',
    isTop: true,
  },
  {
    rank: '02',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaBnzJ9qSAnelbF8T_dTV5IJeNMBuU9mvO0l3bZWT9hSjWQQk0nc8G5PSGHh7T43HsQW1v2-BvHQCu2qkEswYULL_XEIX-Pq_poCRmitoAagqagu9jdZmKD7dRdyow84j7bHa1u5ZurlyGinHw-hlVkHn7ECdUy0TUkxJGej4ns_daJZ5Ay-8fq1D__DfGDT7ne3pedpLH98mMDqmBKmiteFYqxJavt76gOHxluwduMlOMbk9IHr_vqao4uGFQfGSjHSTl0Qi6EFw',
    name: 'PitchMaster_X',
    meta: '2 Teams · Brazil',
    pts: '3,212 pts',
    isTop: false,
  },
];

export default function ElitePlayerPool() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Elite Player Pool</h2>
            <p className={styles.sectionSub}>High-performance athletes ready for your roster</p>
          </div>
          <button className={styles.viewMarket}>
            View Market{' '}
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
          </button>
        </div>

        {/* Grid: matches prototype grid-cols-12, h-[600px] */}
        <div className={styles.grid}>
          {/* Large card — Kylian Mbappé (md:col-span-8) */}
          <div className={`${styles.cardLarge} glass-panel premium-border`}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDztG9EadRU6orih5L4Nxvn_fUTKAXpiX-QCnQ6C_4z3fuGOcKUSPewdHqzyVYJ7s5kiBZLSBktoQ_7zKNw0fF_kE-irorG1soKnmIO14RwQwEn9BjmMZUv8lf1BpnJSptV9-fxzg2fZ4NVOCt0FwtFBp5lVwiYEFATRAxzD2QyOIMe86rGaweKSw3Vizq_vkrrHX35PeJPQYRzDMvboZLugL-_5q4BcsEJiOm9N2J5tZW2IDXoOZ0hCGPGLIAhAJqUtc01OdnQElc"
              alt="Kylian Mbappé"
              className={styles.cardImg}
            />
            <div className={styles.cardGradient} />
            <div className={styles.cardBottom}>
              <div className={styles.cardBottomLeft}>
                <span className={styles.captainBadge}>MOST CAPTAINED</span>
                <h3 className={styles.playerName}>Kylian Mbappé</h3>
                <p className={styles.playerMeta}>Forward • France</p>
              </div>
              <div className={styles.cardBottomRight}>
                <p className={styles.pts}>248</p>
                <p className={styles.ptsLabel}>POINTS</p>
              </div>
            </div>
          </div>

          {/* Right column — Messi + Haaland + Leaderboard */}
          <div className={styles.rightCol}>
            {/* Messi card (md:col-span-4) */}
            <div className={`${styles.cardSmall} glass-panel`}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkG3mjWfwE9TmhNNaDv0bP9_iVC4xSsh-Eg4RPJ1cHeHGv7SaUJl4rgEzGXkM0hPiadeKhdxf5QHtFfYy9jRA_oypvyv37Gpde5hRoU73qN2P70MKuLdKcZGZqCek338z1yz-CbKpV_BSD2h3bLgrs9qpfcNVX7ZO_Q-jTnV3w6-NbG9v3eIWHkf2lMQgtnnZEMObMjkAeEHcVvp-p_EpSzN3B6Z8QxMrS3CFDhtDRXkBEEALva-BXUlfyodXbQam1h94qfstuOMc"
                alt="Lionel Messi"
                className={`${styles.cardImg} ${styles.cardImgDim}`}
              />
              <div className={styles.cardGradient} />
              <div className={styles.cardBottomSm}>
                <h3 className={styles.playerNameSm}>Lionel Messi</h3>
                <p className={styles.playerMetaSm}>Midfielder • Argentina</p>
                <div className={styles.ptsBadge}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--dc-secondary-fixed)', fontSize: 18 }}>trending_up</span>
                  <span className={styles.ptsBadgeText}>192 pts</span>
                </div>
              </div>
            </div>

            {/* Haaland card (md:col-span-4) */}
            <div className={`${styles.cardSmall} glass-panel`}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX7qiZoD0sz46Om0-ThVyt7GKwhYEhFGJwBpeEM3BTALLvAliilr4l60myG7nwQkGv8hQzyOFafnFrniz8DZas6uKJQFMYMW255Ki-OP42CmWCComsM9Hd0A7GhM5Ux5qgto5iwa0Pdwi2o99BFWtjV9lPOuhxQBNhElCU8w0CCtcavTAwaApBrlRMyv3S37qgz5W5bp6r0SfggE4Nm3E27-nyHzAnRXzYqFUB5MHI6HpVRZr4SZQ9ua9S09LRmL8Rre7MyzozXhA"
                alt="Erling Haaland"
                className={`${styles.cardImg} ${styles.cardImgDim}`}
              />
              <div className={styles.cardGradient} />
              <div className={styles.cardBottomSm}>
                <h3 className={styles.playerNameSm}>Erling Haaland</h3>
                <p className={styles.playerMetaSm}>Forward • Norway</p>
                <div className={styles.ptsBadge}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--dc-secondary-fixed)', fontSize: 18 }}>bolt</span>
                  <span className={styles.ptsBadgeText}>215 pts</span>
                </div>
              </div>
            </div>

            {/* Leaderboard panel (md:col-span-8) */}
            <div className={`${styles.leaderboard} glass-panel`}>
              <h3 className={styles.lbTitle}>Top Fantasy Managers</h3>
              <div className={styles.lbList}>
                {LEADERBOARD.map((item) => (
                  <div key={item.rank} className={styles.lbRow}>
                    <div className={styles.lbLeft}>
                      <span className={`${styles.lbRank}${item.isTop ? ' ' + styles.lbRankTop : ''}`}>{item.rank}</span>
                      <img src={item.avatar} alt={item.name} className={styles.lbAvatar} />
                      <div>
                        <p className={styles.lbName}>{item.name}</p>
                        <p className={styles.lbMeta}>{item.meta}</p>
                      </div>
                    </div>
                    <span className={styles.lbPts}>{item.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
