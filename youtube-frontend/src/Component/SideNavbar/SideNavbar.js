import React from "react";
import './SideNavbar.css';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';
const SideNavbar = ({sideNavbar}) => {
    return(
        <div className={sideNavbar?"home-sideNavbar":"homeSideNavbarHide"}>
            <div className="home_sideNavbarTop">
                <Link to={'/'} className={`home_sideNavbarTopOption`}>
                    <HomeIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       Home
                    </div>
                </Link>

                <div className={`home_sideNavbarTopOption`}>
                    <VideoLibraryIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       Shorts
                    </div>
                </div>

                <div className={`home_sideNavbarTopOption`}>
                    <SubscriptionsIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       Subscriptions
                    </div>
                </div>
            </div>

            <div className="home_sideNavbarMiddle">
            <div className={`home_sideNavbarTopOption`}>
                    <div className="home_sideNavbarTopOptionTitle">
                       You
                    </div>
                    <ChevronRightIcon/>
                </div>

                <div className={`home_sideNavbarTopOption`}>
                    <RecentActorsIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       Your Channel
                    </div>
                </div>

                <div className={`home_sideNavbarTopOption`}>
                    <HistoryIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       History
                    </div>
                </div>

                <div className={`home_sideNavbarTopOption`}>
                    <PlaylistPlayIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       Playlists
                    </div>
                </div>

                <div className={`home_sideNavbarTopOption`}>
                    <SlideshowIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       Your videos
                    </div>
                </div>

                <div className={`home_sideNavbarTopOption`}>
                    <WatchLaterOutlinedIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       Watch later
                    </div>
                </div>

                <div className={`home_sideNavbarTopOption`}>
                    <ThumbUpOffAltIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       Liked videos
                    </div>
                </div>

                 <div className={`home_sideNavbarTopOption`}>
                    <ContentCutIcon/>
                    <div className="home_sideNavbarTopOptionTitle">
                       Your clips
                    </div>
                </div>
            </div>

            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">Subscription</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img className="home_sideNavbar_ImgLogo" src='https://th.bing.com/th/id/OIP.HWv2FCmNyRQnp_ZSVZOwPwHaFW?rs=1&pid=ImgDetMain' alt="img"/>
                    <div className="home_sideNavbarTopOptionTitle">RCB</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img className="home_sideNavbar_ImgLogo" src='https://th.bing.com/th/id/OIP.q8igkgTXHW-xLq17j7TxqwHaHa?rs=1&pid=ImgDetMain' alt="img"/>
                    <div className="home_sideNavbarTopOptionTitle">Round2hell</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img className="home_sideNavbar_ImgLogo" src='https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/10/13/616764-403302-icc-logo-dna-india.jpg' alt="img"/>
                    <div className="home_sideNavbarTopOptionTitle">ICC</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img className="home_sideNavbar_ImgLogo" src='https://th.bing.com/th/id/OIP.Io0Urz7J40Jp4ZCvMR6VjAHaFY?rs=1&pid=ImgDetMain' alt="img"/>
                    <div className="home_sideNavbarTopOptionTitle">WWE</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img className="home_sideNavbar_ImgLogo" src='https://i1.wp.com/www.artofchannelbranding.com/wp-content/uploads/2016/04/starsports_13_975-e1460731047631.jpg?fit=753%2C548&ssl=1' alt="img"/>
                    <div className="home_sideNavbarTopOptionTitle">Star Sports</div>
                </div>
            </div>
        </div>
    )
}
export default SideNavbar;