const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const mainPageRouter = require('./main.js');
const reviewRouter = require('./reviews.js');
const singleSpotRouter = require('./spot.js');
const bookingRouter = require('./bookings.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewRouter);

router.use('/main', mainPageRouter);

router.use('/spot', singleSpotRouter)

router.use('/bookings', bookingRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
