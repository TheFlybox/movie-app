import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './genre.state';
import favoriteMoviesReducer from './favorite-movies.state';
import selectedMovieReducer from './selected-movie.state';

const store = configureStore({
  reducer: {
    genres: genresReducer,
    favoriteMovies: favoriteMoviesReducer,
    selectedMovie: selectedMovieReducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export default store;