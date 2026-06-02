import { useState, useEffect } from 'react';
import styles from './MyTeamContent.module.scss';
import { getPlayers } from '../../src/services/playerService';

export default function MyTeamContent() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [players, setPlayers] = useState([]);

  const filters = ['All', 'GK', 'DEF', 'MID', 'FWD'];

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const data = await getPlayers();
        setPlayers(data.players);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    }
    fetchPlayers();
  }, []);


  return (
    <div className={styles.mainLayout}>
      {/* Top Header */}
      <header className={styles.topHeader}>
        <div>
          <h1 className={styles.headerTitle}>My Dream XI</h1>
          <p className={styles.headerSubtitle}>Round 12 - Premier Elite Division</p>
        </div>
        
        <div className={styles.headerControls}>
          <div className={styles.budgetCard}>
            <span className={styles.budgetLabel}>Budget Remaining</span>
            <span className={styles.budgetValue}>$100.0M</span>
          </div>
          
          <div className={styles.formationSelectWrap}>
            <select className={styles.formationSelect} defaultValue="4-4-2">
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
              <div className={styles.playerSlot}>
                <div className={styles.slotCircle}>
                  <span className={`material-symbols-outlined ${styles.addIcon}`}>add</span>
                </div>
                <span className={styles.slotLabel}>FWD</span>
              </div>
              <div className={styles.playerSlot}>
                <div className={styles.slotCircle}>
                  <span className={`material-symbols-outlined ${styles.addIcon}`}>add</span>
                </div>
                <span className={styles.slotLabel}>FWD</span>
              </div>
            </div>

            {/* MID Line */}
            <div className={styles.midRow}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.playerSlot}>
                  <div className={styles.slotCircle}>
                    <span className={`material-symbols-outlined ${styles.addIcon}`}>add</span>
                  </div>
                  <span className={styles.slotLabel}>MID</span>
                </div>
              ))}
            </div>

            {/* DEF Line */}
            <div className={styles.defRow}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.playerSlot}>
                  <div className={styles.slotCircle}>
                    <span className={`material-symbols-outlined ${styles.addIcon}`}>add</span>
                  </div>
                  <span className={styles.slotLabel}>DEF</span>
                </div>
              ))}
            </div>

            {/* GK Line */}
            <div className={styles.gkRow}>
              <div className={styles.playerSlot}>
                <div className={styles.captainBadge}>C</div>
                <div className={styles.slotCircle}>
                  <span className={`material-symbols-outlined ${styles.addIcon}`}>add</span>
                </div>
                <span className={styles.slotLabel}>GK</span>
              </div>
            </div>

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
                />
                <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              </div>

              <div className={styles.filterChips}>
                {filters.map(filter => (
                  <button 
                    key={filter} 
                    className={activeFilter === filter ? styles.filterChipActive : styles.filterChip}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className={styles.dropdownFilters}>
                <select className={styles.filterSelect}>
                  <option>All Countries</option>
                  <option>Brazil</option>
                  <option>France</option>
                  <option>Spain</option>
                </select>
                <select className={styles.filterSelect}>
                  <option>All Teams</option>
                  <option>Madrid Elites</option>
                  <option>London Blues</option>
                  <option>Paris Saint-G</option>
                </select>
              </div>
            </div>

            <div className={styles.playerList}>
              {players.map(player => (
                <div key={player._id} className={styles.playerCard}>
                  <div className={styles.playerInfoWrap}>
                    <div className={styles.playerAvatar}>
                      <img src={player.image} alt={player.name} />
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
                    <span className={styles.playerPrice}>{player.price}</span>
                    <button className={styles.addBtn}>
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
                    </button>
                  </div>
                </div>
              ))}
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
              <span className={styles.selectionCountValue}>0 / 11</span>
            </div>
            
            <div className={styles.avatarsStack}>
              <div className={styles.stackAvatarEmpty}>
                <span className={`material-symbols-outlined ${styles.personIcon}`}>person</span>
              </div>
              <div className={styles.stackAvatarEmpty}>
                <span className={`material-symbols-outlined ${styles.personIcon}`}>person</span>
              </div>
              <div className={styles.stackAvatarEmpty}>
                <span className={`material-symbols-outlined ${styles.personIcon}`}>person</span>
              </div>
              <div className={styles.stackAvatarCount}>+8</div>
            </div>
          </div>
          
          <div className={styles.bottomActions}>
            <button className={styles.resetBtn}>Reset Team</button>
            <button className={styles.saveBtn}>Save Team</button>
          </div>
        </div>
      </div>
    </div>
  );
}
