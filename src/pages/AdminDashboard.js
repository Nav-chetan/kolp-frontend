// Full Advanced Admin Dashboard with retained features and MongoDB integration
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [emailForm, setEmailForm] = useState({ subject: '', message: '', recipients: '' });
  const [studentForm, setStudentForm] = useState({ name: '', email: '', course: '' });
  const [instructorForm, setInstructorForm] = useState({ name: '', email: '', department: '' });
  const timetable = [
    { day: 'Monday', subject: 'Web Development', time: '10:00 - 12:00' },
    { day: 'Wednesday', subject: 'Database Systems', time: '14:00 - 16:00' },
    { day: 'Friday', subject: 'AI & ML', time: '09:00 - 11:00' }
  ];
  const [dropoutRate] = useState(6.5);
  const [courseList, setCourseList] = useState(['BSc IT', 'BSc CS', 'MBA', 'MSc AI']);
  const [logs, setLogs] = useState([]);

  const saveLog = async (action) => {
    const log = {
      action,
      user: 'admin@kolp.edu',
      time: new Date().toLocaleTimeString()
    };
    setLogs(prev => [...prev, log]);
    await fetch('http://localhost:5000/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    alert(`Email Sent to ${emailForm.recipients} with subject "${emailForm.subject}"`);
    setEmailForm({ subject: '', message: '', recipients: '' });
    await saveLog('Sent Email');
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentForm),
      });
      alert(`Student Added: ${studentForm.name}`);
      setStudentForm({ name: '', email: '', course: '' });
      await saveLog('Added Student');
    } catch (error) {
      alert('Failed to add student');
    }
  };

  const handleInstructorSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/instructors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(instructorForm),
      });
      alert(`Instructor Added: ${instructorForm.name}`);
      setInstructorForm({ name: '', email: '', department: '' });
      await saveLog('Added Instructor');
    } catch (error) {
      alert('Failed to add instructor');
    }
  };

  const handleAddCourse = () => {
    const newCourse = prompt('Enter new course name:');
    if (newCourse) setCourseList([...courseList, newCourse]);
  };

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      { label: 'Logins', data: [150, 200, 175, 220], backgroundColor: '#3b82f6' },
      { label: 'Submissions', data: [100, 130, 110, 160], backgroundColor: '#10b981' }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: theme === 'light' ? '#111' : '#f9fafb' } },
      title: { display: true, text: 'Weekly Student Activity', color: theme === 'light' ? '#111' : '#f9fafb' }
    },
    scales: {
      x: { ticks: { color: theme === 'light' ? '#111' : '#f9fafb' } },
      y: { ticks: { color: theme === 'light' ? '#111' : '#f9fafb' } }
    }
  };

  const inputStyle = {
    padding: '10px',
    margin: '6px 0',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: theme === 'light' ? '#fff' : '#1f2937',
    color: theme === 'light' ? '#000' : '#fff'
  };

  const themeStyles = theme === 'light' ? { background: '#ffffff', color: '#111' } : { background: '#111827', color: '#f9fafb' };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', ...themeStyles }}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={{ float: 'right' }}>Toggle Theme</button>
      <h1>Welcome, <span style={{ fontWeight: '600' }}>Super Admin</span></h1>

      <nav style={{ marginTop: '20px', marginBottom: '20px' }}>
        {['dashboard', 'email', 'add-student', 'add-instructor', 'timetable', 'dropout', 'courses', 'logs'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ marginRight: '8px' }}>{tab.replace('-', ' ').toUpperCase()}</button>
        ))}
      </nav>

      {activeTab === 'dashboard' && (
        <section>
          <h2>📊 Visual Analytics Dashboard</h2>
          <Bar data={chartData} options={chartOptions} />
        </section>
      )}

      {activeTab === 'email' && (
        <section>
          <h2>📧 Mass Email System</h2>
          <form onSubmit={handleEmailSubmit}>
            <input type="text" style={inputStyle} value={emailForm.recipients} onChange={e => setEmailForm({ ...emailForm, recipients: e.target.value })} placeholder="Recipients" />
            <input type="text" style={inputStyle} value={emailForm.subject} onChange={e => setEmailForm({ ...emailForm, subject: e.target.value })} placeholder="Subject" />
            <textarea style={inputStyle} value={emailForm.message} onChange={e => setEmailForm({ ...emailForm, message: e.target.value })} placeholder="Message" />
            <button type="submit">Send Email</button>
          </form>
        </section>
      )}

      {activeTab === 'add-student' && (
        <section>
          <h2>➕ Add Student</h2>
          <form onSubmit={handleStudentSubmit}>
            <input placeholder="Full Name" style={inputStyle} value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} />
            <input placeholder="Email" style={inputStyle} value={studentForm.email} onChange={e => setStudentForm({ ...studentForm, email: e.target.value })} />
            <input placeholder="Course" style={inputStyle} value={studentForm.course} onChange={e => setStudentForm({ ...studentForm, course: e.target.value })} />
            <button type="submit">Add Student</button>
          </form>
        </section>
      )}

      {activeTab === 'add-instructor' && (
        <section>
          <h2>👨‍🏫 Add Instructor</h2>
          <form onSubmit={handleInstructorSubmit}>
            <input placeholder="Full Name" style={inputStyle} value={instructorForm.name} onChange={e => setInstructorForm({ ...instructorForm, name: e.target.value })} />
            <input placeholder="Email" style={inputStyle} value={instructorForm.email} onChange={e => setInstructorForm({ ...instructorForm, email: e.target.value })} />
            <input placeholder="Department" style={inputStyle} value={instructorForm.department} onChange={e => setInstructorForm({ ...instructorForm, department: e.target.value })} />
            <button type="submit">Add Instructor</button>
          </form>
        </section>
      )}

      {activeTab === 'timetable' && (
        <section>
          <h2>📅 Weekly Timetable</h2>
          <ul>
            {timetable.map((item, index) => (
              <li key={index}>{item.day}: {item.subject} - {item.time}</li>
            ))}
          </ul>
        </section>
      )}

      {activeTab === 'dropout' && (
        <section>
          <h2>📉 AI Predicted Dropouts</h2>
          <p>Predicted dropout rate: <strong>{dropoutRate}%</strong></p>
        </section>
      )}

      {activeTab === 'courses' && (
        <section>
          <h2>📚 Course Management</h2>
          <button onClick={handleAddCourse}>Add Course</button>
          <ul>
            {courseList.map((course, i) => <li key={i}>{course}</li>)}
          </ul>
        </section>
      )}

      {activeTab === 'logs' && (
        <section>
          <h2>📜 Activity Logs</h2>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log.time} - {log.action} by {log.user}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
