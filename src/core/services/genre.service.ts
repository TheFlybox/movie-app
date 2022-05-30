import axios from "axios";
import { injectable } from "inversify";
import { ServiceEntity } from "../entities/service.entity";
import { BaseApiUrls, GenreApiUrls } from "../enums/api-urls.enum";
import { GenreResponse } from "../models/genre-response.model";

@injectable()
export class GenreService extends ServiceEntity {
  constructor() {
    super(BaseApiUrls.MOVIE_BASE_API_URL);
  }

  async getMoviesGenres(): Promise<GenreResponse> {
    let url = this.getFormattedURL(GenreApiUrls.MOVIE_GENRES);
    return axios.get<GenreResponse>(url).then(response => response.data);
  }
}