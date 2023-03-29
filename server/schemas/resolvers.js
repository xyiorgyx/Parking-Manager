const { AuthenticationError } = require("apollo-server-express");
const { User, Car, Lot, Space } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("cars");
    },
    users: async () => {
      return User.find().populate("username");
    },
    car: async (parent, { carId }) => {
      return Car.findOne({ _id: carId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("cars");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    cars: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Car.find(params);
    },
    lot: async () => {
      return Lot.find().populate("lotName").popluate("lotSpaces");
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
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

    addUserCar: async (parent, { license_plate }, context) => {
      if (context.user) {
        const car = await Car.create({
          _id,
          license_plate,
          make,
          model,
          color,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { cars: car._id } }
        );
        return car;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteUserCar: async (parent, { carId }, context) => {
      if (context.user) {
        const car = await Car.findOneAndDelete({
          _id: carId,
          license_plate,
          make,
          model,
          color,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { cars: car._id } }
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

    addCarSpace: async (parent, { carId, spaceName }, context) => {
      if (context.user) {
        return Car.findOneAndUpdate(
          { _id: carId },
          {
            $addToSet: {
              spaces: { spaceName },
            },
          },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteCarSpace: async (parent, { carId, spaceId }, context) => {
      if (context.user) {
        return Car.findOneAndUpdate(
          { _id: carId },
          {
            $pull: {
              spaces: { _id: spaceId },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    occupySpace: async (parent, { spaceId, lotId }, context) => {
      if (context.user) {
        const occupiedSpace = Space.findOneAndUpdate(
          { _id: spaceId },
          { $set: { occupied: true } },
          { new: true }
        );
        await Lot.findOneAndUpdate(
          { _id: lotId },
          { $push: { lotSpaces: occupiedSpace } }
        );
        return occupiedSpace;
      }
      throw new AuthenticationError("Not logged in");
    },
    vacateSpace: async (parent, { spaceId, lotId }, context) => {
      if (context.user) {
        const vacatedSpace = Space.findOneAndUpdate(
          { _id: spaceId },
          { $set: { occupied: false } },
          { new: true }
        );
        await Lot.findOneAndUpdate(
          { _id: lotId },
          { $pull: { lotSpaces: vacatedSpace } }
        );
        return vacatedSpace;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
