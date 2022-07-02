const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review, Spot, User } = require('../../db/models');

const router = express.Router();


// all reviews

router.get('/:id', asyncHandler(async(req,res)=> {
    const id = req.params.id
    const numId = parseInt(id)

    const reviews = await Review.findAll({
        where: {spotId: numId},
        include: User
    })
   
    return res.json(reviews);
}))

// create a review

router.post('/:id', asyncHandler(async (req, res) => {
    const {review , rating, spotId, userId} = req.body;
    const id = req.params.id;
    const newReview = await Review.create({
         review, rating, spotId, userId
    });

    return res.json(newReview)
}))

router.delete('/:id', asyncHandler(async(req, res)=> {
    const reviewId = req.params.id
    const badReview = await Review.findByPk(reviewId)
    // console.log(badReview, "****BAD REVIEW")
    // if (badReview) {
        await badReview.destroy()
        // res.json(badReview)
    // } else {
        return res.json(badReview)
    // }
    // console.log(badSpot, " <==== DELETED SPOT");
}))

module.exports = router;
