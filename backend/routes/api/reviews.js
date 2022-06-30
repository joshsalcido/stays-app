const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review, Spot, User } = require('../../db/models');

const router = express.Router();


// all reviews

// create a review

router.post('/:id', asyncHandler(async (req, res) => {
    const {review , rating} = req.body;
    const id = req.params.id;
    const newReview = await Review.create({
         review, rating, spotId: id
    });

    return res.json(newReview)
}))

module.exports = router;
