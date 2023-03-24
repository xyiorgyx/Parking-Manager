const { ParkingLot, ParkingSpace } = require('../models');
const { populate } = require('../models');


module.exports = {

getSingleParkingLot(req,res) {
    ParkingLot.findOne({ _id: req.params.parkingLotId })
    .select('-__v')
    .populate('spaces')
    .then((parkingLot) =>
        !parkingLot
            ? res.status(404).json({ message: 'No parkingLot with that ID' })
            : res.json(parkingLot)
    )
    .catch((err) => res.status(500).json(err));
},

getParkingLots(req,res){
    ParkingLot.find()
    .then((parkingLots) => res.json(parkingLots))
    .catch((err) => res.status(500).json(err));
}

}
