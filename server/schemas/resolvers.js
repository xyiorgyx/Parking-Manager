const { AuthenticationError } = require('apollo-server-express');
const { User, Car, Lot, Space } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('cars').populate('space');
        },
        users: async () => {
            return User.find().populate('username');
        },
        car: async (parent, { carId }) => {
            return Car.findOne({ _id: carId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('cars');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        cars: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Car.find(params)
        },
        lot: async () => {
            return Lot.find().populate('lotName').popluate('lotSpaces');
        }
    },

    Mutation: {

    }
};
module.exports = resolvers;
