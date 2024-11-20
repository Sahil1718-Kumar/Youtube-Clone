
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';
import VideoUplaod from './Pages/VideoUplaod/VideoUplaod';
import Profile from './Pages/Profile/Profile';
import SignUp from './Pages/SignUp/SignUp';
import Admin from './Pages/Admin/Admin';
import AdminLogin from './Component/AdminLogin/AdminLogin';
import AdminVideo from './Pages/AdminVideo/AdminVideo';
import AdminProfile from './Pages/AdminProfile/AdminProfile';
import LandingPage from './Component/LandingPage/LandingPage';
import { useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';


function App() {
  const [sideNavbar,setSideNavbar] = useState(true);
const [adminLogin, setAdminLogin] = useState(false);
  const setSideNavbarFunc = (value) => {
    setSideNavbar(value)
  }

  const [selfComment,setSelfComment] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
          setLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
  }, []);
return (
  <div className="App">
    
    {loading ? (<LandingPage />) : (<>
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} setSelfComment={setSelfComment} setAdminLogin={setAdminLogin} adminLogin={adminLogin}/>
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar}/>}/>
        <Route path='/watch/:id' element={<Video selfComment={selfComment}/>}/>
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar}/>}/>
        <Route path='/:id/upload' element={<VideoUplaod/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/adminLogin' element={<AdminLogin setAdminLogin={setAdminLogin}/>}/>
        <Route path='/delete/:id' element={<AdminVideo/>}/>
        <Route path='/deleteUser/:id' element={<AdminProfile/>}/>
      </Routes></>)}
    </div>
  );
}

export default App;
