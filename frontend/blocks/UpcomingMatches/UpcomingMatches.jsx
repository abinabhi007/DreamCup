import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './UpcomingMatches.module.scss';
import { getMatches } from '../../src/services/matchService';

export default function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches();
        if (data.matches && data.matches.length > 0) {
          // Attempt to show upcoming first, if none, just show first two
          const upcoming = data.matches.filter(m => m.status === 'TIMED' || m.status === 'SCHEDULED');
          const displayMatches = upcoming.length >= 2 ? upcoming.slice(0, 2) : data.matches.slice(0, 2);
          setMatches(displayMatches);
        }
      } catch (error) {
        console.error("Failed to load upcoming matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleMatchClick = () => {
    router.push('/matches');
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.sectionTitle}>Upcoming High-Stakes Matches</h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#fff' }}>Loading matches...</p>
        ) : matches.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#fff' }}>No matches available.</p>
        ) : (
          <div className={styles.grid}>
            {matches.map((m, idx) => {
              const ctaPrimary = idx === 0;
              const cta = m.status === 'FINISHED' ? 'VIEW RESULTS' : 'MATCH CENTER';
              const matchDate = new Date(m.date);
              const dateStr = matchDate.toLocaleDateString();
              const timeStr = matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={m.id}
                  className={`${styles.matchCard} glass-panel${ctaPrimary ? ' ' + styles.matchCardPrimary : ''}`}
                >
                  {/* Teams */}
                  <div className={styles.teams}>
                    <div className={styles.teamCol}>
                      <img src={m.homeTeamFlag} alt={m.homeTeam} className={styles.flag} />
                      <span className={styles.teamCode}>{(m.homeTeam || '').substring(0, 3).toUpperCase()}</span>
                    </div>
                    <span className={styles.vs}>VS</span>
                    <div className={styles.teamCol}>
                      <img src={m.awayTeamFlag} alt={m.awayTeam} className={styles.flag} />
                      <span className={styles.teamCode}>{(m.awayTeam || '').substring(0, 3).toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Right info */}
                  <div className={styles.matchInfo}>
                    <p className={styles.matchWhen}>{`${dateStr}, ${timeStr}`}</p>
                    <p className={styles.matchVenue}>{m.venue || 'TBA'}</p>
                    <button
                      onClick={handleMatchClick}
                      className={`${styles.matchBtn}${ctaPrimary ? ' ' + styles.matchBtnPrimary : ' ' + styles.matchBtnSecondary}`}
                      id={`match-cta-${m.id}`}
                    >
                      {cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
