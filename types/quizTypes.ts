export interface Category {
  id: number;
  name: string;
  quiz_count: number;
}

export interface Quiz {
  id: number;
  title: string;
  category: Category;
  question_count: number;
}

export interface Question {
  id: number;
  title: string;
  quiz: Quiz;
  difficulty: "B" | "I" | "A";
}

export interface Option {
  id: number;
  option_text: string;
  question: Question;
  is_right: boolean;
}

export interface ResultOfQuiz {
  id: number;
  name: string;
  correct: string;
  wrong: string;
  empty: string;
  score: string;
  status: "poor" | "medium" | "normal" | "good" | "perfect";
}

export interface Questions {
  id: number;
  subject: string;
  subject_title: string;
  url: string;
  difficulty: string;
  correct: string;
  number_of_options: string;
}

export interface Grade {
  id: number;
  level: number;
}
export interface SelectedGrade {
  id: number;
  lesson_name: string;
  grade_level: number;
  title: string;
  question_count: number;
}
export interface SelectedSubject {
  id: number;
  subject: string;
  subject_title: string;
  url: string;
  difficulty: string;
  correct: string;
  number_of_options: string;
}
