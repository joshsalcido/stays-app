const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/user/:id', asyncHandler(async(req, res) => {
    const userId = req.params.id
    const spots = await Spot.findAll({
        where: { userId: userId}
    });
    // console.log(spots, "<----");
    return res.json(spots);
}))


module.exports = router;
