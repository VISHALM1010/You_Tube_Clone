import React from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/youtube.svg';
import search_btn from '../../assets/search.png';
import Upload_icon from '../../assets/upload.png';
import More_icon from '../../assets/more.png';
import Notification_icon from '../../assets/notification.png';
import Profile_icon from '../../assets/user_profile.jpg';
import { Link } from 'react-router-dom';

const Navbar = ({ setsidebar}) => {


  return (
    <nav className='flex-div'>
      <div className='nav-left flex-div'>
        <img className='menu_icon' onClick={() => setsidebar(prev => !prev)} src={menu_icon} alt='' />
        <Link to='/'> <img className='logo' src={logo} alt='' /> </Link>
      </div>
      <div className='nav-middle flex-div'>
        <div className='Search_box flex-div'>
          <input
            type='text'
            placeholder='Search...'
          
          />
          <img className='search_btn' src={search_btn} alt='' />
        </div>
      </div>
      <div className='nav-right flex-div'>
        <img src={Upload_icon} alt='' />
        <img src={More_icon} alt='' />
        <img src={Notification_icon} alt='' />
        <img className='Profile_icon' src={Profile_icon} alt='' />
      </div>
    </nav>
  );
};

export default Navbar;
