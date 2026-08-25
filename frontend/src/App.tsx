import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [apiStatus, setApiStatus] = useState('Checking connection')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:5000'}/health`)
      .then((response) => setApiStatus(response.ok ? 'Connected to care services' : 'Service unavailable'))
      .catch(() => setApiStatus('Offline mode'))
  }, [])

  const appointments = [
    { doctor: 'Dr. Anika Rao', specialty: 'Cardiology', date: 'Tomorrow, 10:30 AM', mode: 'Video visit', tone: 'rose' },
    { doctor: 'Dr. Michael Chen', specialty: 'Dermatology', date: 'Thursday, 2:00 PM', mode: 'In clinic', tone: 'sage' },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">✚</span><span>MediCare <em>Connect</em></span></div>
        <div className="profile"><div className="avatar">JM</div><div><strong>Jordan Miller</strong><small>Patient account</small></div></div>
        <nav><a className="active" href="#overview">⌂ <span>Overview</span></a><a href="#appointments">◷ <span>Appointments</span><b>2</b></a><a href="#doctors">⌕ <span>Find a doctor</span></a><a href="#records">▣ <span>Health records</span></a><a href="#messages">◌ <span>Messages</span><b>3</b></a></nav>
        <div className="sidebar-bottom"><a href="#settings">⚙ <span>Settings</span></a><a href="#help">? <span>Help center</span></a></div>
      </aside>
      <main className="main-content">
        <header><div><p className="eyebrow">Tuesday, August 25, 2026</p><h1>Good morning, Jordan <span>✦</span></h1></div><button className="notification" aria-label="Notifications">♢<i /></button></header>
        <section className="welcome-band"><div><p className="eyebrow">YOUR CARE PLAN</p><h2>Health is a journey.<br /><strong>We are with you.</strong></h2><p className="muted">Stay ahead of your care with appointments, records, and trusted specialists in one place.</p><button className="primary">Find a specialist <span>→</span></button></div><div className="sun-card"><span>✚</span><small>Care continuity</small><strong>86%</strong><p>of your care plan is on track</p><div className="progress"><i /></div></div></section>
        <div className="status-line"><span className="status-dot" /> {apiStatus}<span className="status-copy">Your information is encrypted and private</span></div>
        <section className="content-grid"><div className="section-block" id="appointments"><div className="section-heading"><div><p className="eyebrow">YOUR SCHEDULE</p><h2>Upcoming appointments</h2></div><a href="#all">View all →</a></div><div className="appointment-list">{appointments.filter((item) => item.doctor.toLowerCase().includes(search.toLowerCase())).map((appointment) => <article className={`appointment ${appointment.tone}`} key={appointment.doctor}><div className="doctor-avatar">{appointment.doctor.split(' ').slice(1).map((name) => name[0]).join('')}</div><div className="appointment-info"><strong>{appointment.doctor}</strong><span>{appointment.specialty}</span><small>{appointment.date} · {appointment.mode}</small></div><button className="more" aria-label={`More options for ${appointment.doctor}`}>•••</button></article>)}</div></div><aside className="quick-panel"><div className="section-heading"><div><p className="eyebrow">DISCOVER</p><h2>Find your care</h2></div></div><label className="search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search doctors or specialties" /></label><div className="specialties"><button>Heart health <span>↗</span></button><button>Skin & wellness <span>↗</span></button><button>General care <span>↗</span></button></div></aside></section>
      </main>
    </div>
  )
}

export default App
