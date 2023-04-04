const { AuthenticationError } = require("apollo-server-express");
const { User, Car, Lot, Space } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { userId }, context) => {
      return User.findById(userId).populate("cars");
    },
    me: async (_, __, { user }) => {
      if (user) {
        console.log("Did you find a user?")
        return User.findById(user._id).populate("cars");
      }
    },
    users: async () => {
    return User.find().populate('cars');
    },
    car: async (parent, { carId }) => {
      const car = await Car.findOne({ _id: carId });
      return car;
    },
    cars: async () => {
      return Car.find();
    },
    lot: async () => {
      return Lot.find().populate("spaces");
    },
    spaces: async () => {
      return Space.find().populate("spaceName");
    },
  },

  Mutation: {
    addUser: async (
      parent,
      { username, email, password, phoneNumber, name }
    ) => {
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        name,
      });
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
          $upsert:true,
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

    addUserCar: async (
      parent,
      { license_plate, make, model, color, owner },
      context
    ) => {
      if (context.user) {
        const car = await Car.create({
          license_plate,
          make,
          model,
          color,
          owner,
        });
        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: { cars: car._id },
        });
        return car;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteUserCar: async (parent, { license_plate }, context) => {
      if (context.user) {
        const car = await Car.findOneAndDelete(
          {license_plate}
        );

        await User.findByIdAndUpdate (
          context.user._id,
          { $pull: { cars: car._id } },
          { new: true }
        );
        
        return car;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    /*
    updateUserCar: async (parent, 
      {
        carId,
        license_plate,
        make,
        model,
        color,
        owner}, context) => {
      if (context.user) 
      {
        const car = await Car.findByIdAndUpdate(
         {_id:carId}, 
          {
            license_plate,
            make,
            model,
            color,
            owner 
          },
          { $upsert: true });

          await User.findByIdAndUpdate(context.user._id, {
            $addToSet:{ cars: car._id },
          });
          return car;
        
      }
      throw new AuthenticationError("Not logged in");
    },*/

    occupySpace: async (parent, { spaceName, occupied, occupant }, context) => {
      if (context.user) {
        await Space.findOneAndUpdate(
          { spaceName },
          { occupied,
            occupant },
          { new: true }
        );
        await Car.findByIdAndUpdate(
          _id,
          { $addToSet: { spaces: { spaceName} } },
          { new: true }
        );
      }
      throw new AuthenticationError("Not logged in");
    },
    vacateSpace: async (parent, { spaceName, occupied, occupant }, context) => {
      if (context.user) {
        await Space.findOneAndUpdate(
          { spaceName},
          { occupied,
            occupant },
          { new: true }
        );
        await Car.findByIdAndUpdate(
          _id,
          { $pull: { spaces: { spaceName } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Not logged in");
    },
}
}
module.exports = resolvers;
