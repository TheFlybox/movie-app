import logo from '../../images/film-xxl.png';

export function FooterComponent() {
  return (
    <div className='surface-section px-4 md:px-6 lg:px-8'>
      <div className='py-6 flex flex-column sm:flex-row sm:align-items-center justify-content-between'>
        <div>
          <div className='flex align-items-center'>
            <img src={logo} className="logo mr-3" />
            <span className='font-bold text-white text-lg'>Pelina Beer</span>
          </div>
          <div className='mt-2 line-height-3 text-500'>
            © 2022 Pelina Beer, Inc. All rights reserved
          </div>
        </div>
        <div className='mt-3 sm:mt-0'>
          <a className='cursor-pointer text-500 transition-colors transition-duration-150 hover:text-700'>
            <i className='pi pi-twitter text-xl'></i>
          </a>
          <a className='cursor-pointer text-500 ml-3 transition-colors transition-duration-150 hover:text-700'>
            <i className='pi pi-facebook text-xl'></i>
          </a>
          <a className='cursor-pointer text-500 ml-3 transition-colors transition-duration-150 hover:text-700'>
            <i className='pi pi-github text-xl'></i>
          </a>
        </div>
      </div>
    </div>
  );
}
