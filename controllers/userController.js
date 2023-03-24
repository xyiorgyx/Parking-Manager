const { User, Cars } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('cars')
            .populate('parkingLot')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'We were unable to find your account.' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    addUserCars(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {cars:req.body}},
            {runValidators:true, new:true}
        )
        .select('-__v')
        .populate('cars')
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'We were unable to find your account.'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUserCars({params},res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {cars:params.carsId}},
            {new:true}
        )
        .select('-__v')
        .populate('cars')
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'We were unable to find your account.'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'We were unable to find this user.' })
                    : res.json({ message: 'User has been deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

module.exports = userController