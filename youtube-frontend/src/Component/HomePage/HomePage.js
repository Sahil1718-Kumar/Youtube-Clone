import React,{ useState, useEffect } from "react";
import './HomePage.css';
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = ({sideNavbar}) => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4000/api/allVideo').then(res=>{
            console.log(res.data.videos)
            setData(res.data.videos);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const options = ["All","Twenty20 Cricket","RCB","Music","Live","Gaming","News","Web series","Round2hell","Mixes","Web Development","Wickets","Gadgets","Comedy","Recently uploaded","Posts","RCB","Music","Live","Gaming","News","Web series","Round2hell","Mixes","Web Development","Wickets","Gadgets","Comedy","Recently uploaded","Posts","All","Twenty20 Cricket","RCB","Music","Live","Gaming","News","Web series","Round2hell","Mixes","Web Development","Wickets","Gadgets","Comedy","Recently uploaded","Posts","RCB","Music","Live","Gaming","News","Web series","Round2hell","Mixes","Web Development","Wickets","Gadgets","Comedy","Recently uploaded","Posts"]
    return(     
        <div className={sideNavbar?"homePage":"fullHomePage"}>
            <div className="homePage_options">
                {
                    options.map((option,index)=>{
                        return(
                            <div key={index} className="homePage_option">
                                {option}
                            </div>
                        )
                    })
                }
            </div>

            <div className={sideNavbar?"home_mainPage":"home_mainPageWithoutLink"}>

                {
                    data?.map((item,index)=>{
                        return(
                            <Link to={`/watch/${item._id}`} className="youtube_video">
                            <div className="youtube_thumbnailBox">
                                <img src={item.thumbnail} alt="" className="youtube_thumbnailPic"/>
                                
                            </div>
        
                            <div className="youtubeTitleBox">
                                <div className="youtubeTitleBoxProfile">
                                    <img src={item?.user?.profilePic} alt="profile" className="youtube_thumbnail_profile"/>
                                </div>
                                <div className="youtubeTitleBox_Title">
                                    <div className="youtube_videoTitle">{item?.title}</div>
                                    <div className="youtube_channelName">{item?.user?.channelName}</div>
                                    <div className="youtubeVideo_views">{item?.like} likes</div>
                                </div>
                            </div>
        
                        </Link>
                        );
                    })
                }
               
               
                
               

            </div>
        </div>
    )
}
export default HomePage;