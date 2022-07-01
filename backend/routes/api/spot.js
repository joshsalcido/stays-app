const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot, User, Image, Review } = require('../../db/models');

const router = express.Router();


// get individual spot

router.get('/:id', asyncHandler(async(req,res)=>{
    const spotId = req.params.id
    const selectedSpot = await Spot.findByPk(spotId);
    console.log(selectedSpot, "Backend selectedSPot @@")
    //  console.log(selectedSpot, "selectedSPOT %%%%%%%%5")
    return res.json(selectedSpot);
}))


module.exports = router;
