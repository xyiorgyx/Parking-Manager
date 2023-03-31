const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID!
    password:String!
    name:String
    username:String!
    phoneNumber:String
    cars: [Car]
    paid: Boolean
    email:String
}

type Car {
    _id: ID!
    license_plate:String!
    make:String!
    model:String!
    color:String!
    owner:String!
    spaces: [Space]
}

type Space {
    _id:ID!
    spaceName:String!
    occupied:Boolean
}

type Lot {
    lotName:String!
    lotSpaces:[Space]!
}

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
    lot:[Lot]
} 

type Mutation {
    createUser(username: String!, email: String!, password: String!, phoneNumber:String!, name:String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(userId:ID!): Auth
    deleteUser(userId:ID!): Auth

    addUserCar(license_plate:String!): Car
    deleteUserCar(license_plate:String!): Car
    updateUserCar(license_plate:String!): Car

    addCarSpace(license_plate:String!, spaceName:String!): Car
    deleteCarSpace(spaceName:String!, license_plate:String!): Car

    occupySpace(spaceName:String!, lotName:String!): Space
    vacateSpace(spaceName:String!, lotName:String!):Space
  }
`;

module.exports = typeDefs;
