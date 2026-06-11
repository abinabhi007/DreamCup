import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SideNav from '../../blocks/SideNav/SideNav';
import Loader from '../../components/Loader/Loader';
import { getMatchById } from '../../src/services/matchService';

export default function MatchDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      fetchMatchDetails();
    }
  }, [id]);

  const fetchMatchDetails = async () => {
    try {
      setLoading(true);
      const data = await getMatchById(id);
      if (data && data.match) {
        setMatchData(data.match);
      } else {
        setError('Match not found');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to load match details.');
    } finally {
      setLoading(false);
    }
  };

  const formatMatchTime = (utcString) => {
    if (!utcString) return '';
    const dateObj = new Date(utcString);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatMatchDate = (utcString) => {
    if (!utcString) return '';
    const dateObj = new Date(utcString);
    return dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <>
      <Head>
        <title>Match Details | DreamCup Elite</title>
        <meta name="description" content="Detailed match analysis and expected lineups." />
      </Head>

      <Loader isLoading={loading && !matchData} />

      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
        <SideNav />

        <div style={{ flex: 1, padding: '48px', marginLeft: '256px' }}>
          {error ? (
            <div style={{ color: 'var(--dc-error)', fontSize: '24px', fontWeight: 'bold' }}>{error}</div>
          ) : matchData ? (
            <div style={{ background: 'rgba(22, 46, 77, 0.7)', borderRadius: '16px', padding: '48px', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <span style={{ color: '#e9c400', fontWeight: 'bold', letterSpacing: '2px', fontSize: '14px' }}>
                  {matchData.status === 'FINISHED' ? 'FINISHED' : ['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(matchData.status) ? 'LIVE' : 'UPCOMING'}
                </span>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '8px' }}>{formatMatchDate(matchData.date)} • {matchData.venue || 'Unknown Venue'}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '64px' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={matchData.homeTeamFlag || 'https://crests.football-data.org/764.svg'} alt={matchData.homeTeam} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                  <h2 style={{ color: '#fff', fontSize: '24px', marginTop: '16px' }}>{matchData.homeTeam}</h2>
                </div>

                <div style={{ textAlign: 'center' }}>
                  {matchData.status === 'FINISHED' || ['LIVE', 'IN_PLAY', 'PAUSED', 'HT'].includes(matchData.status) ? (
                    <div style={{ fontSize: '64px', fontWeight: '900', color: '#e9c400' }}>
                      {matchData.score?.home ?? 0} - {matchData.score?.away ?? 0}
                    </div>
                  ) : (
                    <div style={{ fontSize: '48px', fontWeight: '900', color: '#fff' }}>
                      {formatMatchTime(matchData.date)}
                    </div>
                  )}
                  {matchData.score?.halfTime?.home !== null && matchData.score?.halfTime?.away !== null && (
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px', fontWeight: 'bold' }}>
                      HT: {matchData.score.halfTime.home} - {matchData.score.halfTime.away}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <img src={matchData.awayTeamFlag || 'https://crests.football-data.org/773.svg'} alt={matchData.awayTeam} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                  <h2 style={{ color: '#fff', fontSize: '24px', marginTop: '16px' }}>{matchData.awayTeam}</h2>
                </div>
              </div>

              <div style={{ marginTop: '64px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '48px' }}>
                <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '24px' }}>Match Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', color: 'rgba(255,255,255,0.8)' }}>
                  <div><strong>Match ID:</strong> {matchData.id}</div>
                  <div><strong>Status:</strong> {matchData.status}</div>
                  <div><strong>Winner:</strong> {matchData.winner || 'TBD'}</div>
                  <div><strong>Venue:</strong> {matchData.venue || 'TBD'}</div>
                </div>
              </div>

            </div>
          ) : (
            <div style={{ color: '#fff' }}>Loading match data...</div>
          )}
        </div>
      </div>
    </>
  );
}
