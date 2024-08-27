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
} from "../types/quizTypes";

//! get grades info for category component
export const fetchGrades = async (): Promise<Grade[]> => {
  const response = await axios.get("/api/grade/");
  // console.log(response);
  return response.data;
};
//! get all_subjects from api/subjects
export const fetchAllSubjects = async (): Promise<AllSubjects[]> => {
  const response = await axios.get("/api/subject/");
  // console.log(response);
  return response.data;
};
//! get questions info according to grade
export const fetchQuizByGrade = async (
  id: number
): Promise<SelectedGrade[]> => {
  const response = await axios.get(`/api/grade/${id}/`);
  return response.data;
};
//! get questions according to subject
export const fetchQuizBySubject = async (
  slug: string
): Promise<QuizResponse> => {
  try {
    console.log(
      `/api/subject/${slug[0]}/?limit=${slug[1]}&offset=${
        parseInt(slug[1], 10) - 10
      }`
    );
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

//! post student responses to be for calculate
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


//! post for create question
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

//! put updateQuestion
// export const updateQuestion = async (id: number, quiz: Quiz): Promise<Quiz> => {
//   const response = await axios.put(`/quizzes/${id}/`, quiz);
//   return response.data;
// };


//! delete deleteQuestion
export const deleteQuestion = async (id: number): Promise<void> => {
  await axios.delete(`/quizzes/${id}/`);
};


//! post create grade
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






