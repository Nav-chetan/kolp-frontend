// InstructorDashboard.js — Full Version with Upload and Grid View Resource Display
import React, { useState, useEffect } from 'react';

const InstructorDashboard = () => {
  const assignments = [
    { title: 'Individual Progress Report', value: '20%', due: '13th April 2025 23:59', type: 'Biweekly activities', status: 'Pending' },
    { title: 'Group Assignment', value: '35%', due: '30th April 2025 23:59', type: 'Group project report', status: 'Submitted' },
    { title: 'Group Report', value: '25%', due: '15th May 2025 23:59', type: 'Research submission', status: 'Pending' }
  ];

  const upcomingAnnouncements = [
    { date: '2025-04-20T09:00', message: 'Week 7 content available now!' },
    { date: '2025-04-22T15:30', message: 'Midterm exam details will be shared.' }
  ];

  const students = [
    { name: 'Alice Johnson', attendance: 92, submissions: '✅', grade: 85, feedback: 'Excellent participation', late: false },
    { name: 'Bob Singh', attendance: 75, submissions: '❌', grade: 68, feedback: 'Needs improvement on deadlines', late: true },
    { name: 'Cathy Lee', attendance: 87, submissions: '✅', grade: 91, feedback: 'Top performer', late: false },
    { name: 'David Wu', attendance: 55, submissions: '❌', grade: 45, feedback: 'Struggling - schedule intervention', late: true }
  ];

  const [sortBy, setSortBy] = useState('name');
  const [scheduledMsg, setScheduledMsg] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [message, setMessage] = useState('');
  const [weeklyResources, setWeeklyResources] = useState({});
  const [uploadingWeek, setUploadingWeek] = useState('');
  const [uploadingFile, setUploadingFile] = useState(null);
  const [uploadedResources, setUploadedResources] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/instructor/resources')
      .then(res => res.json())
      .then(setUploadedResources);
  }, []);

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'grade') return b.grade - a.grade;
    if (sortBy === 'attendance') return b.attendance - a.attendance;
    return 0;
  });

  const handleScheduleAnnouncement = () => {
    if (scheduledMsg && scheduleTime) {
      alert(`🕒 Announcement scheduled for ${scheduleTime}: "${scheduledMsg}"`);
      setScheduledMsg('');
      setScheduleTime('');
    }
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Attendance', 'Submitted', 'Grade', 'Late', 'Feedback'],
      ...students.map(s => [s.name, `${s.attendance}%`, s.submissions, s.grade, s.late ? 'Yes' : 'No', s.feedback])
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_performance.csv';
    a.click();
  };

  const handleBroadcastMessage = () => {
    if (message.trim()) {
      alert(`📢 Broadcast sent: "${message}"`);
      setMessage('');
    }
  };

  const handleUploadToDB = async () => {
    if (!uploadingWeek || !uploadingFile) return alert('Please provide both week and file.');
    const formData = new FormData();
    formData.append('week', uploadingWeek);
    formData.append('file', uploadingFile);
    try {
      await fetch('http://localhost:5000/api/instructor/resources', {
        method: 'POST',
        body: formData
      });
      alert(`✅ Resource for ${uploadingWeek} uploaded to DB.`);
      setUploadingWeek('');
      setUploadingFile(null);
      const response = await fetch('http://localhost:5000/api/instructor/resources');
      const data = await response.json();
      setUploadedResources(data);
    } catch (err) {
      alert('❌ Upload failed.');
    }
  };

  const handleWeeklyUpload = (week, file) => {
    if (file) {
      const uploaded = { name: file.name, url: URL.createObjectURL(file) };
      setWeeklyResources(prev => ({ ...prev, [week]: uploaded }));
      alert(`📁 ${week} resource uploaded: ${file.name}`);
    } else {
      alert('❗ Please select a file.');
    }
  };

  const handleDelete = (week) => {
    setWeeklyResources(prev => {
      const updated = { ...prev };
      delete updated[week];
      return updated;
    });
  };

  const weeks = ['Week 4', 'Week 5', 'Week 6'];

  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '260px', background: '#121212', color: '#f4f4f4', padding: '20px', height: '100vh', overflowY: 'auto' }}>
        <h3>Welcome to ICT272</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="#announcements" style={{ color: '#fff' }}>📢 Announcements</a></li>
          <li><a href="#login" style={{ color: '#fff' }}>🔑 How to login to MS Teams</a></li>
          <li><a href="#ai-policy" style={{ color: '#fff' }}>📑 Assessments and AI Policy</a></li>
          <li><a href="#assignments" style={{ color: '#fff' }}>📝 Assignments</a></li>
          <li><a href="#resources" style={{ color: '#fff' }}>📚 Resources</a></li>
        </ul>
        <h4 style={{ marginTop: '20px' }}>📄 Assignments</h4>
        <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
          {assignments.map((a, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>📘 <a href={`#assignment-${idx}`} style={{ color: '#00bfff' }}>{a.title}</a> — <span style={{ color: a.status === 'Pending' ? 'orange' : 'lightgreen' }}>{a.status}</span></li>
          ))}
        </ul>
      </aside>

      <main style={{ flex: 1, padding: '30px', background: '#1e1e2f', color: '#ffffff' }}>
        <section>
          <h3>🗓️ Upcoming Announcements</h3>
          <ul>
            {upcomingAnnouncements.map((a, i) => (
              <li key={i}>📌 {new Date(a.date).toLocaleString()} — {a.message}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>📋 Student Performance Overview</h3>
          <label>Sort by: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="attendance">Attendance</option>
            <option value="grade">Grade</option>
          </select>
          <table style={{ width: '100%', marginTop: '10px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Attendance</th>
                <th>Submissions</th>
                <th>Grade</th>
                <th>Late</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((s, index) => (
                <tr key={index}>
                  <td>{s.name}</td>
                  <td>{s.attendance}%</td>
                  <td>{s.submissions}</td>
                  <td>{s.grade}</td>
                  <td>{s.late ? 'Yes' : 'No'}</td>
                  <td>{s.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleExport}>⬇️ Export CSV</button>
        </section>

        <section>
          <h3>📢 Send Broadcast Message</h3>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." rows={4} style={{ width: '100%', marginBottom: '10px' }} />
          <button onClick={handleBroadcastMessage}>Send</button>
        </section>

        <section>
          <h3>📅 Schedule Announcement</h3>
          <input type="text" placeholder="Announcement message" value={scheduledMsg} onChange={(e) => setScheduledMsg(e.target.value)} style={{ width: '60%' }} />
          <input type="datetime-local" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} style={{ marginLeft: '10px' }} />
          <button onClick={handleScheduleAnnouncement} style={{ marginLeft: '10px' }}>Schedule</button>
        </section>

        <section>
          <h3>📂 Upload Weekly Resources (Local Preview)</h3>
          {weeks.map((week) => (
            <div key={week} style={{ marginBottom: '10px' }}>
              <strong>{week}:</strong>
              <input type="file" onChange={(e) => handleWeeklyUpload(week, e.target.files[0])} style={{ marginLeft: '10px' }} />
              {weeklyResources[week] && (
                <>
                  <a href={weeklyResources[week].url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', color: '#00ffcc' }}>{weeklyResources[week].name}</a>
                  <button onClick={() => handleDelete(week)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>Delete</button>
                </>
              )}
            </div>
          ))}
        </section>

        <section>
          <h3>🌐 Upload Resource to Database</h3>
          <input type="text" placeholder="Enter Week (e.g. Week 7)" value={uploadingWeek} onChange={(e) => setUploadingWeek(e.target.value)} style={{ marginBottom: '10px', marginRight: '10px' }} />
          <input type="file" onChange={(e) => setUploadingFile(e.target.files[0])} style={{ marginBottom: '10px' }} />
          <button onClick={handleUploadToDB}>Upload to DB</button>
        </section>

        <section>
          <h3>📥 View Uploaded Resources (from DB)</h3>
          {uploadedResources.length === 0 ? (
            <p>No resources uploaded yet.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '10px' }}>
              {uploadedResources.map((res, index) => (
                <div key={index} style={{ background: '#2a2a40', padding: '16px', borderRadius: '10px', border: '1px solid #444' }}>
                  <h4 style={{ margin: '0 0 10px' }}>{res.week}</h4>
                  <p style={{ fontSize: '0.9em', color: '#ccc' }}>📄 {res.filename}</p>
                  <p style={{ fontSize: '0.8em', color: '#888' }}>{new Date(res.uploadedAt).toLocaleString()}</p>
                  <a href={`http://localhost:5000/${res.path.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#00ffff', fontWeight: 'bold', textDecoration: 'underline' }}>
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default InstructorDashboard;
