const router = require('express').Router();
const userRoutes = require('./user-routes');
const parkingSpaceRoutes = require('./parkingSpace');
const carsRoutes = require('./cars');
const parkingLotRoutes = require('./parkingLot');

router.use('/parkingSpaces', parkingSpaceRoutes);
router.use('/users', userRoutes);
router.use('/cars', carsRoutes);
router.use('/parkingLot', parkingLotRoutes)

module.exports = router;