// ============================================================
// FILE: src/pages/CreateCourseOptions.tsx  — UPDATED VERSION
// REPLACE the previous version with this one.
// ============================================================

import { useNavigate } from "react-router-dom";

const options = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    badge: "Self Create",
    title: "Create Course & Fill Details",
    description:
      "Start building a course and immediately enter full syllabus details — units, references, outcomes, and SDG mappings.",
    buttonLabel: "Start Creating",
    accent: "#3b82f6",
    accentBg: "#eff6ff",
    buttonBg: "#1e3a5f",
    onClick: (navigate: ReturnType<typeof useNavigate>) =>
      navigate("/add-course/form"),
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    badge: "Delegate",
    title: "Assign Course to Faculty",
    description:
      "Set up basic course info and delegate syllabus creation to a designated Course Incharge (CSMI) for completion.",
    buttonLabel: "Assign Now",
    accent: "#7c3aed",
    accentBg: "#f5f3ff",
    buttonBg: "#5b21b6",
    onClick: (navigate: ReturnType<typeof useNavigate>) =>
      navigate("/add-course/form"),
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    badge: "Bulk",
    title: "Bulk Course Upload",
    description:
      "Upload a CSV or Excel file to create multiple courses at once using a predefined template.",
    buttonLabel: "Upload File",
    accent: "#059669",
    accentBg: "#ecfdf5",
    buttonBg: "#065f46",
    extra: true,
    onClick: (_navigate: ReturnType<typeof useNavigate>) =>
      console.log("Bulk upload clicked"),
  },
];

export default function CreateCourseOptions() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>How would you like to proceed?</h2>
        <p style={styles.subtitle}>
          Choose the method that best fits your workflow. You can always update details later.
        </p>
      </div>

      <div style={styles.grid}>
        {options.map((opt, i) => (
          <div key={i} className="cco-card" style={styles.card}>
            <div style={{ ...styles.accentBar, background: opt.accent }} />
            <div style={{ ...styles.iconBox, background: opt.accentBg, color: opt.accent }}>
              {opt.icon}
            </div>
            <span style={{ ...styles.badge, color: opt.accent, background: opt.accentBg }}>
              {opt.badge}
            </span>
            <h3 style={styles.cardTitle}>{opt.title}</h3>
            <p style={styles.cardDesc}>{opt.description}</p>
            <div style={{ flex: 1 }} />
            <button
              style={{ ...styles.btn, background: opt.buttonBg }}
              onClick={() => opt.onClick(navigate)}
              className="cco-btn"
            >
              {opt.buttonLabel} →
            </button>
            {opt.extra && (
              <a href="#" style={styles.templateLink} onClick={(e) => e.preventDefault()}>
                ↓ Download sample template
              </a>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .cco-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .cco-card:hover { transform: translateY(-5px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important; }
        .cco-btn { transition: opacity 0.15s; }
        .cco-btn:hover { opacity: 0.88; }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: { maxWidth: "960px" },
  header: { marginBottom: "28px" },
  title: { fontSize: "20px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px" },
  subtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" },
  card: {
    background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)", padding: "28px 24px 24px",
    display: "flex", flexDirection: "column", gap: "10px",
    position: "relative", overflow: "hidden",
  },
  accentBar: { position: "absolute", top: 0, left: 0, right: 0, height: "4px" },
  iconBox: { width: "52px", height: "52px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2px" },
  badge: { fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const, padding: "2px 9px", borderRadius: "99px", alignSelf: "flex-start" },
  cardTitle: { fontSize: "15.5px", fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.35 },
  cardDesc: { fontSize: "13px", color: "#64748b", lineHeight: 1.65, margin: 0 },
  btn: { marginTop: "8px", padding: "10px 16px", borderRadius: "8px", border: "none", color: "#fff", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", width: "100%" },
  templateLink: { fontSize: "12px", color: "#059669", textDecoration: "none", textAlign: "center" as const, display: "block", fontWeight: 500, marginTop: "2px" },
};
