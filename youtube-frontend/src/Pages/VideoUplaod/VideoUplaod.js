import React, { useState, useEffect, useRef } from "react";
import './VideoUplaod.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import YouTubeIcon from '@mui/icons-material/YouTube';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const VideoUplaod = () => {
    const [inputField,setInputField] = useState({"title":"","description":"","videoType":"","videoLink":"","thumbnail":""});
    const[loader,setLoader] = useState(false);
    const alertFired = useRef(false);
    const navigate = useNavigate();
    const handleOnChangeInput = (event,name) => {
        setInputField({
            ...inputField,[name]:event.target.value
        })
    }
    const uploadImage = async (e,type) => {
        setLoader(true)
        console.log("uploading")
        const files = e.target.files;
        const data = new FormData();
        data.append('file',files[0]);
        
        data.append('upload_preset', 'youtube-clone');
        try{
            
            const response =await axios.post(`https://api.cloudinary.com/v1_1/dfx2ipm9r/${type}/upload`,data)
            const url = response.data.url;
            setLoader(false)
            let val = type === "image"?"thumbnail":"videoLink";
            setInputField({
                ...inputField,[val]:url
            })
        }catch(err){
            setLoader(false)
            console.log(err);
        }
    }
    console.log(inputField)

    useEffect(()=>{
        let isLogin = localStorage.getItem("userId");
        if(isLogin===null && !alertFired.current){
                alertFired.current = true;
            navigate('/signup');
            alert("Signup or Login to upload video")
        }
    },[])

    const handleSubmit = async() => {
        setLoader(true);
        await axios.post("http://localhost:4000/api/video",inputField, { withCredentials: true}).then((resp)=>{
            console.log(resp)
            setLoader(false);
            navigate('/')
        }).catch(err=>{
            console.log(err)
            console.log("bb")
            setLoader(false);
        })
    }
    return(
        <div className="videoUpload">
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <YouTubeIcon sx={{fontSize: "54px",color:"red"}}/>
                    Upload Video
                </div>

                <div className="uploadForm">
                    <input type="text" value={inputField.title} placeholder="Title of Video" className="uploadFormInputs" onChange={(e)=>{handleOnChangeInput(e,"title")}}/>
                    <input type="text" value={inputField.description} placeholder="Description" className="uploadFormInputs" onChange={(e)=>{handleOnChangeInput(e,"description")}}/>
                    <input type="text" value={inputField.videoType} placeholder="Category" className="uploadFormInputs" onChange={(e)=>{handleOnChangeInput(e,"videoType")}}/>
                    <div>Thumbnail <input type="file" accept="image/*" onChange={(e)=>uploadImage(e,"image")}/></div>
                    <div>Video <input type="file" accept="video/mp4, video/webm, video/*" onChange={(e)=>uploadImage(e,"video")}/></div>
                    {
                    loader && <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                }
                </div>

                <div className="uploadBtns">
                    <div className="uploadBtn-form" onClick={handleSubmit}>Upload</div>
                    <Link to={'/'} className="uploadBtn-form">Home</Link>
                </div>

            </div>
        </div>
    )
}
export default VideoUplaod;