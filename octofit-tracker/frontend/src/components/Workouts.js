import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
      console.log('Fetching workouts from:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="page-card loading-container">
          <div className="text-center">
            <div className="spinner-border text-primary loading-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading workouts...</p>
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
            <h4 className="alert-heading">Error Loading Workouts</h4>
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
          <h2 className="section-header mb-0">Workouts</h2>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>Add Workout
          </button>
        </div>
        <div className="table-responsive table-container">
          <table className="table table-hover table-bordered mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    <p className="text-muted mb-0">No workouts found</p>
                  </td>
                </tr>
              ) : (
                workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td><span className="badge bg-secondary">{workout.id}</span></td>
                    <td><strong>{workout.name}</strong></td>
                    <td>{workout.description || <span className="text-muted">N/A</span>}</td>
                    <td><span className="badge bg-info">{workout.category || 'N/A'}</span></td>
                    <td>{workout.duration || 0}</td>
                    <td>
                      {workout.difficulty === 'Easy' && <span className="badge bg-success">{workout.difficulty}</span>}
                      {workout.difficulty === 'Medium' && <span className="badge bg-warning text-dark">{workout.difficulty}</span>}
                      {workout.difficulty === 'Hard' && <span className="badge bg-danger">{workout.difficulty}</span>}
                      {!workout.difficulty && <span className="text-muted">N/A</span>}
                    </td>
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
          <small>Total Workouts: <strong>{workouts.length}</strong></small>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
