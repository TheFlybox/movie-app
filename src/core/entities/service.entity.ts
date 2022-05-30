import { BaseApiUrls } from "../enums/api-urls.enum";
import * as Environment from '../config/config';

export abstract class ServiceEntity {
  private _baseApiUrl: BaseApiUrls;
  private _apiKey?: string;

  constructor(baseApiUrl: BaseApiUrls) {
    this._baseApiUrl = baseApiUrl;
    this._apiKey = Environment.default.API_KEY;
  }

  protected getFormattedURL(url: string) {
    return `${this._baseApiUrl}${url}?api_key=${this._apiKey}`
  }
}