import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../core/models/movie.model';

const initialState: Movie[] = [];

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    addFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      state.push(action.payload)
    },
    removeFavoriteMovie(state, action: PayloadAction<Movie>) {
      return state.filter(x => x.id !== action.payload.id)
    }
  }
});

export const { addFavoriteMovie, removeFavoriteMovie } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;