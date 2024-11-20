import React, {useState} from "react";
import './Login.css';
import { Link } from "react-router-dom";
import axios from "axios";
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Login = ({setLoginModal}) => {
    const [loginField,setLoginField] = useState({"userName":"","password":""});
    const [loader,setLoader] = useState(false);
    const handleOnChangeInput = (event,name) =>{
        setLoginField({
            ...loginField,[name]:event.target.value
        })
    }

    const handleLogin = async() => {
        setLoader(true);
        axios.post('http://localhost:4000/auth/login',loginField, { withCredentials: true}).then((resp)=>{
            setLoader(false);
            localStorage.setItem("token",resp.data.token)
            localStorage.setItem("userId",resp.data.user._id)
            localStorage.setItem("userProfilePic",resp.data.user.profilePic)
            window.location.reload();
        }).catch(err=>{
            toast.error("Invalid Credentials")
            console.log(err)
            setLoader(false);
        })
    }
    return(
        <div className="login">
            <div className="login_card">
                <div className="titleCard_login">
                <YouTubeIcon sx={{fontSize: "54px",color: "red"}} className="login_youtubeImage"/>
                Login
                </div>

                <div className="loginCredentials">
                    <div className="userNameLogin">
                        <input className="userNameLoginUserName" value={loginField.userName} name="userName" placeholder="Username" type="text" onChange={(e)=>handleOnChangeInput(e,"userName")}/>
                    </div>
                    <div className="userNameLogin">
                        <input className="userNameLoginUserName" value={loginField.password} name="password" placeholder="Password" type="password" onChange={(e)=>handleOnChangeInput(e,"password")}/>
                    </div>
                </div>

                <div className="login_buttons">
                    <div className="login-btn" onClick={handleLogin}>Login</div>
                    <Link to={'/signup'} className="login-btn" onClick={()=>setLoginModal()}>SignUp</Link>
                    <div className="login-btn" onClick={()=>setLoginModal()}>Cancel</div>
                </div>

                

                {loader && <Box sx={{ width: '100%', marginTop:"20px" }}>
                        <LinearProgress />
                    </Box>}

            </div>
            <ToastContainer/>
        </div>
    )
}
export default Login;