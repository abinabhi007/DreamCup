import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = (token) => {
  const t = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const updatePlayerPoints = async (playerId, points, token) => {
  const response = await axios.post(
    `${API_URL}/api/admin/player-points`,
    { playerId, points: Number(points) },
    { headers: getHeaders(token) }
  );
  return response.data;
};

export const recalculateTeamPoints = async (token) => {
  const response = await axios.post(
    `${API_URL}/api/admin/recalculate-team-points`,
    {},
    { headers: getHeaders(token) }
  );
  return response.data;
};

export const autoSyncPoints = async (token) => {
  const response = await axios.post(
    `${API_URL}/api/admin/auto-sync-points`,
    {},
    { headers: getHeaders(token) }
  );
  return response.data;
};
