const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID!
    password:String!
    name:String!
    phone:String!
    cars: [Car]!
    spaces: [Space]!
    paid: Boolean
},

type Car {

},

type Space {

},
type Lot {

},


type Query {

}, 

type Mutations{

}

`

module.exports = typeDefs;
