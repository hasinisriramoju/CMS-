// src/data/mockCourses.ts

import { CourseOption } from "../types/course";

export const mockCourses: CourseOption[] = [
  { code: "24AML3404", title: "Artificial Intelligence and Machine Learning" },
  { code: "24CS1101", title: "Introduction to Programming" },
  { code: "24CS2201", title: "Data Structures and Algorithms" },
  { code: "24CS3301", title: "Database Management Systems" },
  { code: "24CS3401", title: "Operating Systems" },
  { code: "24CS4501", title: "Computer Networks" },
  { code: "24CS4601", title: "Software Engineering" },
  { code: "24MA1101", title: "Engineering Mathematics I" },
  { code: "24MA2201", title: "Engineering Mathematics II" },
  { code: "24PH1101", title: "Engineering Physics" },
];

export const categories = [
  "Core",
  "Elective",
  "Open Elective",
  "Laboratory",
  "Project",
  "Audit",
];

export const subCategories: Record<string, string[]> = {
  Core: ["Theory", "Lab", "Theory + Lab"],
  Elective: ["Professional Elective", "Department Elective"],
  "Open Elective": ["General", "Interdisciplinary"],
  Laboratory: ["Core Lab", "Elective Lab"],
  Project: ["Mini Project", "Major Project"],
  Audit: ["Audit Course"],
};

export const courseTypes = [
  "Theory",
  "Laboratory",
  "Theory + Laboratory",
  "Project",
  "Internship",
  "MOOC",
];

export const degrees = ["B.Tech", "M.Tech", "MBA", "MCA", "PhD"];

export const courseDomains = [
  "General",
  "General / Open Electives (Common)",
  "1 - Programming, Data Structures and Databases",
  "2 - Systems, Architectures, and Drone Technologies",
  "3 - Software Engineering, Web Frameworks, and UI/UX Design",
  "4 - Networks, Cyber Security and Blockchain",
  "5 - Intelligent Systems and Research",
];

export const courseLevels = [
  "100 - Foundation",
  "200 - Intermediate",
  "300 - Advanced",
  "400 - Expert",
  "500 - Research",
];

export const departments = [
  "Computer Science & Engineering",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Information Technology",
];