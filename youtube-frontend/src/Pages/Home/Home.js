import React from 'react';
import './Home.css';
import SideNavbar from '../../Component/SideNavbar/SideNavbar';
import HomePage from '../../Component/HomePage/HomePage';
const Home = ({sideNavbar})=> {
    return(
        <div className='home'>
            <SideNavbar sideNavbar={sideNavbar}/>
            <HomePage sideNavbar={sideNavbar}/>
        </div>
    )
}
export default Home;


