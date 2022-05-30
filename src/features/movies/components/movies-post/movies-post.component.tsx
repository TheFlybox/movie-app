import { Movie } from "../../../../core/models/movie.model";
import { getPosterURL } from "../../helpers/movie.helper";
import './movies-post.component.css';

export type MoviePostProps = {
  movie: Movie;
  isFavorite: boolean;
  onFavoriteButtonClick?: (item: Movie, value: boolean) => void;
  onClick: (item: Movie)=> void;
}

export function MoviesPostComponent(props: MoviePostProps) {
  const getFavoriteClass = () => {
    let result = 'favorite-button pi pi-heart-fill';
    props.isFavorite ? result = result.concat(' ', 'is-favorite') : '';
    return result;
  }
  return (
    <div className='movie-post shadow-1 select-none'>
      <div className='image'>
        <i
          className={getFavoriteClass()}
          onClick={() =>
            props.onFavoriteButtonClick?.(props.movie, !props.isFavorite)
          }></i>
        <img
          onClick={() => props.onClick(props.movie)}
          src={getPosterURL(props.movie)}
          alt='poster-image'
          className='movie-post-image shadow-4 border-round'
        />
      </div>
      <div className='pt-1' onClick={() => props.onClick(props.movie)}>
        <h4 className='m-0 p-0 mt-2 text-white'>{props.movie.title}</h4>
        <div className='flex align-items-center pt-1'>
          <span className='text-500'>
            {new Date(props.movie.release_date!).getFullYear()}
          </span>
          <div className='ml-auto'>
            <span className='movie-rating text-white mt-2 block'>
              <i className='pi pi-star-fill mr-2 text-yellow-500'></i>
              {props.movie.vote_average?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}