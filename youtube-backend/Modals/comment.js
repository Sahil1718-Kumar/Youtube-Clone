const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'videos',
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('comments',commentSchema);