import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import './index.css'
import PrivacyPolicy from './PrivacyPolicy'
import DataDeletion from './DataDeletion'
import Terms from './Terms'
import Refund from './Refund'
import Enroll from './Enroll'

const PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=com.fluentedge.fluentedge'

function App() {
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const navLinks = document.querySelector('.nav-links');
      const mobileBtn = document.querySelector('.mobile-menu-btn');

      if (navLinks && mobileBtn && navLinks.classList.contains('nav-open')) {
        // Close if clicking outside the menu, or if clicking a link/button inside
        if ((!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) || e.target.closest('a')) {
          navLinks.classList.remove('nav-open');
        }
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="landing">
        {/* ── Navbar ──────────────────────────────────────────── */}
        <nav className="navbar">
          <div className="container nav-inner">
            <Link to="/" className="logo">
              <svg className="logo-icon" aria-label="FluentEdge Logo" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 82 100" fill="none">
                <title>FluentEdge Logo</title>
                <path d="M0.761078 27.6596C3.03055 8.65248 18.8462 0 27.7115 0H81.2576C81.2576 19.0071 68.2884 22.104 61.5508 23.0496C58.0129 23.5462 47.721 23.0496 42.7565 23.0496C37.7919 23.0496 31.1783 22.695 27.1536 24.8227C23.129 26.9504 23.6075 31.5603 23.6075 31.5603C23.6075 31.5603 23.9347 38.6525 29.2538 38.6525C11.878 41.1348 4.18899 55.6738 0.761078 63.1206V27.6596Z" fill="url(#pA)" />
                <path d="M1.42485 80.8511C5.84961 65.2482 21.4524 64.1844 31.0269 64.1844H44.8567C67.0376 64.1844 70.08 43.6853 69.3759 37.5887L28.8993 38.6525C20.9896 38.6525 4.88102 45.8744 0.885069 61.7021C0.175847 66.3121 0.579864 75.7862 1.42485 80.8511Z" fill="url(#pB)" />
                <path d="M0.746944 99.8556C11.5912 101.03 32.7259 95.5591 30.5109 64.286C18.6155 63.4752 -4.43414 66.6667 0.746944 99.8556Z" fill="url(#pC)" />
                <defs>
                  <linearGradient id="pA" x1="40.6" y1="0" x2="40.6" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#0077FF" /><stop offset="1" stopColor="#003470" /></linearGradient>
                  <linearGradient id="pB" x1="40.6" y1="0" x2="40.6" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#0079FF" /><stop offset="1" stopColor="#0058B8" /></linearGradient>
                  <linearGradient id="pC" x1="15.4" y1="64.2" x2="15.4" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#FE6201" /><stop offset="1" stopColor="#FF6200" /></linearGradient>
                </defs>
              </svg>
              <span className="logo-text">luent<span className="logo-accent">Edge</span></span>
            </Link>
            <div className="nav-links">
              <NavHashLink to="/#features">Features</NavHashLink>
              <NavHashLink to="/#programs">Programs</NavHashLink>
              <NavHashLink to="/#how-it-works">How It Works</NavHashLink>
              <Link to="/enroll" className="btn btn-outline btn-sm">
                Enroll Now
              </Link>
              <a href={PLAYSTORE_URL} className="btn btn-primary btn-sm" target="_blank" rel="noreferrer">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92ZM14.852 13.06l2.8 1.62-9.381 5.42 6.58-7.04ZM17.652 9.32l-2.8 1.62-6.58-7.04 9.38 5.42ZM19.158 10.19l2.39 1.38a1 1 0 0 1 0 1.74l-2.39 1.38-3.1-2.25 3.1-2.25Z" /></svg>
                Get the App
              </a>
            </div>

            <button className="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu" onClick={() => {
              document.querySelector('.nav-links').classList.toggle('nav-open')
            }}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<Refund />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>



        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="footer">
          <div className="container">
            <div className="footer-top">
              <div className="footer-brand">
                <Link to="/" className="logo">
                  <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="29" viewBox="0 0 82 100" fill="none"><path d="M0.761078 27.6596C3.03055 8.65248 18.8462 0 27.7115 0H81.2576C81.2576 19.0071 68.2884 22.104 61.5508 23.0496C58.0129 23.5462 47.721 23.0496 42.7565 23.0496C37.7919 23.0496 31.1783 22.695 27.1536 24.8227C23.129 26.9504 23.6075 31.5603 23.6075 31.5603C23.6075 31.5603 23.9347 38.6525 29.2538 38.6525C11.878 41.1348 4.18899 55.6738 0.761078 63.1206V27.6596Z" fill="url(#fA)" /><path d="M1.42485 80.8511C5.84961 65.2482 21.4524 64.1844 31.0269 64.1844H44.8567C67.0376 64.1844 70.08 43.6853 69.3759 37.5887L28.8993 38.6525C20.9896 38.6525 4.88102 45.8744 0.885069 61.7021C0.175847 66.3121 0.579864 75.7862 1.42485 80.8511Z" fill="url(#fB)" /><path d="M0.746944 99.8556C11.5912 101.03 32.7259 95.5591 30.5109 64.286C18.6155 63.4752 -4.43414 66.6667 0.746944 99.8556Z" fill="url(#fC)" /><defs><linearGradient id="fA" x1="40.6" y1="0" x2="40.6" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#0077FF" /><stop offset="1" stopColor="#003470" /></linearGradient><linearGradient id="fB" x1="40.6" y1="0" x2="40.6" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#0079FF" /><stop offset="1" stopColor="#0058B8" /></linearGradient><linearGradient id="fC" x1="15.4" y1="64.2" x2="15.4" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#FE6201" /><stop offset="1" stopColor="#FF6200" /></linearGradient></defs></svg>
                  <span className="logo-text">luent<span className="logo-accent">Edge</span></span>
                </Link>
                <p className="footer-tagline">Your English Learning Journey Starts Here.</p>
              </div>

              <div className="footer-support">
                <h4>Need Support?</h4>
                <p>For any issues or information, feel free to contact us.</p>
                <div className="footer-emails">
                  <a href="mailto:support@thefluentedge.in" className="support-email">
                    <div className="support-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div className="email-text">
                      <span className="email-label">Support</span>
                      <span>support@thefluentedge.in</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="footer-links-col">
                <h4>Legal & Info</h4>
                <nav className="footer-nav">
                  <NavHashLink to="/#features">Features</NavHashLink>
                  <NavHashLink to="/#programs">Programs</NavHashLink>
                  <NavHashLink to="/#how-it-works">How It Works</NavHashLink>
                  <Link to="/privacy">Privacy Policy</Link>
                  <Link to="/terms">Terms & Conditions</Link>
                  <Link to="/refund-policy">Refund & Cancellation</Link>
                  <Link to="/data-deletion">Data Deletion Request</Link>
                </nav>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} FluentEdge. All rights reserved.</p>
              <p className="footer-credit">
                Designed & Developed with <span className="heart">❤️</span> by <a href="https://hitechglobals.com" target="_blank" rel="noreferrer">HiTechGlobals</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

function LandingPage() {
  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container hero-grid">
          <div className="hero-text">
            <div className="badge">🚀 Your English Learning Journey Starts Here</div>
            <h1>Learn English the <span className="text-gradient">Smart Way</span></h1>
            <p className="hero-subtitle">
              FluentEdge is a premium mobile learning platform with live classes,
              interactive tasks, AI-powered speaking practice, and real-time progress tracking
              — all designed to make you fluent, faster.
            </p>
            <div className="hero-actions">
              <a href={PLAYSTORE_URL} className="btn btn-primary btn-lg" target="_blank" rel="noreferrer">
                <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92ZM14.852 13.06l2.8 1.62-9.381 5.42 6.58-7.04ZM17.652 9.32l-2.8 1.62-6.58-7.04 9.38 5.42ZM19.158 10.19l2.39 1.38a1 1 0 0 1 0 1.74l-2.39 1.38-3.1-2.25 3.1-2.25Z" /></svg>
                Download on Play Store
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>500+</strong><span>Active Learners</span></div>
              <div className="stat-divider"></div>
              <div className="stat"><strong>3</strong><span>Program Levels</span></div>
              <div className="stat-divider"></div>
              <div className="stat"><strong>4.8★</strong><span>User Rating</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-frame">
              <div className="phone-screen">
                <PhoneDashboard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section className="section section-alt" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Features</span>
            <h2>Everything You Need to <span className="text-gradient">Get Fluent</span></h2>
            <p>A comprehensive learning experience crafted to match your pace and style.</p>
          </div>

          <div className="features-grid">
            <FeatureCard
              icon="📚"
              title="Daily Content"
              desc="Word, Vocab & Sentence of the Day — learn something new every single morning."
              color="var(--color-primary)"
            />
            <FeatureCard
              icon="🎙️"
              title="Speaking Practice"
              desc="Record and submit speaking tasks to improve pronunciation and fluency."
              color="#E67E22"
            />
            <FeatureCard
              icon="📹"
              title="Live Classes"
              desc="Join scheduled live classes with your instructor for real-time interaction."
              color="var(--color-secondary)"
            />
            <FeatureCard
              icon="📝"
              title="Exams & Assessments"
              desc="Take timed exams, get graded instantly, and track your improvement."
              color="#7C3AED"
            />
            <FeatureCard
              icon="📊"
              title="Progress Analytics"
              desc="XP, streaks, attendance, and detailed performance dashboards at a glance."
              color="var(--color-primary)"
            />
            <FeatureCard
              icon="🏆"
              title="Certificates"
              desc="Earn a verified certificate upon completing your program successfully."
              color="#00A86B"
            />
          </div>
        </div>
      </section>

      {/* ── Programs ────────────────────────────────────────── */}
      <section className="section" id="programs">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Programs</span>
            <h2>Choose Your <span className="text-gradient">Level</span></h2>
            <p>Three structured programs designed for every stage of your English journey.</p>
          </div>

          <div className="programs-grid">
            <ProgramCard
              level="Beginner"
              icon="🚀"
              gradient="linear-gradient(135deg, #1A73E8, #2196F3)"
              features={['Basic grammar & vocabulary', 'Simple speaking tasks', 'Guided daily content', 'Foundation building']}
            />
            <ProgramCard
              level="Intermediate"
              icon="📈"
              gradient="linear-gradient(135deg, #00A86B, #4CAF50)"
              features={['Advanced grammar patterns', 'Conversation practice', 'Writing assignments', 'Exam preparation']}
              popular
            />
            <ProgramCard
              level="Advanced"
              icon="⭐"
              gradient="linear-gradient(135deg, #7C3AED, #AB47BC)"
              features={['Fluency-level exercises', 'Professional speaking', 'Complex writing tasks', 'Certification exam']}
            />
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────── */}
      <section className="section section-alt" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">How It Works</span>
            <h2>Start Learning in <span className="text-gradient">3 Steps</span></h2>
          </div>

          <div className="steps-grid">
            <StepCard number="1" title="Download the App" desc="Get FluentEdge from the Google Play Store and create your free account." />
            <StepCard number="2" title="Choose a Program" desc="Pick Beginner, Intermediate, or Advanced based on your current level." />
            <StepCard number="3" title="Start Learning" desc="Attend live classes, complete daily tasks, and watch yourself improve." />
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-glow"></div>
        <div className="container cta-inner">
          <h2>Ready to Become Fluent?</h2>
          <p>Download FluentEdge today and take the first step towards English fluency.</p>
          <a href={PLAYSTORE_URL} className="btn btn-white btn-lg" target="_blank" rel="noreferrer">
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92ZM14.852 13.06l2.8 1.62-9.381 5.42 6.58-7.04ZM17.652 9.32l-2.8 1.62-6.58-7.04 9.38 5.42ZM19.158 10.19l2.39 1.38a1 1 0 0 1 0 1.74l-2.39 1.38-3.1-2.25 3.1-2.25Z" /></svg>
            Download on Play Store
          </a>
        </div>
      </section>
    </main>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function NavHashLink({ to, children, ...props }) {
  return (
    <Link
      to={to}
      onClick={() => {
        if (window.innerWidth <= 992) {
          document.querySelector('.nav-links').classList.remove('nav-open');
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}

/* ── Sub-components ────────────────────────────────────────── */

function FeatureCard({ icon, title, desc, color }) {
  return (
    <div className="feature-card">
      <div className="feature-icon" style={{ background: `${color}14`, color }} aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

function ProgramCard({ level, icon, gradient, features, popular }) {
  return (
    <div className={`program-card ${popular ? 'program-popular' : ''}`}>
      {popular && <div className="popular-badge">Most Popular</div>}
      <div className="program-header" style={{ background: gradient }}>
        <span className="program-icon" aria-hidden="true">{icon}</span>
        <h3>{level}</h3>
      </div>
      <ul className="program-features">
        {features.map((f, i) => (
          <li key={i}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            {f}
          </li>
        ))}
      </ul>
      <Link to={`/enroll?program=${level.toLowerCase()}`} className="btn btn-outline btn-block">
        Get Started
      </Link>
    </div>
  )
}

function StepCard({ number, title, desc }) {
  return (
    <div className="step-card">
      <div className="step-number">{number}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

/* ── Phone Dashboard Recreation ──────────────────────────────── */
function PhoneDashboard() {
  return (
    <div className="mock-dash">
      {/* Status bar */}
      <div className="mock-statusbar">
        <span style={{ fontSize: '10px', fontWeight: 600 }}>9:14 AM</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#333"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" /></svg>
          <svg width="14" height="12" viewBox="0 0 24 24" fill="#333"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" /></svg>
        </div>
      </div>

      {/* Header */}
      <div className="mock-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="mock-avatar">👤</div>
          <div>
            <div style={{ fontSize: '10px', color: '#757575' }}>Welcome,</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#212121' }}>User</div>
          </div>
        </div>
        <div className="mock-notif">🔔<span className="mock-notif-dot">2</span></div>
      </div>
      <div className="mock-date-row">
        <span>Tue, 24 Feb 2026</span><span>Program Name</span>
      </div>

      {/* XP & Streak */}
      <div className="mock-xp-row">
        <div className="mock-xp-card" style={{ background: '#1A73E8' }}>
          <div style={{ fontSize: '9px', opacity: 0.85 }}>Total Program<br />Points Earned</div>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>100 XP ⚡</div>
        </div>
        <div className="mock-xp-card" style={{ background: '#00A86B' }}>
          <div style={{ fontSize: '9px', opacity: 0.85 }}>Complete tasks<br />to keep streak</div>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>7 Days 🔥</div>
        </div>
      </div>

      {/* Continue Learning */}
      <div className="mock-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#212121' }}>Continue Learning</span>
          <span style={{ fontSize: '10px' }}>📋</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#757575', marginBottom: '4px' }}>
          <span>Program Completion</span><span style={{ fontWeight: 600, color: '#1A73E8' }}>50.0 %</span>
        </div>
        <div className="mock-progress-bar"><div className="mock-progress-fill" style={{ width: '50%' }}></div></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <div style={{ fontSize: '9px', color: '#757575' }}>Last Topic Name<br />Lesson Name</div>
          <div className="mock-resume-btn">Resume ›</div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="mock-card">
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#212121', marginBottom: '2px' }}>Today's Tasks</div>
        <div style={{ fontSize: '9px', color: '#999', marginBottom: '8px' }}>Today&apos;s lesson not started yet</div>
        <div className="mock-stats-grid">
          <div className="mock-stat-item" style={{ borderColor: 'rgba(0,168,107,0.2)' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#00A86B' }}>Present <span style={{ fontSize: '12px' }}>✓</span></div>
            <div style={{ fontSize: '8px', color: '#757575' }}>Today Attendance</div>
          </div>
          <div className="mock-stat-item" style={{ borderColor: 'rgba(0,168,107,0.2)' }}>
            <div><span style={{ fontSize: '14px', fontWeight: 800, color: '#00A86B' }}>1</span><span style={{ fontSize: '12px', color: '#999' }}> / 5</span></div>
            <div style={{ fontSize: '8px', color: '#757575' }}>This Week Attended</div>
          </div>
          <div className="mock-stat-item" style={{ borderColor: 'rgba(26,115,232,0.2)' }}>
            <div><span style={{ fontSize: '14px', fontWeight: 800, color: '#1A73E8' }}>0</span><span style={{ fontSize: '12px', color: '#999' }}> / 5</span></div>
            <div style={{ fontSize: '8px', color: '#757575' }}>Exams Passed</div>
          </div>
          <div className="mock-stat-item" style={{ borderColor: 'rgba(245,166,35,0.2)' }}>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#F5A623' }}>0 Done</div>
            <div style={{ fontSize: '8px', color: '#757575' }}>Speaking Task</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '0 12px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#212121' }}>Quick Actions</span>
          <span style={{ fontSize: '10px', color: '#999' }}>4</span>
        </div>
        <div className="mock-qa-grid">
          <div className="mock-qa-btn"><span>📹</span> Live Class</div>
          <div className="mock-qa-btn"><span>📚</span> Courses</div>
          <div className="mock-qa-btn"><span>🏆</span> Certificate</div>
          <div className="mock-qa-btn"><span>📊</span> Analytics</div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="mock-bottom-nav">
        <div className="mock-nav-item mock-nav-active">🏠<span>Home</span></div>
        <div className="mock-nav-item">📹<span>Lectures</span></div>
        <div className="mock-nav-item">💬<span>Practice</span></div>
        <div className="mock-nav-item">📝<span>Tasks</span></div>
        <div className="mock-nav-item">📋<span>Exams</span></div>
      </div>
    </div>
  )
}

export default App
