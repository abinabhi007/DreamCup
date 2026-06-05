import axios from "axios";

export const getMatches = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches`
  );

  return response.data;
};

export const getLiveMatches = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches/live`
  );

  return response.data;
};