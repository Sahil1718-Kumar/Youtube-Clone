import React, {useState} from "react";
import './AdminLogin.css';
import { Link, useNavigate } from "react-router-dom";
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const AdminLogin = ({setAdminLogin}) => {
    const [loginField,setLoginField] = useState({"userName":"","password":""});
    const [loader,setLoader] = useState(false);
    const navigate = useNavigate();
    const handleOnChangeInput = (event,name) =>{
        setLoginField({
            ...loginField,[name]:event.target.value
        })
    }

    const handleLogin = async() => {
        setLoader(true);
            if(loginField.userName === "youtube" && loginField.password === "youtube"){
                setAdminLogin(true);
                toast.success("Admin logged in successfully.")
                navigate('/admin')
           
        }else{
            toast.error("Invalid Credentials")
            setLoader(false);
        }
    }
    return(
        <div className="adminLogin">
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
                    <Link to={'/'} className="login-btn" >Cancel</Link>
                </div>

                {loader && <Box sx={{ width: '100%', marginTop:"20px" }}>
                        <LinearProgress />
                    </Box>}

            </div>
            <ToastContainer/>
        </div>
    )
}
export default AdminLogin;