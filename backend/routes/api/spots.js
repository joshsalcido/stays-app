const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot } = require('../../db/models');

const router = express.Router();

// get spots
router.get('/user/:id', asyncHandler(async(req, res) => {
   
    const userId = req.params.id
    const spots = await Spot.findAll({
        where: { userId: userId}
    });
    return res.json(spots);
}))

// create spot
router.post('/:id', asyncHandler(async (req, res) => {

    const { name, address, city, country, price, state } = req.body;
    const id = req.params.id;
    const newSpot = await Spot.create({
         address, city, state, country, name, price, userId: id
    });

    return res.json(newSpot)
}))


module.exports = router;
