const express = require('express');
const asyncHandler = require('express-async-handler');
const { Spot, User, Booking } = require('../../db/models');

const router = express.Router();

// GET USERS BOOKINGS
router.get('/:id', asyncHandler(async(req, res) => {

    const userId = req.params.id
    const bookings = await Booking.findAll({
        // include: User,
        where: { userId: userId},
        include: [{model: Spot, include: [{model: User}]}]
    });
    // console.log(bookings, " ++++++  ++++++ Bookings Backend ++++++++")
    return res.json(bookings);
}))

// CREATE A BOOKING
router.post('/newbooking', asyncHandler(async (req, res) => {

    const { userId, spotId, startDate, endDate } = req.body;
    // const id = req.params.id;
    const newBooking = await Booking.create({
         userId, spotId, startDate, endDate
    });

    return res.json(newBooking)
}))

// // update spot

// router.put('/:id', asyncHandler(async(req, res)=> {
//     const spotId = req.params.id
//     const {name, address, city, country, price, state, url1, url2, url3, url4, url5 } = req.body;
//     // console.log(spotId, "We HERE *** $$$$$ ");
//     const spotToUpdate = await Spot.findByPk(spotId);
//     const updateSpot = await spotToUpdate.update({
//         name, address, city, country, price, state, url1, url2, url3, url4, url5}
//     );
//     // console.log(updateSpot, "BACKEND updateSPOT")
//     return res.json(updateSpot);
// }))

// // delete spot

// router.delete('/:id', asyncHandler(async(req, res)=> {
//     const spotId = req.params.id
//     const badSpot = await Spot.findByPk(spotId)
//     if (badSpot) {
//         await badSpot.destroy()
//         res.json(badSpot)
//     } else {
//         res.json({message: 'Fail'})
//     }
//     // console.log(badSpot, " <==== DELETED SPOT");
// }))



module.exports = router;
