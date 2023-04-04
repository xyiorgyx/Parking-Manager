const { AuthenticationError } = require("apollo-server-express");
const { User, Car, Lot, Space } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate("cars");
        return userData
      }
      throw new AuthenticationError('not logged in!')
    },
    // users: async () => {
    //   return User.find().populate('cars');
    // },
    // car: async (parent, { license_plate }) => {
    //   return Car.findOne({ license_plate });
    // },
     cars: async () => {
      return Car.find();
     },
    lot: async () => {
      return Lot.find().populate("spaces");
    },
    spaces: async () => {
      return Space.find().populate('spaceName');
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        const deletedUser = await User.findOneAndDelete(
          context.user._id,
          args,
          { new: true }
        );

        return deletedUser;
      }
      throw new AuthenticationError("Not logged in");
    },

    addUserCar: async (parent, { license_plate, make, model, color,owner }, context) => {
      if (context.user) {
        const car = await Car.create({
          license_plate,
          make,
          model,
          color,
          owner
        
        });
        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { cars: car._id } }
        );
        return car;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteUserCar: async (parent, { carId }, context) => {
      if (context.user) {
        const car = await Car.findByIdAndDelete(carId);

        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { cars: carId } },
          { new: true }
        );
        return car;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateUserCar: async (parent, args, context) => {
      if (context.user) {
        return await Car.findByIdAndUpdate(_id, args, { new: true });
      }
      throw new AuthenticationError("Not logged in");
    },

    addCarSpace: async (parent, { carId, spaceId, spaceName, parkingLot }) => {// context
      // if (context.user) {
      return await Car.findOneAndUpdate(
        { _id: carId },
        {
          $push: {
            spaces: { _id: spaceId, spaceName, parkingLot },
          },
        },
        { new: true }
      );
    },
    //throw new AuthenticationError("You need to be logged in!");

    deleteCarSpace: async (parent, { carId, spaceId }) => { //context
      //if (context.user) {
      return await Car.findOneAndUpdate(
        { _id: carId },
        { $pull: { spaces: { _id: spaceId } } },
        { new: true }
      );
    },
    //throw new AuthenticationError("You need to be logged in!");

    occupySpace: async (parent, { spaceId }, context) => {
      if (context.user) {
        return await Space.findOneAndUpdate(
          { _id: spaceId },
          { $set: { occupied: true } },
          { new: true }
        );
      }
      throw new AuthenticationError("Not logged in");
    },
    vacateSpace: async (parent, { spaceId }, context) => {
      if (context.user) {
        return await Space.findOneAndUpdate(
          { _id: spaceId },
          { $set: { occupied: false } },
          { new: true }
        );
      }
      throw new AuthenticationError("Not logged in");
    }
  }
}


module.exports = resolvers;
