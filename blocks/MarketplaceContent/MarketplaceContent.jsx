import { useState } from 'react';
import styles from './MarketplaceContent.module.scss';

export default function MarketplaceContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [addedPlayers, setAddedPlayers] = useState({});

  const handleAdd = (id) => {
    setAddedPlayers(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedPlayers(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const playersData = [
    {
      id: 1,
      name: "Elias Thorne",
      club: "Manchester City",
      league: "PREMIER LEAGUE",
      position: "FWD",
      price: "£12.5M",
      pts: "184",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4dIgx4J7ZWXVG1vbalxDJMgprjIQ6su99DT7n-tqBArmxMxNf0a3Rnh6K4PXHLPD_03P3zZineKa6kSkJZVvTaqpExIextTJJiJ7JC58zzHPmG562P6oj1v8jCt-3ANqLQxerYvBM7DB6sPxB_vcbjf8wV6k2eGI9oL2690I10NkqNpKAMqY08yfEDTiCgeP9NbUiKHxdc4Yr_l4kvaP4Xmwj2t8JGa4zlY17b-_fRjLYLRq4fW9WMFjB-d4Wkk-Uj6bvbM8Rm5g",
      isPremium: true,
      leagueStyle: styles.playerLeagueGold,
      posStyle: styles.positionBadgeGold,
      btnStyle: styles.addBtnGold,
    },
    {
      id: 2,
      name: "Marc Jørgensen",
      club: "Real Madrid",
      league: "LA LIGA",
      position: "GK",
      price: "£8.2M",
      pts: "142",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc0YEeyCchMgKfxPQt4ZQPL7azLWJAF91b8JZST4oqUaTulGXGe4Mm32jp_0Lr3sQBTA2ywXTFYBecqC1_rqqgqSpvm-wreK0G_B6wRsX-bNVz0CIce3yyJj4Jkr1KHzFzW9pOOZIAGR5CS_24uOPsQSWMZFsDXmJfglWBgOoKYUjG8LIbOZQv_xFRrY6SaCaVyON0QPLQUAx7LYKQ1QY4w7t4J0U5pfcBjtEvvLUP1RMzPbuvljjYf0VUqyoro-YOoczZC_12ULA",
      isPremium: false,
      leagueStyle: styles.playerLeagueGrey,
      posStyle: styles.positionBadgeGrey,
      btnStyle: styles.addBtnSurface,
    },
    {
      id: 3,
      name: "Mateo Silva",
      club: "Bayern Munich",
      league: "BUNDESLIGA",
      position: "MID",
      price: "£11.0M",
      pts: "168",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbNgZkndgWFvxT4iOgJnvKvQkHORaOO7kfzmjICDjdjWR5K4NI0MVvCVZlp9hQcKQgYu7ohPKBudzLJURrUAMRO0BdO4pS6P8GLITOj9E-7-xaiSYjd3NUHWHlIA_6bWdL1lU56OCsODzHxqBYIFqhHmVcN3D2y1UijavhwB0SRMsAFabRjtJTteZsk7kGg-gErf25wk9T2_kkQbS86Narwb-NT27Zv5pAHhqQbwdGZtAyC7XY5Wb6p5-R8UovluxmLfMSRZb1DK4",
      isPremium: false,
      leagueStyle: styles.playerLeagueGrey,
      posStyle: styles.positionBadgeGrey,
      btnStyle: styles.addBtnSurface,
    },
    {
      id: 4,
      name: "Lucas Vini",
      club: "Juventus FC",
      league: "SERIE A",
      position: "DEF",
      price: "£6.5M",
      pts: "121",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdo9dob9nK_gB1ruRLqE-Y6uzuKoGti1Sl6A80wP-3oDaICjpKzWdswqX2tUMyIqOGKt0uwIgtKZ9rH-cA3izriyYvNBACH7gcHm14YbvhoDHYdUs2ofV-o8uiM3glFAm3zWZRcwfk_j893Ja0XDTMTTr6yDIhd2mKMdPqiQ31ybBB8S4gXdNhdbstC1_M1QiJOB9Td8R--LbI8bUvRm_RLzYhgz79IFkygAU78f4jspmXR5h9UqYaOruLj9lTREoEktQuWlvM7LA",
      isPremium: false,
      leagueStyle: styles.playerLeagueGrey,
      posStyle: styles.positionBadgeGrey,
      btnStyle: styles.addBtnSurface,
    },
    {
      id: 5,
      name: "Kenji Sato",
      club: "Liverpool",
      league: "PREMIER LEAGUE",
      position: "MID",
      price: "£9.5M",
      pts: "155",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNz3CJKiGJhr4ebGgZzevIm8tijMSj9FA_jtnQt8pou4okVewHrncNdXwqnrdNDW1FS_ncTjkEO1GxGbOfqsJCpzDtAqWez4BjY92Mf4DjkC5F0zAMxhTAIh0ZtP2K2UlVnOjmoBs3tpY6MVLtdhPxZMtMJjY46hK5-W-IlQ49acYGWDExoadL-54pJvp_SJSRFUn-NDPuFLMMwJmaACM4S_q4LLiG_8xOq13Vb4cNRv-TrU2j5HRCdrpYipVBPia9Kmw6mIEuuiM",
      isPremium: false,
      leagueStyle: styles.playerLeagueGrey,
      posStyle: styles.positionBadgeGrey,
      btnStyle: styles.addBtnSurface,
    },
    {
      id: 6,
      name: "Arnaud Roux",
      club: "PSG",
      league: "LIGUE 1",
      position: "FWD",
      price: "£14.2M",
      pts: "201",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb3UouQ6_7gwgFadl_2yXOK_fIARbpUjcSdI-IDtSzYNuCtXsh4_fjtcalTjnp1SEJixxr-Z_6hVV10q01m16DYAQKJUr32atMXzMhowk37e2j2Pk3w9-qakcxrnLUC3dpIFimY8lIh72Sn_XTrkpVVUuqPbWAhIii42N5Do8yuJEECn93ffV4S_9i-cSsffJqNeCVSP8Apzv7ripj3U7jBfAmmw_2AMQndyxv-LKHrG99hvh1EsIQE4HQssny2IE8R4QKAMiE4gQ",
      isPremium: false,
      leagueStyle: styles.playerLeagueGrey,
      posStyle: styles.positionBadgeGrey,
      btnStyle: styles.addBtnSurface,
    },
    {
      id: 7,
      name: "Harry Vance",
      club: "Arsenal",
      league: "PREMIER LEAGUE",
      position: "DEF",
      price: "£7.4M",
      pts: "115",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_FDF7wYjincFRUrwWZcjfzQ3h6tgWSBpyTOYt4H-FyCVgdExssMpAMd-ozj6-7cTGKnrEGGtHSUB7VfVMT_RGDi7PFkdZUTbmcdL1ED9VAMLtXBG3NV1heftAeZURnKvQTAusS_46vku0jxW9-Db35sF58B2ZZ8gyPzoUcbOsc3kyZ8Ao8KOTMzK3TgI8CYi74JDAG9M7GdGQjCQGqsF4K1_iFWs4WVyvfaBGte5khzC_t-bMBQ_L4WGnJDJqk_cpn_8RMjAyY5w",
      isPremium: false,
      leagueStyle: styles.playerLeagueGrey,
      posStyle: styles.positionBadgeGrey,
      btnStyle: styles.addBtnSurface,
    }
  ];

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
              <span className={styles.walletBalance}>£142.5M</span>
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
            <p className={styles.pageSubtitle}>Discover from 4,281 professional athletes worldwide.</p>
          </div>
        </div>
        <div>
          <button className={styles.sortBtn}>
            <span className="material-symbols-outlined">sort</span> SORT BY RANK
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
          />
        </div>
        <div className={styles.filterControls}>
          <select className={styles.filterSelect}>
            <option>Position: All</option>
            <option>GK - Goalkeeper</option>
            <option>DEF - Defender</option>
            <option>MID - Midfielder</option>
            <option>FWD - Forward</option>
          </select>
          <select className={styles.filterSelect}>
            <option>Country: Global</option>
            <option>🏴󠁧󠁢󠁥󠁮󠁧󠁿 England</option>
            <option>🇧🇷 Brazil</option>
            <option>🇫🇷 France</option>
            <option>🇪🇸 Spain</option>
          </select>
          <select className={styles.filterSelect}>
            <option>Price: Max £15M</option>
            <option>£0 - £5M</option>
            <option>£5M - £10M</option>
            <option>£10M+</option>
          </select>
          <button className={styles.filterActionBtn}>
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      {/* Player Grid */}
      <div className={styles.playerGrid}>
        {playersData.map((player) => {
          const isAdded = addedPlayers[player.id];
          return (
            <div key={player.id} className={player.isPremium ? styles.premiumPlayerCard : styles.playerCard}>
              <div className={styles.imageWrap}>
                <img alt={player.name} src={player.image} className={styles.playerImage} />
                <div className={styles.imageGradient}></div>
                
                {player.isPremium && (
                  <div className={styles.topPickBadge}>TOP PICK</div>
                )}
                
                <div className={styles.playerInfoOverImage}>
                  <span className={player.leagueStyle}>{player.league}</span>
                  <h3 className={styles.playerName}>{player.name}</h3>
                </div>
              </div>
              
              <div className={styles.cardBody}>
                <div className={styles.clubRow}>
                  <div className={styles.clubInfo}>
                    <span className={`material-symbols-outlined ${styles.clubIcon}`}>flag</span>
                    <span className={styles.clubName}>{player.club}</span>
                  </div>
                  <span className={player.posStyle}>{player.position}</span>
                </div>
                
                <div className={styles.statsRow}>
                  <div className={styles.statCol}>
                    <p className={styles.statLabel}>PRICE</p>
                    <p className={styles.statValueGold}>{player.price}</p>
                  </div>
                  <div className={styles.statColRight}>
                    <p className={styles.statLabel}>SEASON PTS</p>
                    <p className={styles.statValueWhite}>{player.pts}</p>
                  </div>
                </div>

                <button 
                  className={isAdded ? styles.addBtnSuccess : player.btnStyle}
                  onClick={() => handleAdd(player.id)}
                >
                  <span className="material-symbols-outlined">
                    {isAdded ? 'check_circle' : 'add_circle'}
                  </span>
                  {isAdded ? 'ADDED' : 'ADD TO TEAM'}
                </button>
              </div>
            </div>
          );
        })}

        {/* Loading Skeleton Card */}
        <div className={styles.loadingCard}>
          <span className={`material-symbols-outlined ${styles.loadingIcon}`}>downloading</span>
          <p className={styles.loadingText}>Loading More Athletes...</p>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerCopy}>© 2024 DreamCup Elite Performance</p>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Terms</a>
          <a href="#" className={styles.footerLink}>Privacy</a>
          <a href="#" className={styles.footerLink}>Support</a>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button className={styles.fab}>
        <span className="material-symbols-outlined">compare_arrows</span>
      </button>

    </div>
  );
}
