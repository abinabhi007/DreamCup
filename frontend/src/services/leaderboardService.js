import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getLeaderboard = async () => {
  const response = await axios.get(`${API_URL}/api/leaderboard`);
  return response.data;
};
