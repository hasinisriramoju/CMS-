// src/types/course.ts

export interface CourseFormData {
  courseCode: string;
  courseTitle: string;
  category: string;
  subCategory: string;
  courseType: string;
  degree: string;
  courseDomain: string;
  courseLevel: string;
  isPassFail: string;
  isFacultyRequired: string;
  university: string;
  department: string;
  lectureHours: string;
  tutorialHours: string;
  practicalHours: string;
  selfStudyHours: string;
  independentHours: string;
  prerequisites: string[];
  corequisites: string[];
  courseDescription: string;
}

export interface CourseOption {
  code: string;
  title: string;
}