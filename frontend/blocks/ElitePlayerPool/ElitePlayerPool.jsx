import { useState, useEffect } from 'react';
import styles from './ElitePlayerPool.module.scss';
import { getLeaderboard } from '../../src/services/leaderboardService';

export default function ElitePlayerPool() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getLeaderboard()
      .then((data) => {
        if (active && data.success) {
          setLeaderboard(data.leaderboard || []);
        }
      })
      .catch((err) => console.error("Error loading elite player pool leaderboard:", err))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const getAvatar = (user, defaultAvatar) => {
    if (user?.avatar && user.avatar.startsWith('http')) {
      return user.avatar;
    }
    return defaultAvatar;
  };

  const defaultAvatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCdyaqpfqOhMncbLvsEyFiAlhPtd4iYTCWWiaMEkjyOsT4VujBv0jNrBIKupvo68wAnTojjAzYaBnjSr1on1kpc-mcDm3clvaW-Cln6zNStwk7UK_-LJu_JLbm5our8Nvmg4eAxlJ4chg9u9fQjB9dGLIJZK-uZ5LCFgiH7nqHT-GuvqpSL84gdsufCH0q2B_nCQbrG_vSxOkKeddwInyDBDPa0KvzKgCuh36iwdwIRTCjByUy749uUfFrJM6Zo1BeixHiVO3IcIls',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCaBnzJ9qSAnelbF8T_dTV5IJeNMBuU9mvO0l3bZWT9hSjWQQk0nc8G5PSGHh7T43HsQW1v2-BvHQCu2qkEswYULL_XEIX-Pq_poCRmitoAagqagu9jdZmKD7dRdyow84j7bHa1u5ZurlyGinHw-hlVkHn7ECdUy0TUkxJGej4ns_daJZ5Ay-8fq1D__DfGDT7ne3pedpLH98mMDqmBKmiteFYqxJavt76gOHxluwduMlOMbk9IHr_vqao4uGFQfGSjHSTl0Qi6EFw'
  ];

  const topManagers = leaderboard.slice(0, 2).map((item, index) => {
    return {
      rank: index === 0 ? '01' : '02',
      avatar: getAvatar(item.userId, defaultAvatars[index] || defaultAvatars[0]),
      name: item.userId?.name || 'Unknown Manager',
      meta: `Fantasy Squad`,
      pts: `${item.totalPoints !== undefined ? item.totalPoints.toLocaleString() : '0'} pts`,
      isTop: index === 0,
    };
  });

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
              src="https://upload.wikimedia.org/wikipedia/commons/b/b3/2022_FIFA_World_Cup_France_4%E2%80%931_Australia_-_%287%29_%28cropped%29.jpg"
              alt="Kylian Mbappé"
              className={styles.cardImg}
              style={{ objectPosition: 'top' }}
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
                src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
                alt="Lionel Messi"
                className={`${styles.cardImg} ${styles.cardImgDim}`}
                style={{ objectPosition: 'top' }}
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

            {/* Ronaldo card (md:col-span-4) */}
            <div className={`${styles.cardSmall} glass-panel`}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
                alt="Cristiano Ronaldo"
                className={`${styles.cardImg} ${styles.cardImgDim}`}
                style={{ objectPosition: 'top' }}
              />
              <div className={styles.cardGradient} />
              <div className={styles.cardBottomSm}>
                <h3 className={styles.playerNameSm}>Cristiano Ronaldo</h3>
                <p className={styles.playerMetaSm}>Forward • Portugal</p>
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
                {loading ? (
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: '12px 0' }}>Loading rankings...</p>
                ) : topManagers.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: '12px 0' }}>No managers ranked yet</p>
                ) : (
                  topManagers.map((item) => (
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
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
