const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot, User } = require('../../db/models');

const router = express.Router();


// get individual spot

router.get('/:id', asyncHandler(async(req,res)=>{
    const spotId = req.params.id
    const selectedSpot = await Spot.findOne({
        where: {id: spotId}
    });
    // console.log(spotId, "Backend spotid @@")
     console.log(selectedSpot, "selectedSPOT")
    return res.json(selectedSpot);
}))


module.exports = router;
