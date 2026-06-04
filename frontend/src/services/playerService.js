import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPlayers = async (options = {}) => {
  let page = 1;
  let limit = 10;
  let search = "";
  let position = "";
  let team = "";

  if (options && typeof options === "object") {
    page = options.page || 1;
    limit = options.limit || 10;
    search = options.search || "";
    position = options.position || "";
    team = options.team || "";
  }

  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (search) params.append("search", search);
  if (position && position !== "All") params.append("position", position);
  if (team && team !== "All Teams" && team !== "All") params.append("team", team);

  const response = await axios.get(
    `${API_URL}/api/players?${params.toString()}`
  );

  return response.data;
};

export const getPlayerById = async (playerId) => {
  // Fallback: search for player in the list since no direct getById endpoint exists
  const response = await axios.get(`${API_URL}/api/players?limit=100`);
  if (response.data && response.data.players) {
    return response.data.players.find(p => p._id === playerId);
  }
  return null;
};

export const searchPlayers = async (query, page = 1, limit = 10) => {
  return getPlayers({ search: query, page, limit });
};

export const syncPlayers = async (token) => {
  const t = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  const headers = t ? { Authorization: `Bearer ${t}` } : {};
  const response = await axios.post(`${API_URL}/api/players/sync`, {}, { headers });
  return response.data;
};

