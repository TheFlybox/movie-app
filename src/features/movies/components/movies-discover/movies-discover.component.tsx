import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjection } from '../../../../core/hooks/use-injection.hook';
import { Movie } from '../../../../core/models/movie.model';
import { MessageService } from '../../../../core/services/message.service';
import { MovieService } from '../../../../core/services/movie.service';
import { EmptyListComponent } from '../../../../shared/components/empty-list/empty-list.component';
import { AppState } from '../../../../store';
import { updateSelectedMovie } from '../../../../store/selected-movie.state';
import { isInFavorites, toggleFavorite } from '../../helpers/movie.helper';
import { MoviesDetailsComponent } from '../movies-details/movies-details.component';
import { MoviesPostComponent } from '../movies-post/movies-post.component';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import './movies-discover.component.css';

export function MoviesDiscoverComponent() {
  const movieService = useInjection(MovieService);
  const messageService = useInjection(MessageService);
  const favoriteMovies = useSelector((state: AppState) => state.favoriteMovies);
  const selectedMovie = useSelector((state: AppState) => state.selectedMovie.selectedMovie);
  const movieDetailsVisible = useSelector((state: AppState) => state.selectedMovie.detailsVivible);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [first, setFirst] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const rows = 20;
  const dispatch = useDispatch();

  useEffect(()=> {
    if(query.length > 0) {
      setTimeout(()=> {
        getMovies();
      }, 1200);
    }
  }, [query]);

  const getMovies = () => {
    movieService.getMoviesByQuery(query, page).then(response => {
      setFilteredMovies(response.results);
      setTotalRecords(response.total_results);
    });
  }

  const updateFirst = (first: number, page: number) => {
    setFirst(first);
    setPage(page);
    getMovies();
  }

  const openMovieDetails = (movie: Movie) => {
    dispatch(updateSelectedMovie(movie));
  };

  const closeMovieDetails = (value: boolean) => {
    dispatch(updateSelectedMovie({}));
  };

  return (
    <div className='movies-discover-component'>
      <div className="container">
      <span className="block mt-6"></span>
      <h1 className='text-white font-medium text-3xl mb-1'>Search Movies</h1>
      <br />
      <div className="w-full">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      </span>
      </div>
      <br />
      <div className='flex flex-wrap -mx-5'>
        {filteredMovies.length === 0 ? (
          <EmptyListComponent
            header='Empty List'
            text='The response is coming empty'
          />
        ) : (
          filteredMovies.map((favorite, index) => {
            return (
              <div key={index} className='filtered-item'>
                <MoviesPostComponent
                  isFavorite={isInFavorites(favorite, favoriteMovies)}
                  onFavoriteButtonClick={(movie, value) =>
                    toggleFavorite(movie, value, dispatch, messageService)
                  }
                  onClick={(e) => openMovieDetails(e)}
                  movie={favorite}
                />
              </div>
            );
          })
        )}
      </div>
      <Paginator 
        totalRecords={totalRecords} 
        first={first} rows={rows} 
        onPageChange={(e) => updateFirst(e.first, e.page)}></Paginator>
      {Object.keys(selectedMovie).length > 0 ? (
        <MoviesDetailsComponent
          movie={selectedMovie}
          visible={movieDetailsVisible}
          onHide={(visible) => closeMovieDetails(visible)}
        />
      ) : null}
      </div>
    </div>
  );
}
