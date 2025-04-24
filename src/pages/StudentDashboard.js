import React from 'react';

const StudentDashboard = () => {
  const courses = [
    {
      id: 1,
      title: 'Software Engineering',
      instructor: 'Dr. Pooja Sinha',
      progress: 80,
      resources: ['project_guidelines.pdf', 'week3_notes.pdf'],
      video: 'https://www.youtube.com/embed/VqCkCDFLSsc'
    },
    {
      id: 2,
      title: 'Artificial Intelligence',
      instructor: 'Prof. Manish Batra',
      progress: 55,
      resources: ['ai_syllabus.pdf', 'lab1_dataset.zip'],
      video: 'https://www.youtube.com/embed/2ePf9rue1Ao'
    }
  ];

  const tasks = [
    { date: 'April 12', course: 'AI', type: 'Quiz 2', status: 'Upcoming' },
    { date: 'April 15', course: 'Software Engineering', type: 'Assignment 3', status: 'Upcoming' }
  ];

  const announcements = [
    '📢 Grades released for Assignment 2',
    '📢 New lecture uploaded for AI',
    '📢 Live session with SE mentor on Friday'
  ];

  const pendingAssignments = 2;
  const totalCourses = courses.length;
  const avgProgress = Math.floor(
    courses.reduce((acc, c) => acc + c.progress, 0) / totalCourses
  );

  return (
    <div className="page">
      <h2>🎓 Welcome to Your Dashboard</h2>

      {/* === Top Summary Cards === */}
      <section style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <div style={cardStyle}>📚 <strong>{totalCourses}</strong> Courses</div>
        <div style={cardStyle}>📝 <strong>{pendingAssignments}</strong> Assignments Due</div>
        <div style={cardStyle}>🎯 Avg. Progress: <strong>{avgProgress}%</strong></div>
      </section>

      {/* === Courses === */}
      <section style={{ marginTop: '40px' }}>
        <h3>📘 My Courses</h3>
        <div style={{ display: 'grid', gap: '25px' }}>
          {courses.map((course) => (
            <div key={course.id} style={courseCardStyle}>
              <h4>{course.title}</h4>
              <p><strong>Instructor:</strong> {course.instructor}</p>

              <div style={{ marginTop: '10px' }}>
                <label>Progress</label>
                <div style={{ background: '#222', borderRadius: '10px', height: '10px', marginTop: '5px' }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', background: '#00ffcc' }} />
                </div>
                <small>{course.progress}% complete</small>
              </div>

              <div style={{ marginTop: '15px' }}>
                <strong>📁 Materials:</strong>
                <ul>
                  {course.resources.map((file, i) => (
                    <li key={i}><a href={`/${file}`} download>{file}</a></li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '15px' }}>
                <strong>🎥 Lecture Preview</strong>
                <iframe
                  width="100%" height="220" src={course.video}
                  title={course.title} allowFullScreen
                  style={{ borderRadius: '10px', border: 'none', marginTop: '10px' }}
                />
              </div>

              <div style={{ marginTop: '15px' }}>
                <button style={actionBtn}>Join Zoom</button>
                <button style={actionBtn}>Submit Assignment</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === Timeline === */}
      <section style={{ marginTop: '50px' }}>
        <h3>⏳ Timeline</h3>
        <ul>
          {tasks.map((item, idx) => (
            <li key={idx}>
              <strong>{item.date}</strong>: {item.type} in <em>{item.course}</em> – <span style={{ color: '#ffcc00' }}>{item.status}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* === Notifications === */}
      <section style={{ marginTop: '40px' }}>
        <h3>🔔 Announcements</h3>
        <ul>
          {announcements.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

// 🎨 Reusable Styles
const cardStyle = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '12px',
  padding: '20px',
  minWidth: '180px',
  textAlign: 'center',
  fontSize: '1.1rem'
};

const courseCardStyle = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '15px',
  padding: '20px',
  boxShadow: '0 0 20px rgba(0,0,0,0.2)'
};

const actionBtn = {
  marginRight: '10px',
  padding: '8px 16px',
  backgroundColor: '#00bcd4',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default StudentDashboard;
