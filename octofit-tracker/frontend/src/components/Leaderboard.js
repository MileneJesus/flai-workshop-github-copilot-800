import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
      console.log('Fetching leaderboard from:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="page-card loading-container">
          <div className="text-center">
            <div className="spinner-border text-primary loading-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading leaderboard...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="page-card error-container">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error Loading Leaderboard</h4>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="badge bg-warning text-dark">🥇 {rank}</span>;
    if (rank === 2) return <span className="badge bg-secondary">🥈 {rank}</span>;
    if (rank === 3) return <span className="badge" style={{backgroundColor: '#CD7F32', color: 'white'}}>🥉 {rank}</span>;
    return <span className="badge bg-primary">{rank}</span>;
  };

  return (
    <div className="container mt-4">
      <div className="page-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-header mb-0">🏆 Leaderboard</h2>
          <button className="btn btn-outline-primary">
            <i className="bi bi-arrow-clockwise me-2"></i>Refresh
          </button>
        </div>
        <div className="table-responsive table-container">
          <table className="table table-hover table-bordered mb-0">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Total Points</th>
                <th scope="col">Total Distance (km)</th>
                <th scope="col">Total Calories</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <p className="text-muted mb-0">No leaderboard data found</p>
                  </td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={entry.id || index} className={index < 3 ? 'table-active' : ''}>
                    <td>{getRankBadge(index + 1)}</td>
                    <td><strong>{entry.user || entry.username || 'N/A'}</strong></td>
                    <td><span className="badge bg-info">{entry.total_points || 0}</span></td>
                    <td><span className="badge bg-success">{entry.total_distance || 0}</span></td>
                    <td><span className="badge bg-warning text-dark">{entry.total_calories || 0}</span></td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary" title="View Profile">
                        <i className="bi bi-person-circle"></i> Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-muted">
          <small>Total Participants: <strong>{leaderboard.length}</strong></small>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
