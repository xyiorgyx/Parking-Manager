const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID!
    password:String!
    name:String!
    username:String!
    phone_number:String!
    cars: [Car]!
    paid: Boolean
}

type Car {
    _id: ID!
    license_plate:String!
    make:String!
    model:String!
    color:String!
    spaces: [Space]!
}

type Space {
    _id:ID!
    spaceName:String!
    occupied:Boolean!
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
    car(carId:ID!):Car
    lot(lotName:String!):Lot
} 

type Mutation {
    createUser(username: String!, email: String!, password: String!, phone_number:String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(userId: ID!): Auth
    deleteUser(userId:ID!): Auth
    addUserCar(license_plate:String!): Car
    deleteUserCar(license_plate:String!, carId:ID!): Car
    updateUserCar(carId:ID!): Car
    addCarSpace(carId:ID!, spaceName:String!): Car
    deleteCarSpace(spaceId:ID!, carId:ID!): Car
    occupySpace(spaceId:ID!, lotId: ID!): Space
    vacateSpace(spaceId:ID!, lotId:ID!):Space
  }
`;

module.exports = typeDefs;
