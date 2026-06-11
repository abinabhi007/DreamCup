import { useState, useEffect } from 'react';
import styles from './AdminContent.module.scss';
import { getPlayers } from '../../src/services/playerService';
import { updatePlayerPoints, recalculateTeamPoints } from '../../src/services/adminService';
import toast from 'react-hot-toast';

export default function AdminContent() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [pointsToAdd, setPointsToAdd] = useState('');
  const [loadingPoints, setLoadingPoints] = useState(false);
  const [loadingRecalc, setLoadingRecalc] = useState(false);

  useEffect(() => {
    // Load all players so the admin can search/select from a dropdown
    const loadPlayers = async () => {
      try {
        const data = await getPlayers({ limit: 500 });
        if (data && data.players) {
          // Sort players alphabetically by name for easier selection
          const sorted = data.players.sort((a, b) => a.name.localeCompare(b.name));
          setPlayers(sorted);
        }
      } catch (err) {
        console.error('Failed to load players for admin panel', err);
      }
    };
    loadPlayers();
  }, []);

  const handleUpdatePoints = async (e) => {
    e.preventDefault();
    if (!selectedPlayerId || !pointsToAdd) {
      toast.error('Please select a player and enter points');
      return;
    }

    const token = localStorage.getItem('token');
    setLoadingPoints(true);
    const toastId = toast.loading('Updating player points...');
    try {
      const res = await updatePlayerPoints(selectedPlayerId, pointsToAdd, token);
      if (res && res.success) {
        toast.success(`Successfully added ${pointsToAdd} points!`, { id: toastId });
        setPointsToAdd('');
      } else {
        toast.error(res.message || 'Failed to update points', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error updating points', { id: toastId });
    } finally {
      setLoadingPoints(false);
    }
  };

  const handleRecalculate = async () => {
    const confirmRecalc = window.confirm('Are you sure you want to recalculate points for ALL fantasy teams? This may take a moment.');
    if (!confirmRecalc) return;

    const token = localStorage.getItem('token');
    setLoadingRecalc(true);
    const toastId = toast.loading('Recalculating global team points...');
    try {
      const res = await recalculateTeamPoints(token);
      if (res && res.success) {
        toast.success(res.message || 'Teams recalculated successfully!', { id: toastId });
      } else {
        toast.error(res.message || 'Failed to recalculate teams', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error recalculating teams', { id: toastId });
    } finally {
      setLoadingRecalc(false);
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.headerSection}>
        <h2 className={styles.pageTitle}>Admin Console</h2>
        <p className={styles.pageSubtitle}>Manage player points and trigger global calculations.</p>
      </div>

      <div className={styles.cardGrid}>
        
        {/* Update Player Points Card */}
        <div className={styles.adminCard}>
          <h3 className={styles.cardTitle}>
            <span className="material-symbols-outlined">sports_score</span>
            Update Player Points
          </h3>
          <p className={styles.cardDesc}>
            Add (or subtract) points for a specific player based on their real-world match performance.
          </p>

          <form onSubmit={handleUpdatePoints}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Select Player</label>
              <select 
                className={styles.formSelect}
                value={selectedPlayerId}
                onChange={(e) => setSelectedPlayerId(e.target.value)}
              >
                <option value="">-- Choose a Player --</option>
                {players.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.name} ({p.team} - {p.position})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Points to Add</label>
              <input 
                type="number"
                className={styles.formInput}
                placeholder="e.g. 5 (use negative to subtract)"
                value={pointsToAdd}
                onChange={(e) => setPointsToAdd(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={loadingPoints}
            >
              <span className="material-symbols-outlined">add_circle</span>
              {loadingPoints ? 'Updating...' : 'Update Points'}
            </button>
          </form>
        </div>

        {/* Recalculate Teams Card */}
        <div className={styles.adminCard}>
          <h3 className={styles.cardTitle}>
            <span className="material-symbols-outlined">sync</span>
            Recalculate All Team Points
          </h3>
          <p className={styles.cardDesc}>
            After updating player points, run this global job to recalculate the total points for every user's fantasy team. This will factor in Captain (2x) and Vice-Captain (1.5x) multipliers.
          </p>

          <button 
            className={styles.warningBtn}
            onClick={handleRecalculate}
            disabled={loadingRecalc}
          >
            <span className="material-symbols-outlined">bolt</span>
            {loadingRecalc ? 'Recalculating...' : 'Trigger Recalculation'}
          </button>
        </div>

      </div>
    </div>
  );
}
