import React, { useState, useEffect } from 'react';
import './AdminProfile.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavbar from '../../Component/SideNavbar/SideNavbar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
const AdminProfile = ({sideNavbar}) => {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const fetchProfileData = async() =>{
        axios.get(`http://localhost:4000/api/${id}/channel`).then((response)=>{
            console.log(response);
            setData(response.data.video);
            setUser(response.data.video[0]?.user);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(()=>{
        fetchProfileData();
    },[])

    // Handle delete vid
    const handleDeleteChannel = async () => {
        try{ await axios.delete(`http://localhost:4000/auth/deleteUser/${id}`)
                 toast.success("Channel deleted");
                 console.log("channel deleted")
             navigate(`/admin`);
         
         
 }catch(err){
                 toast.error("server error.");
                 console.log(err);
             };
 };
    return(
        <div className='profile'>
            <SideNavbar sideNavbar={sideNavbar}/>

            <div className={sideNavbar?'profile_page':'profile_page_inactive'}>

                <div className='profile_top_section'>
                    <div className='profile_top_section_profile'>
                        <img className='profile_top_section_img' src={user?.profilePic} alt='profile'/>
                    </div>
                    <div className='profile_top_section_About'>
                        <div className='profile_top_section_About_Name'>{user?.channelName}</div>
                        <div className='profile_top_section_info'>
                            @{user?.userName}  . {data.length} videos
                        </div>
                        <div className='profile_top_section_info'>
                            {user?.about}
                        </div>
                    </div>
                </div>

                <div className='profile_videos'>
                    <div className='profile_videos_title'>Videos &nbsp; <PlayArrowIcon/> <div className='deleteBtn' onClick={handleDeleteChannel}>Delete Channel  <DeleteIcon sx={{fontSize:"30px"}}/></div></div>
                    
                    <div className='profileVideos'>

                        {
                            data.map((item,key)=>{
                                return(
                                    <Link to={`/delete/${item._id}`} className='profileVideo_block'>
                            <div className='profileVideo_block_thumbnail'>
                                <img className='profileVideo_block_thumbnail_img' src={item?.thumbnail} alt='videoImg'/>
                            </div>

                            <div className='profileVideo_block_detail'>
                                <div className='profileVideo_block_detail_name'>{item?.title}</div>
                                <div className='profileVideo_block_detail_about'>Uploaded on {item?.createdAt.slice(0,10)}</div>
                            </div>
                        </Link>
                                );
                            })
                        }
                       
                       

                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}
export default AdminProfile;