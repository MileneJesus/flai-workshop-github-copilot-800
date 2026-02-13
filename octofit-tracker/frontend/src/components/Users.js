import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
      console.log('Fetching users from:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Users data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="page-card loading-container">
          <div className="text-center">
            <div className="spinner-border text-primary loading-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading users...</p>
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
            <h4 className="alert-heading">Error Loading Users</h4>
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
          <h2 className="section-header mb-0">Users</h2>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>Add User
          </button>
        </div>
        <div className="table-responsive table-container">
          <table className="table table-hover table-bordered mb-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
                <th scope="col">Date Joined</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <p className="text-muted mb-0">No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td><span className="badge bg-secondary">{user.id}</span></td>
                    <td><strong>{user.username}</strong></td>
                    <td>{user.email || <span className="text-muted">N/A</span>}</td>
                    <td>
                      {user.team ? (
                        <span className="badge bg-info">{user.team}</span>
                      ) : (
                        <span className="badge bg-light text-dark">No Team</span>
                      )}
                    </td>
                    <td>{new Date(user.date_joined).toLocaleDateString()}</td>
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
          <small>Total Users: <strong>{users.length}</strong></small>
        </div>
      </div>
    </div>
  );
}

export default Users;
