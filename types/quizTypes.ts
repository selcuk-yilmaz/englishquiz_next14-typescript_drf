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

//! below is using as current
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
export interface QuizSelectedSubj {
  id: number;
  subject: number;
  subject_title: string;
  url: string;
  difficulty: string;
  correct: string;
  number_of_options: string;
}

export interface QuizResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: QuizSelectedSubj[];
}
export interface WrongQuestion {
  id: number;
  subject_title: string;
  url: string;
  correct: string;
  difficulty:string;
}
export interface CorrectQuestion {
  id: number;
  subject_title: string;
  url: string;
  correct: string;
  difficulty:string;
}
export interface ResultOfQuiz {
  id: number;
  correct: number;
  empty: number;
  score: number;
  status: string;
  user: "";
  wrong: number;
  wrong_questions: WrongQuestion[];
  correct_questions: CorrectQuestion[];
}