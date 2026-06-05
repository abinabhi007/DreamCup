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
