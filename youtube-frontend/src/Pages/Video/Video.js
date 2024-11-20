// import React,{useState, useEffect } from "react";
// import './Video.css';
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import {toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

// const Video = () => {
//     const [message, setMessage] =useState("");
//     const [data,setData] = useState(null);
//     const [videoUrl,setVideoUrl] = useState("");
//     const {id} = useParams();
//     const [comments, setComments] = useState([]);

//     const fetchVideoById = async()=>{
//         await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((response)=>{
//             setData(response.data.video);
//             setVideoUrl(response?.data?.video?.videoLink)
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     const getCommentByVideoId = async()=>{
//         await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((response)=>{
//             console.log(response);
//             setComments(response.data.comments);
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//     useEffect(()=>{
//         fetchVideoById();
//         getCommentByVideoId();
//     },[id])

//     const handleComment = async() => {
//         const body = {
//             "message":message,
//             "video":id
//         }
//         await axios.post('http://localhost:4000/commentApi/comment',body, { withCredentials: true }).then((resp)=>{
//             console.log(resp)
//             const newComment = resp.data.comment;
//             setComments([newComment,...comments]);
//             setMessage("")
//         }).catch(err => {
//             toast.error("Please Login first to comment")
//             console.log(err)
//         })
//     }



//     const [datas, setDatas] = useState([]);
//     useEffect(()=>{
//         axios.get('http://localhost:4000/api/allVideo').then(res=>{
//             console.log(res.data.videos)
//             setDatas(res.data.videos);
//         }).catch(err=>{
//             console.log(err);
//         })
//     },[])

    
//     return(
//         <div className="video">
//             <div className="videoPostSection">
//                 <div className="video_youtube">
//                     {data && <video key={videoUrl} width="400px" controls autoPlay className="video_youtube_video">
//                         <source src={videoUrl} type="video/mp4"/>
//                         <source src={videoUrl} type="video/webm"/>
//                         your browser does not support video tag
//                     </video>}
//                 </div>
                
//                 <div className="video_youtubeAbout">
//                     <div className="video_uTubeTitle">{data?.title}</div>

//                     <div className="youtube_video_ProfileBlock">
//                         <div className="youtube_video_ProfileBlock_left">
//                             <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
//                                 <img className="youtube_video_ProfileBlock_left_image" src={data?.user?.profilePic} alt="img"/>
//                             </Link>
//                             <div className="youtubeVideo_subsView">
//                                 <div className="youtubePostProfileName">{data?.user?.channelName}</div>
//                                 <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0,10)}</div>
//                             </div>
//                             <div className="subscribeBtnYoutube">Subscribe</div>
//                         </div>

//                         <div className="youtube_video_likeBlock">
//                             <div className="youtube_video_likeBlock_Like">
//                                 <ThumbUpOutlinedIcon/>
//                                 <div className="youtube_video_likeBlock_NoOfLikes">{data?.like}</div>
//                             </div>
//                             <div className="youtubeVideoDivider"></div>
//                             <div className="youtube_video_likeBlock_Like">
//                                 <ThumbDownOutlinedIcon/>
//                             </div>
//                         </div>

//                     </div>

//                     <div className="youtube_video_About">
//                         <div>{data?.user?.createdAt.slice(0,10)}</div>
//                         <div>{data?.description}</div>
//                     </div>
//                 </div>

//                 <div className="youtubeCommentSection">
//                     <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>

//                     <div className="youtubeSelfComment">
//                         <img className="video_youtubeSelfCommentProfile" src="https://th.bing.com/th/id/OIP.HWv2FCmNyRQnp_ZSVZOwPwHaFW?rs=1&pid=ImgDetMain" alt="profile"/>
//                         <div className="addAComment">
//                             <input type="text" value={message} className="addACommentInput" placeholder="Add a comment" onChange={(e)=>{setMessage(e.target.value)}}/>
//                             <div className="cancelSubmitComment">
//                                 <div className="cancelComment">Cancel</div>
//                                 <div className="cancelComment" onClick={handleComment}>Comment</div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="youtubeOthersComments">

//                         {
//                             comments.map((item,index)=>{
//                                 return(
//                                     <div className="youtubeSelfComment">
//                             <img className="video_youtubeSelfCommentProfile" src={item?.user?.profilePic} alt="profile"/> 
//                             <div className="others_commentSection">
//                                 <div className="others_commentSectionHeader">
//                                     <div className="channelName_comment">{item?.user?.channelName}</div>
//                                     <div className="commentTimingOthers">{item?.createdAt.slice(0,10)}</div>
//                                 </div>

//                                 <div className="otherCommentSectionComment">
//                                     {item?.message}
//                                 </div>

//                             </div>
//                         </div>
//                                 );
//                             })
//                         }

//                     </div>
//                 </div>
//             </div>

//             <div className="videoSuggestions">
                
//                 {datas.map((item,index)=>{
//                     return(<Link to={`/watch/${item._id}`} className="videoSuggestionsBlock">
//                     <div className="video_suggestion_thumbnail">
//                         <img className="video_suggestion_thumbnail_img" src={item.thumbnail} alt="thumbnail"/>
//                     </div>
//                     <div className="video_suggestions_About">
//                         <div className="video_suggestions_About_title">{item?.title}</div>
//                         <div className="video_suggestions_About_Profile">{item?.user?.channelName}</div>
//                         <div className="video_suggestions_About_Profile">136K views . 1 day ago</div>
//                     </div>
//                 </Link>)
//                 })
//             }
                
//             </div>

//             <ToastContainer/>

//         </div>
//     )
// }
// export default Video;











import React, { useState, useEffect } from "react";
import './Video.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Video = ({selfComment}) => {
    const [userPic, setUserPic] = useState("https://static.vecteezy.com/system/resources/previews/027/448/973/large_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg");
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [dislike,setdislike] = useState(false);
    const [subs,setSubs] = useState(false)

    // Fetch video data by ID
    const fetchVideoById = async () => {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((response) => {
            setData({
                ...response.data.video,
                hasLiked: JSON.parse(localStorage.getItem(`liked_${id}`)) || false,  // Retrieve like status from localStorage
            });
            setVideoUrl(response?.data?.video?.videoLink);
        }).catch(err => {
            console.log(err);
        });
    };

   
    
    // Fetch comments for the video
    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((response) => {
            setComments(response.data.comments);
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [id]);

    // Handle adding a comment
    const handleComment = async () => {
        const body = {
            "message": message,
            "video": id
        };
        await axios.post('http://localhost:4000/commentApi/comment', body, { withCredentials: true }).then((resp) => {
            const newComment = resp.data.comment;
            setComments([newComment, ...comments]);
            setMessage("");
        }).catch(err => {
            toast.error("Please Login first to comment");
            console.log(err);
        });
    };

    // Handle like increment
    const handleLike = async () => {
        if (!data?.hasLiked) {
            await axios.post(`http://localhost:4000/api/like/${id}`, { withCredentials: true })
                .then((response) => {
                    setData((prevData) => ({
                        ...prevData,
                        like: prevData.like + 1,  
                        hasLiked: true,  
                    }));
                    localStorage.setItem(`liked_${id}`, true);  
                    toast.success("Liked the video!");
                })
                .catch((err) => {
                    toast.error("Please log in to like the video.");
                    console.log(err);
                });
        } else {
            toast.info("You have already liked this video.");
        }
    };

    // Fetch all videos for suggestions
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/api/allVideo').then(res => {
            setDatas(res.data.videos);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const handleDisLike = () =>{
        setdislike(prev=>!prev);
    }

    const handleSubs = () =>{
        setSubs(prev=>!prev);
    }

    return (
        <div className="video">
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && <video key={videoUrl} width="400px" controls autoPlay className="video_youtube_video">
                        <source src={videoUrl} type="video/mp4" />
                        <source src={videoUrl} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>}
                </div>

                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>

                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img className="youtube_video_ProfileBlock_left_image" src={data?.user?.profilePic} alt="img" />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName">{data?.user?.channelName}</div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            {subs?<div className="subscribeBtnYoutube" style={{backgroundColor:"transparent",color:"white",border:"2px solid white"}} onClick={handleSubs}>Subscribed <NotificationsIcon/></div>:<div className="subscribeBtnYoutube" onClick={handleSubs}>Subscribe</div>}
                        </div>

                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like" onClick={handleLike}>
                                {data?.hasLiked ? <ThumbUpIcon sx={{color:"dodgerblue"}}/> : <ThumbUpOutlinedIcon />}
                                <div className="youtube_video_likeBlock_NoOfLikes">{data?.like}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_Like" onClick={handleDisLike}>
                                {dislike ? <ThumbDownIcon sx={{color:"dodgerblue"}}/>:<ThumbDownOutlinedIcon />}
                            </div>
                        </div>
                    </div>

                    <div className="youtube_video_About">
                        <div>{data?.user?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>

                <div className="youtubeCommentSection">
                    <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>

                    <div className="youtubeSelfComment">
                        <img className="video_youtubeSelfCommentProfile" src={selfComment} alt="profile" />
                        <div className="addAComment">
                            <input type="text" value={message} className="addACommentInput" placeholder="Add a comment" onChange={(e) => { setMessage(e.target.value) }} />
                            <div className="cancelSubmitComment">
                                <div className="cancelComment">Cancel</div>
                                <div className="cancelComment" onClick={handleComment}>Comment</div>
                            </div>
                        </div>
                    </div>

                    <div className="youtubeOthersComments">
                        {comments.map((item, index) => {
                            return (
                                <div className="youtubeSelfComment" key={index}>
                                    <img className="video_youtubeSelfCommentProfile" src={item?.user?.profilePic} alt="profile" />
                                    <div className="others_commentSection">
                                        <div className="others_commentSectionHeader">
                                            <div className="channelName_comment">{item?.user?.channelName}</div>
                                            <div className="commentTimingOthers">{item?.createdAt.slice(0, 10)}</div>
                                        </div>
                                        <div className="otherCommentSectionComment">
                                            {item?.message}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="videoSuggestions">
                {datas.map((item, index) => {
                    return (
                        <Link to={`/watch/${item._id}`} className="videoSuggestionsBlock" key={index}>
                            <div className="video_suggestion_thumbnail">
                                <img className="video_suggestion_thumbnail_img" src={item.thumbnail} alt="thumbnail" />
                            </div>
                            <div className="video_suggestions_About">
                                <div className="video_suggestions_About_title">{item?.title}</div>
                                <div className="video_suggestions_About_Profile">{item?.user?.channelName}</div>
                                <div className="video_suggestions_About_Profile">136K views . 1 day ago</div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <ToastContainer />
        </div>
    );
};

export default Video;

