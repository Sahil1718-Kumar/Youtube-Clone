const User = require('../Modals/user');
const Video = require('../Modals/video')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieOptions = {
    httpOnly: true,
    secure: false, 
    sameSite: 'Lax'
};

exports.signUp = async(req,res)=>{
    try{
        const { channelName, userName, about, profilePic, password } = req.body;
        const isExist = await User.findOne({ userName });
        if(isExist){
            res.status(400).json({ error : "Username already exist, please try with other username"});
        } else{
            let updatedPass = await bcrypt.hash(password, 10);
            const user = new User({ channelName, userName, about, profilePic, password: updatedPass});
            await user.save();
            res.status(201).json({ message: 'User registered successfully', success: "yes", data:user });
        }
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
}
exports.signIn = async(req,res)=>{
    try{
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if(user && await bcrypt.compare(password, user.password)){

            const token = jwt.sign({ userId: user._id }, 'sahil1419');
            res.cookie('token', token,cookieOptions);
            res.json({ message: 'Logged in successfully', success: "true",token,user });
        }else{
            res.status(400).json({ error: "Invalid credentials" });
        }
    }catch (error){
        res.status(500).json({ error: 'Server error' });
    }
} 

exports.logout = async(req,res)=>{
    res.clearCookie('token',cookieOptions).json({ message: 'Logged out successfully' });
}




exports.deleteUser = async (req, res) => {
    try {
        let { id } = req.params;

        
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        await Video.deleteMany({ user: id });

        res.status(201).json({
            message: 'User and all associated videos deleted',
            success: true,
            user: deletedUser
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};









