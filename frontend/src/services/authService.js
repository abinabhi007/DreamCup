import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData) => {
  console.log("API URL:", API_URL); // will be http://localhost:5000

  const response = await axios.post(
    `${API_URL}/api/auth/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/api/auth/login`,
    userData
  );

  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(
    `${API_URL}/api/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};