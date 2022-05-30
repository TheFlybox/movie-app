import { Movie } from "../../../../core/models/movie.model";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { MoviesPostComponent } from "../movies-post/movies-post.component";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './movies-carousel.component.css';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { useInjection } from "../../../../core/hooks/use-injection.hook";
import { MessageService } from "../../../../core/services/message.service";
import { isInFavorites, toggleFavorite } from "../../helpers/movie.helper";
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from "react";

export type MovieCarouselProps = {
  header: string;
  movies: Movie[];
  onMoviePostClick: (movie: Movie) => void;
}

export function MoviesCarouselComponent(props: MovieCarouselProps) {
  const favorites = useSelector((state: AppState) => state.favoriteMovies);
  const dispatch = useDispatch();
  const messageService = useInjection(MessageService);
  const [sortValue, setSortValue] = useState('');
  const [movieList, setMovieList] = useState([...props.movies]);

  useEffect(()=> {
    setTimeout(()=> {
      setSortValue('rating');
    }, 200);
  }, []);

  useEffect(() => {
    setMovieList([...props.movies]);
  }, [props.movies]);

  useEffect(()=> {
    if(sortValue.length > 0) {
      switch(sortValue) {
        case 'name': {
          setMovieList([...movieList.sort((a, b) => a.title?.localeCompare(b.title!)!)]);
          break;
        }
        case 'year': {
          setMovieList([...movieList.sort((a, b) => getYear(a.release_date!) - getYear(b.release_date!))]);
          break;
        }
        case 'rating': {
          setMovieList([...movieList.sort((a, b) => b.vote_average! - a.vote_average!)]);
          break;
        }
      }
    }
  }, [sortValue]);

  const sortItems = [
    { label: 'Name', value: 'name' },
    { label: 'Year', value: 'year' },
    { label: 'Rating', value: 'rating' }
  ];

  const getYear = (date: string) => {
    return new Date(date).getFullYear();
  }

  return (
    <div className='movies-carousel-component'>
      <div className="flex mb-1 align-items-center">
        <h1 className='text-white font-medium text-3xl'>{props.header}</h1>
        <div className="ml-auto">
          <Dropdown 
            optionLabel="label" 
            optionValue="value"
            value={sortValue}
            options={sortItems} 
            onChange={(e) => setSortValue(e.value)} 
            placeholder="Sort by"/>
        </div>
      </div>      
      <span className="block py-2"></span>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={5}
        slidesPerGroup={5}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}>
        {movieList.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <MoviesPostComponent
                isFavorite={isInFavorites(item, favorites)}
                onFavoriteButtonClick={(movie, value) => toggleFavorite(movie, value, dispatch, messageService)}
                onClick={(movie) => props.onMoviePostClick(movie)}
                movie={item}></MoviesPostComponent>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}