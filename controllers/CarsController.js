const { User, Cars } = require('../models');

const carsController = {
  updateCars(req, res) {
    Cars.findOneAndUpdate(
      { _id: req.params.carsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((car) =>
        !car ? res.status(404).json({ message: 'This car has been updated.' }) : res.json(car)
      )
      .catch((err) => res.status(500).json(err));
  },
  getSingleCar(req, res) {
    Cars.findOne({ _id: req.params.carId })
      .select("-__v")
      .then((car) =>
        !car
          ? res.status(404).json({ message: 'We were unable to find this car.' })
          : res.json(car)
      )
      .catch((err) => res.status(500).json(err));
  },
  getCars(req, res) {
    Cars.find()
      .then((cars) => res.json(cars))
      .catch((err) => res.status(500).json(err));
  }
};


module.exports = carsController