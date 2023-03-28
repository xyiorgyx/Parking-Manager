const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID!
    password:String!
    name:String!
    username:String!
    phone_number:String!
    cars: [Car]!
    spaces: [Space]!
    paid: Boolean
},

type Car {
    _id: ID!
    license_plate:String!
    make:String!
    model:String!
    color:String!
},

type Space {
    spaceName:String!
    occupied:Boolean!
},

type Lot {
    lotName:String!
    lotSpaces:[Space]!
},

type Auth {
    token: ID!
    user: User
  }


type Query {
    users:[User]
    user(username:String!):User
    me:User
    cars(username:String!):[Car]
    car(license_plate:String!):Car
    lot(lotName:String!):Lot
}, 

type Mutations{
    createUser(username: String!, email: String!, password: String!, phone_number:String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(email:String!): Auth
    deleteUser(userId:ID!): Auth
    addUserCar(license_plate:String!, make:String!, model:String!, color:String!): Car
    deleteUserCar(license_plate:String!, carId:ID!): Car
    addUserSpace()
    deleteUserSpace()
    updateSpace(boolean)
    updateLot()
    updateCar()
  }

}

`

module.exports = typeDefs;
