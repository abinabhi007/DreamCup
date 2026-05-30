import { useState } from 'react';
import styles from './DashboardContent.module.scss';

export default function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.mainContent}>
      {/* Sticky Header */}
      <header className={styles.stickyHeader}>
        <div className={styles.headerInner}>
          <div style={{ flex: 1 }}>
            <div className={styles.searchWrap}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              <input 
                className={styles.searchInput} 
                type="text" 
                placeholder="Search players, leagues, or matches..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.iconBtns}>
              <button className={styles.iconBtn}>
                <span className="material-symbols-outlined">notifications</span>
                <span className={styles.badgeDot}></span>
              </button>
              <button className={styles.iconBtn}>
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            
            <div className={styles.divider}></div>
            
            <button className={styles.goProBtn}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span>Go Pro</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className={styles.pageContent}>
        
        {/* Stats Row */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Points</span>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>1,240</span>
              <span className={styles.statTrendPos}>+12%</span>
            </div>
            <div className={styles.statProgressWrap}>
              <div className={styles.statProgressBarGold} style={{ width: '70%' }}></div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Global Rank</span>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>#4,201</span>
              <span className={styles.statTrendTop}>Top 5%</span>
            </div>
            <div className={styles.statProgressWrap}>
              <div className={styles.statProgressBarPrimary} style={{ width: '45%' }}></div>
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Team Value</span>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>£102.5M</span>
            </div>
            <div className={styles.statProgressWrap}>
              <div className={styles.statProgressBarTertiary} style={{ width: '90%' }}></div>
            </div>
          </div>

          <div className={styles.premiumStatCard}>
            <span className={styles.statLabelGold}>
              <span className="material-symbols-outlined" style={{ fontSize: 12 }}>sync</span> Transfers Left
            </span>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>2</span>
            </div>
            <p className={styles.statNote}>Resets in 2 days, 14 hours</p>
          </div>
        </div>

        {/* Main Grid Area */}
        <div className={styles.mainGrid}>
          
          {/* My Team Section (Bento Pitch) */}
          <div className={styles.teamSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Active Lineup</h2>
              <div className={styles.badgesWrap}>
                <span className={styles.badgeGrey}>GW 24</span>
                <span className={styles.badgeBlue}>4-3-3</span>
              </div>
            </div>

            <div className={styles.pitchContainer}>
              <div className={styles.pitchLines}></div>
              <div className={styles.pitchCenter}></div>

              {/* Forward Line */}
              <div className={styles.lineRow}>
                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="Haaland" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtzBhJeBHJL0WraX2-1joozVzOzk_YCL4GiQQOe1JZyuXg3MjUke6iKzavfeL8RSKJ6VziR5bL32_PavIQZkDrgpQJEVJR_l6CLRJdjCkfIiHgt9TfCSEnIUYXR2kqqHtiKWlyTayrcCP4tcYrITGt_1-cEFMCYg-zl4WqF2ssjZwbNORQiG2JcO8AHuW3LBEDHwjY-uwq1Blc8W9uXrrNKYJAvEMUrrz8N9TpqrJJApoO8bDUPFcqzVreb_H_LxuqAKVoNoY62_g" />
                  </div>
                  <div className={styles.playerName}>HAALAND (C)</div>
                  <div className={styles.playerScoreGold}>12 PTS</div>
                </div>

                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="Salah" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXQ8JEI1fz0p8xC41xPWKNwU14iTbBIzTg_mGJPBhz3aqri-m7z6i1-ngjZWTOQD0YW-vHsB-nqgHWvfr4AVrQpc5qWr6NfggDDGeSoSYLeIlz_ZIlhdd01z09vCMuFP_CXHyR5WXe9RBbQaDt7Mqv3knOuVnC4-qft2i3xT_USUDQfcNqMtknBP9r7lJsTQU1xyKLUsJ0Seb3oOcLQa5NsmoHcxx1KIIj2XF_g8JuEEB32e2yfpZ0CRhEDw0JKH-e96ak5L6fvnI" />
                  </div>
                  <div className={styles.playerName}>SALAH</div>
                  <div className={styles.playerScore}>--</div>
                </div>

                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="Son" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATx-gsJttoXR9snMK-R2CxqhSKVTcCfqnksv-y15P7YbVWk1aZbw7vkSYlUBYdgwLtWVf-En5ec_2m8sDXTvBJS0sP5DCnArYkcrCb_9P0oOo1bg0Y7B5eNeHKsrwHyFX4HTrZXVjHuLNYVNmRJ8J2B-vAosX11vJRiSTO8Mc2zNm3BtoseCtG4oAg7jbOgErCNZ5g9d3aL57Bid0FSKuXZGKy9NlnLF0WwEk6BujOIhbQmDr_4ZHlZHLDrYRHRYkivHFDm3sW4xg" />
                  </div>
                  <div className={styles.playerName}>SON</div>
                  <div className={styles.playerScore}>--</div>
                </div>
              </div>

              {/* Midfield Line */}
              <div className={styles.midfieldRow}>
                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="Saka" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv6RQ0NbZdliO7OAdli4ToMu8a3bI8AY7YKtQVrWXqv6Y6S50h4sj1KfaxiaZ84UDOxcSfJP7rrNFFbNFHtzXjOi0zNsxoFb4PcRV-Dwrs17t5GpCldaXJsPCfamDU_4VcTpvj5G-lbUPnUdSnG5QefNKumri4b8xbqUMq7p6FmybJFjsDQZujTaPAdYaOKr2plrEKO-t8j9wBMbbaJFh_hsSQeYXkhzu8Hdy9kgvhSNh2ttEm4ZyNMfDwn0UScN-__FxhY9lye5o" />
                  </div>
                  <div className={styles.playerName}>SAKA</div>
                  <div className={styles.playerScore}>--</div>
                </div>

                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="De Bruyne" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW4gdyl76gkCoDBa-inlhpSarN1ZYbTOGYxt0kqdfubPXUaAqEYG1fpRc615eRviV3fUs7PbDpijL_vpflIPvrNPwKK-pyHKPdzKl3ZhZhJtVxDSrFR8qqZ4IVB-FQmSbw-TRc8g0Ok6ECDw-blL6K909kJzvQ6AEXRLXXXYJwt3H6aKjGgf8E7q92XG6hvL0S6uHkL_z46MeGlZ3QdEP4dQtSrQqe-RINMtnBxJKIdvSEGS37NWgg8yHRMdpo6RD2A9JS49cc8uY" />
                  </div>
                  <div className={styles.playerName}>DE BRUYNE</div>
                  <div className={styles.playerScore}>--</div>
                </div>

                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="Rodri" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6kmkI407gPz_XRsm5tp_8FD1O2zXfYbkDU3DoQDDnKQ1vm-87UuliFghfxfCLBTaTp-v267RFKRKYngo1Oy4YZRZg8HlqG2XbPPmFIh1X5YS_NAtvfkwOJ58GDx6Y0Wy9cHe4_TI3cetYzhUV0Huokb5elapwH9_8ZMDGbx2CyW8yRpe1Ht8r4LfkALkJuOyRepCRbz5Iv_MEVXmo87HogsRUY5EGgh9zXyVfmAz3jtuZqZQGPW5iGvLyXbrggT86xxFOPXnjWBk" />
                  </div>
                  <div className={styles.playerName}>RODRI</div>
                  <div className={styles.playerScore}>--</div>
                </div>
              </div>

              {/* Defense Line */}
              <div className={styles.defenseRow}>
                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="White" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBist7tjiKSyOZQeY1BL3FdQdAjVjR0IHDaW52Lc26q5x1MZV2Qa4RQysOcTbBM3RuUxYe0eVNcurE_ancRNsIuT_7Q6RVXMXJ6dKc3idnI0d0hucv33VKE3v7Ed4k3-_WT9xDloPBGMxaFJzIUIp-OqB67MHb_CoG0cy6xyP6rGpUzZ_t3DQRQlVFRUQuPiZMCs9LO0w7OAQD8eFjNMyTTCC6bpsFDhZCV5u-Tz1qFsx3BF_HvbPQQWDDP-YajGfYnrgon27L_kg0" />
                  </div>
                  <div className={styles.playerName}>WHITE</div>
                  <div className={styles.playerScoreGold}>6 PTS</div>
                </div>

                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="Van Dijk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAToAEmEuoStZyoaUesiIvJnH-9SZt1nBnQ62-M3fd0_NvOW3Xf2GCjw5aFACE7AkkzkLbZLMVZP6At4i6hbMib9DUYJsZB2k7YhsxSBWb3Bt0pn8K4Bo1C2VVTYXHjikob7qKP3vsTH_mLRNJIGteL-IC6KGduoxiLa8zU7YfcEK8yi2Nr6GLFODRNaWLSpY0OeCO4Mrot_SB_YdKR0ZNivLK_Asfsyhy72RMwnhs9eUyh51WIr2FbsgXUrWHmiq-5RkvnCxnPheU" />
                  </div>
                  <div className={styles.playerName}>VAN DIJK</div>
                  <div className={styles.playerScore}>--</div>
                </div>

                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="Saliba" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgUM95l1iRtqeSSa4BE44NKhly_i0qYSjcX3cJOVViNyQxCTO7_emZn820EWL9U9RBRD1sW-jej6J2YjAPvcXZ8pPMdGRLX97rnn0asimTfFg2fBNbCbA8pk8y9G5yNJBQP22wzRZcjCaBpyzf2kgChri1MT_lZOBDVquDZJTdKQduwjRNxMP3kwD7jbUjD37NbpaiIn5RPAUAiXZbpsHPwi3-rXmkb0zPko9U8lOPC-3vDzVtAxwc9-4rnr-XTcMwoIadTQ_P6ew" />
                  </div>
                  <div className={styles.playerName}>SALIBA</div>
                  <div className={styles.playerScore}>--</div>
                </div>

                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="Porro" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5fDGh27VFo4gG2BnOR2UPrNM9m2r_STY9iO97nE2QrRX6woEgjzqP1Hw6lXjYSv2JfrJ5VYdoujNctZxakTwtEpVoiqLGXlctA-EVc0H8RGX5hRiMF5XS8t8vJqOdenAoMkUGVxisqwOGUX9p5Ky8yKdg25E5EweAq2joiF2YHv_dgiTK4VeU1x5f7cv3N8npA5vkMt9Xt_EUuU7G7y_82hArYmrwF8hjhkTqj8bgxpnCFFGMAoK_ZoSIIDBEfBwuNqKKuAKRDuA" />
                  </div>
                  <div className={styles.playerName}>PORRO</div>
                  <div className={styles.playerScore}>--</div>
                </div>
              </div>

              {/* Goalie Line */}
              <div className={styles.goalieRow}>
                <div className={styles.playerDotWrap}>
                  <div className={styles.playerAvatarWrap}>
                    <img className={styles.playerAvatar} alt="Raya" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEC5ETH2uav47RRyv5jCUo8e2a8s_ZcvPxkWGIvjUHvYIpHhMyIfRNZ47uRwDBzLIm1TNeOj3DdmLls44_FWjyuOCUQ8OVt49AnL_gABvcuKl3NamebDJSEHu8iGT7BkSL-OIs8w2gtAB7qB29-G81CvuZG2N_RrrW9APV4na22vQMg-SHJGqIDS07QBrfYYDyP-rUhvVOyQ4zOXCaG3J5UroLok1ql4VR4P6DDx7t3qHBG65Ej5naqJrXXsIdqkojOGTTNwz6ElU" />
                  </div>
                  <div className={styles.playerName}>RAYA</div>
                  <div className={styles.playerScore}>--</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Charts & Lists */}
          <div className={styles.sideCol}>
            
            {/* Points History Chart */}
            <div className={styles.glassPanelBase}>
              <div className={styles.panelTitleRow}>
                <h3 className={styles.panelTitle}>Performance Trend</h3>
                <button className={styles.panelFilterBtn}>GW 20-24</button>
              </div>

              <div className={styles.chartContainer}>
                <div className={styles.chartBar} style={{ height: '60%' }}>
                  <span className={styles.chartTooltip}>54 pts</span>
                </div>
                <div className={styles.chartBar} style={{ height: '80%' }}>
                  <span className={styles.chartTooltip}>72 pts</span>
                </div>
                <div className={styles.chartBar} style={{ height: '50%' }}>
                  <span className={styles.chartTooltip}>45 pts</span>
                </div>
                <div className={styles.chartBar} style={{ height: '95%' }}>
                  <span className={styles.chartTooltip}>88 pts</span>
                </div>
                <div className={styles.chartBarGold} style={{ height: '75%' }}>
                  <span className={styles.chartTooltip}>68 pts</span>
                </div>
              </div>

              <div className={styles.chartLabels}>
                <span>GW 20</span>
                <span>GW 21</span>
                <span>GW 22</span>
                <span>GW 23</span>
                <span>GW 24</span>
              </div>
            </div>

            {/* Upcoming Matches */}
            <div className={styles.glassPanelBase}>
              <h3 className={styles.panelTitle}>Upcoming Fixtures</h3>
              <div className={styles.fixtureList}>
                <div className={styles.fixtureCard}>
                  <div className={styles.fixtureInfoWrap}>
                    <div className={styles.teamsBadgeStack}>
                      <div className={styles.teamBadge} style={{ backgroundColor: '#dc2626' }}>ARS</div>
                      <div className={styles.teamBadge} style={{ backgroundColor: '#1d4ed8' }}>LIV</div>
                    </div>
                    <div>
                      <p className={styles.fixtureMatchName}>ARS vs LIV</p>
                      <p className={styles.fixtureTime}>Tomorrow, 17:30</p>
                    </div>
                  </div>
                  <div className={styles.fixtureHighlight}>X2 MULTI</div>
                </div>

                <div className={styles.fixtureCard}>
                  <div className={styles.fixtureInfoWrap}>
                    <div className={styles.teamsBadgeStack}>
                      <div className={styles.teamBadge} style={{ backgroundColor: '#0ea5e9' }}>MCI</div>
                      <div className={styles.teamBadge} style={{ backgroundColor: '#ffffff', color: '#000' }}>TOT</div>
                    </div>
                    <div>
                      <p className={styles.fixtureMatchName}>MCI vs TOT</p>
                      <p className={styles.fixtureTime}>Sun, 14:00</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined ${styles.chevronIcon}`}>chevron_right</span>
                </div>

                <div className={styles.fixtureCard}>
                  <div className={styles.fixtureInfoWrap}>
                    <div className={styles.teamsBadgeStack}>
                      <div className={styles.teamBadge} style={{ backgroundColor: '#991b1b' }}>MUN</div>
                      <div className={styles.teamBadge} style={{ backgroundColor: '#1e3a8a' }}>CHE</div>
                    </div>
                    <div>
                      <p className={styles.fixtureMatchName}>MUN vs CHE</p>
                      <p className={styles.fixtureTime}>Sun, 16:30</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined ${styles.chevronIcon}`}>chevron_right</span>
                </div>
              </div>
            </div>

            {/* Top Players This Week */}
            <div className={styles.glassPanelBase}>
              <h3 className={styles.panelTitle}>GW Form Leaders</h3>
              <div className={styles.leadersList}>
                <div className={styles.leaderRow}>
                  <div className={styles.leaderInfo}>
                    <span className={styles.leaderRank}>01</span>
                    <div className={styles.leaderAvatar}>
                      <img alt="Haaland" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWCDt0SY45Yd_AVFk4o6Owb3hz9EsII2XAdzyFEpA1SedoVH028WwDqy4G_bnNrVlqzcMTXwfK7a_p3hTl9j0W3GptOUATBUBy3SITlV5zGKHnHqF2KBKBbz75f38FjH5tU2rUOy3C_aWteO5Xj3WgMVAgZETu_xoSChw8Nl7LfO-dlDycebexvqWetzVMReB6avRi1P5eGrVcP8_PRPF3HC1jWZkJjrdWL0Ne6qQmCHOM_5J28bpmErU4sp_1m9PejxUHWpwpBhI" />
                    </div>
                    <span className={styles.leaderName}>E. Haaland</span>
                  </div>
                  <span className={styles.leaderPtsGold}>15 pts</span>
                </div>

                <div className={styles.dividerLine}></div>

                <div className={styles.leaderRow}>
                  <div className={styles.leaderInfo}>
                    <span className={styles.leaderRank}>02</span>
                    <div className={styles.leaderAvatar}>
                      <img alt="Salah" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrkdLrNetU_c5spkthQqZs9pNe49ySYgj-oWEr7Wh0hUQ1HDcozBgu2u0UTdfv8liUWJ-Q3z1dLY1tm2o924NVIyAHACQzGbukWLq8E5cas0JJWm1bsEnUBET9g8wQR2HHO3XSghyts9a3XRe1-FFg9p9XmgysRVW9B_LmQVt8ExG5oZHLsow7frlrhdrG3cQ0L2kiIyTxHYgV1-nW8KvKjNOG5jf-ocF5d1ni852nmbjWhwqSjvdZ_BVCIy39-X5a28ElI4uWjs4" />
                    </div>
                    <span className={styles.leaderName}>M. Salah</span>
                  </div>
                  <span className={styles.leaderPts}>12 pts</span>
                </div>

                <div className={styles.dividerLine}></div>

                <div className={styles.leaderRow}>
                  <div className={styles.leaderInfo}>
                    <span className={styles.leaderRank}>03</span>
                    <div className={styles.leaderAvatar}>
                      <img alt="De Bruyne" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN6nLy1bmiP-MbAxzZFSK65O8gyu4vW158nxzUclrBzmr1Rw4_nbugBMqdS-5SmBgiexVX-1n3Qs9ICdjcS-ebGxDYTMMTnQy-_krHVu41rYzQOQfRtAEPgNoNwCigiTrivu3LlaBIyQ7Q2NkT49RtMIPcNWFDDgCqmR_NTqth9IpKT8dCb1bEeYyPVTeXOv1HLvOK2UjBKin-s6TqznXYU1sfmKvYPJe-OJAmJfVxQTNKdT0uLNPbAnUiCs_mproVAkdKEWEnts0" />
                    </div>
                    <span className={styles.leaderName}>K. De Bruyne</span>
                  </div>
                  <span className={styles.leaderPts}>10 pts</span>
                </div>
              </div>

              <button className={styles.viewReportBtn}>View Full Scout Report</button>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActionsGrid}>
              <button className={styles.quickActionBtn}>
                <span className={`material-symbols-outlined ${styles.actionIcon}`}>swap_horiz</span>
                <span className={styles.actionLabel}>Transfers</span>
              </button>
              <button className={styles.quickActionBtn}>
                <span className={`material-symbols-outlined ${styles.actionIcon}`}>add_circle</span>
                <span className={styles.actionLabel}>Join League</span>
              </button>
              <button className={styles.quickActionBtn}>
                <span className={`material-symbols-outlined ${styles.actionIcon}`}>menu_book</span>
                <span className={styles.actionLabel}>Rules</span>
              </button>
              <button className={styles.quickActionBtn}>
                <span className={`material-symbols-outlined ${styles.actionIcon}`}>support_agent</span>
                <span className={styles.actionLabel}>Support</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <img className={styles.footerLogo} alt="DreamCup" src="https://lh3.googleusercontent.com/aida/ADBb0uhbDjIHY2cTxHSauL2DtxPeGTIiimWPoqgU8K7Lf2X5937pY4DjjVp0x6BDn3lJr4vGc1asLZKaxY29ovp0as_MD_X-u2_94HqPfkIC0dwnc9qlx1VQgvDUuWo0eO0_tZvipbEmn7Fr4gvysLgWzcqqXskyi45i97k69XOkXvivR_ZqVaQw8xTLdyPCbDD0m-vCSH8r98molnRr_9Ns8fKxik3xucQX6T__y-dxakKrShiJ0L_YF1s1YBw" />
            <p className={styles.footerTitle}>DreamCup Elite</p>
          </div>
          
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Terms of Service</a>
            <a href="#" className={styles.footerLink}>Privacy Policy</a>
            <a href="#" className={styles.footerLink}>Help Center</a>
            <a href="#" className={styles.footerLink}>Contact Us</a>
          </div>

          <p className={styles.footerCopy}>© 2024 DreamCup Elite Performance Fantasy. All rights reserved.</p>
        </div>
      </footer>

      {/* FAB Mobile Only */}
      <button className={styles.mobileFab}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>

    </div>
  );
}
