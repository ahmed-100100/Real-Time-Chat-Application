import axios from "axios";
const BASE_URL = import.meta.env.VITE_URL;
export async function postUserData(url, payload) {
  try {
    const response = await axios.post(
      `${BASE_URL+url}`,
      payload,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error.response.data.message;
  }
}