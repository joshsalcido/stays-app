const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/spots', asyncHandler(async(req, res) => {
    const spots = await Spot.findAll({
        include: ['images'],
    });
    console.log(res.json(spots));
    return res.json(spots);
}))
