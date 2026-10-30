import axios from "axios";

const apiKey = "b81bdfd262d7b6be8c3e4f64025dde13"
const BASE_URL = "https://api.themoviedb.org/3"

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: apiKey,
    },
});

export const getTrendingMovies = async () => {
    const response = await api.get(`/trending/movie/day`)
    return response.data;
}

export const searchMovies = async searchValue => {
    const response = await api.get(`/search/movie`, {
        params: {
            query: searchValue,
             include_adult: false,
        }
    })
    return response.data;
}

export const getMovieDetails = async movieId => {
    const response = await api.get(`/movie/${movieId}`)
    return response.data;
}

export const getMovieCast = async movieId => {
    const response = await api.get(`/movie/${movieId}/credits`)
    return response.data;
}

export const getMovieReviews = async movieId => {
    const response = await api.get(`/movie/${movieId}/reviews`)
    return response.data;
}