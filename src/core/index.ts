import { initInjector } from "./injector/service.injector";
import { GenreService } from "./services/genre.service";
import { MessageService } from "./services/message.service";
import { MovieService } from "./services/movie.service";

const SERVICE_PROVIDERS = [
  MovieService,
  GenreService,
  MessageService
];

export function core() {
  initInjector(SERVICE_PROVIDERS);
}