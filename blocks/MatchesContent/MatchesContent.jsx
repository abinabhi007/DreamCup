import { useState } from 'react';
import styles from './MatchesContent.module.scss';

export default function MatchesContent() {
  const [activeTab, setActiveTab] = useState('UPCOMING MATCHES');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div className={styles.backgroundDecor}>
        <div className={styles.decorTopRight}></div>
        <div className={styles.decorBottomLeft}></div>
      </div>

      <div className={styles.mainContent}>
        {/* Fixed Top NavBar */}
        <header className={styles.topNav}>
          <div style={{ flex: 1 }}>
            <div className={styles.searchWrap}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              <input 
                className={styles.searchInput} 
                type="text" 
                placeholder="Search matches, players..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.actionsWrap}>
            <button className={styles.actionBtn}>
              <span className="material-symbols-outlined">notifications</span>
              <span className={styles.badgeDot}></span>
            </button>
            <button className={styles.actionBtn}>
              <span className="material-symbols-outlined">history</span>
            </button>
            <div className={styles.userProfileGroup}>
              <img 
                alt="Executive Avatar" 
                className={styles.userAvatar} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnCnqmmL-tij-ORdQXOMOswKzV9PUI2XsGy0MDO-0tY6zGVtZqko2_toFEM7xKRcl9orKTgGPPDQoNCj9q6Ag4zOc_CJtwGAiGpHbuoTSDrYJR_5mqAkV8crCCfsVaKZodP5zMWdioZzgg6iKYg8El-URKZDAiJjx3C6tTHi5cR2gOLR9shlofLJoGqKRNw4NHCLTibU8A5XR-J_j_cVo9nHg9pf5rnrB0Ar4XQWw0StvrCPwoQD10lbn7JY8cLMGfXxGz34S5fIg"
              />
            </div>
          </div>
        </header>

        {/* Split Layout Container */}
        <div className={styles.splitLayout}>
          
          {/* Left Column: Match Lists */}
          <div className={styles.matchListCol}>
            <div className={styles.pageHeader}>
              <div>
                <h2 className={styles.pageTitle}>World Cup Match Center</h2>
                <div className={styles.statusIndicator}>
                  <span className={styles.pulseDot}></span>
                  <span className={styles.statusText}>LIVE TOURNAMENT STATUS ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabsRow}>
              {['LIVE MATCHES (2)', 'UPCOMING MATCHES', 'COMPLETED MATCHES'].map(tab => (
                <button 
                  key={tab}
                  className={activeTab === tab ? styles.tabBtnActive : styles.tabBtn}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Match Cards */}
            <div className={styles.matchCardsList}>
              {/* Featured Premium Match */}
              <div className={styles.premiumCard}>
                <div className={styles.matchTeamsWrap}>
                  <div className={styles.teamCol}>
                    <img 
                      alt="Brazil" 
                      className={styles.teamLogoBig} 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2o78AOKAmsWTY7gEE84_HEf-BRvTZUy1TQDg6icfhgiaiuhKabG45k5JqTWtppwStbzXB1a_EcNmQU42yuw4jTOVXZTQ3micXNv-cT-cegBt-BWKTBwe0Bqm5RhDaq8-t7quMDkvcRleR4wvBZTwVMXwu3OgOgqaAnJCRQq_q7XLgWjihgVU0N4vJY7p1N6Bd0ScOt_UJ_VcgLEoT0dgzwWgOKzUGxBkXW6QlDT5NpT9zJDid3U_9SHuJs4Y-59Sp8rNiLYuobsU" 
                    />
                    <p className={styles.teamName}>BRAZIL</p>
                  </div>
                  <div className={styles.matchInfoColBordered}>
                    <p className={styles.matchStage}>QUARTER-FINALS</p>
                    <p className={styles.matchTime}>20:00</p>
                    <p className={styles.matchVenue}>Lusail Stadium</p>
                  </div>
                  <div className={styles.teamCol}>
                    <img 
                      alt="France" 
                      className={styles.teamLogoBig} 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9-tfEuQOl-LpLYPU_C003LDaEZpLjF0zU2sag4OvCBUOiCa5hiwIrE1OO33IaqXwGHWrzuoCrFDQwSnx6jU3Ndd4M8dl0v6tXsWkg9Iz9sSrq9vxPs7xb85SqD54YpLBFqTs_HPzixh50Ipmq013PucG3VYu6kGF_zTft9EhOZyrd-QOqM07fQCGyprvTzfryk19uZIZxqRYoA5c_qp4-0MkEF1C6bOhl0Arc7ZUYpuweil8Tgp9pPJy3C2bb8QlNdGJJVgF8FT0" 
                    />
                    <p className={styles.teamName}>FRANCE</p>
                  </div>
                </div>
                <div className={styles.matchAction}>
                  <button className={styles.viewDetailsBtnPremium}>
                    <span className={styles.btnText}>VIEW DETAILS</span>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward_ios</span>
                  </button>
                </div>
              </div>

              {/* Regular Match Card 1 */}
              <div className={styles.matchCard}>
                <div className={styles.matchTeamsWrap}>
                  <div className={styles.teamCol}>
                    <img 
                      alt="Argentina" 
                      className={styles.teamLogoSmall} 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSzhtNhITAWGojQXe9EWqIXBCDzMk5UU9SnoNiblvcLjG1U0DWytsRkzIg7gKkZvKp7T7Is9ly_LY0JRPYdaSOTfKBeuONZtBBnkG1RcAG6VdvicLMvqq62Q7efsMHEQNOJ3eEZ0e1zrvHsNCK64-FVpOZ2ba0hnbYzGwuHxnqFQmrc-neduBF4n56Qv2fQw9Qah5R74uZG2bjcMUJ4KvpYx9W65Dbns7beRmsJDHgQVLJ-P2Xpy3Tuf0l5N9PIsi0WklyRhFXqpE" 
                    />
                    <p className={styles.teamNameDim}>ARGENTINA</p>
                  </div>
                  <div className={styles.matchInfoCol}>
                    <p className={styles.matchTimeDim}>17:00</p>
                    <p className={styles.matchVenue}>Education City</p>
                  </div>
                  <div className={styles.teamCol}>
                    <img 
                      alt="Netherlands" 
                      className={styles.teamLogoSmall} 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpE5eX00c79XXhlgMNlJS7Nq481xa9s_qBQhMPOa7fpCIDDV6ZJzceHAiTxmZS9ptMHP2fOQqoFzsML4rje_xDlG0HNIqCfqWaUmcEMcj4q5O36Aorhl9acgV0Y22LUXKfVqTgN7LX9WXV3Vb03Bnmir51UlENOj0fA-2mrXRVPOhw5fBJCKNKzt5rh8GPUj0X3fiAVA3TeY4XKrB7PF-e2-qeUmRjKVyl7WaZ5P8Zx-tpksFTIXPYyqoSSaP-LELTsnlrDbDrCwQ" 
                    />
                    <p className={styles.teamNameDim}>NETHERLANDS</p>
                  </div>
                </div>
                <div className={styles.matchAction}>
                  <button className={styles.viewDetailsBtn}>
                    <span className={styles.btnText}>VIEW DETAILS</span>
                  </button>
                </div>
              </div>

              {/* Regular Match Card 2 */}
              <div className={styles.matchCard}>
                <div className={styles.matchTeamsWrap}>
                  <div className={styles.teamCol}>
                    <img 
                      alt="England" 
                      className={styles.teamLogoSmall} 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB88SY-dHFDqyQtRgr8XEC-qUR2FC0dZFUy-x8Ded1InrsLD5YUjeRkAjKp_geE32Felr0_3n15_pUE78OI323JkYVxylJvyYJkCi67VvpT6yvIjF36cx94DO42cM7xPcSaTe3DqbFCvnaYpsPercOcCoF2hQ7V8tKXUe_2GkF3RvA9LC-Sv5SdJdieKAOZ474oXlAh9UvyXtQQMs-ZPz3FDzOYHpIyKoigEdrbfsmNGbDX-Il_SmlboY7QqutLw_yjAi_4-aLH2oM" 
                    />
                    <p className={styles.teamNameDim}>ENGLAND</p>
                  </div>
                  <div className={styles.matchInfoCol}>
                    <p className={styles.matchTimeDim}>TOMORROW</p>
                    <p className={styles.matchVenue}>Al Bayt Stadium</p>
                  </div>
                  <div className={styles.teamCol}>
                    <img 
                      alt="Germany" 
                      className={styles.teamLogoSmall} 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEdgV3At-Su_xW1Cl_FOrViVNz3qLAaEh2cAsuYELs8_U41A7U-vg1iRHKpr3AK0GSMP0W9TCYDdt8-3lxIY9Z0yQyoJm6BFpud0OrlI9znWk1SySbGoqMZFzLA1_Aus9942TksyGiEUWsntgsh_3a0BNtJHiCiSXKZ87xqmx4LOIu-ItJ51UjLlQ5ELcqVrVKbaBo0sXY9En-lGICYUfPo74EbgMvr62YsLA8Hjge3wv-I9Yg9xy9yvuiZgUc2G0l5XFug1iJQjg" 
                    />
                    <p className={styles.teamNameDim}>GERMANY</p>
                  </div>
                </div>
                <div className={styles.matchAction}>
                  <button className={styles.viewDetailsBtn}>
                    <span className={styles.btnText}>VIEW DETAILS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Match Detail Panel */}
          <div className={styles.detailPanelWrap}>
            <div className={styles.detailPanel}>
              
              {/* Detail Header */}
              <div className={styles.detailHeader}>
                <div className={styles.detailHeaderTop}>
                  <span className={styles.detailHeaderLabel}>PRE-MATCH ANALYSIS</span>
                  <span className={`material-symbols-outlined ${styles.moreIcon}`}>more_vert</span>
                </div>
                <div className={styles.detailScoreRow}>
                  <div className={styles.scoreTeam}>
                    <p className={styles.scoreTeamAbbr}>FRA</p>
                  </div>
                  <div className={styles.scoreCenter}>
                    <span className={styles.scoreVal}>0 - 0</span>
                    <p className={styles.scoreTime}>KICKOFF 20:00</p>
                  </div>
                  <div className={styles.scoreTeam}>
                    <p className={styles.scoreTeamAbbr}>BRA</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Details */}
              <div className={styles.detailContent}>
                
                {/* Mini Tactical Pitch */}
                <div>
                  <p className={styles.sectionLabel}>EXPECTED LINEUPS</p>
                  <div className={styles.pitchGraphic}>
                    <div className={styles.pitchLines}></div>
                    <div className={styles.pitchCenterCircle}></div>
                    <div className={styles.pitchBoxTop}></div>
                    <div className={styles.pitchBoxBottom}></div>

                    {/* Example dots mapped from prototype */}
                    <div className={styles.playerDotYellow} style={{ top: '25%', left: '50%', transform: 'translateX(-50%)' }}></div>
                    <div className={styles.playerDotYellowDim} style={{ top: '33%', left: '25%' }}></div>
                    <div className={styles.playerDotYellowDim} style={{ top: '33%', right: '25%' }}></div>
                    
                    <div className={styles.playerDotGold} style={{ bottom: '25%', left: '50%', transform: 'translateX(-50%)' }}></div>
                    <div className={styles.playerDotGoldDim} style={{ bottom: '33%', left: '25%' }}></div>
                    <div className={styles.playerDotGoldDim} style={{ bottom: '33%', right: '25%' }}></div>
                  </div>
                </div>

                {/* Stats Bars */}
                <div className={styles.metricsContainer}>
                  <p className={styles.sectionLabel}>KEY METRICS (RECENT FORM)</p>
                  
                  <div>
                    <div className={styles.metricRow}>
                      <span>POSSESSION</span>
                      <span>54% - 46%</span>
                    </div>
                    <div className={styles.metricBarWrap}>
                      <div className={styles.metricBarGold} style={{ width: '54%' }}></div>
                      <div className={styles.metricBarBlue} style={{ width: '46%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className={styles.metricRow}>
                      <span>SHOTS ON TARGET</span>
                      <span>6.2 - 5.8</span>
                    </div>
                    <div className={styles.metricBarWrap}>
                      <div className={styles.metricBarGold} style={{ width: '52%' }}></div>
                      <div className={styles.metricBarBlue} style={{ width: '48%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className={styles.metricRow}>
                      <span>WIN PROBABILITY</span>
                      <span>38% - 42%</span>
                    </div>
                    <div className={styles.metricBarWrap}>
                      <div className={styles.metricBarGold} style={{ width: '38%' }}></div>
                      <div className={styles.metricBarBlue} style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Timeline Feed */}
                <div>
                  <p className={styles.sectionLabel}>MATCH TIMELINE PREDICTION</p>
                  <div className={styles.timelineFeed}>
                    <div className={styles.timelineItems}>
                      
                      <div className={styles.timelineItem}>
                        <div className={styles.timelineIconGold}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sports_soccer</span>
                        </div>
                        <div className={styles.timelineMeta}>
                          <p className={styles.timelineTitleGold}>85' GOAL PROBABILITY HIGH</p>
                          <p className={styles.timelineDesc}>Late game surge predicted for Brazil based on fitness data.</p>
                        </div>
                      </div>

                      <div className={styles.timelineItem}>
                        <div className={styles.timelineIconOutline}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>warning</span>
                        </div>
                        <div className={styles.timelineMeta}>
                          <p className={styles.timelineTitle}>62' CARD RISK: CASEMIRO</p>
                          <p className={styles.timelineDesc}>Tactical foul frequent in mid-block transition.</p>
                        </div>
                      </div>

                      <div className={styles.timelineItem}>
                        <div className={styles.timelineIconOutline}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>restart_alt</span>
                        </div>
                        <div className={styles.timelineMeta}>
                          <p className={styles.timelineTitle}>45' KICKOFF 2ND HALF</p>
                          <p className={styles.timelineDesc}>Tactical adjustments expected from both benches.</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* Panel Footer CTA */}
              <div className={styles.panelFooter}>
                <button className={styles.enterLobbyBtn}>
                  ENTER MATCH LOBBY
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
