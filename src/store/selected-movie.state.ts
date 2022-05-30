import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../core/models/movie.model';

const initialState: { detailsVivible: boolean, selectedMovie: Movie } = {
  detailsVivible: false,
  selectedMovie: {}
}

const selectedMovieSlice = createSlice({
  name: 'selectedMovie',
  initialState,
  reducers: {
    updateSelectedMovie: (state, action: PayloadAction<Movie>) => {
      state.selectedMovie = action.payload;
      if(action.payload.id) state.detailsVivible = true;
      else state.detailsVivible = false;
    }
  }
});

export const { updateSelectedMovie } = selectedMovieSlice.actions;
export default selectedMovieSlice.reducer;