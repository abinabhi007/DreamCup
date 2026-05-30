import { useState } from 'react';
import styles from './LeaderboardContent.module.scss';

export default function LeaderboardContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [filter, setFilter] = useState('All Leagues');

  // Hardcoded Leaderboard Data to match prototype exactly
  const podiumData = [
    {
      rank: 2,
      name: "Marco V.",
      team: "Milan Mavericks",
      points: "2,842",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCkthN4hIpRfreTUxbktrGuXd0WH5dV3EUuIeQSRylPZnpcc6VpdXqJrNbso2sKYFVh8WBqHzoCtRPxILOiVaBHZMcv_WqEa8bWNqzwv9bwtXwH1_iFRk-bJFv_npe9kgWXsHbwNnn5_3AdB9tXHlNDWpE_ICVQvBOwMsGIrspGULWzXtAkfBw2UF31rEhUirVbKtIJaLtN_AUTatlQt0Nbrx5v-LrEZKwcCTFwiBsDYxuDuTUIUmSrA9fH2rRAXJYHz2tirXYkp8",
      styleClass: styles.podiumRank2,
      avatarClass: styles.rank2Avatar,
      badgeClass: styles.rank2Badge,
    },
    {
      rank: 1,
      name: 'Elena "The Tactician"',
      team: "Apex United",
      points: "2,987",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfX9FtvQu36CQTzNNW4hcozoK2FbsqLO8FoRmUMCl5ukumybDDfEwieYohZH0jrv5yICAftNO3PKqXiM9Johfk8dItjoSHlDhhoCsQWlbgkNQUSKZV5WpGe6SX-8YTODkPgC_TrsVq1u6gGAuis1ZOgy5FtB3WKKtmWE-h3PUXZA6kB4G1_T8BuC7tpqNtpiNMdw5uwxU4l2qZvBkxV_GCjfF2p9tZAJYsto1Lu3BjTtHs_lrZamYMessLKGHvJgHMiNMsT1ztv-s",
      styleClass: styles.podiumRank1,
      avatarClass: styles.rank1Avatar,
      badgeClass: styles.rank1Badge,
    },
    {
      rank: 3,
      name: "Soren K.",
      team: "Nordic Knights",
      points: "2,795",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYdr3P5a2MKeSV0P4l76MkyFY5dfmgyBFlKJWRu8NHBTCrgqhQag15Goz24YH4BVozETePF91csQa0NA_FyM56N4jXx6AnPdkHFvC4WzqiT5SC32svkeY3zL1XCsQryaJpAb393MOxVJiCB_E_AE4lnYRT0p_v1v0XWZYV5wY8wwijNo9V-DVaQAtBTWWH0ZKDZqWNeQh5Ixf117-HzHxQSPKEusyV9R5NFhOXcNLsiqhseRdiVcsiylFV7u1t7CU7e0COgOquZfs",
      styleClass: styles.podiumRank3,
      avatarClass: styles.rank3Avatar,
      badgeClass: styles.rank3Badge,
    }
  ];

  const tableData = [
    {
      rank: "04",
      name: "David Chen",
      team: "Dragon Dynasty",
      gwPoints: "82",
      totalPoints: "2,654",
      colorClass: "text-[#FFD700]", // gold
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK-HnNR4cWayJgiknjGm3YunRjTZRI-2WUAjx0QPIW1GUQI7WdVZ0ZksvQOE8SDNlcbm34N-p0TFn_-nFXO1HBzLxhMhp64HPtdHrVG03SeEt_fNxKSsxQ2C230lDTucCxEf0MPxEQ_5IiWtWGjMqVoz-qfy3dAmE3FYSigGJLXrUuJBYIXPsJUjIM5O1JpNql6pMLmUpdwIM_qXBj13XAtfiq0DF0RHWA5F44-AOTlsRIXo2491GVaDJMvdsUu10MliVRCcaoaHU",
    },
    {
      rank: "05",
      name: "Sarah Jenkins",
      team: "Wembley Warriors",
      gwPoints: "75",
      totalPoints: "2,610",
      colorClass: "text-[#d5e3ff]", // primary
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzEKBxWU2N-R3so9TxJHghfQv0f_xk15vPH3K9QHI5tCfCe488fZZMqKum4ZxQdDSNgAftBFA0VUE9drd5U8QrGHhE4-a7FbzSgzjF5fJ-HMn7NZTnYchLRP6MpaOT8Dv_ujX7xFPnnlxKDxZYrohMP6GSKGMxMMnPXVLMGlFp6rDlOo9o3LQfwM6xpAixCRHjdymiDb5lnAYK8HURBtQ3MqRzYieSHputoXi_aSp_fUqq2KiTxjkqMAdf0KZaHySa-ZeiesZZcS4",
    },
    {
      rank: "06",
      name: "Hiroshi T.",
      team: "Neo-Tokyo FC",
      gwPoints: "91",
      totalPoints: "2,589",
      colorClass: "text-white/40",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_BaMrjiGIc9p4eFup1IM6E0FLDWqDLUXAmC3B4Mq6PT5Yyfj7QlopNxVtFdaHynRB8YUnHtjcS1dIp7KC_oLMiaShCCqG8hQsuWEBDZw-xy9p6E6CcIdOWyTvigXZy5C8zBG-LQ8AxJVgY0MdeVy7GgIyGl3x5ZizOR1DbPPG2yHzteRotrvK_-L_f_xPIkyqPgmRM7rDsMw2blR676vxFKYE38UOREQ11-NAqoQuE7yVYSDwSBAhfuUB9E34b8bbIOq7asEHOi8",
    },
    {
      rank: "07",
      name: "Alex Thorne",
      team: "Thorne Arsenal",
      gwPoints: "68",
      totalPoints: "2,554",
      colorClass: "text-white/40",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD65e9c0Koo4Rfk1I1iZD8fmctKEhOyANu_A3O-2z6eLfi1xM0dp5EF5eo5x2lU9bFQKyG5r3YCdp5ZfaxpgHAZSa_18yRGYRtHZqJmKa08HcSB7yLUKVZ66EskDdmofT983WQRLfKXkgyspcL2-3yLuDbYuU_tK3nmquoae3o0dKWx07g62ZyLAUGV5SI4rWPSZdG514ADvzXEWvbApzjm8wUKMkuyPDxm6ic_PrKYqeG0f_p6b-E2udsRaJ8HYy9kqrU5ZsZHigU",
    },
    {
      rank: "08",
      name: "Lucia Gomez",
      team: "Iberian Icons",
      gwPoints: "54",
      totalPoints: "2,520",
      colorClass: "text-white/40",
      rowClass: styles.tableRowActive,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7cMi8bSqmr86JzsAN7VHXYNSCaiTw8v6_VDRgLWyIzAfopAR881wCvTz4yABoPTIkLvcLpfNZwwdO2hr6Eebdi3wLrvmXySRlMRwUFJMmWUBILbZIs1RKiW0_OqHMvXP26QKP35mdDFceEMLiujy8AX01Efy4IfSV5ExKrimFd7Zd2oeTTYcuSkufFZ-xSJEJACWToZnhzL3hxQ8DV_bsLHJknZk7Tlfe63_m9xSOCc1hUlR_3c8ajDYYMyy-JaEhlHVuyAtiSN4",
    }
  ];

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

      {/* Podium Section */}
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
      <div className={styles.tablePanel}>
        <table className={styles.leaderboardTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableTh}>Rank</th>
              <th className={styles.tableTh}>Manager</th>
              <th className={styles.tableTh}>Team Name</th>
              <th className={styles.tableTh}>GW Points</th>
              <th className={styles.tableTh}>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
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
                  <p className={styles.tableTeamName}>{item.team}</p>
                </td>
                <td className={styles.tableTd}>
                  <p className={styles.tableDataVal}>{item.gwPoints}</p>
                </td>
                <td className={styles.tableTd}>
                  <p className={styles.tableTotalVal}>{item.totalPoints}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreBtn}>
            Load More Rankings
            <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
          </button>
        </div>
      </div>

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
