import { MenuItem } from "primereact/menuitem";
import { AppRouting } from "../../core/enums/app-routing.enum";
import { PrimeIcons } from "primereact/api";
import { NavigateFunction } from "react-router-dom";
import { Location } from "react-router-dom";

function getClassForItems(path: string, route: string) {
  return path === route ? 'active': '';
}

export const DEFAULT_MENU_ITEMS = (props: {
  navigate: NavigateFunction,
  location: Location
}): MenuItem[] => {
  const path = props.location.pathname;
  return [
    {
      label: 'Home',
      icon: PrimeIcons.HOME,
      command: () => props.navigate(AppRouting.MOVIES),
      className: path === AppRouting.MOVIES ? 'active' : ''
    },
    {
      label: 'Favorites',
      icon: PrimeIcons.HEART_FILL,
      command: () => props.navigate(AppRouting.MOVIES_FAVORITES),
      className: path === AppRouting.MOVIES_FAVORITES ? 'active' : ''
    },
    {
      label: 'Discover',
      icon: PrimeIcons.SEARCH,
      command: () => props.navigate(AppRouting.MOVIES_DISCOVER),
      className: path === AppRouting.MOVIES_DISCOVER ? 'active' : ''
    },
  ];
};