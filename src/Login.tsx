import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
  margin: 0;   /* ADD THIS 🔥 */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

  .page {
    display: flex;
    min-height: 100vh;
    width: 100%;
    background: #0a1628;
     justify-content: stretch;
  }

  /* ─── LEFT SIDE ─────────────────────────────────────── */
  .left {
    flex: 1;
    background: linear-gradient(135deg, #0d1f3c 0%, #0a1a35 40%, #091628 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 36px 48px 36px 48px;
  }

  /* subtle dot/grid texture */
  .left::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  /* soft blue glow blob */
  .left::after {
    content: '';
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 420px;
    height: 420px;
    background: radial-gradient(circle, rgba(30,100,220,0.18) 0%, transparent 70%);
    pointer-events: none;
    border-radius: 50%;
  }

  /* logo row */
  .logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .logo-icon {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #f5a623 0%, #e8930f 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(245,166,35,0.35);
  }

  .logo-text h1 {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.2px;
    line-height: 1.2;
  }

  .logo-text p {
    font-size: 11.5px;
    color: rgba(255,255,255,0.45);
    font-weight: 400;
    margin-top: 1px;
  }

  /* hero block */
  .hero {
    margin-top: auto;
    position: relative;
    z-index: 1;
    padding-bottom: 8px;
  }

  .hero h2 {
    font-size: clamp(34px, 4.5vw, 54px);
    font-weight: 800;
    color: #ffffff;
    line-height: 1.12;
    letter-spacing: -1.5px;
    margin-bottom: 20px;
  }

  .hero p {
    font-size: 15px;
    color: rgba(255,255,255,0.58);
    line-height: 1.65;
    max-width: 460px;
    font-weight: 400;
  }

  /* feature cards grid */
  .cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 36px;
    position: relative;
    z-index: 1;
  }

  .feature-card {
    background: rgba(255,255,255,0.055);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 14px;
    padding: 16px 18px;
    backdrop-filter: blur(6px);
    display: flex;
    align-items: flex-start;
    gap: 12px;
    transition: background 0.2s;
  }

  .feature-card:hover {
    background: rgba(255,255,255,0.08);
  }

  .card-icon {
    font-size: 18px;
    flex-shrink: 0;
    margin-top: 1px;
    width: 26px;
    text-align: center;
  }

  .card-body h3 {
    font-size: 13.5px;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.1px;
  }

  .card-body p {
    font-size: 12px;
    color: rgba(255,255,255,0.42);
    margin-top: 2px;
    line-height: 1.4;
    font-weight: 400;
  }

  /* copyright */
  .left-footer {
    font-size: 12px;
    color: rgba(255,255,255,0.28);
    position: relative;
    z-index: 1;
    margin-top: 32px;
    font-weight: 400;
  }

  /* ─── RIGHT SIDE ─────────────────────────────────────── */
  .right {
  flex: 1;
    flex-shrink: 0;
    background: linear-gradient(160deg, #0e2247 0%, #0a1a35 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 32px;
    position: relative;
  }

  /* right glow blob */
  .right::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(20,80,200,0.20) 0%, transparent 70%);
    pointer-events: none;
    border-radius: 50%;
  }

  .login-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 44px 44px 36px;
    width: 100%;
    max-width: 420px;
    box-shadow:
      0 8px 40px rgba(0,0,0,0.28),
      0 2px 8px rgba(0,0,0,0.14);
    position: relative;
    z-index: 1;
    border-top: 3px solid #f5a623;
  }

  .card-title {
    font-size: 28px;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.8px;
    line-height: 1.2;
  }

  .card-subtitle {
    font-size: 14px;
    color: #64748b;
    margin-top: 6px;
    font-weight: 400;
  }

  /* form */
  .form-section {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field-label {
    font-size: 11px;
    font-weight: 700;
    color: #374151;
    letter-spacing: 0.7px;
    text-transform: uppercase;
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-wrap input {
    width: 100%;
    height: 48px;
    border: 1.5px solid #2563eb;
    border-radius: 10px;
    padding: 0 42px 0 14px;
    font-size: 14.5px;
    font-family: inherit;
    color: #0f172a;
    background: #ffffff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .input-wrap input::placeholder {
    color: transparent;
  }

  .input-wrap input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
  }

  .input-password {
    border-color: #e2e8f0 !important;
  }

  .input-password:focus {
    border-color: #2563eb !important;
  }

  .input-icon {
    position: absolute;
    right: 14px;
    color: #94a3b8;
    cursor: pointer;
    font-size: 15px;
    display: flex;
    align-items: center;
    user-select: none;
  }

  .key-icon {
    color: #94a3b8;
    font-size: 15px;
    transform: rotate(-45deg);
    display: flex;
    align-items: center;
  }

  /* sign in button */
  .btn-signin {
    width: 100%;
    height: 50px;
    background: #2563eb;
    color: #ffffff;
    font-size: 15.5px;
    font-weight: 600;
    font-family: inherit;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    letter-spacing: -0.1px;
    margin-top: 6px;
    transition: background 0.2s, transform 0.1s;
    box-shadow: 0 4px 14px rgba(37,99,235,0.35);
  }

  .btn-signin:hover {
    background: #1d4ed8;
  }

  .btn-signin:active {
    transform: scale(0.99);
  }

  /* divider */
  .quick-login-label {
    font-size: 11px;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    margin-top: 24px;
  }

  /* quick login cards */
  .quick-login-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
  }

  .quick-card {
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
  }

  .quick-card:hover {
    border-color: #2563eb;
    background: #f0f5ff;
  }

  .quick-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #bfdbfe;
    color: #1d4ed8;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .quick-info h4 {
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.2;
  }

  .quick-info p {
    font-size: 11px;
    color: #64748b;
    margin-top: 1px;
    line-height: 1.3;
  }

  /* card footer note */
  .card-note {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    text-align: center;
    margin-top: 18px;
    position: relative;
    z-index: 1;
    font-weight: 400;
  }

  /* ─── RESPONSIVE ─────────────────────────────────────── */
  @media (max-width: 900px) {
    .page { flex-direction: column; }
    .right { width: 100%; padding: 40px 20px; }
    .left { padding: 32px 28px; }
    .hero h2 { font-size: 36px; }
  }
