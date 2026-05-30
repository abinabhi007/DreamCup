import { useState } from 'react';
import styles from './ProfileContent.module.scss';

export default function ProfileContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('chart'); // 'chart' | 'table'

  const handleEditProfile = () => {
    alert('Edit Profile mode coming soon!');
  };

  const handleShareProfile = () => {
    alert('Profile URL copied to clipboard!');
  };

  // Match history mock data from prototype
  const matchHistory = [
    { gw: 'GW 23 Performance', date: 'Feb 12, 2024', result: 'W', points: '65 pts', percentile: 'TOP 5%' },
    { gw: 'GW 22 Performance', date: 'Feb 05, 2024', result: 'L', points: '48 pts', percentile: 'BOTTOM 40%' },
    { gw: 'GW 21 Performance', date: 'Jan 28, 2024', result: 'W', points: '72 pts', percentile: 'TOP 2%' },
    { gw: 'GW 20 Performance', date: 'Jan 14, 2024', result: 'D', points: '55 pts', percentile: 'AVERAGE' },
  ];

  return (
    <div className={styles.mainContent}>
      {/* ── Fixed TopNavBar ── */}
      <header className={styles.topNav}>
        {/* Left Search input */}
        <div className={styles.searchWrap}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`} style={{ fontSize: 20 }}>
            search
          </span>
          <input 
            className={styles.searchInput} 
            type="text" 
            placeholder="Search players, leagues..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Right Details Group */}
        <div className={styles.actionsWrap}>
          <div className={styles.actionBtnRow}>
            <button className={styles.actionBtn} title="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className={styles.actionBtn} title="Settings">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          
          <div className={styles.divider}></div>
          
          <div className={styles.userGroup}>
            <div className={styles.userText}>
              <p className={styles.userName}>Alex Rivers</p>
              <p className={styles.userTitle}>ELITE MANAGER</p>
            </div>
            <img 
              alt="User profile avatar" 
              className={styles.userAvatar} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdUa76z0i-su3duW4oo2oCgrgsARwp6Ozrel3PvY5Mg595coXaOvuWs9NS6ymkI5cOZEKSThn22DslhLhd23nAA6ggRWc2fo5TB_2baJ-3sYFHq6LJkIcu0EO5zoIeZLGv_Y8JEY2GXhNlYERZ7-UNuUxqnFIt7mLUU5ZGKRZXff-DY0NuiyNWEQfNqOHQaJZGOSAjyxXdDZ-HUtPI337V2JqRk23601zAeWbEsgbEeEcH-QWM-_IoxGi8GsmrelciYzp64T_i5iU" 
            />
          </div>
        </div>
      </header>

      {/* ── Scrollable Content Area ── */}
      <div className={styles.contentArea}>
        
        {/* Profile Header Banner Section */}
        <section className={styles.heroBanner}>
          <img 
            alt="Elite Sports Background" 
            className={styles.heroBgImage} 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYHU3MpeF0h4emP6LY0IYxPGez7mGQv9CtMGv8YCTgTPmo2XKnSL9giQjwfh2TKrc8uAFQ2Ov2I32ahMmSR05LI1nXul7iaYmYZjngfOZopeyAU358TRCzTuEC-JFsQm2ZZQXtKbIEqv-JsRAnc4yBxzgBPcNMp5__3v6yTiD-w4J44dN4upDvTE1oukm14FcfqyF6zuTr9UCRVXaxIS3VYCjLKZxUKX0qMi3KxEwVgCh-p_3SvYTUvLbDCrGxOHkVPgMll95rllg" 
          />
          <div className={styles.heroGradientOverlay}></div>
          
          <div className={styles.heroInfoRow}>
            {/* Avatar frame */}
            <div className={styles.avatarWrapper}>
              <div className={styles.profileAvatarFrame}>
                <img 
                  alt="Alex Rivers Avatar" 
                  className={styles.profileAvatar} 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGlH6OHIQZT-Jtv_DJWUSRbqPYCfgQ684ue1hX_pjtCyL1my5bjJHcapXAKVsygReV_7vi_KVDENFUSZecDyRyzo3sRV1-O8CtGyOJ6_-xZqRR6IEehbMnKozSbn0KRc40Dj8-9nHyutiISnfcheEOEboCHobCPLnoJaw5ypjeHm0MnMGrNdG584U1xEGxVk78gIeiJ3rYKpVN1dA98jBxhcIABu-JJ28qi7CCuirzynqhSMOVg9Rw5m7ZA4VZWOwHbDUPnYB66wM" 
                />
              </div>
              <div className={styles.verifiedBadge} title="Verified Elite Manager">
                <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
            </div>

            {/* Profile Meta texts */}
            <div className={styles.profileMeta}>
              <h2 className={styles.profileName}>Alex Rivers</h2>
              <div className={styles.tagsRow}>
                <div className={styles.fanTag}>
                  <img 
                    alt="Manchester City Logo" 
                    className={styles.fanLogo} 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6rioWWzM09HBje2ja0b1Ervo_N_k9xnWxfCPRErL_FOjYX43n61G7Iw9dqqcll9B6aAAnCwTuSbPYMbXesGrVsB7Ym3t7cXZxQZkDN7HTm38p6Qv5t96X2aOWsQMDCv_wTv4DIRQMQVbAuxB-z5mS3e_782biE4ooYwGRD8jAPrk9pN__O43_MeawisQ70q-3z1FmDKZ_PQNgfVjIKuO0t5gKjkG7xqniiw5aCJ6HsGzz_sefNddbY0pC40ejYofHGfiZlv7zqsA" 
                  />
                  <span className={styles.tagLabel}>Manchester City Fan</span>
                </div>
                <div className={styles.eliteTag}>
                  <span className={`material-symbols-outlined ${styles.eliteIcon}`}>military_tech</span>
                  <span className={styles.eliteLabel}>Elite Tier</span>
                </div>
              </div>
            </div>

            {/* Actions button */}
            <div className={styles.ctaButtons}>
              <button className={styles.btnEdit} onClick={handleEditProfile}>Edit Profile</button>
              <button className={styles.btnShare} onClick={handleShareProfile} title="Share Profile">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
        </section>

        {/* Statistics Metric Row */}
        <section className={styles.statsGrid}>
          <div className={styles.statsCard}>
            <span className={`material-symbols-outlined ${styles.statsIcon}`}>star</span>
            <p className={styles.statsLabel}>Total Points</p>
            <p className={styles.statsVal}>1,240</p>
          </div>
          <div className={styles.statsCard}>
            <span className={`material-symbols-outlined ${styles.statsIcon}`}>trophy</span>
            <p className={styles.statsLabel}>Best Rank</p>
            <p className={styles.statsVal}>#4,201</p>
          </div>
          <div className={styles.statsCard}>
            <span className={`material-symbols-outlined ${styles.statsIconOutline}`}>swap_horiz</span>
            <p className={styles.statsLabel}>Transfers Used</p>
            <p className={styles.statsVal}>18</p>
          </div>
          <div className={styles.statsCard}>
            <span className={`material-symbols-outlined ${styles.statsIcon}`}>workspace_premium</span>
            <p className={styles.statsLabel}>Achievements</p>
            <p className={styles.statsVal}>12</p>
          </div>
        </section>

        {/* Two-Column Body Area */}
        <section className={styles.twoColGrid}>
          {/* Match History */}
          <div className={styles.colHistory}>
            <div className={styles.secTitleRow}>
              <h3 className={styles.secTitle}>
                <span className={`material-symbols-outlined ${styles.secTitleIcon}`}>history</span>
                Match History
              </h3>
              <button className={styles.viewAllBtn} onClick={() => alert('Viewing all Match History')}>
                View All
              </button>
            </div>

            <div className={styles.cardPanel}>
              {matchHistory.map((item, idx) => {
                let badgeClass = styles.badgeW;
                let valClass = styles.pointsValGreen;
                if (item.result === 'L') {
                  badgeClass = styles.badgeL;
                  valClass = styles.pointsValRed;
                } else if (item.result === 'D') {
                  badgeClass = styles.badgeD;
                  valClass = styles.pointsValNeutral;
                }

                return (
                  <div key={idx} className={styles.historyItem}>
                    <div className={styles.historyDetails}>
                      <div className={badgeClass}>{item.result}</div>
                      <div className={styles.historyMeta}>
                        <p className={styles.gwName}>{item.gw}</p>
                        <p className={styles.gwDate}>{item.date}</p>
                      </div>
                    </div>
                    <div className={styles.historyRight}>
                      <p className={valClass}>{item.points}</p>
                      <p className={styles.percentileLabel}>{item.percentile}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Points History Chart */}
          <div className={styles.colChart}>
            <div className={styles.secTitleRow}>
              <h3 className={styles.secTitle}>
                <span className={`material-symbols-outlined ${styles.secTitleIcon}`}>trending_up</span>
                Points History (Last 10 GWs)
              </h3>
              <div className={styles.chartViewToggle}>
                <button 
                  className={viewType === 'table' ? styles.toggleBtnActive : styles.toggleBtn}
                  onClick={() => setViewType('table')}
                >
                  Table
                </button>
                <button 
                  className={viewType === 'chart' ? styles.toggleBtnActive : styles.toggleBtn}
                  onClick={() => setViewType('chart')}
                >
                  Chart
                </button>
              </div>
            </div>

            <div className={styles.chartContainer}>
              {viewType === 'chart' ? (
                <>
                  <div className={styles.chartSvgWrapper}>
                    {/* SVG Line Chart exactly matching prototype visuals */}
                    <svg className={styles.svgLineChart} viewBox="0 0 1000 300" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: 'rgba(255, 215, 0, 0.3)', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: 'rgba(255, 215, 0, 0)', stopOpacity: 0 }} />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M 0 250 Q 100 220 200 240 T 400 150 T 600 200 T 800 50 T 1000 80 L 1000 300 L 0 300 Z" 
                        fill="url(#chartGradient)" 
                      />
                      <path 
                        className="drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" 
                        d="M 0 250 Q 100 220 200 240 T 400 150 T 600 200 T 800 50 T 1000 80" 
                        fill="none" 
                        stroke="#FFD700" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="3" 
                      />
                      
                      {/* Interactive coordinate circles */}
                      <circle cx="200" cy="240" fill="#FFD700" r="5" />
                      <circle cx="400" cy="150" fill="#FFD700" r="5" />
                      <circle cx="600" cy="200" fill="#FFD700" r="5" />
                      <circle cx="800" cy="50" fill="#FFD700" r="5" />
                      <circle cx="1000" cy="80" fill="#FFD700" r="5" />
                    </svg>

                    {/* Chart background grid lines */}
                    <div className={styles.chartGrids}>
                      <div className={styles.gridLine}></div>
                      <div className={styles.gridLine}></div>
                      <div className={styles.gridLine}></div>
                      <div className={styles.gridLine}></div>
                    </div>
                  </div>

                  {/* X Axis Labels */}
                  <div className={styles.xAxisLabels}>
                    <span className={styles.xAxisText}>GW 14</span>
                    <span className={styles.xAxisText}>GW 16</span>
                    <span className={styles.xAxisText}>GW 18</span>
                    <span className={styles.xAxisText}>GW 20</span>
                    <span className={styles.xAxisText}>GW 22</span>
                    <span className={styles.xAxisText}>GW 23</span>
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dc-on-surface-variant)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <th style={{ padding: '12px' }}>Gameweek</th>
                        <th style={{ padding: '12px' }}>Points</th>
                        <th style={{ padding: '12px' }}>Percentile</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '12px' }}>GW 23</td>
                        <td style={{ padding: '12px', color: '#10b981', fontWeight: 'bold' }}>65 pts</td>
                        <td style={{ padding: '12px' }}>TOP 5%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '12px' }}>GW 22</td>
                        <td style={{ padding: '12px', color: 'var(--dc-error)', fontWeight: 'bold' }}>48 pts</td>
                        <td style={{ padding: '12px' }}>BOTTOM 40%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '12px' }}>GW 21</td>
                        <td style={{ padding: '12px', color: '#10b981', fontWeight: 'bold' }}>72 pts</td>
                        <td style={{ padding: '12px' }}>TOP 2%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '12px' }}>GW 20</td>
                        <td style={{ padding: '12px', fontWeight: 'bold' }}>55 pts</td>
                        <td style={{ padding: '12px' }}>AVERAGE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

      {/* ── Brand Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <p className={styles.footerTitle}>DreamCup Elite</p>
            <p className={styles.footerOpta}>© 2024 DreamCup Elite. Performance data provided by Opta.</p>
          </div>
          <div className={styles.footerRight}>
            <a className={styles.footerLink} href="#" onClick={(e) => e.preventDefault()}>Terms</a>
            <a className={styles.footerLink} href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
            <a className={styles.footerLink} href="#" onClick={(e) => e.preventDefault()}>Support</a>
            <a className={styles.footerLink} href="#" onClick={(e) => e.preventDefault()}>Responsible Play</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
