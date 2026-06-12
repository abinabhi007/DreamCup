import { useEffect, useState } from 'react';
import styles from './ProfileContent.module.scss';
import { getProfile, updateProfile } from '../../src/services/authService';
import { getFinishedMatches, getMatches } from '../../src/services/matchService';
import { getTeam } from '../../src/services/teamService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ProfileContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [matchHistory, setMatchHistory] = useState([]);
  const [team, setTeam] = useState(null);
  const [formation, setFormation] = useState('4-4-2');
  const [upcomingFixtures, setUpcomingFixtures] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await getProfile(token);
          if (data && data.success) {
            setProfileData(data);
          } else if (data?.success === false) {
            handleLogout(data?.message || "Session expired");
          }
        } catch (error) {
          console.error("Failed to fetch profile", error);
          const errorMessage = error.response?.data?.message || "Session expired. Please log in again.";
          handleLogout(errorMessage);
        }
        
        try {
          const teamData = await getTeam(token);
          if (teamData && teamData.team) {
            setTeam(teamData.team);
          }
        } catch (error) {
          console.error('Failed to load team data for dashboard:', error);
        }
      }
    };
    const handleLogout = (message) => {
      localStorage.removeItem("token");
      toast.error(message);
      router.push("/login");
    };

    const fetchMatchHistory = async () => {
      try {
        const res = await getFinishedMatches();
        if (res && res.matches) {
          setMatchHistory(res.matches.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to load match history", err);
      }
    };

    const fetchUpcomingFixtures = async () => {
      try {
        const data = await getMatches();
        if (data && data.matches) {
          const upcoming = data.matches
            .filter(m => ['SCHEDULED', 'TIMED', 'CALENDAR'].includes(m.status) && m.homeTeam && m.awayTeam)
            .slice(0, 3);
          setUpcomingFixtures(upcoming);
        }
      } catch (error) {
        console.error('Failed to load upcoming fixtures:', error);
      }
    };

    const savedFormation = localStorage.getItem('dreamcup_formation');
    if (savedFormation) {
      setFormation(savedFormation);
    }

    fetchProfile();
    fetchMatchHistory();
    fetchUpcomingFixtures();
  }, [router]);

  const formatMatchTime = (utcString) => {
    if (!utcString) return '';
    const dateObj = new Date(utcString);
    return dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ', ' + dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getAbbreviation = (name) => {
    if (!name) return 'UNK';
    const clean = name.trim().toUpperCase();
    if (clean.length <= 3) return clean;
    const parts = clean.split(/[\s-]+/);
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0] + (parts[2] ? parts[2][0] : parts[1][1])).slice(0, 3);
    }
    return clean.slice(0, 3);
  };

  const draftedPlayers = team?.players || [];
  const topFantasyPlayers = [...draftedPlayers].sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, 3);
  
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
    const lastName = player.name.split(' ').pop().toUpperCase();
    const nameText = `${lastName}${isCaptain ? ' (C)' : isViceCaptain ? ' (VC)' : ''}`;

    return (
      <div className={styles.playerDotWrap} key={player._id}>
        <div className={styles.playerAvatarWrap}>
          <img className={styles.playerAvatar} alt={player.name} src={player.countryFlag || player.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC0YEeyCchMgKfxPQt4ZQPL7azLWJAF91b8JZST4oqUaTulGXGe4Mm32jp_0Lr3sQBTA2ywXTFYBecqC1_rqqgqSpvm-wreK0G_B6wRsX-bNVz0CIce3yyJj4Jkr1KHzFzW9pOOZIAGR5CS_24uOPsQSWMZFsDXmJfglWBgOoKYUjG8LIbOZQv_xFRrY6SaCaVyON0QPLQUAx7LYKQ1QY4w7t4J0U5pfcBjtEvvLUP1RMzPbuvljjYf0VUqyoro-YOoczZC_12ULA'} />
        </div>
        <div className={styles.playerName}>{nameText}</div>
        <div className={player.points > 0 ? styles.playerScoreGold : styles.playerScore}>
          {player.points} PTS
        </div>
      </div>
    );
  };


  const handleEditProfile = () => {
    setEditName(profileData?.user?.name || '');
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await updateProfile({ name: editName }, token);
      if (res.success) {
        setProfileData({ ...profileData, user: { ...profileData.user, name: res.user.name } });
        setIsEditingProfile(false);
        toast.success("Profile updated successfully");
      }
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleShareProfile = () => {
    alert('Profile URL copied to clipboard!');
  };

  // Match history will be fetched dynamically

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
              <p className={styles.userName}>{profileData?.user?.name}</p>
              <p className={styles.userTitle}>{profileData?.role}</p>
            </div>
            <img
              alt="User profile avatar"
              className={styles.userAvatar}
              src={profileData?.user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAdUa76z0i-su3duW4oo2oCgrgsARwp6Ozrel3PvY5Mg595coXaOvuWs9NS6ymkI5cOZEKSThn22DslhLhd23nAA6ggRWc2fo5TB_2baJ-3sYFHq6LJkIcu0EO5zoIeZLGv_Y8JEY2GXhNlYERZ7-UNuUxqnFIt7mLUU5ZGKRZXff-DY0NuiyNWEQfNqOHQaJZGOSAjyxXdDZ-HUtPI337V2JqRk23601zAeWbEsgbEeEcH-QWM-_IoxGi8GsmrelciYzp64T_i5iU"}
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
                  alt="Profile Avatar"
                  className={styles.profileAvatar}
                  src={profileData?.user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuDGlH6OHIQZT-Jtv_DJWUSRbqPYCfgQ684ue1hX_pjtCyL1my5bjJHcapXAKVsygReV_7vi_KVDENFUSZecDyRyzo3sRV1-O8CtGyOJ6_-xZqRR6IEehbMnKozSbn0KRc40Dj8-9nHyutiISnfcheEOEboCHobCPLnoJaw5ypjeHm0MnMGrNdG584U1xEGxVk78gIeiJ3rYKpVN1dA98jBxhcIABu-JJ28qi7CCuirzynqhSMOVg9Rw5m7ZA4VZWOwHbDUPnYB66wM"}
                />
              </div>

            </div>

            {/* Profile Meta texts */}
            <div className={styles.profileMeta}>
              <div className={styles.nameRow}>
                <h2 className={styles.profileName}>{profileData?.user?.name}</h2>
                <div className={styles.verifiedBadge} title="Verified Elite Manager">
                  <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
              </div>
              <div className={styles.tagsRow}>
                {/* <div className={styles.fanTag}>
                  <img 
                    alt="Manchester City Logo" 
                    className={styles.fanLogo} 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6rioWWzM09HBje2ja0b1Ervo_N_k9xnWxfCPRErL_FOjYX43n61G7Iw9dqqcll9B6aAAnCwTuSbPYMbXesGrVsB7Ym3t7cXZxQZkDN7HTm38p6Qv5t96X2aOWsQMDCv_wTv4DIRQMQVbAuxB-z5mS3e_782biE4ooYwGRD8jAPrk9pN__O43_MeawisQ70q-3z1FmDKZ_PQNgfVjIKuO0t5gKjkG7xqniiw5aCJ6HsGzz_sefNddbY0pC40ejYofHGfiZlv7zqsA" 
                  />
                  <span className={styles.tagLabel}>Manchester City Fan</span>
                </div> */}
                {/* <div className={styles.eliteTag}>
                  <span className={`material-symbols-outlined ${styles.eliteIcon}`}>military_tech</span>
                  <span className={styles.eliteLabel}>Elite Tier</span>
                </div> */}
              </div>
            </div>

            {/* Actions button */}
            <div className={styles.ctaButtons}>
              <button className={styles.btnEdit} onClick={handleEditProfile}>Edit Profile</button>
              {/* <button className={styles.btnShare} onClick={handleShareProfile} title="Share Profile">
                <span className="material-symbols-outlined">share</span>
              </button> */}
            </div>
          </div>
        </section>

        {/* Statistics Metric Row */}
        <section className={styles.statsGrid}>
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
        </section>

        {/* Two-Column Body Area */}
        <section className={styles.mainGrid}>
          {/* Left Main Column */}
          <div className={styles.leftCol}>
            {/* My Team Section (Bento Pitch) */}
            <div className={styles.teamSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Active Lineup</h2>
                <div className={styles.badgesWrap}>
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
              {matchHistory.length === 0 && (
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: '20px 0' }}>No history available</p>
              )}
              
              {matchHistory.length > 0 && matchHistory.map((item, idx) => {
                const matchDate = new Date(item.date).toLocaleDateString();
                const scoreStr = `${item.score.home} - ${item.score.away}`;

                return (
                  <div key={item.id || idx} className={styles.historyItem}>
                    <div className={styles.historyDetails}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src={item.homeTeamFlag} alt={item.homeTeam} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>VS</span>
                        <img src={item.awayTeamFlag} alt={item.awayTeam} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                      </div>
                      <div className={styles.historyMeta} style={{ marginLeft: 16 }}>
                        <p className={styles.gwName}>{item.homeTeam} vs {item.awayTeam}</p>
                        <p className={styles.gwDate}>{matchDate}</p>
                      </div>
                    </div>
                    <div className={styles.historyRight}>
                      <p className={styles.pointsValNeutral}>{scoreStr}</p>
                      <p className={styles.percentileLabel}>Finished</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

          {/* Right Column: Charts & Lists */}
          <div className={styles.sideCol}>
            {/* Upcoming Matches */}
            <div className={styles.glassPanelBase}>
              <h3 className={styles.panelTitle}>Upcoming Fixtures</h3>
              <div className={styles.fixtureList}>
                {upcomingFixtures.length > 0 ? (
                  upcomingFixtures.map((match, index) => {
                    const homeAbbr = getAbbreviation(match.homeTeam);
                    const awayAbbr = getAbbreviation(match.awayTeam);
                    return (
                      <div key={match.id || index} className={styles.fixtureCard}>
                        <div className={styles.fixtureInfoWrap}>
                          <div className={styles.teamsBadgeStack}>
                            <img src={match.homeTeamFlag || 'https://crests.football-data.org/764.svg'} alt={homeAbbr} className={styles.teamBadge} style={{ backgroundColor: 'transparent', padding: 0, objectFit: 'contain' }} />
                            <img src={match.awayTeamFlag || 'https://crests.football-data.org/773.svg'} alt={awayAbbr} className={styles.teamBadge} style={{ backgroundColor: 'transparent', padding: 0, objectFit: 'contain' }} />
                          </div>
                          <div>
                            <p className={styles.fixtureMatchName}>{homeAbbr} vs {awayAbbr}</p>
                            <p className={styles.fixtureTime}>{formatMatchTime(match.date)}</p>
                          </div>
                        </div>
                        {index === 0 ? (
                          <div className={styles.fixtureHighlight}>X2 MULTI</div>
                        ) : (
                          <span className={`material-symbols-outlined ${styles.chevronIcon}`}>chevron_right</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>No upcoming fixtures...</p>
                )}
              </div>
            </div>

            {/* Top Players This Week */}
            <div className={styles.glassPanelBase}>
              <h3 className={styles.panelTitle}>Top Fantasy Players</h3>
              <div className={styles.leadersList}>
                {topFantasyPlayers.length > 0 ? topFantasyPlayers.map((player, index) => (
                  <div key={player._id || index}>
                    <div className={styles.leaderRow}>
                      <div className={styles.leaderInfo}>
                        <span className={styles.leaderRank}>{index < 9 ? `0${index + 1}` : index + 1}</span>
                        <div className={styles.leaderAvatar}>
                          <img
                            alt={player.name}
                            src={player.countryFlag || player.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC0YEeyCchMgKfxPQt4ZQPL7azLWJAF91b8JZST4oqUaTulGXGe4Mm32jp_0Lr3sQBTA2ywXTFYBecqC1_rqqgqSpvm-wreK0G_B6wRsX-bNVz0CIce3yyJj4Jkr1KHzFzW9pOOZIAGR5CS_24uOPsQSWMZFsDXmJfglWBgOoKYUjG8LIbOZQv_xFRrY6SaCaVyON0QPLQUAx7LYKQ1QY4w7t4J0U5pfcBjtEvvLUP1RMzPbuvljjYf0VUqyoro-YOoczZC_12ULA'}
                          />
                        </div>
                        <span className={styles.leaderName}>{player.name}</span>
                      </div>
                      <span className={index === 0 ? styles.leaderPtsGold : styles.leaderPts}>{player.points} PTS</span>
                    </div>
                    {index < topFantasyPlayers.length - 1 && <div className={styles.dividerLine}></div>}
                  </div>
                )) : (
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>No players drafted yet...</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActionsGrid}>
              <Link href="/my-team" style={{textDecoration: 'none'}}>
                <button className={styles.quickActionBtn}>
                  <span className={`material-symbols-outlined ${styles.actionIcon}`}>swap_horiz</span>
                  <span className={styles.actionLabel}>Transfers</span>
                </button>
              </Link>
              <Link href="/rules" style={{textDecoration: 'none'}}>
                <button className={styles.quickActionBtn}>
                  <span className={`material-symbols-outlined ${styles.actionIcon}`}>menu_book</span>
                  <span className={styles.actionLabel}>Rules</span>
                </button>
              </Link>
              <button className={styles.quickActionBtn} onClick={() => alert('Support coming soon')}>
                <span className={`material-symbols-outlined ${styles.actionIcon}`}>support_agent</span>
                <span className={styles.actionLabel}>Support</span>
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', width: '400px', maxWidth: '90%', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '20px', color: '#fff' }}>Edit Profile</h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Display Name</label>
              <input 
                type="text" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '16px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                onClick={() => setIsEditingProfile(false)}
                style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: '#fff', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProfile}
                style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--dc-secondary)', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Brand Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLeft}>
            <p className={styles.footerTitle}>DreamCup Elite</p>
            <p className={styles.footerOpta}>© 2026 DreamCup Elite.Designed and Developed by <Link href="https://abinhn.vercel.app" target='_blank' style={{color:"#ffe16d",textDecoration:"none"}}> Abin HN</Link></p>
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
