import { useState, useEffect } from 'react';
import styles from './LeaderboardContent.module.scss';
import { getLeaderboard } from '../../src/services/leaderboardService';

export default function LeaderboardContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [filter, setFilter] = useState('All Leagues');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await getLeaderboard();
        if (active && data.success) {
          setLeaderboard(data.leaderboard || []);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load leaderboard data.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchLeaderboard();
    return () => {
      active = false;
    };
  }, []);

  const getAvatar = (user, defaultAvatar) => {
    if (user?.avatar && user.avatar.startsWith('http')) {
      return user.avatar;
    }
    return defaultAvatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK-HnNR4cWayJgiknjGm3YunRjTZRI-2WUAjx0QPIW1GUQI7WdVZ0ZksvQOE8SDNlcbm34N-p0TFn_-nFXO1HBzLxhMhp64HPtdHrVG03SeEt_fNxKSsxQ2C230lDTucCxEf0MPxEQ_5IiWtWGjMqVoz-qfy3dAmE3FYSigGJLXrUuJBYIXPsJUjIM5O1JpNql6pMLmUpdwIM_qXBj13XAtfiq0DF0RHWA5F44-AOTlsRIXo2491GVaDJMvdsUu10MliVRCcaoaHU';
  };

  const formatRank = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // 1. Process and sort the leaderboard by points descending
  const processedLeaderboard = [...leaderboard]
    .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
    .map((item, index) => {
      const rank = index + 1;
      return {
        _id: item._id,
        rank: formatRank(rank),
        rankNum: rank,
        name: item.userId?.name || 'Unknown Manager',
        team: `${item.userId?.name || 'User'}'s Elite Team`,
        gwPoints: "0",
        totalPoints: item.totalPoints !== undefined ? item.totalPoints : 0,
        colorClass: rank === 1 ? "text-[#FFD700]" : rank === 2 ? "text-[#d5e3ff]" : "text-white/40",
        avatar: getAvatar(item.userId),
      };
    });

  // 2. Filter this processed list by search query
  const filteredLeaderboard = processedLeaderboard.filter(item => {
    const query = (tableSearch || searchQuery || '').toLowerCase().trim();
    if (!query) return true;
    return item.name.toLowerCase().includes(query);
  });

  const getPodiumItem = (dbItem, rank, styleClass, avatarClass, badgeClass) => {
    if (!dbItem) return null;
    return {
      rank,
      name: dbItem.name,
      team: dbItem.team,
      points: dbItem.totalPoints.toLocaleString(),
      avatar: dbItem.avatar,
      styleClass,
      avatarClass,
      badgeClass,
    };
  };

  const podiumData = [];
  const p2 = getPodiumItem(processedLeaderboard[1], 2, styles.podiumRank2, styles.rank2Avatar, styles.rank2Badge);
  const p1 = getPodiumItem(processedLeaderboard[0], 1, styles.podiumRank1, styles.rank1Avatar, styles.rank1Badge);
  const p3 = getPodiumItem(processedLeaderboard[2], 3, styles.podiumRank3, styles.rank3Avatar, styles.rank3Badge);

  if (p2) podiumData.push(p2);
  if (p1) podiumData.push(p1);
  if (p3) podiumData.push(p3);

  const tableData = filteredLeaderboard;

  return (
    <div className={styles.mainContent}>
      {/* Fixed Top NavBar */}
      <header className={styles.topNav}>
        <div className={styles.topNavTitle}>Leaderboard</div>
        <div className={styles.actionsWrap}>
          <div className={styles.searchWrap}>
            <span className={`material-symbols-outlined ${styles.searchIcon}`} style={{ fontSize: 20 }}>
              search
            </span>
            <input 
              className={styles.searchInput} 
              type="text" 
              placeholder="Quick search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.actionBtnRow}>
            <button className={styles.actionBtn} title="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className={styles.actionBtn} title="Settings">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <img 
              alt="User Profile" 
              className={styles.userAvatar} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa93ePsXII7nFw7bZRtdnlC7uNLLIj0Yz1FPoC5eO4XG_W7M_tHth38x6b2KtzNUIVQY-WQ_wEDKnzvQy2LrU4rgfVTpTuVcOB0DnxoOzczdv1JmmsUqU-8GVHV_0_FTgE-msjR7nzTnIU8eKaJCxfp2AwNwS3xEXjKuIZ7TNm4kbjFv8qoxuUWuaCy-EdmeZknGndciAVgXu7Eppli00bYY9LhYk6lk_PX5OlptaXpB4JmNRLC2vtipwoKqQzXdpQWv-Pv4aoq1Y"
            />
          </div>
        </div>
      </header>

      {/* Header text */}
      <div className={styles.headerSection}>
        <h2 className={styles.pageTitle}>Global Fantasy Rankings</h2>
        <p className={styles.pageSubtitle}>
          The world&apos;s most elite managers competing for the DreamCup. Only the top 1% achieve &apos;Immortal&apos; status.
        </p>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Retrieving rankings from DreamCup arena...</p>
        </div>
      ) : error ? (
        <div className={styles.errorState}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: 'var(--dc-tertiary)' }}>error</span>
          <p>{error}</p>
        </div>
      ) : leaderboard.length === 0 ? (
        <div className={styles.emptyState}>
          <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#FFD700' }}>emoji_events</span>
          <p>No fantasy managers have created teams yet. Be the first to join the rankings!</p>
        </div>
      ) : (
        <>
          {/* Podium Section */}
          {podiumData.length > 0 && (
            <section className={styles.podiumSection}>
              {podiumData.map((item, index) => (
                <div key={index} className={item.styleClass}>
                  <div className={styles.avatarContainer}>
                    <div className={`${styles.avatarWrapper} ${item.avatarClass}`}>
                      <img alt={`Manager ${item.rank}`} src={item.avatar} className={styles.avatarImg} />
                      {item.rank === 1 && (
                        <div className={styles.crownIcon}>
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                        </div>
                      )}
                    </div>
                    <div className={item.badgeClass}>{item.rank}</div>
                  </div>
                  
                  <h3 className={item.rank === 1 ? styles.managerNameWinner : styles.managerName}>{item.name}</h3>
                  <p className={item.rank === 1 ? styles.teamNameWinner : styles.teamName}>{item.team}</p>
                  
                  <div className={item.rank === 1 ? styles.pointsContainerWinner : styles.pointsContainer}>
                    <p className={styles.pointsLabel} style={{ color: item.rank === 1 ? '#FFD700' : item.rank === 2 ? 'var(--dc-primary)' : 'var(--dc-tertiary)' }}>TOTAL POINTS</p>
                    <p className={item.rank === 1 ? styles.pointsValueWinner : styles.pointsValue}>{item.points}</p>
                    
                    {item.rank === 1 && (
                      <div className={styles.starsRow}>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>star</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Controls Row */}
          <div className={styles.controlsRow}>
            <div className={styles.searchControl}>
              <span className={`material-symbols-outlined ${styles.controlIcon}`}>search</span>
              <input 
                className={styles.mainSearchInput} 
                type="text" 
                placeholder="Search Managers" 
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
              />
            </div>
            <div className={styles.filterControl}>
              <span className={`material-symbols-outlined ${styles.controlIcon}`}>filter_list</span>
              <select 
                className={styles.filterSelect}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All Leagues">All Leagues</option>
                <option value="Premium Elite">Premium Elite</option>
                <option value="Champions Circle">Champions Circle</option>
                <option value="Rookie Rise">Rookie Rise</option>
              </select>
              <span className={`material-symbols-outlined ${styles.dropdownIcon}`}>expand_more</span>
            </div>
          </div>

          {/* Leaderboard Table */}
          {filteredLeaderboard.length === 0 ? (
            <div className={styles.emptyState}>
              <span className="material-symbols-outlined" style={{ fontSize: 48 }}>search_off</span>
              <p>No managers found matching &apos;{tableSearch || searchQuery}&apos;</p>
            </div>
          ) : (
            <div className={styles.tablePanel}>
              {filteredLeaderboard.length > 0 ? (
                <table className={styles.leaderboardTable}>
                  <thead className={styles.tableHeader}>
                    <tr>
                      <th className={styles.tableTh}>Rank</th>
                      <th className={styles.tableTh}>Manager</th>
                      {/* <th className={styles.tableTh}>Team Name</th>
                      <th className={styles.tableTh}>GW Points</th> */}
                      <th className={styles.tableTh}>Total Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeaderboard.map((item, index) => (
                      <tr key={index} className={item.rowClass || styles.tableRow}>
                        <td className={styles.tableTd}>
                          <span className={styles.rankNumber} style={{ color: item.colorClass.includes('FFD700') ? '#FFD700' : item.colorClass.includes('d5e3ff') ? 'var(--dc-primary)' : 'rgba(255,255,255,0.4)' }}>
                            {item.rank}
                          </span>
                        </td>
                        <td className={styles.tableTd}>
                          <div className={styles.managerCell}>
                            <img alt={`Manager ${item.rank}`} src={item.avatar} className={styles.tableAvatar} />
                            <span className={styles.tableManagerName}>{item.name}</span>
                          </div>
                        </td>

                        <td className={styles.tableTd}>
                          <p className={styles.tableTotalVal}>{item.totalPoints}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ padding: 32, textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
                  All managers are currently featured on the podium!
                </div>
              )}
              {tableData.length > 5 && (
                <div className={styles.loadMoreContainer}>
                  <button className={styles.loadMoreBtn}>
                    Load More Rankings
                    <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Footer Area */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <p className={styles.footerText}>© 2024 DreamCup Elite. All Rights Reserved.</p>
        </div>
        <div className={styles.footerLinks}>
          <a href="#" onClick={e => e.preventDefault()} className={styles.footerLink}>Terms</a>
          <a href="#" onClick={e => e.preventDefault()} className={styles.footerLink}>Privacy</a>
          <a href="#" onClick={e => e.preventDefault()} className={styles.footerLink}>Support</a>
          <a href="#" onClick={e => e.preventDefault()} className={styles.footerLink}>API</a>
        </div>
      </footer>
    </div>
  );
}

