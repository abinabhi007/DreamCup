import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './MyTeamContent.module.scss';
import { getPlayers, getTeams } from '../../src/services/playerService';
import {
  getTeam,
  createTeam,
  addPlayer as apiAddPlayer,
  removePlayer as apiRemovePlayer,
  setCaptain as apiSetCaptain,
  setViceCaptain as apiSetViceCaptain,
} from '../../src/services/teamService';
import toast from 'react-hot-toast';

export default function MyTeamContent() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('All');
  const [priceSortOrder, setPriceSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [team, setTeam] = useState(null);
  const [formation, setFormation] = useState('4-4-2');
  const [activePlayerMenu, setActivePlayerMenu] = useState(null);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [loadingTeam, setLoadingTeam] = useState(false);

  const filters = ['All', 'GK', 'DEF', 'MID', 'FWD'];

  // Map UI filters to backend positions
  const mapFilterToPosition = (filter) => {
    switch (filter) {
      case 'GK': return 'Goalkeeper';
      case 'DEF': return 'Defender';
      case 'MID': return 'Midfielder';
      case 'FWD': return 'Forward';
      default: return '';
    }
  };

  // Load team data on mount
  useEffect(() => {
    fetchTeamData();
    loadAllTeams();
    // Restore formation from localStorage
    const savedFormation = localStorage.getItem('dreamcup_formation');
    if (savedFormation) {
      setFormation(savedFormation);
    }
  }, []);

  // Fetch players with debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchPlayers();
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, activeFilter, selectedTeamFilter]);

  const fetchTeamData = async () => {
    setLoadingTeam(true);
    const token = localStorage.getItem('token');
    try {
      const data = await getTeam(token);
      if (data && data.team) {
        setTeam(data.team);
      }
    } catch (error) {
      console.log('Fetching team failed, attempting to create one...', error);
      if (error.response?.status === 404 || error.response?.data?.message?.includes("not found")) {
        try {
          await createTeam(token);
          const data = await getTeam(token);
          if (data && data.team) {
            setTeam(data.team);
          }
        } catch (createErr) {
          console.error('Failed to create team:', createErr);
          toast.error('Failed to initialize fantasy squad');
        }
      } else {
        toast.error('Failed to load fantasy squad');
      }
    } finally {
      setLoadingTeam(false);
    }
  };

  const loadAllTeams = async () => {
    try {
      const data = await getTeams();
      if (data && data.teams) {
        setAllTeams([...data.teams].sort());
      }
    } catch (error) {
      console.error('Failed to load teams list:', error);
    }
  };

  const fetchPlayers = async () => {
    setLoadingPlayers(true);
    try {
      const data = await getPlayers({
        search: searchQuery,
        position: mapFilterToPosition(activeFilter),
        team: selectedTeamFilter,
        limit: 100,
      });
      if (data && data.players) {
        setPlayers(data.players);
      }
    } catch (error) {
      console.error('Failed to fetch players:', error);
    } finally {
      setLoadingPlayers(false);
    }
  };

  const handleAddPlayer = async (playerId) => {
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Adding player to team...');
    try {
      const res = await apiAddPlayer(playerId, token);
      if (res && res.success) {
        toast.success('Player added successfully!', { id: toastId });
        fetchTeamData();
      } else {
        toast.error(res.message || 'Failed to add player', { id: toastId });
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Failed to add player';
      toast.error(errMsg, { id: toastId });
    }
  };

  const handleRemovePlayer = async (playerId) => {
    setActivePlayerMenu(null);
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Removing player...');
    try {
      const res = await apiRemovePlayer(playerId, token);
      if (res && res.success) {
        toast.success('Player removed successfully!', { id: toastId });
        fetchTeamData();
      } else {
        toast.error(res.message || 'Failed to remove player', { id: toastId });
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Failed to remove player';
      toast.error(errMsg, { id: toastId });
    }
  };

  const handleSetCaptain = async (playerId) => {
    setActivePlayerMenu(null);
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Setting captain...');
    try {
      const res = await apiSetCaptain(playerId, token);
      if (res && res.success) {
        toast.success('Captain updated!', { id: toastId });
        fetchTeamData();
      } else {
        toast.error(res.message || 'Failed to set captain', { id: toastId });
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Failed to set captain';
      toast.error(errMsg, { id: toastId });
    }
  };

  const handleSetViceCaptain = async (playerId) => {
    setActivePlayerMenu(null);
    const token = localStorage.getItem('token');
    const toastId = toast.loading('Setting vice captain...');
    try {
      const res = await apiSetViceCaptain(playerId, token);
      if (res && res.success) {
        toast.success('Vice captain updated!', { id: toastId });
        fetchTeamData();
      } else {
        toast.error(res.message || 'Failed to set vice captain', { id: toastId });
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Failed to set vice captain';
      toast.error(errMsg, { id: toastId });
    }
  };

  const handleResetTeam = async () => {
    if (!team || !team.players || team.players.length === 0) {
      toast.error('No players in squad to reset');
      return;
    }
    const confirmReset = window.confirm('Are you sure you want to remove all players from your squad?');
    if (!confirmReset) return;

    const toastId = toast.loading('Resetting squad...');
    try {
      const token = localStorage.getItem('token');
      await Promise.all(team.players.map((p) => apiRemovePlayer(p._id, token)));
      toast.success('Squad reset successfully!', { id: toastId });
      fetchTeamData();
    } catch (error) {
      console.error(error);
      toast.error('Failed to reset squad', { id: toastId });
    }
  };

  const handleSaveTeam = () => {
    toast.success('Lineup and tactics saved successfully!');
  };

  const handleFormationChange = (e) => {
    const nextFormation = e.target.value;
    setFormation(nextFormation);
    localStorage.setItem('dreamcup_formation', nextFormation);
    toast.success(`Tactics changed to ${nextFormation}`);
  };

  const handlePlayerSlotClick = (player, event) => {
    event.stopPropagation();
    const container = event.currentTarget.closest(`.${styles.pitchContainer}`);
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = event.currentTarget.getBoundingClientRect();

    const x = buttonRect.left - containerRect.left + buttonRect.width / 2 - 100;
    const y = buttonRect.top - containerRect.top + buttonRect.height + 10;

    setActivePlayerMenu({ player, x, y });
  };

  // Close popup menu on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActivePlayerMenu(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Parse starting XI vs bench based on chosen formation
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
  const benchGks = gks.slice(limits.Goalkeeper);

  const startingDefs = defs.slice(0, limits.Defender);
  const benchDefs = defs.slice(limits.Defender);

  const startingMids = mids.slice(0, limits.Midfielder);
  const benchMids = mids.slice(limits.Midfielder);

  const startingFwds = fwds.slice(0, limits.Forward);
  const benchFwds = fwds.slice(limits.Forward);

  const benchPlayers = [...benchGks, ...benchDefs, ...benchMids, ...benchFwds];

  // Sorting list players
  const sortedPlayers = [...players].sort((a, b) => {
    return priceSortOrder === 'desc' ? b.price - a.price : a.price - b.price;
  });

  // Render a single pitch slot (filled or empty)
  const renderSlot = (positionLabel, startingList, index) => {
    const player = startingList[index];
    const posFilter = positionLabel === 'GK' ? 'GK' : positionLabel === 'DEF' ? 'DEF' : positionLabel === 'MID' ? 'MID' : 'FWD';

    if (player) {
      const isCaptain = team?.captain && (team.captain._id === player._id || team.captain === player._id);
      const isViceCaptain = team?.viceCaptain && (team.viceCaptain._id === player._id || team.viceCaptain === player._id);

      return (
        <div key={player._id} className={styles.playerSlot}>
          {isCaptain && <div className={styles.captainBadge}>C</div>}
          {isViceCaptain && <div className={styles.viceCaptainBadge}>VC</div>}
          <div
            className={styles.slotCircleFilled}
            onClick={(e) => handlePlayerSlotClick(player, e)}
          >
            <Image
              src={player.countryFlag || player.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC0YEeyCchMgKfxPQt4ZQPL7azLWJAF91b8JZST4oqUaTulGXGe4Mm32jp_0Lr3sQBTA2ywXTFYBecqC1_rqqgqSpvm-wreK0G_B6wRsX-bNVz0CIce3yyJj4Jkr1KHzFzW9pOOZIAGR5CS_24uOPsQSWMZFsDXmJfglWBgOoKYUjG8LIbOZQv_xFRrY6SaCaVyON0QPLQUAx7LYKQ1QY4w7t4J0U5pfcBjtEvvLUP1RMzPbuvljjYf0VUqyoro-YOoczZC_12ULA'}
              alt={player.name}
              className={styles.slotPlayerImage}
              width={60}
              height={60}
            />
          </div>
          <span className={styles.slotPlayerName}>{player.name}</span>
          <span className={styles.slotPlayerPrice}>${player.price}M</span>
        </div>
      );
    }

    return (
      <div
        key={`empty-${positionLabel}-${index}`}
        className={styles.playerSlot}
        onClick={() => {
          setActiveFilter(posFilter);
          toast.success(`Search focused on ${positionLabel}s`);
        }}
      >
        <div className={styles.slotCircle}>
          <span className={`material-symbols-outlined ${styles.addIcon}`}>add</span>
        </div>
        <span className={styles.slotLabel}>{positionLabel}</span>
      </div>
    );
  };

  return (
    <motion.div 
      className={styles.mainLayout}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Header */}
      <header className={styles.topHeader}>
        <div>
          <h1 className={styles.headerTitle}>My Dream XI</h1>
          <p className={styles.headerSubtitle}>Round 12 - Premier Elite Division</p>
        </div>

        <div className={styles.headerControls}>
          <div className={styles.budgetCard}>
            <span className={styles.budgetLabel}>Budget Remaining</span>
            <span className={styles.budgetValue}>
              ${team ? team.budgetRemaining.toFixed(1) : '100.0'}M
            </span>
          </div>

          <div className={styles.formationSelectWrap}>
            <select
              className={styles.formationSelect}
              value={formation}
              onChange={handleFormationChange}
            >
              <option value="4-4-2">4 - 4 - 2</option>
              <option value="4-3-3">4 - 3 - 3</option>
              <option value="3-5-2">3 - 5 - 2</option>
              <option value="5-3-2">5 - 3 - 2</option>
            </select>
            <span className={`material-symbols-outlined ${styles.formationIcon}`}>expand_more</span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className={styles.workspace}>
        {/* Left Panel: Pitch */}
        <div className={styles.pitchCol}>
          <div className={styles.pitchContainer}>
            <div className={styles.pitchLines}></div>
            <div className={styles.centerCircle}></div>
            <div className={styles.halfLine}></div>

            {/* FWD Line */}
            <div className={styles.fwdRow}>
              {Array.from({ length: limits.Forward }).map((_, i) =>
                renderSlot('FWD', startingFwds, i)
              )}
            </div>

            {/* MID Line */}
            <div className={styles.midRow}>
              {Array.from({ length: limits.Midfielder }).map((_, i) =>
                renderSlot('MID', startingMids, i)
              )}
            </div>

            {/* DEF Line */}
            <div className={styles.defRow}>
              {Array.from({ length: limits.Defender }).map((_, i) =>
                renderSlot('DEF', startingDefs, i)
              )}
            </div>

            {/* GK Line */}
            <div className={styles.gkRow}>
              {Array.from({ length: limits.Goalkeeper }).map((_, i) =>
                renderSlot('GK', startingGks, i)
              )}
            </div>

            {/* Sub/Bench Row */}
            <div className={styles.benchRow}>
              <div style={{ width: '100%' }}>
                <p className={styles.benchTitle}>Substitutes / Bench</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  {benchPlayers.map((player) => {
                    const isCaptain = team?.captain && (team.captain._id === player._id || team.captain === player._id);
                    const isViceCaptain = team?.viceCaptain && (team.viceCaptain._id === player._id || team.viceCaptain === player._id);

                    return (
                      <div key={player._id} className={styles.playerSlot}>
                        {isCaptain && <div className={styles.captainBadge}>C</div>}
                        {isViceCaptain && <div className={styles.viceCaptainBadge}>VC</div>}
                        <div
                          className={styles.slotCircleFilled}
                          onClick={(e) => handlePlayerSlotClick(player, e)}
                        >
                          <Image
                            src={player.countryFlag || player.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC0YEeyCchMgKfxPQt4ZQPL7azLWJAF91b8JZST4oqUaTulGXGe4Mm32jp_0Lr3sQBTA2ywXTFYBecqC1_rqqgqSpvm-wreK0G_B6wRsX-bNVz0CIce3yyJj4Jkr1KHzFzW9pOOZIAGR5CS_24uOPsQSWMZFsDXmJfglWBgOoKYUjG8LIbOZQv_xFRrY6SaCaVyON0QPLQUAx7LYKQ1QY4w7t4J0U5pfcBjtEvvLUP1RMzPbuvljjYf0VUqyoro-YOoczZC_12ULA'}
                            alt={player.name}
                            className={styles.slotPlayerImage}
                            width={60}
                            height={60}
                          />
                        </div>
                        <span className={styles.slotPlayerName}>{player.name}</span>
                        <span className={styles.slotPlayerPrice}>${player.price}M</span>
                      </div>
                    );
                  })}
                  {Array.from({ length: Math.max(0, 4 - benchPlayers.length) }).map((_, i) => (
                    <div key={`empty-bench-${i}`} className={styles.playerSlot}>
                      <div className={styles.slotCircle} style={{ width: '60px', height: '60px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 24, opacity: 0.3 }}>person</span>
                      </div>
                      <span className={styles.slotLabel} style={{ fontSize: '10px' }}>SUB</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Popup Menu */}
            {activePlayerMenu && (
              <div
                className={styles.actionMenuPopover}
                style={{ top: activePlayerMenu.y, left: activePlayerMenu.x }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.menuHeader}>
                  <strong>{activePlayerMenu.player.name}</strong>
                  <span>({activePlayerMenu.player.position})</span>
                </div>
                <button onClick={() => handleSetCaptain(activePlayerMenu.player._id)}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>star</span> Make Captain
                </button>
                <button onClick={() => handleSetViceCaptain(activePlayerMenu.player._id)}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>star_half</span> Make Vice-Captain
                </button>
                <button
                  className={styles.menuDeleteBtn}
                  onClick={() => handleRemovePlayer(activePlayerMenu.player._id)}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span> Remove
                </button>
                <button className={styles.menuCancelBtn} onClick={() => setActivePlayerMenu(null)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Player Selection */}
        <div className={styles.selectionPanel}>
          <div className={styles.selectionCard}>
            <div className={styles.selectionHeader}>
              <div className={styles.searchWrap}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              </div>

              <div className={styles.filterChips}>
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={
                      activeFilter === filter ? styles.filterChipActive : styles.filterChip
                    }
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className={styles.dropdownFilters}>
                <select
                  className={styles.filterSelect}
                  value={selectedTeamFilter}
                  onChange={(e) => setSelectedTeamFilter(e.target.value)}
                >
                  <option value="All">All Teams</option>
                  {allTeams.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.filterSelect}
                  value={priceSortOrder}
                  onChange={(e) => setPriceSortOrder(e.target.value)}
                >
                  <option value="desc">Price: High to Low</option>
                  <option value="asc">Price: Low to High</option>
                </select>
              </div>
            </div>

            <div className={styles.playerList}>
              {loadingPlayers ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
                  <span className="material-symbols-outlined animate-spin" style={{ fontSize: 32, color: 'var(--dc-secondary)' }}>
                    progress_activity
                  </span>
                </div>
              ) : sortedPlayers.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--dc-on-surface-variant)', padding: '24px' }}>
                  No players found
                </div>
              ) : (
                sortedPlayers.map((player) => {
                  const isAlreadyInTeam =
                    team && team.players.some((p) => p._id === player._id);

                  return (
                    <div key={player._id} className={styles.playerCard}>
                      <div className={styles.playerInfoWrap}>
                        <div className={styles.playerAvatar}>
                          <Image
                            src={player.countryFlag || player.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC0YEeyCchMgKfxPQt4ZQPL7azLWJAF91b8JZST4oqUaTulGXGe4Mm32jp_0Lr3sQBTA2ywXTFYBecqC1_rqqgqSpvm-wreK0G_B6wRsX-bNVz0CIce3yyJj4Jkr1KHzFzW9pOOZIAGR5CS_24uOPsQSWMZFsDXmJfglWBgOoKYUjG8LIbOZQv_xFRrY6SaCaVyON0QPLQUAx7LYKQ1QY4w7t4J0U5pfcBjtEvvLUP1RMzPbuvljjYf0VUqyoro-YOoczZC_12ULA'}
                            alt={player.name}
                            width={48}
                            height={48}
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <h4 className={styles.playerName}>{player.name}</h4>
                          <div className={styles.playerMeta}>
                            <span className={styles.playerPos}>{player.position}</span>
                            <span className={styles.playerTeam}>{player.team}</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.playerActionWrap}>
                        <span className={styles.playerPrice}>${player.price}M</span>
                        {isAlreadyInTeam ? (
                          <button
                            className={styles.addBtn}
                            style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', cursor: 'default' }}
                            title="Already in squad"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                              check
                            </span>
                          </button>
                        ) : (
                          <button
                            className={styles.addBtn}
                            onClick={() => handleAddPlayer(player._id)}
                            title="Draft player"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                              add
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomBarInner}>
          <div className={styles.selectionStatusWrap}>
            <div className={styles.selectionCount}>
              <span className={styles.selectionCountLabel}>Selected Players</span>
              <span className={styles.selectionCountValue}>
                {draftedPlayers.length} / 15
              </span>
            </div>

            <div className={styles.avatarsStack}>
              {draftedPlayers.slice(0, 3).map((p, idx) => (
                <div key={idx} className={styles.stackAvatarEmpty} style={{ border: 'none', overflow: 'hidden' }}>
                  <Image
                    src={p.countryFlag || p.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC0YEeyCchMgKfxPQt4ZQPL7azLWJAF91b8JZST4oqUaTulGXGe4Mm32jp_0Lr3sQBTA2ywXTFYBecqC1_rqqgqSpvm-wreK0G_B6wRsX-bNVz0CIce3yyJj4Jkr1KHzFzW9pOOZIAGR5CS_24uOPsQSWMZFsDXmJfglWBgOoKYUjG8LIbOZQv_xFRrY6SaCaVyON0QPLQUAx7LYKQ1QY4w7t4J0U5pfcBjtEvvLUP1RMzPbuvljjYf0VUqyoro-YOoczZC_12ULA'}
                    alt={p.name}
                    width={32}
                    height={32}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
              {Array.from({ length: Math.max(0, 3 - draftedPlayers.length) }).map((_, idx) => (
                <div key={idx} className={styles.stackAvatarEmpty}>
                  <span className={`material-symbols-outlined ${styles.personIcon}`}>person</span>
                </div>
              ))}
              {draftedPlayers.length > 3 && (
                <div className={styles.stackAvatarCount}>+{draftedPlayers.length - 3}</div>
              )}
            </div>
          </div>

          <div className={styles.bottomActions}>
            <button className={styles.resetBtn} onClick={handleResetTeam}>
              Reset Team
            </button>
            <button className={styles.saveBtn} onClick={handleSaveTeam}>
              Save Team
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

