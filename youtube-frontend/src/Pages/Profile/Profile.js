import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import SideNavbar from '../../Component/SideNavbar/SideNavbar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const Profile = ({sideNavbar}) => {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/${id}/channel`);
            console.log('Full API Response:', response.data);
    
            
            setUser(response.data.user); 
            setData(response.data.video);
    
        } catch (err) {
            console.error("Error fetching profile data:", err);
        }
    };
    
    useEffect(()=>{
        fetchProfileData();
    },[id])
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
                    <div className='profile_videos_title'>Videos &nbsp; <PlayArrowIcon/></div>
                    <div className='profileVideos'>

                        {
                            data.map((item,key)=>{
                                return(
                                    <Link to={`/watch/${item._id}`} className='profileVideo_block'>
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
        </div>
    )
}
export default Profile;