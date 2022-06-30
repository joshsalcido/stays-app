const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot, Image } = require('../../db/models');

const router = express.Router();



// get ALL SPOTS

router.get('/', asyncHandler(async(req,res) => {
    const allSpots = await Spot.findAll();
    return res.json(allSpots);
}))

module.exports = router;
