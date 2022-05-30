import { Movie } from "../../../../core/models/movie.model";
import { Dialog } from 'primereact/dialog';
import { Chip } from 'primereact/chip';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef, useState } from "react";
import { getGenres, getPosterURL, isInFavorites, resetBodyOverflow, toggleFavorite } from "../../helpers/movie.helper";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../store";
import './movies-details.component.css';
import { addFavoriteMovie, removeFavoriteMovie } from "../../../../store/favorite-movies.state";
import { MessageService } from "../../../../core/services/message.service";
import { useInjection } from "../../../../core/hooks/use-injection.hook";

export type MovieDetailsProps = {
  movie: Movie;
  visible: boolean;
  onHide: (value: boolean) => void;
}

export function MoviesDetailsComponent(props: MovieDetailsProps) {
  const [isVisible, setIsVisible] = useState(props.visible);
  const toast = useRef<Toast>(null);
  const genres = useSelector((state: AppState) => state.genres);
  const favoriteMovies = useSelector((state: AppState) => state.favoriteMovies);
  const messageService = useInjection(MessageService);
  const dispatch = useDispatch();

  const onHide = () => {
    setIsVisible(false);
    props.onHide(isVisible);
    resetBodyOverflow();
  }

  return (
    <div className='movie-details'>
      <Dialog
        header='Movie Details'
        modal={true}
        blockScroll={isVisible}
        dismissableMask={true}
        draggable={false}
        visible={isVisible}
        style={{ width: '75vw' }}
        onHide={onHide}>
        <div className='w-full grid'>
          <div className='col-4 col-md-4 col-lg-4'>
            <div className='movie-poster-container'>
              <img
                src={getPosterURL(props.movie)}
                className='movie-details-poster max-w-full border-round shadow-2'
              />
            </div>
          </div>
          <div className='col-8 col-md-8 col-lg-8'>
            <div className='mx-3'>
              <h1 className='text-white p-0 m-0'>{props.movie.title}</h1>
              <div className='mt-3 flex align-items-center'>
                <span className='block text-500'>
                  <i className='pi pi-calendar mr-2'></i>
                  {new Date(props.movie.release_date!).getFullYear()}
                </span>
                <span className='divider mx-3'></span>
                <span className='block text-500'>
                  <i className='pi pi-globe mr-2'></i>
                  {props.movie.original_language?.toUpperCase()}
                </span>
              </div>
              <div className='flex align-items-center flex-wrap mt-4'>
                {getGenres(props.movie.genre_ids!, genres).map(
                  (genre, index) => {
                    return (
                      <Chip key={index} className='mr-2' label={genre}></Chip>
                    );
                  }
                )}
              </div>
              <br />
              <p className='text-700 font-medium line-height-3'>
                {props.movie.overview}
              </p>
              <br />
              <span>
                Vote count: <b>{props.movie.vote_count}</b>
              </span>
              <div className='rating-stars flex align-items-center mt-2'>
                <span className='mr-2 font-bold text-lg bg-blue-200 text-0 p-1 border-round'>
                  {props.movie.vote_average?.toFixed(2)}
                </span>
                <Rating
                  value={props.movie.vote_average}
                  readOnly
                  stars={10}
                  cancel={false}
                />
              </div>
              <br />
              <br />
              <div className='favorite-buttons'>
                {isInFavorites(props.movie, favoriteMovies) ? (
                  <Button
                    className='p-button-outlined p-button-lg'
                    label='Remove From Favorites'
                    icon='pi pi-trash'
                    onClick={()=> toggleFavorite(props.movie, false, dispatch, messageService)}
                  />
                ) : (
                  <Button
                    className='p-button-outlined p-button-lg'
                    label='Add To Favorites'
                    icon='pi pi-plus'                    
                    onClick={()=> toggleFavorite(props.movie, true, dispatch, messageService)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
}