import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjection } from '../../core/hooks/use-injection.hook';
import { Movie } from '../../core/models/movie.model';
import { MovieService } from '../../core/services/movie.service';
import { AppState } from '../../store';
import { updateSelectedMovie } from '../../store/selected-movie.state';
import { MoviesCarouselComponent } from './components/movies-carousel/movies-carousel.component';
import { MoviesDetailsComponent } from './components/movies-details/movies-details.component';

export function MoviesComponent() {
  const movieService = useInjection(MovieService);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const selectedMovie = useSelector((state: AppState) => state.selectedMovie.selectedMovie);
  const movieDetailsVisible = useSelector((state: AppState) => state.selectedMovie.detailsVivible);
  const dispatch = useDispatch();

  const openMovieDetails = (movie: Movie) => {
    dispatch(updateSelectedMovie(movie));
  }

  const closeMovieDetails = (value: boolean) => {
    dispatch(updateSelectedMovie({}));
  }

  useEffect(() => {
    movieService.getPopularMovies().then((response) => {
      setPopularMovies(response.results);
    });
    movieService.getTopRatedMovies().then(response => {
      setTopRatedMovies(response.results);
    });
    movieService.getUpcomingMovies().then(response => {
      setUpcomingMovies(response.results);
    });
  }, []);

  return (
    <div className='movies pt-4'>
      <div className='container'>
        <MoviesCarouselComponent
          onMoviePostClick={(e) => openMovieDetails(e)}
          header='Upconming Movies'
          movies={upcomingMovies}
        />
        <br />
        <MoviesCarouselComponent
          onMoviePostClick={(e) => openMovieDetails(e)}
          header='Popular Movies'
          movies={popularMovies}
        />
        <br />
        <MoviesCarouselComponent
          onMoviePostClick={(e) => openMovieDetails(e)}
          header='Top Rated Movies'
          movies={topRatedMovies}
        />
        <br /><br />
      </div>
      {Object.keys(selectedMovie).length > 0  ? (
        <MoviesDetailsComponent
          movie={selectedMovie}
          visible={movieDetailsVisible}
          onHide={(visible) => closeMovieDetails(visible)}
        />
      ) : null}
    </div>
  );
}
