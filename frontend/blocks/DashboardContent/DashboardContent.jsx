import { useState, useEffect } from 'react';
import styles from './DashboardContent.module.scss';
import { getTeam } from '../../src/services/teamService';

export default function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [team, setTeam] = useState(null);
  const [formation, setFormation] = useState('4-4-2');

  useEffect(() => {
    fetchTeamData();
    const savedFormation = localStorage.getItem('dreamcup_formation');
    if (savedFormation) {
      setFormation(savedFormation);
    }
  }, []);

  const fetchTeamData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const data = await getTeam(token);
      if (data && data.team) {
        setTeam(data.team);
      }
    } catch (error) {
      console.error('Failed to load team data for dashboard:', error);
    }
  };

  const draftedPlayers = team?.players || [];
  const gks = draftedPlayers.filter((p) => p.position === 'Goalkeeper');
  const defs = draftedPlayers.filter((p) => p.position === 'Defender');
  const mids = draftedPlayers.filter((p) => p.position === 'Midfielder');
  const fwds = draftedPlayers.filter((p) => p.position === 'Forward');

  const formationParsed = {
    '4-4-2': { Goalkeeper: 1, Defender: 4, Midfielder: 4, Forward: 2 },
    '4-3-3': { Goalkeeper: 1, Defender: 4, Midfielder: 3, Forward: 3 },
    '3-5-2': { Goalkeeper: 1, Defender: 3, Midfielder: 5, Forward: 2 },
    '5-3-2': { Goalkeeper: 1, Defender: 5, Midfielder: 3, Forward: 2 },
  };

  const limits = formationParsed[formation] || formationParsed['4-4-2'];

  const startingGks = gks.slice(0, limits.Goalkeeper);
  const startingDefs = defs.slice(0, limits.Defender);
  const startingMids = mids.slice(0, limits.Midfielder);
  const startingFwds = fwds.slice(0, limits.Forward);

  const renderDashboardPlayer = (player, index, positionLabel) => {
    if (!player) {
      return (
        <div className={styles.playerDotWrap} key={`empty-${positionLabel}-${index}`}>
          <div className={styles.playerAvatarWrap} style={{ opacity: 0.3, borderStyle: 'dashed', borderWidth: '1px', borderColor: 'rgba(255,255,255,0.2)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#fff' }}>person</span>
          </div>
          <div className={styles.playerName}>EMPTY</div>
          <div className={styles.playerScore}>--</div>
        </div>
      );
    }

    const isCaptain = team?.captain && (team.captain._id === player._id || team.captain === player._id);
    const isViceCaptain = team?.viceCaptain && (team.viceCaptain._id === player._id || team.viceCaptain === player._id);
    
    // Extract last name
    const lastName = player.name.split(' ').pop().toUpperCase();
    const nameText = `${lastName}${isCaptain ? ' (C)' : isViceCaptain ? ' (VC)' : ''}`;

    return (
      <div className={styles.playerDotWrap} key={player._id}>
        <div className={styles.playerAvatarWrap}>
          <img
            className={styles.playerAvatar}
            alt={player.name}
            src={player.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC0YEeyCchMgKfxPQt4ZQPL7azLWJAF91b8JZST4oqUaTulGXGe4Mm32jp_0Lr3sQBTA2ywXTFYBecqC1_rqqgqSpvm-wreK0G_B6wRsX-bNVz0CIce3yyJj4Jkr1KHzFzW9pOOZIAGR5CS_24uOPsQSWMZFsDXmJfglWBgOoKYUjG8LIbOZQv_xFRrY6SaCaVyON0QPLQUAx7LYKQ1QY4w7t4J0U5pfcBjtEvvLUP1RMzPbuvljjYf0VUqyoro-YOoczZC_12ULA'}
          />
        </div>
        <div className={styles.playerName}>{nameText}</div>
        <div className={player.points > 0 ? styles.playerScoreGold : styles.playerScore}>
          {player.points} PTS
        </div>
      </div>
    );
  };

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
              <span className={styles.statValue}>{team ? team.totalPoints : '0'}</span>
              <span className={styles.statTrendPos}>+0%</span>
            </div>
            <div className={styles.statProgressWrap}>
              <div className={styles.statProgressBarGold} style={{ width: '10%' }}></div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Global Rank</span>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>#9,999</span>
              <span className={styles.statTrendTop}>Bronze Tier</span>
            </div>
            <div className={styles.statProgressWrap}>
              <div className={styles.statProgressBarPrimary} style={{ width: '10%' }}></div>
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statLabel}>Team Value</span>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>£{team ? (100.0 - team.budgetRemaining).toFixed(1) : '0.0'}M</span>
            </div>
            <div className={styles.statProgressWrap}>
              <div className={styles.statProgressBarTertiary} style={{ width: `${team ? (100.0 - team.budgetRemaining) : 0}%` }}></div>
            </div>
          </div>

          <div className={styles.premiumStatCard}>
            <span className={styles.statLabelGold}>
              <span className="material-symbols-outlined" style={{ fontSize: 12 }}>account_balance_wallet</span> Budget Left
            </span>
            <div className={styles.statValueRow}>
              <span className={styles.statValue}>£{team ? team.budgetRemaining.toFixed(1) : '100.0'}M</span>
            </div>
            <p className={styles.statNote}>Total squad budget limit £100M</p>
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
                <span className={styles.badgeBlue}>{formation}</span>
              </div>
            </div>

            <div className={styles.pitchContainer}>
              <div className={styles.pitchLines}></div>
              <div className={styles.pitchCenter}></div>

              {/* Forward Line */}
              <div className={styles.lineRow}>
                {Array.from({ length: limits.Forward }).map((_, i) =>
                  renderDashboardPlayer(startingFwds[i], i, 'FWD')
                )}
              </div>

              {/* Midfield Line */}
              <div className={styles.midfieldRow}>
                {Array.from({ length: limits.Midfielder }).map((_, i) =>
                  renderDashboardPlayer(startingMids[i], i, 'MID')
                )}
              </div>

              {/* Defense Line */}
              <div className={styles.defenseRow}>
                {Array.from({ length: limits.Defender }).map((_, i) =>
                  renderDashboardPlayer(startingDefs[i], i, 'DEF')
                )}
              </div>

              {/* Goalie Line */}
              <div className={styles.goalieRow}>
                {Array.from({ length: limits.Goalkeeper }).map((_, i) =>
                  renderDashboardPlayer(startingGks[i], i, 'GK')
                )}
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