`;

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fillQuickLogin = (role: string) => {
    if (role === "hod") {
      setEmail("hod_cse@univ.edu");
      setPassword("password");
    } else {
      setEmail("faculty1@univ.edu");
      setPassword("password");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* ── LEFT ── */}
        <div className="left">
          {/* Logo */}
          <div className="logo-row">
            <div className="logo-icon">🎓</div>
            <div className="logo-text">
              <h1>CurriculumOS</h1>
              <p>Platform v2.1</p>
            </div>
          </div>

          {/* Hero */}
          <div className="hero">
            <h2>
              University
              <br />
              Curriculum
              <br />
              Platform
            </h2>
            <p>
              Streamlined syllabus authoring, faculty assignment, and HOD
              approval — all in one unified institutional workflow.
            </p>

            {/* Feature Cards */}
            <div className="cards-grid">
              <div className="feature-card">
                <div className="card-icon">📝</div>
                <div className="card-body">
                  <h3>Faculty Workflow</h3>
                  <p>Structured syllabus authoring</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="card-icon">✅</div>
                <div className="card-body">
                  <h3>HOD Review</h3>
                  <p>Approval &amp; feedback loop</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="card-icon">📄</div>
                <div className="card-body">
                  <h3>PDF Export</h3>
                  <p>One-click formatted output</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="card-icon">📊</div>
                <div className="card-body">
                  <h3>Articulation Matrix</h3>
                  <p>CO-PO-PSO mapping</p>
                </div>
              </div>
            </div>
          </div>

          <div className="left-footer">
            © 2026 CurriculumOS • All rights reserved
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="right">
          <div className="login-card">
            <div className="card-title">Sign In</div>
            <div className="card-subtitle">
              Access your curriculum dashboard
            </div>

            <div className="form-section">
              {/* Email */}
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <div className="input-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@univ.edu"
                  />
                  <span className="input-icon">
                    <span className="key-icon">🔑</span>
                  </span>
                </div>
              </div>

              {/* Password */}
              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-password"
                    style={{ borderColor: "#e2e8f0" }}
                  />
                  <span
                    className="input-icon"
                    onClick={() => setShowPassword((v) => !v)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      // eye-off
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      // eye
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>

              {/* Sign In Button */}
              <button className="btn-signin" onClick={onLogin}>
                Sign In
              </button>
            </div>

            {/* Quick Login */}
            <div className="quick-login-label">Quick Login</div>
            <div className="quick-login-grid">
              <div className="quick-card" onClick={() => fillQuickLogin("hod")}>
                <div className="quick-avatar">H</div>
                <div className="quick-info">
                  <h4>HOD</h4>
                  <p>hod_cse@univ.edu</p>
                </div>
              </div>
              <div
                className="quick-card"
                onClick={() => fillQuickLogin("faculty")}
              >
                <div className="quick-avatar">F</div>
                <div className="quick-info">
                  <h4>Faculty</h4>
                  <p>faculty1@univ.edu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-note">
            Only authorized institutional users can access this platform
          </div>
        </div>
      </div>
    </>
  );
}
