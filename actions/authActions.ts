import axios from "../utils/axiosInstance";

export const createUser = async (
  formData: FormData // FormData object to send
): Promise<any> => {
  try {
    //   console.log(formData);
    const response = await axios.post("/users/auth/register/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // multipart/form-data for file upload
      },
    });
    return response.data;
    // console.log(response);
  } catch (error) {
    console.error("Failed to post lesson", error);
    throw error;
  }
};
