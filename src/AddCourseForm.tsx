// src/AddCourseForm.tsx
import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { CourseFormData } from "./types/course";
import {
  isValidHour,
  computeContactHours,
  formatHoursDisplay,
} from "./utils/formatHours";
import {
  mockCourses,
  categories,
  subCategories,
  courseTypes,
  degrees,
  courseDomains,
  courseLevels,
  departments,
} from "./data/mockCourses";

const initialForm: CourseFormData = {
  courseCode: "",
  courseTitle: "",
  category: "",
  subCategory: "",
  courseType: "",
  degree: "",
  courseDomain: "",
  courseLevel: "",
  isPassFail: "No — Regular Marks",
  isFacultyRequired: "Yes — Faculty Assignment Re...",
  university: "SU - Sreenidhi University",
  department: "",
  lectureHours: "",
  tutorialHours: "",
  practicalHours: "",
  selfStudyHours: "",
  independentHours: "",
  prerequisites: [],
  corequisites: [],
  courseDescription: "",
};

export default function AddCourseForm() {
  const [form, setForm] = useState<CourseFormData>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CourseFormData, string>>
  >({});
  const [wordCount, setWordCount] = useState(0);
  const [prereqInput, setPrereqInput] = useState("");
  const [prereqSuggestions, setPrereqSuggestions] = useState<
    typeof mockCourses
  >([]);
  const [coreqInput, setCoreqInput] = useState("");
  const [coreqSuggestions, setCoreqSuggestions] = useState<typeof mockCourses>(
    [],
  );
  const [submitted, setSubmitted] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(true); // sidebar toggle
  const navigate = useNavigate();
  const prereqRef = useRef<HTMLDivElement>(null);
  const coreqRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (prereqRef.current && !prereqRef.current.contains(e.target as Node)) {
        setPrereqSuggestions([]);
      }
      if (coreqRef.current && !coreqRef.current.contains(e.target as Node)) {
        setCoreqSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ─── Handlers ───────────────────────────────────────────────
  function handleChange(field: keyof CourseFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function handleCourseCode(val: string) {
    // Only alphanumeric, no spaces, no special chars
    const clean = val.replace(/[^a-zA-Z0-9]/g, "");
    handleChange("courseCode", clean);
  }

  function handleHour(field: keyof CourseFormData, val: string) {
    if (isValidHour(val)) handleChange(field, val);
  }

  function handleDescription(val: string) {
    const words = val.trim() === "" ? [] : val.trim().split(/\s+/);
    if (words.length <= 100) {
      handleChange("courseDescription", val);
      setWordCount(words.length);
    }
  }

  // Prereq search
  function handlePrereqInput(val: string) {
    setPrereqInput(val);
    if (val.length < 1) {
      setPrereqSuggestions([]);
      return;
    }
    const filtered = mockCourses.filter(
      (c) =>
        !form.prerequisites.includes(c.code) &&
        (c.code.toLowerCase().includes(val.toLowerCase()) ||
          c.title.toLowerCase().includes(val.toLowerCase())),
    );
    setPrereqSuggestions(filtered);
  }

  function addPrereq(code: string) {
    if (!form.prerequisites.includes(code)) {
      setForm((prev) => ({
        ...prev,
        prerequisites: [...prev.prerequisites, code],
      }));
    }
    setPrereqInput("");
    setPrereqSuggestions([]);
  }

  function removePrereq(code: string) {
    setForm((prev) => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((c) => c !== code),
    }));
  }

  // Coreq search
  function handleCoreqInput(val: string) {
    setCoreqInput(val);
    if (val.length < 1) {
      setCoreqSuggestions([]);
      return;
    }
    const filtered = mockCourses.filter(
      (c) =>
        !form.corequisites.includes(c.code) &&
        (c.code.toLowerCase().includes(val.toLowerCase()) ||
          c.title.toLowerCase().includes(val.toLowerCase())),
    );
    setCoreqSuggestions(filtered);
  }

  function addCoreq(code: string) {
    if (!form.corequisites.includes(code)) {
      setForm((prev) => ({
        ...prev,
        corequisites: [...prev.corequisites, code],
      }));
    }
    setCoreqInput("");
    setCoreqSuggestions([]);
  }

  function removeCoreq(code: string) {
    setForm((prev) => ({
      ...prev,
      corequisites: prev.corequisites.filter((c) => c !== code),
    }));
  }

  // ─── Validation ─────────────────────────────────────────────
  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!form.courseCode) newErrors.courseCode = "Course code is required";
    if (!form.courseTitle) newErrors.courseTitle = "Course title is required";
    if (form.courseTitle.length > 100)
      newErrors.courseTitle = "Max 100 characters";
    if (!form.category) newErrors.category = "Select a category";
    if (!form.courseType) newErrors.courseType = "Select a course type";
    if (!form.department) newErrors.department = "Select a department";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      setSubmitted(true);
      console.log("Form submitted:", form);
    }
  }

  function handleReset() {
    setForm(initialForm);
    setErrors({});
    setWordCount(0);
    setPrereqInput("");
    setCoreqInput("");
    setSubmitted(false);
  }

  // Contact hours summary
  const contactHours = computeContactHours(
    form.lectureHours,
    form.tutorialHours,
    form.practicalHours,
    form.selfStudyHours,
    form.independentHours,
  );
  const summary = `L:${formatHoursDisplay(form.lectureHours) || "0"} T:${formatHoursDisplay(form.tutorialHours) || "0"} P:${formatHoursDisplay(form.practicalHours) || "0"} S:${formatHoursDisplay(form.selfStudyHours) || "0"} I:${formatHoursDisplay(form.independentHours) || "0"} C:${contactHours}`;

  const availableSubCats = form.category
    ? subCategories[form.category] || []
    : [];

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      {/* ── SIDEBAR ── */}
      <div style={styles.sidebar}>
        {/* Logo / Branding */}
        <div style={styles.sidebarLogo}>
          <div style={styles.logoIconWrap}>🎓</div>
          <div>
            <div style={styles.logoText}>CurriculumOS</div>
            <div style={styles.logoSub}>Platform v2.1</div>
          </div>
        </div>

        {/* Nav Items */}
        {[
          { icon: "⊞", label: "Dashboard" },
          { icon: "🏛", label: "Organization" },
          { icon: "⚙️", label: "University Settings" },
          { icon: "👥", label: "Users" },
          { icon: "🔐", label: "Role Management" },
        ].map((item) => (
          <div key={item.label} style={styles.sidebarItem}>
            <span style={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}

        {/* Courses — collapsible */}
        <div
          style={{ ...styles.sidebarItem, ...styles.sidebarItemActive }}
          onClick={() => setCoursesOpen((v) => !v)}
        >
          <span style={styles.navIcon}>📚</span>
          <span style={{ flex: 1 }}>Courses</span>
          <span
            style={{
              fontSize: 10,
              transform: coursesOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s",
              display: "inline-block",
            }}
          >
            ▼
          </span>
        </div>

        {/* Submenu */}
        <div
          style={{
            maxHeight: coursesOpen ? 300 : 0,
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          {[
            "All Courses",
            "Create Course",
            "Course Domains",
            "Course Categories",
            "Sub Categories",
          ].map((label) => (
            <div
              key={label}
              style={{
                ...styles.sidebarSubItem,
                ...(label === "Create Course" ? styles.sidebarSubActive : {}),
              }}
              onClick={() => {
                if (label === "Create Course") navigate("/add-course");
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        {[
          { icon: "📋", label: "Regulations" },
          { icon: "🎓", label: "Programmes" },
          { icon: "📝", label: "System Logs" },
        ].map((item) => (
          <div key={item.label} style={styles.sidebarItem}>
            <span style={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}

        {/* User profile at bottom */}
        <div style={styles.sidebarUser}>
          <div style={styles.userAvatar}>U</div>
          <div>
            <div style={styles.userName}>User</div>
            <div style={styles.userRole}>Admin</div>
          </div>
        </div>
      </div>

      <div style={styles.main}>
        {/* ── TOPBAR ── */}
        <div style={styles.topbar}>
          <span style={styles.topbarMenuBtn}>☰</span>
          <div style={styles.topbarRight}>
            <span style={styles.adminBadge}>Admin</span>
            <div style={styles.userChip}>
              <div style={styles.userChipAvatar}>U</div>
              <span style={styles.userChipName}>User</span>
            </div>
            <button style={styles.logoutBtn}>⏻ Logout</button>
          </div>
        </div>

        <div style={styles.content}>
          {submitted ? (
            <div style={styles.successCard}>
              <div style={styles.successIcon}>✓</div>
              <h2 style={styles.successTitle}>Course Created Successfully!</h2>
              <p style={styles.successSub}>
                Course <strong>{form.courseCode}</strong> — {form.courseTitle}{" "}
                has been created.
              </p>
              <button style={styles.btnPrimary} onClick={handleReset}>
                Create Another Course
              </button>
            </div>
          ) : (
            <div style={styles.card}>
              {/* Header */}
              <div style={styles.cardHeader}>
                <div>
                  <h1 style={styles.cardTitle}>Create & Assign Course</h1>
                  <p style={styles.cardSub}>
                    Enter course details and assign a Course Incharge (CSMI) who
                    will fill the full syllabus.
                  </p>
                </div>
                <button style={styles.btnOutline}>
                  👤 Assign to Course Incharge
                </button>
              </div>

              <div style={styles.divider} />

              {/* Row 1: Course Code + Course Title */}
              <div style={styles.row}>
                <div style={{ ...styles.field, flex: 1 }}>
                  <label style={styles.label}>
                    Course Code <span style={styles.required}>*</span>
                  </label>
                  <div style={styles.inputWrap}>
                    <span style={styles.inputIcon}>🔒</span>
                    <input
                      style={{
                        ...styles.input,
                        paddingLeft: 32,
                        ...(errors.courseCode ? styles.inputError : {}),
                      }}
                      value={form.courseCode}
                      onChange={(e) => handleCourseCode(e.target.value)}
                      placeholder="e.g. 24AML3404"
                    />
                  </div>
                  {errors.courseCode && (
                    <span style={styles.errorText}>{errors.courseCode}</span>
                  )}
                </div>
                <div style={{ ...styles.field, flex: 2 }}>
                  <label style={styles.label}>
                    Course Title <span style={styles.required}>*</span>
                  </label>
                  <input
                    style={{
                      ...styles.input,
                      ...(errors.courseTitle ? styles.inputError : {}),
                    }}
                    value={form.courseTitle}
                    onChange={(e) =>
                      handleChange("courseTitle", e.target.value.slice(0, 100))
                    }
                    placeholder="e.g. Artificial Intelligence and Machine Learning"
                    maxLength={100}
                  />
                  <span style={styles.charCount}>
                    {form.courseTitle.length}/100
                  </span>
                  {errors.courseTitle && (
                    <span style={styles.errorText}>{errors.courseTitle}</span>
                  )}
                </div>
              </div>

              {/* Row 2: Category, Sub-Category, Course Type, Degree, Course Domain */}
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>
                    Category <span style={styles.required}>*</span>
                  </label>
                  <select
                    style={{
                      ...styles.select,
                      ...(errors.category ? styles.inputError : {}),
                    }}
                    value={form.category}
                    onChange={(e) => {
                      handleChange("category", e.target.value);
                      handleChange("subCategory", "");
                    }}
                  >
                    <option value="">— Select category —</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span style={styles.errorText}>{errors.category}</span>
                  )}
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>
                    Sub-Category <span style={styles.required}>*</span>
                  </label>
                  <select
                    style={styles.select}
                    value={form.subCategory}
                    onChange={(e) =>
                      handleChange("subCategory", e.target.value)
                    }
                    disabled={!form.category}
                  >
                    <option value="">— Select sub-category —</option>
                    {availableSubCats.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>
                    Course Type <span style={styles.required}>*</span>
                  </label>
                  <select
                    style={{
                      ...styles.select,
                      ...(errors.courseType ? styles.inputError : {}),
                    }}
                    value={form.courseType}
                    onChange={(e) => handleChange("courseType", e.target.value)}
                  >
                    <option value="">— Select type —</option>
                    {courseTypes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.courseType && (
                    <span style={styles.errorText}>{errors.courseType}</span>
                  )}
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Degree</label>
                  <select
                    style={styles.select}
                    value={form.degree}
                    onChange={(e) => handleChange("degree", e.target.value)}
                  >
                    <option value="">— Select degree —</option>
                    {degrees.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Course Domain</label>
                  <select
                    style={styles.select}
                    value={form.courseDomain}
                    onChange={(e) =>
                      handleChange("courseDomain", e.target.value)
                    }
                  >
                    <option value="">— Select Domain —</option>
                    {courseDomains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Course Level, Pass/Fail, Faculty Required */}
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Course Level</label>
                  <select
                    style={styles.select}
                    value={form.courseLevel}
                    onChange={(e) =>
                      handleChange("courseLevel", e.target.value)
                    }
                  >
                    <option value="">— Select level —</option>
                    {courseLevels.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Is Pass/Fail Course</label>
                  <select
                    style={styles.select}
                    value={form.isPassFail}
                    onChange={(e) => handleChange("isPassFail", e.target.value)}
                  >
                    <option value="No — Regular Marks">
                      No — Regular Marks
                    </option>
                    <option value="Yes — Pass/Fail">Yes — Pass/Fail</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Is Faculty Required</label>
                  <select
                    style={styles.select}
                    value={form.isFacultyRequired}
                    onChange={(e) =>
                      handleChange("isFacultyRequired", e.target.value)
                    }
                  >
                    <option value="Yes — Faculty Assignment Re...">
                      Yes — Faculty Assignment Required
                    </option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Row 4: University + Department */}
              <div style={styles.row}>
                <div style={{ ...styles.field, flex: 2 }}>
                  <label style={styles.label}>
                    University <span style={styles.required}>*</span>
                  </label>
                  <select
                    style={styles.select}
                    value={form.university}
                    onChange={(e) => handleChange("university", e.target.value)}
                  >
                    <option value="SU - Sreenidhi University">
                      SU - Sreenidhi University
                    </option>
                  </select>
                </div>
                <div style={{ ...styles.field, flex: 2 }}>
                  <label style={styles.label}>
                    Department <span style={styles.required}>*</span>
                  </label>
                  <select
                    style={{
                      ...styles.select,
                      ...(errors.department ? styles.inputError : {}),
                    }}
                    value={form.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                  >
                    <option value="">— Select department —</option>
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <span style={styles.errorText}>{errors.department}</span>
                  )}
                </div>
              </div>

              {/* Contact Hours & Credits */}
              <div style={styles.sectionHeader}>
                <span style={styles.sectionTitle}>
                  Contact Hours &amp; Credits
                </span>
                {!form.courseType && (
                  <span style={styles.warningBadge}>
                    ⚠ Select a Course Type first
                  </span>
                )}
              </div>
              <div style={styles.hoursGrid}>
                {[
                  {
                    label: "L",
                    sublabel: "Lecture",
                    field: "lectureHours" as keyof CourseFormData,
                  },
                  {
                    label: "T",
                    sublabel: "Tutorial",
                    field: "tutorialHours" as keyof CourseFormData,
                  },
                  {
                    label: "P",
                    sublabel: "Practical",
                    field: "practicalHours" as keyof CourseFormData,
                  },
                  {
                    label: "S",
                    sublabel: "Self Study",
                    field: "selfStudyHours" as keyof CourseFormData,
                  },
                  {
                    label: "I",
                    sublabel: "Independent",
                    field: "independentHours" as keyof CourseFormData,
                  },
                ].map(({ label, sublabel, field }) => (
                  <div key={field} style={styles.hourBox}>
                    <div style={styles.hourLabel}>{label}</div>
                    <div style={styles.hourSublabel}>{sublabel}</div>
                    <input
                      style={styles.hourInput}
                      value={form[field] as string}
                      onChange={(e) => handleHour(field, e.target.value)}
                      placeholder="0"
                      inputMode="decimal"
                    />
                  </div>
                ))}
                <div
                  style={{
                    ...styles.hourBox,
                    background: "#f0f4ff",
                    border: "1px solid #c7d7ff",
                  }}
                >
                  <div style={{ ...styles.hourLabel, color: "#1a56db" }}>C</div>
                  <div style={styles.hourSublabel}>Contact Hrs</div>
                  <input
                    style={{
                      ...styles.hourInput,
                      background: "#e8f0fe",
                      fontWeight: 700,
                    }}
                    value={contactHours}
                    readOnly
                  />
                </div>
              </div>
              <div style={styles.summaryBar}>
                Summary:{" "}
                <strong style={{ marginLeft: 6, color: "#1a56db" }}>
                  {summary}
                </strong>
                <span style={styles.contactHint}>
                  Contact Hours: (C = L+T+P+S+I) hrs/semester
                </span>
              </div>

              <div style={styles.divider} />

              {/* Prerequisites */}
              <div style={styles.row}>
                <div style={{ ...styles.field, flex: 1 }} ref={prereqRef}>
                  <label style={styles.label}>Pre-Requisite Courses</label>
                  <div style={styles.tagInputWrap}>
                    {form.prerequisites.map((code) => {
                      const course = mockCourses.find((c) => c.code === code);
                      return (
                        <span key={code} style={styles.tag}>
                          {code}
                          <button
                            style={styles.tagRemove}
                            onClick={() => removePrereq(code)}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                    <input
                      style={styles.tagInput}
                      value={prereqInput}
                      onChange={(e) => handlePrereqInput(e.target.value)}
                      placeholder="Type course code or title..."
                    />
                  </div>
                  {prereqSuggestions.length > 0 && (
                    <div style={styles.dropdown}>
                      {prereqSuggestions.map((c) => (
                        <div
                          key={c.code}
                          style={styles.dropdownItem}
                          onClick={() => addPrereq(c.code)}
                        >
                          <strong>{c.code}</strong> — {c.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ ...styles.field, flex: 1 }} ref={coreqRef}>
                  <label style={styles.label}>Co-Requisite Courses</label>
                  <div style={styles.tagInputWrap}>
                    {form.corequisites.map((code) => (
                      <span key={code} style={styles.tag}>
                        {code}
                        <button
                          style={styles.tagRemove}
                          onClick={() => removeCoreq(code)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      style={styles.tagInput}
                      value={coreqInput}
                      onChange={(e) => handleCoreqInput(e.target.value)}
                      placeholder="Type course code or title..."
                    />
                  </div>
                  {coreqSuggestions.length > 0 && (
                    <div style={styles.dropdown}>
                      {coreqSuggestions.map((c) => (
                        <div
                          key={c.code}
                          style={styles.dropdownItem}
                          onClick={() => addCoreq(c.code)}
                        >
                          <strong>{c.code}</strong> — {c.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Course Description */}
              <div style={styles.field}>
                <label style={styles.label}>Course Description</label>
                <textarea
                  style={styles.textarea}
                  value={form.courseDescription}
                  onChange={(e) => handleDescription(e.target.value)}
                  placeholder="Brief description of the course (max 100 words)..."
                  rows={4}
                />
                <span
                  style={{
                    ...styles.charCount,
                    color: wordCount >= 95 ? "#e53e3e" : "#888",
                  }}
                >
                  {wordCount}/100 words
                </span>
              </div>

              {/* Assignment section */}
              <div style={styles.assignSection}>
                <div style={styles.sectionHeader}>
                  <span style={styles.sectionTitle}>Assignment</span>
                </div>
                <p style={styles.assignHint}>
                  Assign a Course Group In-charge (CGI) who reviews and controls
                  the syllabus and a Subject Matter Expert (SME) who fills it
                  in.
                </p>
                <div style={styles.assignAlert}>
                  ℹ Select a department to load assignable users.
                </div>
              </div>

              {/* Footer Buttons */}
              <div style={styles.footer}>
                <button style={styles.btnBack} onClick={handleReset}>
                  Back
                </button>
                <button style={styles.btnPrimary} onClick={handleSubmit}>
                  Create Course
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#f0f2f5",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    fontSize: 13,
  },
  sidebar: {
    width: 200,
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0f2460 0%, #1a3a8c 100%)",
    color: "#c8d8ff",
    display: "flex",
    flexDirection: "column",
    padding: "0 0 16px 0",
    flexShrink: 0,
  },
  sidebarLogo: {
    padding: "18px 16px 14px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    marginBottom: 8,
  },
  logoIcon: { fontSize: 22 },
  logoText: {
    fontWeight: 700,
    fontSize: 15,
    color: "#fff",
    letterSpacing: 0.5,
  },
  logoSub: { fontSize: 10, color: "#90aacc" },
  sidebarItem: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    padding: "9px 16px",
    cursor: "pointer",
    fontSize: 12.5,
    transition: "background 0.15s",
  },
  sidebarItemActive: {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    fontWeight: 600,
  },
  sidebarSubItem: {
    paddingLeft: 36,
    padding: "6px 16px 6px 36px",
    fontSize: 12,
    color: "#a0bce0",
    cursor: "pointer",
  },
  sidebarSubActive: {
    background: "#1e4db7",
    color: "#fff",
    fontWeight: 600,
    borderLeft: "3px solid #60a5fa",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  topbar: {
    height: 44,
    background: "#fff",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  topbarTitle: { fontSize: 18, color: "#444", cursor: "pointer" },
  topbarRight: { display: "flex", gap: 10, alignItems: "center" },
  badge: {
    background: "#e8f0fe",
    color: "#1a56db",
    borderRadius: 4,
    padding: "2px 8px",
    fontSize: 11,
    fontWeight: 700,
  },
  userBadge: {
    background: "#1a56db",
    color: "#fff",
    borderRadius: 16,
    padding: "3px 12px",
    fontSize: 12,
    fontWeight: 600,
  },
  content: { flex: 1, padding: "24px 28px", overflowY: "auto" },
  card: {
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    padding: "24px 28px",
    maxWidth: 1100,
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cardTitle: { fontSize: 20, fontWeight: 700, color: "#1a2e5a", margin: 0 },
  cardSub: { color: "#888", fontSize: 12.5, marginTop: 4 },
  btnOutline: {
    border: "1px solid #1a56db",
    background: "transparent",
    color: "#1a56db",
    borderRadius: 6,
    padding: "7px 14px",
    fontSize: 12.5,
    cursor: "pointer",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
  },
  divider: { height: 1, background: "#e8edf5", margin: "16px 0" },
  row: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 140,
    flex: 1,
  },
  label: { fontSize: 12, fontWeight: 600, color: "#374151" },
  required: { color: "#e53e3e" },
  inputWrap: { position: "relative" },
  inputIcon: {
    position: "absolute",
    left: 8,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 12,
  },
  input: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "7px 10px",
    fontSize: 13,
    background: "#fafafa",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  inputError: { borderColor: "#e53e3e", background: "#fff5f5" },
  select: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "7px 10px",
    fontSize: 13,
    background: "#fafafa",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  charCount: { fontSize: 11, color: "#999", alignSelf: "flex-end" },
  errorText: { fontSize: 11, color: "#e53e3e", marginTop: 2 },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "16px 0 8px",
  },
  sectionTitle: { fontWeight: 700, fontSize: 13.5, color: "#1a2e5a" },
  warningBadge: {
    fontSize: 11,
    color: "#b45309",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: 4,
    padding: "2px 8px",
  },
  hoursGrid: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  hourBox: {
    flex: 1,
    minWidth: 80,
    maxWidth: 120,
    background: "#f9fafb",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    padding: "10px 8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  hourLabel: { fontWeight: 800, fontSize: 15, color: "#374151" },
  hourSublabel: { fontSize: 10, color: "#888", textAlign: "center" },
  hourInput: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "5px 6px",
    fontSize: 14,
    textAlign: "center",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },
  summaryBar: {
    background: "#f0f4ff",
    borderRadius: 6,
    padding: "8px 14px",
    fontSize: 12.5,
    color: "#4b5563",
    border: "1px solid #dde8ff",
    display: "flex",
    alignItems: "center",
    gap: 0,
    marginBottom: 16,
  },
  contactHint: { marginLeft: "auto", fontSize: 11, color: "#888" },
  tagInputWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "6px 8px",
    background: "#fafafa",
    minHeight: 38,
    alignItems: "center",
  },
  tag: {
    background: "#dbeafe",
    color: "#1e40af",
    borderRadius: 4,
    padding: "2px 8px",
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  tagRemove: {
    background: "none",
    border: "none",
    color: "#1e40af",
    cursor: "pointer",
    padding: 0,
    fontSize: 14,
    lineHeight: 1,
  },
  tagInput: {
    border: "none",
    outline: "none",
    fontSize: 12.5,
    background: "transparent",
    minWidth: 160,
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "100%",
    background: "#fff",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
    zIndex: 999,
    maxHeight: 200,
    overflowY: "auto",
  },
  dropdownItem: {
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: 12.5,
    color: "#374151",
    borderBottom: "1px solid #f3f4f6",
    transition: "background 0.1s",
  },
  textarea: {
    width: "100%",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "8px 10px",
    fontSize: 13,
    background: "#fafafa",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  assignSection: { marginTop: 8 },
  assignHint: { fontSize: 12, color: "#888", marginBottom: 8 },
  assignAlert: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 6,
    padding: "8px 12px",
    fontSize: 12.5,
    color: "#1e40af",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 20,
    paddingTop: 16,
    borderTop: "1px solid #e8edf5",
  },
  btnBack: {
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#374151",
    borderRadius: 6,
    padding: "8px 20px",
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 600,
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #1a56db, #1e40af)",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 24px",
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 2px 8px rgba(26,86,219,0.3)",
  },
  successCard: {
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    padding: "60px 40px",
    textAlign: "center",
    maxWidth: 500,
    margin: "0 auto",
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1a2e5a",
    marginBottom: 8,
  },
  successSub: { color: "#666", fontSize: 14, marginBottom: 24 },
  // Sidebar additions
  logoIconWrap: { fontSize: 26, lineHeight: 1 },
  navIcon: { width: 18, textAlign: "center" as const, flexShrink: 0 },
  sidebarUser: {
    marginTop: "auto",
    padding: "14px 16px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  userName: { fontSize: 12.5, fontWeight: 600, color: "#e2eeff" },
  userRole: { fontSize: 10.5, color: "#90aacc" },

  // Topbar additions
  topbarMenuBtn: { fontSize: 18, color: "#555", cursor: "pointer" },
  adminBadge: {
    background: "#dbeafe",
    color: "#1e40af",
    borderRadius: 4,
    padding: "3px 10px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.4,
  },
  userChip: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    background: "#f1f5f9",
    borderRadius: 20,
    padding: "3px 12px 3px 4px",
  },
  userChipAvatar: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1a56db, #1e40af)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userChipName: { fontSize: 12.5, fontWeight: 600, color: "#374151" },
  logoutBtn: {
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#666",
    borderRadius: 6,
    padding: "4px 12px",
    fontSize: 12,
    cursor: "pointer",
  },
};
