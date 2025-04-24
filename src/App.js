import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>King's Online Learning Platform (KOLP)</h1>
          <nav>
            <Link to="/">Home</Link> |{' '}
            <Link to="/login">Login</Link> |{' '}
            <Link to="/register">Register</Link> |{' '}
            <Link to="/student-dashboard">Student</Link> |{' '}
            <Link to="/instructor-dashboard">Instructor</Link> |{' '}
            <Link to="/admin-dashboard">Admin</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>

        <footer>
          <p>&copy; 2025 King's Institution</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
