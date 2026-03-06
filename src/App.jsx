import './index.css'

const PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=com.fluentedge.app'

function App() {
  return (
    <div className="landing">
      {/* ── Navbar ──────────────────────────────────────────── */}
      <nav className="navbar">
        <div className="container nav-inner">
          <span className="logo">Fluent<span className="logo-accent">Edge</span></span>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#programs">Programs</a>
            <a href="#how-it-works">How It Works</a>
            <a href={PLAYSTORE_URL} className="btn btn-primary btn-sm" target="_blank" rel="noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92ZM14.852 13.06l2.8 1.62-9.381 5.42 6.58-7.04ZM17.652 9.32l-2.8 1.62-6.58-7.04 9.38 5.42ZM19.158 10.19l2.39 1.38a1 1 0 0 1 0 1.74l-2.39 1.38-3.1-2.25 3.1-2.25Z" /></svg>
              Get the App
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu" onClick={() => {
            document.querySelector('.nav-links').classList.toggle('nav-open')
          }}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92ZM14.852 13.06l2.8 1.62-9.381 5.42 6.58-7.04ZM17.652 9.32l-2.8 1.62-6.58-7.04 9.38 5.42ZM19.158 10.19l2.39 1.38a1 1 0 0 1 0 1.74l-2.39 1.38-3.1-2.25 3.1-2.25Z" /></svg>
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
                <img src="/app-mockup.png" alt="FluentEdge App Dashboard" />
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92ZM14.852 13.06l2.8 1.62-9.381 5.42 6.58-7.04ZM17.652 9.32l-2.8 1.62-6.58-7.04 9.38 5.42ZM19.158 10.19l2.39 1.38a1 1 0 0 1 0 1.74l-2.39 1.38-3.1-2.25 3.1-2.25Z" /></svg>
            Download on Play Store
          </a>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="logo">Fluent<span className="logo-accent">Edge</span></span>
          <p>© {new Date().getFullYear()} FluentEdge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

/* ── Sub-components ────────────────────────────────────────── */

function FeatureCard({ icon, title, desc, color }) {
  return (
    <div className="feature-card">
      <div className="feature-icon" style={{ background: `${color}14`, color }}>{icon}</div>
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
        <span className="program-icon">{icon}</span>
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
      <a href={PLAYSTORE_URL} className="btn btn-outline btn-block" target="_blank" rel="noreferrer">
        Get Started
      </a>
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

export default App
