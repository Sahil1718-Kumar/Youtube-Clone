
const Video = require('../Modals/video');
const User = require('../Modals/user')


exports.uploadVideo = async (req,res)=>{
    try{
        const { title, description, videoLink, videoType, thumbnail }= req.body;
        
        const videoUpload = new Video({ user: req.user._id, title, description, videoLink, videoType, thumbnail });
        await videoUpload.save();

        res.status(201).json({ success: "true", videoUpload });

    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}

//video get on home page
exports.getAllVideo = async(req,res)=>{
    try{
        const videos = await Video.find().populate('user','channelName profilePic userName createdAt');

        res.status(201).json({ success: "true", "videos": videos });
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}


//when we click on video on home page then we will go to play that video
exports.getVideoById = async (req,res)=>{
    try{
        let {id} = req.params;
        const video = await Video.findById(id).populate('user','channelName profilePic userName createdAt');
        
        res.status(201).json({ success: "true", "video": video});
    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}

//to display all videos uploaded by particular user on his/her profile

exports.getAllVideoByUserID = async(req,res)=>{
    try{
        let {userId} = req.params;

        const video = await Video.find({user:userId}).populate('user','channelName profilePic userName createdAt about');
        const user = video.length > 0 ? video[0].user : await User.findById(userId); // Fetch user if no video is found

        res.status(201).json({ success: "true", video, user });

    }catch(error){
        res.status(500).json({ error: 'Server error' });
    }
}


exports.likeVideo = async (req, res) => {
    const videoId = req.params.id;
    try {
       
        const video = await Video.findById(videoId);
        

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        
        video.like += 1;

        
        await video.save();

        res.status(200).json({ success: true, like: video.like });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteVideo = async (req,res) =>{
    try{
    let {id} = req.params;
    const deleteVideo = await Video.findByIdAndDelete(id);
    res.status(201).json({ message: 'Video deleted',success: "true", "video": deleteVideo});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error'})
    }

}



