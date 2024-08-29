import axios from "../utils/axiosInstance";
import {
  // Quiz,
  // Question,
  // Category,
  Questions,
  SelectedGrade,
  Grade,
  QuizResponse,
  AllSubjects,
  CreateQuestion,
  Lessons,
} from "../types/quizTypes";

//! post-get-delete lessons
export const postCreateLesson = async (
  formData: FormData // FormData object to send
): Promise<any> => {
  try {
    const response = await axios.post("/api/lesson/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // multipart/form-data for file upload
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to post lesson", error);
    throw error;
  }
};
export const fetchLessons = async (): Promise<Lessons[]> => {

  const response = await axios.get("/api/lesson/");
  // console.log(response);
  return response.data;
};
export const deleteLesson = async (id: number): Promise<void> => {
  await axios.delete(`/api/lesson/${id}/`);
};
//! post-get-delete grades
export const postCreateGrade = async (
  formData: FormData // FormData object to send
): Promise<any> => {
  try {
    const response = await axios.post("/api/grade/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // multipart/form-data for file upload
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to post grade", error);
    throw error;
  }
};
export const fetchGrades = async (): Promise<Grade[]> => {
  const response = await axios.get("/api/grade/");
  // console.log(response);
  return response.data;
};
export const deleteGrade = async (id: number): Promise<void> => {
  await axios.delete(`/api/grade/detail/${id}/`);
};
export const fetchQuizByGrade = async (
  id: number
): Promise<SelectedGrade[]> => {
  const response = await axios.get(`/api/grade/${id}/`);
  return response.data;
};

//! get-post-delete subjects 
export const fetchAllSubjects = async (): Promise<AllSubjects[]> => {
  const response = await axios.get("/api/subject/");
  // console.log(response);
  return response.data;
};

export const fetchQuizBySubject = async (
  slug: string
): Promise<QuizResponse> => {
  try {
    const response = await axios.get(
      `/api/subject/${slug[0]}/?limit=${slug[1]}&offset=${
        parseInt(slug[1], 10) - 10
      }`
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.error(`Subject with slug "${slug}" not found.`);
    }
    throw error; // rethrow the error to be caught by your page component
  }
};
export const postCreateSubject = async (
  formData: FormData // FormData object to send
): Promise<any> => {
  try {
    const response = await axios.post("/api/subject/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to post subject", error);
    throw error;
  }
};
export const deleteSubject = async (id: number): Promise<void> => {
  await axios.delete(`/api/subject/detail/${id}/`);
};
//! post-put-delete questions 
export const postCreateQuestion = async (
  formData: FormData // FormData object to send
): Promise<any> => {
  // Expecting the response from the server
  try {
    // console.log("questions for post", formData);
    const response = await axios.post("/api/questions/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // multipart/form-data for file upload
      },
    });
    return response.data; // return the server's response
  } catch (error) {
    console.error("Failed to post question", error);
    throw error;
  }
};

// export const updateQuestion = async (id: number, quiz: Quiz): Promise<Quiz> => {
//   const response = await axios.put(`/quizzes/${id}/`, quiz);
//   return response.data;
// };


export const deleteQuestion = async (id: number): Promise<void> => {
  await axios.delete(`/api/questions/${id}/`);
};

//! post results for student responses to be for calculate
interface StudentResType {
  id: number;
  selectedOption: string;
}

interface PostResponsesPayload {
  studentResponses: StudentResType[];
}

export const postStudentResponses = async (
  studentResponses: StudentResType[]
): Promise<any> => {
  const payload: PostResponsesPayload = { studentResponses };

  try {
    const response = await axios.post("/api/results/", payload);
    return response.data;
  } catch (error) {
    console.error("Failed to post student responses", error);
    throw error;
  }
};



//! belows are example
export const fetchQuizzes = async (): Promise<Questions[]> => {
  const response = await axios.get("/api/questions/");
  // console.log(response);
  return response.data;
};
export const fetchAllQuestions = async (): Promise<Questions[]> => {
  const response = await axios.get("/api/questions/");
  // console.log(response.data);
  return response.data;
};






