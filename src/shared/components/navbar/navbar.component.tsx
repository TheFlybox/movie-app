import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import './navbar.component.css';
import logo from '../../images/film-xxl.png';

export function NavbarComponent(props: { menuItems: MenuItem[] }) {
  return (
    <div className="navbar shadow-1">
      <div className="container">
        <Menubar 
          start={
            <div className='flex align-items-center'>
              <img src={logo} className="logo mr-3" />
              <span className='font-bold text-white text-lg'>Pelina Beer</span>
            </div>
          }
          className='bg-transparent border-none border-noround custom-menubar' 
          model={props.menuItems}></Menubar>
      </div>
    </div>
  )
}