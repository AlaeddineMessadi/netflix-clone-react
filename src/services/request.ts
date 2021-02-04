import axios from "axios";

// 54dded8a427f6e77e431ec274fa10e00
// https://api.themoviedb.org/3/movie/550?api_key=54dded8a427f6e77e431ec274fa10e00

export const Axios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const API_KEY = "54dded8a427f6e77e431ec274fa10e00";

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export const image_base_url = "https://image.tmdb.org/t/p/original/";
