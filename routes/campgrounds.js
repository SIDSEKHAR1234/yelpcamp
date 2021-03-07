const express = require('express');
const router = express.Router();
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds')
const Campground = require('../models/campground');
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send('IT WORKED!!')



router.get('/new', isLoggedIn, campgrounds.renderNewFrom);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isAuthor, isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit', isAuthor, isLoggedIn, catchAsync(campgrounds.renderEditForm));




module.exports = router;