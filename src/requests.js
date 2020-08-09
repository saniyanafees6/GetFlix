import dotenv from 'dotenv';

dotenv.config();

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
  getTrending: `/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  getUpcoming: `/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  getSimilar: `/movie/{movie_id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  getNowPlaying: `/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  getMovieDetails: `/movie/{movie_id}?api_key=${TMDB_API_KEY}&language=en-US`,
};
export default requests;
