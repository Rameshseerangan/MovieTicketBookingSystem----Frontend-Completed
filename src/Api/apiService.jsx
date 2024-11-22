const API_KEY = "e269b6a8";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, type = "", page = 1) => {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}&type=${type}&page=${page}`
  );
  return await response.json();
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  return await response.json();
};
