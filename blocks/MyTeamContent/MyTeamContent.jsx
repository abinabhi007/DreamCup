import { useState } from 'react';
import styles from './MyTeamContent.module.scss';

export default function MyTeamContent() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'GK', 'DEF', 'MID', 'FWD'];

  const availablePlayers = [
    {
      id: 1,
      name: "K. Mbappé",
      position: "FWD",
      team: "Paris Elites",
      price: "$14.5M",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiI6MimBE64z03Zq2PnkShXvEAevzheg0CX_sUOuBnFNWC16C8CZJXu8WQ8IfZF1TTG916V6rTUXCr-JMoUExeIjKY7g7UdJMNRUsD80k35YVcRqCv4nvhlXDINIGRWM0Jg6mwkiucV7gAXMDj8FnG5obD5PT6zRyYv2Relb_0tUwotJzL6tHxcFL9MPxro7Rvec0tvFzMtLQ4aacK8ILfyFgfJUgjaLO4pybapBo4x9lCHRpFs6gXvzCL6WrJ04T7Re5VIn5_kCU"
    },
    {
      id: 2,
      name: "E. Haaland",
      position: "FWD",
      team: "Manchester Titans",
      price: "$15.0M",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuS05NRWss5bpVAAUsU5dJKcAIa7TrXSNkSMrOH0inHn4AsXpRWc8eGaEYgqtqXtcwLBazokhAD0nkUhSeG9_igjIlX6ycghtp498rvoRJlf7YvovCQoL-pdXPMPjeqS-be2UdIeiTTaA69ESF14dMYc5dA1FCOhVXXC3XXfgY3lYQjTdzAH8Bw-A-xVl5ZDSbpK8boQC-oQ5Kw-AhPnwveqWTLY0VQltckoiG2epBohLzCH5o2KFvgAXB1DWDaIvZfnDsdAiWuLA"
    },
    {
      id: 3,
      name: "T. Courtois",
      position: "GK",
      team: "Madrid Elites",
      price: "$8.5M",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVaGICzN5R8DqTY1vAdir3qAscSyP6OJk3EroRN0o9ZF-9uMDItFbU0hxNNg_sLddcNTNcg4167yGGQO3aBxF4CwfxVPZCmFBRrrkOCAGfurl0teSOMrhDRlB59bV5vEonuhm6zw8tK0qymISCRm3Adkn4LPaj76EUpiG1iF-VoQIO-AZI7jZqveYxQJymIZzvINmGnn39vVmWOCbpjnJ_zsCsF2Sw-tfM887j2vHt2iHayMaEQJLIWz-zkA0-upnW9HvkcUEj24w"
    },
    {
      id: 4,
      name: "Kevin De B.",
      position: "MID",
      team: "Manchester Titans",
      price: "$12.5M",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6-G0BmeMLikI3Z8_UbzoI-oCYMrYuF5TPOhG5g5sPGfILplX-Qmg1PcRNrOuddBKHHn60L8OCL9nJ23jNK8G7sfYN9-LkDrPls_ExoQCtEqm5V7fwdhXNXo0d7lyivFP1TbVYTM1MhcBq1ncNwZV42TxNjgS7IoRoOF3L1Fj3P02hoTKwx5YSjcDd7u2qRPOz0nKuWPa426LNTZ8kyGjiC3tbuNFdvGaL_k0BttmwrqQplu-QZxfIFGhuu56j2Bif6wwN1bnR_gw"
    }
  ];

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
              {availablePlayers.map(player => (
                <div key={player.id} className={styles.playerCard}>
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
