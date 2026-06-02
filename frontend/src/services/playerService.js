import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPlayers = async (page = 1, limit = 10) => {
    const response = await axios.get(
        `${API_URL}/api/players?page=${page}&limit=${limit}`
    );

    return response.data;
};

export const getPlayerById = async (playerId) => {
    const response = await axios.get(
        `${API_URL}/api/players/${playerId}`
    );

    return response.data;
};

export const searchPlayers = async (query, page = 1, limit = 10) => {
    const response = await axios.get(
        `${API_URL}/api/players/search?query=${query}&page=${page}&limit=${limit}`
    );

    return response.data;
};
