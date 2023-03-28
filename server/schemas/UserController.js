const { User, Car, Space, Lot} = require('../models');
const { populate } = require('../models/user');
const { unsubscribe } = require('./login');


module.exports = { 

    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('cars')
            .populate('spaces')
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

    loginUser(req,res) {
        User.findOne({ })
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
            {$pull: {cars:params.carId}},
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

    addUserSpaces(req,res) {
        Space.findOneAndUpdate({_id: req.params.spaceId})
        .then((space) =>
        !space
        ? res.status(404).json({ message: 'We were unable to find this space.'})
        : Space.findOneAndUpdate(
            { _id: req.params.spaceId },
            {$set: { occupied: !occupied }},
            { new:true }
            )
            .then((user) =>
            !user
            ? res.status(404).json({message: 'We were unable to find your account.'})
            : User.findOneAndUpdate(
                {_id:req.params.userId},
                {$addToSet:{spaces:params.spaceId}},
                {new:true}
                )
            )
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUserSpacess({params},res){
        Space.findOneAndUpdate({_id: req.params.spaceId})
        .then((space) =>
        !space
        ?res.status(404).json({ message: 'We were unable to find this space.'})
        : Space.findOneAndUpdate(
            {_id: req.params.spaceId},
            {$set: {occupied: occupied }},
            { new:true }
        )
        .then((user) => 
        !user 
        ?res.status(404).json({messgae: 'We were unable to find your account.'})
        : User.findOneAndUpdate(
            {_id:req.params.userId},
            {$pull:{spaces:params.spaceId}},
            {new:true}
             )
        )
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

