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
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email,password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne ({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
              }
        
              const correctPw = await user.isCorrectPassword(password);
        
              if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
              }
        
              const token = signToken(user);
        
              return { token, user };
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Not logged in');
          },

          deleteUser: async (parent, { userId }, context) => { },

          addUserCar: async (parent, { license_plate }, context) => {
            if (context.user){
                const car = await Car.create({
                    license_plate,
                    make,
                    model,
                    color
                });
                await User.findOneAndUpdate(
                    {_id:context.user._id},
                    {$addToSet: { cars: car._id}}       
                );
                return car;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          deleteUserCar: async (parent, {carId}, context) => {
            if (context.user) {
                const car = await Car.findOneAndDelete({
                    _id: carId,
                    license_plate,
                    make,
                    model,
                    color
                });
                await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {cars: car._id}}
                );
                return car;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
          addCarSpace: async (parent, { carId, spaceName }, context) => {
            if (context.user) {
                return Car.findOneAndUpdate(
                    {_id: carId},
                )
            }
          }

    }
};
module.exports = resolvers;
