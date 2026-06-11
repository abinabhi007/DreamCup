import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './MatchesContent.module.scss';
import { getMatchById } from '../../src/services/matchService';

export default function MatchesContent({ matches = [], liveMatches: liveMatchesProp = [], finishedMatches = [], standings = [], topScorers = [], loading = false, error = null }) {
  const [activeTab, setActiveTab] = useState('UPCOMING MATCHES');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [detailedMatch, setDetailedMatch] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const formatMatchTime = (utcString) => {
    if (!utcString) return '';
    const dateObj = new Date(utcString);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatMatchDate = (utcString) => {
    if (!utcString) return '';
    const dateObj = new Date(utcString);
    return dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
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

  const getMatchProbability = (matchId) => {
    const seed = matchId || 1;
    const homeProb = Math.min(65, Math.max(30, (seed % 35) + 30));
    const drawProb = Math.min(30, Math.max(15, (seed % 15) + 15));
    const awayProb = 100 - homeProb - drawProb;
    return { homeProb, drawProb, awayProb };
  };

  const getMatchStats = (matchId) => {
    const seed = matchId || 1;
    const homePossession = Math.min(65, Math.max(35, (seed % 25) + 40));
    const awayPossession = 100 - homePossession;
    const homeShots = Math.min(10, Math.max(3, (seed % 6) + 3));
    const awayShots = Math.min(10, Math.max(3, ((seed + 2) % 6) + 3));
    return { homePossession, awayPossession, homeShots, awayShots };
  };

  const getTimelinePredictions = (match) => {
    if (!match) return [];
    if (match.status === 'FINISHED') {
      const h = match.score.home !== null ? match.score.home : 0;
      const a = match.score.away !== null ? match.score.away : 0;
      return [
        {
          time: "90'",
          type: "info",
          title: "FULL TIME REACHED",
          desc: `Match concluded. Final score: ${match.homeTeam} ${h} - ${a} ${match.awayTeam}.`
        },
        {
          time: "75'",
          type: "goal",
          title: "LATE GAME ACTION DETECTED",
          desc: "Intensity surged in the final 15 minutes of play."
        },
        {
          time: "45'",
          type: "info",
          title: "HALF TIME ADJUSTMENTS",
          desc: "Teams altered defensive positions for the second half."
        }
      ];
    } else if (['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(match.status)) {
      return [
        {
          time: "LIVE",
          type: "info",
          title: "CURRENT PLAY ACTIVE",
          desc: "Match is currently live. Tactical formations adapting to gameplay speed."
        },
        {
          time: "LIVE",
          type: "card",
          title: "MIDFIELD TRANSITION PRESSURE",
          desc: "High friction in central channels. Tactical fouls frequent."
        }
      ];
    } else {
      return [
        {
          time: "PRE-MATCH",
          type: "info",
          title: "KICKOFF APPROACHING",
          desc: `Squads finalizing pitch preparations. Kickoff scheduled for ${formatMatchTime(match.date)} UTC.`
        },
        {
          time: "PREDICTED",
          type: "goal",
          title: "LATE STAGE GOAL RISK HIGH",
          desc: "Stamina indices suggest defensive vulnerabilities after the 75th minute."
        },
        {
          time: "PREDICTED",
          type: "card",
          title: "TRANSITIONAL FOUL DANGER",
          desc: "Midfield counter-press patterns indicate yellow card risks for holding midfielders."
        }
      ];
    }
  };

  // Filter valid matches with teams defined
  const validMatches = matches.filter(m => m.homeTeam && m.awayTeam);
  const validLiveMatches = liveMatchesProp.filter(m => m.homeTeam && m.awayTeam);
  const validFinishedMatches = finishedMatches.filter(m => m.homeTeam && m.awayTeam);

  const liveMatches = validLiveMatches.length > 0 
    ? validLiveMatches 
    : validMatches.filter(m => ['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(m.status));

  const upcomingMatches = validMatches.filter(m => ['SCHEDULED', 'TIMED', 'CALENDAR'].includes(m.status));
  const completedMatches = validFinishedMatches.length > 0 
    ? validFinishedMatches 
    : validMatches.filter(m => ['FINISHED', 'AWARDED', 'POSTPONED', 'CANCELLED', 'SUSPENDED'].includes(m.status));

  const getTabMatches = () => {
    if (activeTab === 'LIVE MATCHES') {
      return liveMatches;
    }
    if (activeTab === 'UPCOMING MATCHES') {
      return upcomingMatches;
    }
    if (activeTab === 'COMPLETED MATCHES') {
      return completedMatches;
    }
    return [];
  };

  const currentMatches = getTabMatches();

  const filteredMatches = currentMatches.filter(m => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return m.homeTeam.toLowerCase().includes(query) || m.awayTeam.toLowerCase().includes(query);
  });

  const featuredMatch = filteredMatches[0];
  const regularMatches = filteredMatches.slice(1);

  const matchesPerPage = 8;
  const totalPages = Math.ceil(regularMatches.length / matchesPerPage);
  
  const regularMatchesPaginated = regularMatches.slice(
    (currentPage - 1) * matchesPerPage,
    currentPage * matchesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
      pages.push(
        <button key={1} className={currentPage === 1 ? styles.pageBtnActive : styles.pageBtn} onClick={() => setCurrentPage(1)}>1</button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots-start" className={styles.pageDots}>...</span>);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button 
          key={i} 
          className={currentPage === i ? styles.pageBtnActive : styles.pageBtn} 
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots-end" className={styles.pageDots}>...</span>);
      }
      pages.push(
        <button 
          key={totalPages} 
          className={currentPage === totalPages ? styles.pageBtnActive : styles.pageBtn} 
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    
    return pages;
  };

  // Sync selectedMatch to filtered list changes
  useEffect(() => {
    if (activeTab !== 'STANDINGS' && filteredMatches.length > 0) {
      const exists = filteredMatches.some(m => m.id === selectedMatch?.id);
      if (!exists) {
        setSelectedMatch(filteredMatches[0]);
      }
    } else if (activeTab !== 'STANDINGS') {
      setSelectedMatch(null);
    }
  }, [filteredMatches, selectedMatch, activeTab]);

  useEffect(() => {
    const fetchDetailedMatch = async () => {
      if (selectedMatch) {
        try {
          setDetailsLoading(true);
          const data = await getMatchById(selectedMatch.id || selectedMatch._id);
          if (data && data.match) {
            setDetailedMatch(data.match);
          }
        } catch (error) {
          console.error("Failed to fetch match details", error);
        } finally {
          setDetailsLoading(false);
        }
      } else {
        setDetailedMatch(null);
      }
    };
    fetchDetailedMatch();
  }, [selectedMatch]);

  const matchProb = selectedMatch ? getMatchProbability(selectedMatch.id) : { homeProb: 40, drawProb: 20, awayProb: 40 };
  const matchStats = selectedMatch ? getMatchStats(selectedMatch.id) : { homePossession: 50, awayPossession: 50, homeShots: 5, awayShots: 5 };

  const tabs = [
    { key: 'LIVE MATCHES', label: `LIVE MATCHES (${liveMatches.length})` },
    { key: 'UPCOMING MATCHES', label: 'UPCOMING MATCHES' },
    { key: 'COMPLETED MATCHES', label: 'COMPLETED MATCHES' },
    { key: 'STANDINGS', label: 'STANDINGS' },
    { key: 'TOP SCORERS', label: 'TOP SCORERS' }
  ];

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
                placeholder="Search matches..." 
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
                alt="Profile Avatar" 
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
              {tabs.map(tab => (
                <button 
                  key={tab.key}
                  className={activeTab === tab.key ? styles.tabBtnActive : styles.tabBtn}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Match Cards */}
            <div className={styles.matchCardsList}>
              {loading ? (
                <div className={styles.loadingState}>
                  <div className={styles.spinner}></div>
                  <p>Retrieving match center listings...</p>
                </div>
              ) : error ? (
                <div className={styles.errorState}>
                  <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--dc-tertiary)' }}>error</span>
                  <p>{error}</p>
                </div>
              ) : filteredMatches.length === 0 ? (
                <div className={styles.emptyState}>
                  <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'rgba(255,255,255,0.4)' }}>sports_soccer</span>
                  <p>No matches found matching your filters.</p>
                </div>
              ) : (
                <>
                  {/* Featured Premium Match */}
                  {featuredMatch && (
                    <div 
                      className={`${styles.premiumCard} ${selectedMatch?.id === featuredMatch.id ? styles.selectedCard : ''}`}
                      onClick={() => setSelectedMatch(featuredMatch)}
                    >
                      <div className={styles.matchTeamsWrap}>
                        <div className={styles.teamCol}>
                          <img 
                            alt={featuredMatch.homeTeam} 
                            className={styles.teamLogoBig} 
                            src={featuredMatch.homeTeamFlag || 'https://crests.football-data.org/764.svg'} 
                          />
                          <p className={styles.teamName}>{featuredMatch.homeTeam.toUpperCase()}</p>
                        </div>
                        <div className={styles.matchInfoColBordered}>
                          <p className={styles.matchStage}>
                            {featuredMatch.status === 'FINISHED' ? 'FINISHED' : ['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(featuredMatch.status) ? 'LIVE' : 'UPCOMING'}
                          </p>
                          {featuredMatch.status === 'FINISHED' || ['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(featuredMatch.status) ? (
                            <p className={styles.matchTime} style={{ color: '#e9c400' }}>
                              {featuredMatch.score.home} - {featuredMatch.score.away}
                            </p>
                          ) : (
                            <p className={styles.matchTime}>{formatMatchTime(featuredMatch.date)}</p>
                          )}
                          <p className={styles.matchVenue}>{formatMatchDate(featuredMatch.date)}</p>
                        </div>
                        <div className={styles.teamCol}>
                          <img 
                            alt={featuredMatch.awayTeam} 
                            className={styles.teamLogoBig} 
                            src={featuredMatch.awayTeamFlag || 'https://crests.football-data.org/773.svg'} 
                          />
                          <p className={styles.teamName}>{featuredMatch.awayTeam.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className={styles.matchAction}>
                        <button 
                          className={styles.viewDetailsBtnPremium}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/matches/${featuredMatch.id}`);
                          }}
                        >
                          <span className={styles.btnText}>VIEW ANALYSIS</span>
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward_ios</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Regular Matches */}
                  {regularMatchesPaginated.map((item) => (
                    <div 
                      key={item.id} 
                      className={`${styles.matchCard} ${selectedMatch?.id === item.id ? styles.selectedCard : ''}`}
                      onClick={() => setSelectedMatch(item)}
                    >
                      <div className={styles.matchTeamsWrap}>
                        <div className={styles.teamCol}>
                          <img 
                            alt={item.homeTeam} 
                            className={styles.teamLogoSmall} 
                            src={item.homeTeamFlag || 'https://crests.football-data.org/764.svg'} 
                          />
                          <p className={styles.teamNameDim}>{item.homeTeam.toUpperCase()}</p>
                        </div>
                        <div className={styles.matchInfoCol}>
                          {item.status === 'FINISHED' || ['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(item.status) ? (
                            <p className={styles.matchTimeDim} style={{ color: '#fff', opacity: 1, fontWeight: 800 }}>
                              {item.score.home} - {item.score.away}
                            </p>
                          ) : (
                            <p className={styles.matchTimeDim}>{formatMatchTime(item.date)}</p>
                          )}
                          <p className={styles.matchVenue}>{formatMatchDate(item.date)}</p>
                        </div>
                        <div className={styles.teamCol}>
                          <img 
                            alt={item.awayTeam} 
                            className={styles.teamLogoSmall} 
                            src={item.awayTeamFlag || 'https://crests.football-data.org/773.svg'} 
                          />
                          <p className={styles.teamNameDim}>{item.awayTeam.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className={styles.matchAction}>
                        <button 
                          className={styles.viewDetailsBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/matches/${item.id}`);
                          }}
                        >
                          <span className={styles.btnText}>VIEW ANALYSIS</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className={styles.paginationRow}>
                      <button 
                        className={styles.pageBtn}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        title="Previous Page"
                      >
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                      
                      {renderPageNumbers()}

                      <button 
                        className={styles.pageBtn}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        title="Next Page"
                      >
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {activeTab === 'STANDINGS' && (
              <div className={styles.standingsContainer}>
                {standings.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No standings available.</p>
                  </div>
                ) : (
                  standings.map((group) => (
                    <div key={group.group} className={styles.groupTableWrap}>
                      <h3 className={styles.groupTitle}>{group.group.replace('_', ' ')}</h3>
                      <table className={styles.standingsTable}>
                        <thead>
                          <tr>
                            <th>Pos</th>
                            <th>Team</th>
                            <th>P</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GD</th>
                            <th>Pts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.table.map((team) => (
                            <tr key={team.team}>
                              <td>{team.position}</td>
                              <td className={styles.teamCol}>
                                <img src={team.flag} alt={team.team} className={styles.teamLogoMicro} />
                                {team.team}
                              </td>
                              <td>{team.playedGames}</td>
                              <td>{team.won}</td>
                              <td>{team.draw}</td>
                              <td>{team.lost}</td>
                              <td>{team.goalDifference}</td>
                              <td className={styles.pointsCol}>{team.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'TOP SCORERS' && (
              <div className={styles.standingsContainer}>
                {topScorers.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>No top scorers available.</p>
                  </div>
                ) : (
                  <div className={styles.groupTableWrap}>
                    <h3 className={styles.groupTitle}>World Cup Top Goal Scorers</h3>
                    <table className={styles.standingsTable}>
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Player</th>
                          <th>Team</th>
                          <th>Goals</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topScorers.map((scorer, index) => (
                          <tr key={scorer.player || index}>
                            <td>
                              <span style={{ color: index === 0 ? '#e9c400' : 'inherit', fontWeight: index === 0 ? 800 : 'inherit' }}>
                                {index + 1}
                              </span>
                            </td>
                            <td className={styles.teamCol}>
                              <span className="material-symbols-outlined" style={{ opacity: 0.5 }}>person</span>
                              {scorer.player}
                            </td>
                            <td>{scorer.team}</td>
                            <td className={styles.pointsCol}>{scorer.goals}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Selected Match Detail Panel */}
          <div className={styles.detailPanelWrap}>
            {selectedMatch ? (
              <div className={styles.detailPanel}>
                
                {/* Detail Header */}
                <div className={styles.detailHeader}>
                  <div className={styles.detailHeaderTop}>
                    <span className={styles.detailHeaderLabel}>
                      {selectedMatch.status === 'FINISHED' ? 'MATCH ANALYSIS' : ['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(selectedMatch.status) ? 'LIVE STATS' : 'PRE-MATCH ANALYSIS'}
                    </span>
                    <span className={`material-symbols-outlined ${styles.moreIcon}`}>more_vert</span>
                  </div>
                  <div className={styles.detailScoreRow}>
                    <div className={styles.scoreTeam}>
                      <p className={styles.scoreTeamAbbr}>{getAbbreviation(selectedMatch.homeTeam)}</p>
                    </div>
                    <div className={styles.scoreCenter}>
                      {selectedMatch.status === 'FINISHED' || ['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(selectedMatch.status) ? (
                        <span className={styles.scoreVal}>{selectedMatch.score.home} - {selectedMatch.score.away}</span>
                      ) : (
                        <span className={styles.scoreVal}>0 - 0</span>
                      )}
                      <p className={styles.scoreTime}>
                        {selectedMatch.status === 'FINISHED' ? 'FINISHED' : ['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(selectedMatch.status) ? 'IN PLAY' : `KICKOFF ${formatMatchTime(selectedMatch.date)}`}
                      </p>
                      {detailedMatch?.venue && (
                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{detailedMatch.venue}</p>
                      )}
                      {detailedMatch?.score?.halfTime && (
                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>HT: {detailedMatch.score.halfTime.home} - {detailedMatch.score.halfTime.away}</p>
                      )}
                    </div>
                    <div className={styles.scoreTeam}>
                      <p className={styles.scoreTeamAbbr}>{getAbbreviation(selectedMatch.awayTeam)}</p>
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

                      {/* Tactical expected players colored dots */}
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
                        <span>{matchStats.homePossession}% - {matchStats.awayPossession}%</span>
                      </div>
                      <div className={styles.metricBarWrap}>
                        <div className={styles.metricBarGold} style={{ width: `${matchStats.homePossession}%` }}></div>
                        <div className={styles.metricBarBlue} style={{ width: `${matchStats.awayPossession}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className={styles.metricRow}>
                        <span>SHOTS ON TARGET</span>
                        <span>{matchStats.homeShots} - {matchStats.awayShots}</span>
                      </div>
                      <div className={styles.metricBarWrap}>
                        <div className={styles.metricBarGold} style={{ width: `${(matchStats.homeShots / (matchStats.homeShots + matchStats.awayShots)) * 100}%` }}></div>
                        <div className={styles.metricBarBlue} style={{ width: `${(matchStats.awayShots / (matchStats.homeShots + matchStats.awayShots)) * 100}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className={styles.metricRow}>
                        <span>WIN PROBABILITY</span>
                        <span>{matchProb.homeProb}% - {matchProb.awayProb}%</span>
                      </div>
                      <div className={styles.metricBarWrap}>
                        <div className={styles.metricBarGold} style={{ width: `${matchProb.homeProb}%` }}></div>
                        <div className={styles.metricBarBlue} style={{ width: `${matchProb.awayProb}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Feed */}
                  <div>
                    <p className={styles.sectionLabel}>MATCH TIMELINE PREDICTION</p>
                    <div className={styles.timelineFeed}>
                      <div className={styles.timelineItems}>
                        {getTimelinePredictions(selectedMatch).map((item, idx) => (
                          <div key={idx} className={styles.timelineItem}>
                            <div className={item.type === 'goal' ? styles.timelineIconGold : styles.timelineIconOutline}>
                              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                                {item.type === 'goal' ? 'sports_soccer' : item.type === 'card' ? 'warning' : 'info'}
                              </span>
                            </div>
                            <div className={styles.timelineMeta}>
                              <p className={item.type === 'goal' ? styles.timelineTitleGold : styles.timelineTitle}>
                                {item.time} {item.title}
                              </p>
                              <p className={styles.timelineDesc}>{item.desc}</p>
                            </div>
                          </div>
                        ))}
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
            ) : (
              <div className={styles.detailPanel} style={{ padding: 24, textAlign: 'center', color: 'rgba(255,255,255,0.4)', justifyContent: 'center', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, marginBottom: 16 }}>sports_soccer</span>
                <p>Select a match to view tactical analysis and expected lineups.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

