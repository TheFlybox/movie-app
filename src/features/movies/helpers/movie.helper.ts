import { Dispatch } from "@reduxjs/toolkit";
import { BaseApiUrls } from "../../../core/enums/api-urls.enum";
import { Genre } from "../../../core/models/genre.model";
import { Movie } from "../../../core/models/movie.model";
import { MessageService } from "../../../core/services/message.service";
import { addFavoriteMovie, removeFavoriteMovie } from "../../../store/favorite-movies.state";
import { PosterSize } from "../enums/poster-size.enum";

export function getPosterURL(movie: Movie, posterSize?: PosterSize) {
  const base = BaseApiUrls.MOVIE_POSTER_API_URL;
  const size = posterSize ? posterSize : PosterSize.W500;
  return base.concat(size, movie.poster_path ?? '');
}

export function getGenres(ids: number[], data: Genre[]) {
  return [...new Set(data.filter(x => ids.includes(x.id)).map(y => y.name))];
}

export function resetBodyOverflow() {
  document.body.classList.toggle('p-overflow-hidden');
}

export function isInFavorites(target: Movie, source: Movie[]) {
  return source.filter(x => x.id === target.id).length > 0;
}

export function toggleFavorite(
  movie: Movie,
  value: boolean,
  dispatch: Dispatch,
  messageService: MessageService
) {
  if (value) {
    dispatch(addFavoriteMovie(movie));
    messageService.show({
      severity: 'success',
      summary: 'Favorites',
      detail: 'Added to favorites',
    });
  } else {
    dispatch(removeFavoriteMovie(movie));
    messageService.show({
      severity: 'info',
      summary: 'Favorites',
      detail: 'Removed from favorites',
    });
  }
}