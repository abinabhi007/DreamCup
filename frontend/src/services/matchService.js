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

export const getFinishedMatches = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches/results`
  );
  return response.data;
};

export const getStandings = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches/standings`
  );
  return response.data;
};

export const getTopGoalScorers = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches/top-scorers`
  );
  return response.data;
};

export const getMatchById = async (id) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${id}`
  );
  return response.data;
};