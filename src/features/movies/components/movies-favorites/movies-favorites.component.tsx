import { useDispatch, useSelector } from "react-redux";
import { useInjection } from "../../../../core/hooks/use-injection.hook";
import { Movie } from "../../../../core/models/movie.model";
import { MessageService } from "../../../../core/services/message.service";
import { EmptyListComponent } from "../../../../shared/components/empty-list/empty-list.component";
import { AppState } from "../../../../store";
import { updateSelectedMovie } from "../../../../store/selected-movie.state";
import { toggleFavorite } from "../../helpers/movie.helper";
import { MoviesDetailsComponent } from "../movies-details/movies-details.component";
import { MoviesPostComponent } from "../movies-post/movies-post.component";
import './movies-favorites.component.css';

export function FavoritesComponent() {
  const favoriteMovies = useSelector((state: AppState) => state.favoriteMovies);
  const selectedMovie = useSelector((state: AppState) => state.selectedMovie.selectedMovie);
  const movieDetailsVisible = useSelector((state: AppState) => state.selectedMovie.detailsVivible);
  const messageService = useInjection(MessageService);
  const dispatch = useDispatch();

  const openMovieDetails = (movie: Movie) => {
    dispatch(updateSelectedMovie(movie));
  }

  const closeMovieDetails = (value: boolean) => {
    dispatch(updateSelectedMovie({}));
  }

  return (
    <div className="movies">
      <div className="container">
        <span className="block mt-6"></span>
        <h1 className='text-white font-medium text-3xl mb-1'>Favorite Movies</h1>
        <div className="flex flex-wrap -mx-5">
          {
            favoriteMovies.length === 0 ? (
              <EmptyListComponent header="Empty List" text="The favorite list of movies is empty" />
            ) : (
              favoriteMovies.map((favorite, index) => {
                return (
                  <div key={index} className='favorite-item'>
                    <MoviesPostComponent
                      isFavorite={true}
                      onFavoriteButtonClick={(movie, value) =>
                        toggleFavorite(movie, value, dispatch, messageService)
                      }
                      onClick={(e) => openMovieDetails(e)}
                      movie={favorite}
                    />
                  </div>
                );
              })
            )
          }
        </div>
      </div>
      {Object.keys(selectedMovie).length > 0 ? (
        <MoviesDetailsComponent
          movie={selectedMovie}
          visible={movieDetailsVisible}
          onHide={(visible) => closeMovieDetails(visible)}
        />
      ) : null}
    </div>
  )
}