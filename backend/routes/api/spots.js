const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot, User } = require('../../db/models');

const router = express.Router();

// get spots
router.get('/user/:id', asyncHandler(async(req, res) => {

    const userId = req.params.id
    const spots = await Spot.findAll({
        include: User,
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

// update spot

router.put('/:id', asyncHandler(async(req, res)=> {
    const spotId = req.params.id
    const {name, address, city, country, price, state } = req.body;
    // console.log(spotId, "We HERE *** $$$$$ ");
    const updateSpot = await Spot.update({
        name, address, city, country, price, state},
        { where: { id: spotId}
    });

    return res.json(updateSpot);
}))

// delete spot

router.delete('/:id', asyncHandler(async(req, res)=> {
    const spotId = req.params.id
    const badSpot = await Spot.findByPk(spotId)
    if (badSpot) {
        await badSpot.destroy()
        res.json(badSpot)
    } else {
        res.json({message: 'Fail'})
    }
    // console.log(badSpot, " <==== DELETED SPOT");
}))



module.exports = router;
