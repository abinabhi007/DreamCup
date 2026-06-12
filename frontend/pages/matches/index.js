import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SideNav from '../../blocks/SideNav/SideNav';
import BottomNav from '../../blocks/BottomNav/BottomNav';
import MatchesContent from '../../blocks/MatchesContent/MatchesContent';
import Loader from '../../components/Loader/Loader';
import { getMatches, getLiveMatches, getFinishedMatches, getStandings, getTopGoalScorers } from '../../src/services/matchService';

export default function MatchesPage() {
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [finishedMatches, setFinishedMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [matchesLoading, setMatchesLoading] = useState(true);
  const [matchesError, setMatchesError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setMatchesLoading(true);
      const [allMatchesData, liveMatchesData, finishedMatchesData, standingsData, topScorersData] = await Promise.all([
        getMatches(),
        getLiveMatches(),
        getFinishedMatches(),
        getStandings(),
        getTopGoalScorers()
      ]);
      setMatches(allMatchesData.matches || []);
      setLiveMatches(liveMatchesData.matches || []);
      setFinishedMatches(finishedMatchesData.matches || []);
      setStandings(standingsData.standings || []);
      setTopScorers(topScorersData.scorers || []);
      setMatchesError(null);
    } catch (error) {
      console.log(error);
      setMatchesError(error.message || 'Failed to load matches.');
    } finally {
      setMatchesLoading(false);
    }
  };


  return (
    <>
      <Head>
        <title>Match Center | DreamCup Elite</title>
        <meta
          name="description"
          content="Live matches, expected lineups, win probabilities and timeline predictions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Loader isLoading={loading} />

      {!loading && (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--dc-background)' }}>
          {/*Persistent Sidebar Navigation*/}
          <SideNav />

          {/*Main Matches Content*/}
          <MatchesContent 
            matches={matches} 
            liveMatches={liveMatches} 
            finishedMatches={finishedMatches}
            standings={standings}
            topScorers={topScorers}
            loading={matchesLoading} 
            error={matchesError} 
          />

          {/*Mobile Bottom Navigation*/}
          <BottomNav />
        </div>
      )}
    </>
  );
}
