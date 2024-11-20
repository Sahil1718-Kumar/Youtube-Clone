const express = require("express");
const router = express.Router();
const videoController = require('../Controllers/video');
const auth = require('../middleware/authentication');

router.post('/video',auth,videoController.uploadVideo);
router.get('/allVideo',videoController.getAllVideo);
router.get('/getVideoById/:id',videoController.getVideoById);
router.get('/:userId/channel',videoController.getAllVideoByUserID);
router.post('/like/:id',videoController.likeVideo);
router.delete('/delete/:id',videoController.deleteVideo);



module.exports = router;