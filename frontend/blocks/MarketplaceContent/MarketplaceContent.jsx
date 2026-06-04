import { useState, useEffect } from 'react';
import styles from './MarketplaceContent.module.scss';
import { getPlayers } from '../../src/services/playerService';
import { getTeam, addPlayer as apiAddPlayer } from '../../src/services/teamService';
import toast from 'react-hot-toast';

export default function MarketplaceContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All');
  const [priceSortOrder, setPriceSortOrder] = useState('desc');
  const [players, setPlayers] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [team, setTeam] = useState(null);
  const [loadingPlayers, setLoadingPlayers] = useState(false);

  useEffect(() => {
    fetchTeamData();
    loadAllTeams();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchPlayers();
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, positionFilter, teamFilter]);

  const fetchTeamData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const data = await getTeam(token);
      if (data && data.team) {
        setTeam(data.team);
      }
    } catch (error) {
      console.error('Failed to load team data for marketplace:', error);
    }
  };

  const loadAllTeams = async () => {
    try {
      const data = await getPlayers({ limit: 300 });
      if (data && data.players) {
        const uniqueTeams = Array.from(new Set(data.players.map((p) => p.team))).sort();
        setAllTeams(uniqueTeams);
      }
    } catch (error) {
      console.error('Failed to load teams list:', error);
    }
  };

  const fetchPlayers = async () => {
    setLoadingPlayers(true);
    let posQuery = '';
    if (positionFilter.includes('GK')) posQuery = 'Goalkeeper';
    else if (positionFilter.includes('DEF')) posQuery = 'Defender';
    else if (positionFilter.includes('MID')) posQuery = 'Midfielder';
    else if (positionFilter.includes('FWD')) posQuery = 'Forward';

    try {
      const data = await getPlayers({
        search: searchQuery,
        position: posQuery,
        team: teamFilter,
        limit: 100,
      });
      if (data && data.players) {
        setPlayers(data.players);
      }
    } catch (error) {
      console.error('Failed to fetch marketplace players:', error);
    } finally {
      setLoadingPlayers(false);
    }
  };

  const handleAddPlayer = async (playerId) => {
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Drafting player...');
    try {
      const res = await apiAddPlayer(playerId, token);
      if (res && res.success) {
        toast.success('Player drafted successfully!', { id: toastId });
        fetchTeamData();
      } else {
        toast.error(res.message || 'Failed to draft player', { id: toastId });
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Failed to draft player';
      toast.error(errMsg, { id: toastId });
    }
  };

  const toggleSort = () => {
    const nextSort = priceSortOrder === 'desc' ? 'asc' : 'desc';
    setPriceSortOrder(nextSort);
    toast.success(`Sorted by price: ${nextSort === 'desc' ? 'High to Low' : 'Low to High'}`);
  };

  const sortedPlayers = [...players].sort((a, b) => {
    return priceSortOrder === 'desc' ? b.price - a.price : a.price - b.price;
  });

  return (
    <div className={styles.mainContent}>
      
      {/* Top Navigation */}
      <header className={styles.topNav}>
        <div className={styles.breadcrumbWrap}>
          <span className={styles.navTitle}>Player Marketplace</span>
          <span className={styles.navDivider}>/</span>
          <span className={styles.navSubtitle}>Global Scouting</span>
        </div>
        
        <div className={styles.actionsWrap}>
          <div className={styles.searchWrap}>
            <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
            <input 
              className={styles.searchInput} 
              type="text" 
              placeholder="Search elite talent..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className={styles.actionBtnRow}>
            <button className={styles.actionBtn}>
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className={styles.walletBadge}>
              <span className={`material-symbols-outlined ${styles.walletIcon}`}>account_balance_wallet</span>
              <span className={styles.walletBalance}>£{team ? team.budgetRemaining.toFixed(1) : '100.0'}M</span>
            </div>
            <img 
              alt="User Avatar" 
              className={styles.userAvatar} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSDQi16hgUAJPyrrGvBzVHzdCMS2mAfGXa4j97uOKziW-afOO881A2rewu66X1tmjRG2ggh2jfUD3jRS8Q4yKcGCWCrvCt-c5165vUsfI3-icsKjOcCjp9Bk8vbC0PKDJdPwi-1eC-FHPeouExFBlQF0VQuqLSJ_zAmxdCpSl3ugrrYZgC3ZM0HacFCFBSN31dIMZew1iiEtiE1qwXVIe9v3-9SqUmEYAVtwO-5KrN0sKV0ZVR7QCdl1Le-LKsz2UQ6iQTJ0tNkq4"
            />
          </div>
        </div>
      </header>

      {/* Header Section */}
      <section className={styles.headerSection}>
        <div>
          <h2 className={styles.pageTitle}>Transfer Hub</h2>
          <div className={styles.pageSubtitleWrap}>
            <span className={styles.liveBadge}>LIVE</span>
            <p className={styles.pageSubtitle}>Discover from {sortedPlayers.length} professional athletes seeded.</p>
          </div>
        </div>
        <div>
          <button className={styles.sortBtn} onClick={toggleSort}>
            <span className="material-symbols-outlined">sort</span> SORT BY PRICE
          </button>
        </div>
      </section>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.mainSearchCol}>
          <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
          <input 
            className={styles.mainSearchInput} 
            type="text" 
            placeholder="Search Player Name, Club or League..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.filterControls}>
          <select 
            className={styles.filterSelect}
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option value="All">Position: All</option>
            <option value="GK">GK - Goalkeeper</option>
            <option value="DEF">DEF - Defender</option>
            <option value="MID">MID - Midfielder</option>
            <option value="FWD">FWD - Forward</option>
          </select>
          <select 
            className={styles.filterSelect}
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
          >
            <option value="All">Team: All Teams</option>
            {allTeams.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select 
            className={styles.filterSelect}
            value={priceSortOrder}
            onChange={(e) => setPriceSortOrder(e.target.value)}
          >
            <option value="desc">Price: Descending</option>
            <option value="asc">Price: Ascending</option>
          </select>
          <button className={styles.filterActionBtn} onClick={() => { setSearchQuery(''); setPositionFilter('All'); setTeamFilter('All'); }}>
            <span className="material-symbols-outlined">filter_list_off</span>
          </button>
        </div>
      </div>

      {/* Player Grid */}
      <div className={styles.playerGrid}>
        {loadingPlayers ? (
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', padding: '64px' }}>
            <span className="material-symbols-outlined animate-spin" style={{ fontSize: 48, color: 'var(--dc-secondary)' }}>
              progress_activity
            </span>
          </div>
        ) : sortedPlayers.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--dc-on-surface-variant)', padding: '64px' }}>
            No athletes found matching your filters.
          </div>
        ) : (
          sortedPlayers.map((player) => {
            const isAlreadyInTeam = team && team.players.some((p) => p._id === player._id);
            const isPremium = player.price >= 10;
            return (
              <div key={player._id} className={isPremium ? styles.premiumPlayerCard : styles.playerCard}>
                <div className={styles.imageWrap}>
                  <img 
                    alt={player.name} 
                    src={player.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC0YEeyCchMgKfxPQt4ZQPL7azLWJAF91b8JZST4oqUaTulGXGe4Mm32jp_0Lr3sQBTA2ywXTFYBecqC1_rqqgqSpvm-wreK0G_B6wRsX-bNVz0CIce3yyJj4Jkr1KHzFzW9pOOZIAGR5CS_24uOPsQSWMZFsDXmJfglWBgOoKYUjG8LIbOZQv_xFRrY6SaCaVyON0QPLQUAx7LYKQ1QY4w7t4J0U5pfcBjtEvvLUP1RMzPbuvljjYf0VUqyoro-YOoczZC_12ULA'} 
                    className={styles.playerImage} 
                  />
                  <div className={styles.imageGradient}></div>
                  
                  {isPremium && (
                    <div className={styles.topPickBadge}>TOP PICK</div>
                  )}
                  
                  <div className={styles.playerInfoOverImage}>
                    <span className={isPremium ? styles.playerLeagueGold : styles.playerLeagueGrey}>WORLD CUP DIVISION</span>
                    <h3 className={styles.playerName}>{player.name}</h3>
                  </div>
                </div>
                
                <div className={styles.cardBody}>
                  <div className={styles.clubRow}>
                    <div className={styles.clubInfo}>
                      <span className={`material-symbols-outlined ${styles.clubIcon}`}>flag</span>
                      <span className={styles.clubName}>{player.team}</span>
                    </div>
                    <span className={isPremium ? styles.positionBadgeGold : styles.positionBadgeGrey}>
                      {player.position === 'Goalkeeper' ? 'GK' : player.position === 'Defender' ? 'DEF' : player.position === 'Midfielder' ? 'MID' : 'FWD'}
                    </span>
                  </div>
                  
                  <div className={styles.statsRow}>
                    <div className={styles.statCol}>
                      <p className={styles.statLabel}>PRICE</p>
                      <p className={styles.statValueGold}>${player.price}M</p>
                    </div>
                    <div className={styles.statColRight}>
                      <p className={styles.statLabel}>POINTS</p>
                      <p className={styles.statValueWhite}>{player.points}</p>
                    </div>
                  </div>

                  {isAlreadyInTeam ? (
                    <button 
                      className={styles.addBtnSuccess}
                      disabled
                    >
                      <span className="material-symbols-outlined">
                        check_circle
                      </span>
                      ADDED
                    </button>
                  ) : (
                    <button 
                      className={isPremium ? styles.addBtnGold : styles.addBtnSurface}
                      onClick={() => handleAddPlayer(player._id)}
                    >
                      <span className="material-symbols-outlined">
                        add_circle
                      </span>
                      ADD TO TEAM
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerCopy}>© 2024 DreamCup Elite Performance</p>
        <div className={styles.footerLinks}>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.footerLink}>Terms</a>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.footerLink}>Privacy</a>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.footerLink}>Support</a>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button className={styles.fab} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); toast.success('Scrolled to top!'); }}>
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>

    </div>
  );
}
