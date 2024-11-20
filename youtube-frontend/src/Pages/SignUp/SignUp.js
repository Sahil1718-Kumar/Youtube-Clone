import React, {useState} from "react";
import './SignUp.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
const SignUp = () => {
    const [uploadedImageUrl,setUploadedImageUrl] = useState("https://th.bing.com/th/id/R.dc9a456a6e1853a2a2d589fb418b1aec?rik=uj5lX47WbFNu8Q&riu=http%3a%2f%2fpngimg.com%2fuploads%2fquestion_mark%2fquestion_mark_PNG56.png&ehk=GKfPp0ASc7HDc2Z4i0kM7rFfsIu%2b0xzYSIpmAA%2btuSI%3d&risl=&pid=ImgRaw&r=0")
    const [signUpField,setSignUpField] = useState({"channelName":"","userName":"","password":"","about":"","profilePic":uploadedImageUrl});
    const [progressBar,setProgressBar] = useState(false);
    const navigate = useNavigate();
    const handleInputField = (event,name) => {
        setSignUpField({
            ...signUpField,[name]:event.target.value
        })
    }
console.log(signUpField)
    const uploadImage = async (e) => {
        console.log("uploading")
        const files = e.target.files;
        const data = new FormData();
        data.append('file',files[0]);
        
        data.append('upload_preset', 'youtube-clone');
        try{
            
            setProgressBar(true)
            const response =await axios.post("https://api.cloudinary.com/v1_1/dfx2ipm9r/image/upload",data)
            setProgressBar(false)
            const imageUrl = response.data.url;
            setUploadedImageUrl(imageUrl);
            setSignUpField({
                ...signUpField,"profilePic":imageUrl
            })
        }catch(err){
            console.log(err);
        }
    }
    const handleSignup = async()=> {
        setProgressBar(true)
        axios.post('http://localhost:4000/auth/signUp',signUpField).then((res)=>{

            toast.success(res.data.message)
            setProgressBar(false);
            navigate('/');
        }).catch(err=>{
            setProgressBar(false);
            toast.error(err)
        })
    }
    return(
        <div className="signUp">
            <div className="signup_card">
                <div className="signUp_title">
                    <YouTubeIcon sx={{fontSize: "54px", color: "red"}}/>
                    SignUp
                </div>

                <div className="signUp_Inputs">
                    <input type="text" className="signup_Inputs_inp" value={signUpField.channelName} placeholder="Channel Name" onChange={(e)=>{handleInputField(e,"channelName")}}/>
                    <input type="text" className="signup_Inputs_inp" value={signUpField.userName} placeholder="User Name" onChange={(e)=>{handleInputField(e,"userName")}}/>
                    <input type="password" className="signup_Inputs_inp" value={signUpField.password} placeholder="Password" onChange={(e)=>{handleInputField(e,"password")}}/>
                    <input type="text" className="signup_Inputs_inp" value={signUpField.about} placeholder="About Your Channel" onChange={(e)=>{handleInputField(e,"about")}}/>

                    <div className="image_upload_signup">
                        <input type="file" onChange={(e)=>uploadImage(e)}/>
                        <div className="image_upload_signup_div">
                            <img className="image_default_signUp" src={uploadedImageUrl} alt="img"/>
                        </div>
                    </div>

                    <div className="signUpBtns">
                        <div className="signUpBtn" onClick={handleSignup}>SignUp</div>
                        <Link to={'/'} className="signUpBtn">Home Page</Link>
                    </div>

                    
                    {progressBar && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>}

                </div>

            </div>
            <ToastContainer/>
        </div>
    )
}
export default SignUp;