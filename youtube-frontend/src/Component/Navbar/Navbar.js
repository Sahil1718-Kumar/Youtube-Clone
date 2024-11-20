import React, { useState, useEffect } from "react";
import './Navbar.css';
import Login from "../Login/Login";
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 const Navbar = ({setSideNavbarFunc, sideNavbar, setSelfComment, setAdminLogin, adminLogin}) =>{
    const [userPic, setUserPic] = useState("https://static.vecteezy.com/system/resources/previews/027/448/973/large_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg");
    setSelfComment(userPic);
    const [navbarmModal, setNavbarModal] = useState(false);
    const [login,setLogin] = useState(false);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleClickModal = () =>{
        setNavbarModal(prev=>!prev); 
    }

    const sideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar);
    }
    const handleProfile = () => {
        let userId = localStorage.getItem("userId")
        navigate(`/user/${userId}`);
        
        setNavbarModal(false);
    }

    const setLoginModal = () => {
        setLogin(false);
    }

    const adminLoginOption = () => {
        navigate('/adminLogin');
        setNavbarModal(false);
        setUserPic('https://www.freepnglogos.com/uploads/youtube-logo-icon-transparent---32.png')
    }
    const setAdminLogoutModal = () => {
        setAdminLogin(false);
        navigate('/');
        setNavbarModal(false);
        setUserPic("https://static.vecteezy.com/system/resources/previews/027/448/973/large_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg");
    }

    const getLogoutFun = async() => {
        axios.post("http://localhost:4000/auth/logout",{},{ withCredentials: true}).then((res)=>{
            console.log("logout")
        }).catch(err=>{
            console.log(err)
        })
    }

    const onClickOfPopUpOption = (button) => {
        setNavbarModal(false);
        if(button==="login"){
            setLogin(true);
        } else{
            localStorage.clear();
            getLogoutFun();
            setTimeout(()=>{
                navigate('/')
                window.location.reload();
            },2000);
        }
    }

    useEffect(()=>{
        let userProfilePic = localStorage.getItem("userProfilePic");
        setIsLoggedIn(localStorage.getItem("userId")!==null?true:false);
        if(userProfilePic!==null){
            setUserPic(userProfilePic)
        }
    },[])
    return(
        <div className="navbar">
            <div className="navbar-left">
            {!adminLogin && <div className="navbarHamberger" onClick={sideNavbarFunc}>
                    <MenuIcon sx={{color:"white"}}/>
                </div>}
                <Link to={'/'} className="navbar_youtubeImg">
                    <YouTubeIcon sx={{fontSize:"34px"}} className="navbar_youtubeImage"/>
                    <div className="navbar_youtubeTitle">YouTube</div>
                </Link>
            </div>
            
            <div className="navbar-middle">
                <div className="navbar_searchBox">
                    <input type="text" placeholder="search" className="navbar_searchBoxInput"/>
                    <div className="navbar_searchIconBox"><SearchIcon sx={{fontSize:"28px", color:"white"}}/>
                    </div>
                    <div className="navbar_mic">
                        <KeyboardVoiceIcon sx={{color:"white"}}/>
                    </div>
                </div>
            </div>

            <div className="navbar_right">
            {!adminLogin && <Link to={'/763/upload'}>
                <VideoCallIcon sx={{fontSize:"30px",color: "white",cursor: "pointer"}}/>
                </Link>}
                {!adminLogin && <NotificationsIcon sx={{fontSize:"30px",color: "white",cursor: "pointer"}}/>}
                <img src={userPic} onClick={handleClickModal}className="navbar-right-logo" alt="logo"/>

                {navbarmModal &&
                <div className="navbar-modal">
                    {isLoggedIn && <div className="navbar-modal-option" onClick={handleProfile}> Profile</div>}
                    {isLoggedIn && <div className="navbar-modal-option" onClick={()=>onClickOfPopUpOption("logout")}>Logout</div>}
                    {!adminLogin && !isLoggedIn && <div className="navbar-modal-option" onClick={()=>onClickOfPopUpOption("login")}>User Login</div>}
                    {!isLoggedIn && !adminLogin && <div className="navbar-modal-option" onClick={adminLoginOption}> Admin Login</div>}
                    {adminLogin && <div className="navbar-modal-option" onClick={setAdminLogoutModal}> Admin Logout</div>}
                </div>
               }
            </div>

            {
                login && <Login setLoginModal={setLoginModal}/>
            }

        </div>
    )
 }
 export default Navbar;
