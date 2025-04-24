import React from 'react';

const Home = () => {
  const features = [
    { icon: '🌍', title: 'Access Anywhere', desc: 'Learn anytime, from any device, globally.' },
    { icon: '👨‍🏫', title: 'Expert Instructors', desc: 'Courses by certified professors and industry experts.' },
    { icon: '📊', title: 'Track Progress', desc: 'Real-time dashboard with grades, deadlines, and more.' },
    { icon: '🏅', title: 'Certifications', desc: 'Receive printable certificates upon completion.' }
  ];

  const testimonials = [
    {
      name: 'Aarav Mehta',
      quote: 'KOLP completely changed the way I learn. Everything is organized and easy to follow!',
      role: '3rd Year CS Student'
    },
    {
      name: 'Dr. Nisha Bansal',
      quote: 'As an instructor, the course tools and student tracking features are unmatched.',
      role: 'Professor of AI & Data Science'
    }
  ];

  const announcements = [
    '🚀 New course launched: Blockchain for Beginners',
    '📢 Maintenance scheduled on April 15th, 10PM - 2AM',
    '🎓 Convocation webinar registration now open'
  ];

  return (
    <div className="page">
      {/* Hero */}
      <section style={heroStyle}>
        <h1>Welcome to KOLP</h1>
        <p>Your personalized digital campus for next-generation learning.</p>
        <div style={{ marginTop: '20px' }}>
          <a href="/register"><button style={btnPrimary}>Explore Courses</button></a>
          <a href="/login"><button style={btnSecondary}>Login</button></a>
        </div>
      </section>

      {/* Highlights */}
      <section style={{ marginTop: '60px' }}>
        <h2 style={center}>✨ Why Choose KOLP?</h2>
        <div style={grid}>
          {features.map((f, i) => (
            <div key={i} style={card}>
              <h2 style={{ fontSize: '2rem' }}>{f.icon}</h2>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ marginTop: '60px' }}>
        <h2 style={center}>💬 What People Are Saying</h2>
        <div style={grid}>
          {testimonials.map((t, i) => (
            <div key={i} style={testimonialCard}>
              <p>“{t.quote}”</p>
              <p style={{ fontWeight: 'bold', marginTop: '10px' }}>{t.name}</p>
              <small>{t.role}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section style={{ marginTop: '60px' }}>
        <h2 style={center}>🗞 Latest Announcements</h2>
        <ul>
          {announcements.map((a, i) => (
            <li key={i} style={{ margin: '10px 0' }}>{a}</li>
          ))}
        </ul>
      </section>

      {/* Video */}
      <section style={{ marginTop: '60px' }}>
        <h2 style={center}>🎥 Get Started in 60 Seconds</h2>
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/VqCkCDFLSsc"
            title="KOLP Intro Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

// 🎨 Styling
const heroStyle = {
  textAlign: 'center',
  padding: '80px 20px',
  background: 'linear-gradient(135deg, #1f1c2c, #928dab)',
  borderRadius: '12px',
  color: 'white'
};

const btnPrimary = {
  background: '#00bcd4',
  border: 'none',
  padding: '12px 24px',
  color: 'white',
  fontWeight: 'bold',
  marginRight: '10px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const btnSecondary = {
  ...btnPrimary,
  background: '#607d8b'
};

const card = {
  background: 'rgba(255,255,255,0.05)',
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 0 20px rgba(0,0,0,0.15)'
};

const testimonialCard = {
  ...card,
  fontStyle: 'italic'
};

const center = {
  textAlign: 'center',
  marginBottom: '20px'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '25px',
  marginTop: '30px'
};

export default Home;
