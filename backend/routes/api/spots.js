const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot, User } = require('../../db/models');

const router = express.Router();





// get user spots
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

    const { name, address, city, country, description, price, state, url1, url2, url3, url4, url5} = req.body;
    const id = req.params.id;
    const newSpot = await Spot.create({
         address, city, state, country, description, name, price, url1, url2, url3, url4, url5, userId: id
    });

    return res.json(newSpot)
}))

// update spot

router.put('/:id', asyncHandler(async(req, res)=> {
    const spotId = req.params.id
    const {name, address, city, country, description, price, state, url1, url2, url3, url4, url5 } = req.body;
    // console.log(spotId, "We HERE *** $$$$$ ");
    const spotToUpdate = await Spot.findByPk(spotId);
    const updateSpot = await spotToUpdate.update({
        name, address, city, country, description, price, state, url1, url2, url3, url4, url5}
    );
    // console.log(updateSpot, "BACKEND updateSPOT")
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
