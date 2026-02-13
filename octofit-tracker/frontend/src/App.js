import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container mt-4">
      <div className="jumbotron bg-light p-5 rounded mb-4">
        <h1 className="display-4">Welcome to OctoFit Tracker!</h1>
        <p className="lead">Track your fitness activities, compete with teams, and achieve your goals.</p>
        <hr className="my-4" />
        <p>Use the navigation menu above to explore different sections of the app.</p>
        <Link to="/activities" className="btn btn-primary btn-lg me-2">
          <i className="bi bi-activity me-2"></i>Get Started
        </Link>
        <Link to="/leaderboard" className="btn btn-outline-primary btn-lg">
          <i className="bi bi-trophy me-2"></i>View Leaderboard
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-person-circle" style={{fontSize: '3rem', color: '#667eea'}}></i>
              </div>
              <h5 className="card-title">User Profiles</h5>
              <p className="card-text">Manage user accounts and track individual progress.</p>
              <Link to="/users" className="btn btn-outline-primary">
                View Users
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-people-fill" style={{fontSize: '3rem', color: '#667eea'}}></i>
              </div>
              <h5 className="card-title">Teams</h5>
              <p className="card-text">Create and manage teams for friendly competition.</p>
              <Link to="/teams" className="btn btn-outline-primary">
                View Teams
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-activity" style={{fontSize: '3rem', color: '#667eea'}}></i>
              </div>
              <h5 className="card-title">Activities</h5>
              <p className="card-text">Log and track all your fitness activities.</p>
              <Link to="/activities" className="btn btn-outline-primary">
                View Activities
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 text-center">
            <div className="card-body">
              <div className="mb-3">
                <i className="bi bi-clipboard-check" style={{fontSize: '3rem', color: '#667eea'}}></i>
              </div>
              <h5 className="card-title">Workouts</h5>
              <p className="card-text">Browse personalized workout suggestions.</p>
              <Link to="/workouts" className="btn btn-outline-primary">
                View Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"><i className="bi bi-trophy-fill me-2"></i>Competitive Features</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                Track your progress, compete with teammates, and climb the leaderboard! 
                Our comprehensive tracking system helps you stay motivated and achieve your fitness goals.
              </p>
              <Link to="/leaderboard" className="btn btn-primary">
                <i className="bi bi-bar-chart-fill me-2"></i>View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
