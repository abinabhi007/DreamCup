import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = (token) => {
  const t = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const getTeam = async (token) => {
  const response = await axios.get(`${API_URL}/api/team`, {
    headers: getHeaders(token),
  });
  return response.data;
};

export const createTeam = async (token) => {
  const response = await axios.post(`${API_URL}/api/team`, {}, {
    headers: getHeaders(token),
  });
  return response.data;
};

export const addPlayer = async (playerId, token) => {
  const response = await axios.post(
    `${API_URL}/api/team/add-player`,
    { playerId },
    {
      headers: getHeaders(token),
    }
  );
  return response.data;
};

export const removePlayer = async (playerId, token) => {
  const response = await axios.delete(
    `${API_URL}/api/team/remove-player/${playerId}`,
    {
      headers: getHeaders(token),
    }
  );
  return response.data;
};

export const setCaptain = async (playerId, token) => {
  const response = await axios.put(
    `${API_URL}/api/team/set-captain`,
    { playerId },
    {
      headers: getHeaders(token),
    }
  );
  return response.data;
};

export const setViceCaptain = async (playerId, token) => {
  const response = await axios.put(
    `${API_URL}/api/team/set-vice-captain`,
    { playerId },
    {
      headers: getHeaders(token),
    }
  );
  return response.data;
};

export const getPlayersForMatch = async (matchId, token) => {
  const response = await axios.get(
    `${API_URL}/api/team/match/${matchId}`,
    {
      headers: getHeaders(token),
    }
  );
  return response.data;
};
