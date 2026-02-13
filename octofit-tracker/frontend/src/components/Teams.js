import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
      console.log('Fetching teams from:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="page-card loading-container">
          <div className="text-center">
            <div className="spinner-border text-primary loading-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading teams...</p>
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
            <h4 className="alert-heading">Error Loading Teams</h4>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="page-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-header mb-0">Teams</h2>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>Create Team
          </button>
        </div>
        <div className="table-responsive table-container">
          <table className="table table-hover table-bordered mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Team Name</th>
                <th scope="col">Description</th>
                <th scope="col">Created Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <p className="text-muted mb-0">No teams found</p>
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team.id}>
                    <td><span className="badge bg-secondary">{team.id}</span></td>
                    <td><strong>{team.name}</strong></td>
                    <td>{team.description || <span className="text-muted">N/A</span>}</td>
                    <td>{new Date(team.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button className="btn btn-outline-primary" title="View">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-success" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-muted">
          <small>Total Teams: <strong>{teams.length}</strong></small>
        </div>
      </div>
    </div>
  );
}

export default Teams;
