const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    license_plate:String
    make:String
    model:String
    color:String
    owner:String
    spaces: [Space]
}

type Space {
    _id:ID!
    spaceName:String
    occupied:Boolean
    parkingLot:String
}

type Lot {
    _id: ID!
    lotName:String
    address:String
    parkingRate:Int
    photo: String
    spaces:[Space]
}

type Auth {
    token: ID!
    user: User
  }


type Query {
    #users:[User]
    user:User
    car(license_plate:String!):Car
    cars: [Car]
    lot: [Lot]
    spaces: [Space]
} 

type Mutation {
    addUser(username: String!, email: String!, password: String!, phoneNumber:String!, name:String!): Auth
    login(email: String!, password: String!): Auth
    updateUser(userId:ID!): Auth
    deleteUser(userId:ID!): Auth

    addUserCar(license_plate:String!, make:String!, model:String!, color:String!, owner:String!): Car
    deleteUserCar(carId:ID!): Car
    updateUserCar(_id:ID!,license_plate:String, make:String, model:String, color:String): Car
    addCarSpace(carId:ID!, spaceId:ID!, spaceName:String!, parkingLot:String!): Car
    deleteCarSpace(carId:ID!, spaceId:ID!): User

    occupySpace(spaceId:ID!): Space
    vacateSpace(spaceId:ID!):Space
  }
`;

module.exports = typeDefs;
