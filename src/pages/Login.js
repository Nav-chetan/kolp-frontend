import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === formData.email && u.password === formData.password);

    if (user) {
      alert(`Welcome back, ${user.name} (${user.role})`);
      if (user.role === 'student') navigate('/student-dashboard');
      if (user.role === 'instructor') navigate('/instructor-dashboard');
      if (user.role === 'admin') navigate('/admin-dashboard');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required /><br /><br />
        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
