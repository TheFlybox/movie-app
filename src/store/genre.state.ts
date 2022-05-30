import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Genre } from '../core/models/genre.model'

const initialState: Genre[] = [];

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    updateGenres: (state, action: PayloadAction<Genre[]>) => {
      state.push(...action.payload)
    } 
  }
});

export const { updateGenres } = genresSlice.actions;
export default genresSlice.reducer;