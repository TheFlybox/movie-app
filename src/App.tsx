import './App.css';
import { useEffect, useRef } from 'react';
import { useInjection } from './core/hooks/use-injection.hook';
import { GenreService } from './core/services/genre.service';
import { useDispatch } from 'react-redux';
import { updateGenres } from './store/genre.state';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DEFAULT_MENU_ITEMS } from './shared/menus/default.menu';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppRouting } from './core/enums/app-routing.enum';
import { MoviesComponent } from './features/movies/movies.component';
import { FavoritesComponent } from './features/movies/components/movies-favorites/movies-favorites.component';
import { Toast } from 'primereact/toast';
import { MessageService } from './core/services/message.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MoviesDiscoverComponent } from './features/movies/components/movies-discover/movies-discover.component';

function App() {
  const genreService = useInjection(GenreService);
  const messageService = useInjection(MessageService);
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=> {
    genreService.getMoviesGenres().then(response => {
      dispatch(updateGenres(response.genres));
    });
    messageService.setToastRef(toast);
  }, []);

  return (
    <div className="app">
      <div className="app-navbar">
        <NavbarComponent menuItems={DEFAULT_MENU_ITEMS({navigate: navigate, location: location})} />
      </div>
      <div className="app-content">
        <Routes>
          <Route path={AppRouting.DEFAULT} element={<Navigate to={AppRouting.MOVIES} />} />
          <Route path={AppRouting.MOVIES} element={<MoviesComponent />} />
          <Route path={AppRouting.MOVIES_FAVORITES} element={<FavoritesComponent />} />
          <Route path={AppRouting.MOVIES_DISCOVER} element={<MoviesDiscoverComponent />} />
          <Route path={AppRouting.WIDLCARD} element={<Navigate to={AppRouting.MOVIES} />}/>
        </Routes>
      </div>      
      <FooterComponent />
      <Toast ref={toast} />
    </div>
  );
}

export default App;
