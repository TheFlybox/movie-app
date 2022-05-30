import axios from "axios";
import { injectable } from "inversify";
import { ServiceEntity } from "../entities/service.entity";
import { BaseApiUrls, MovieApiUrls } from "../enums/api-urls.enum";
import { MovieResponse } from "../models/movie-response.model";

@injectable()
export class MovieService extends ServiceEntity{
  constructor() {
    super(BaseApiUrls.MOVIE_BASE_API_URL);
  }

  async getPopularMovies(): Promise<MovieResponse> {
    return axios.get<MovieResponse>(this.getFormattedURL(MovieApiUrls.POPULAR))
    .then(result => result.data);
  }

  async getTopRatedMovies(): Promise<MovieResponse> {
    return axios.get<MovieResponse>(this.getFormattedURL(MovieApiUrls.TOP_RATED))
    .then(result => result.data);
  }

  async getUpcomingMovies(): Promise<MovieResponse> {
    return axios.get<MovieResponse>(this.getFormattedURL(MovieApiUrls.UPCOMING))
    .then(result => result.data);
  }

  async getLatestMovies(): Promise<MovieResponse> {
    return axios.get<MovieResponse>(this.getFormattedURL(MovieApiUrls.LATEST))
    .then(result => result.data);
  }

  async getMoviesByQuery(query: string, page: number = 1) {
    return axios
      .get<MovieResponse>(this.getFormattedURL(MovieApiUrls.SEARCH), {
        params: {
          page: page,
          query: query,
        },
      })
      .then((result) => result.data);
  }
}