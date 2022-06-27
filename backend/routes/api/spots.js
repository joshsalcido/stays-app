const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    console.log('BEFORE FINDALL ******')
    const spots = await Spot.findAll();
    console.log(spots, "<----");
    return res.json(spots);
}))


module.exports = router;
