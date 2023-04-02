import { gql } from '@apollo/client';

//createuser, login, addusercar, deleteusercar, occupy space, vacatespace

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER_CAR = gql`
mutation addUserCar($license_plate: String!, $make: String!, $model: String!, $color: String!) {
    addUserCar(license_plate: $license_plate, make: $make, model: $model, color: $color) {
        token
        user {
            _id: ID!
            license_plate:String!
            make:String!
            model:String!
            color:String!
        }
    }
}
`;

export const DELETE_USER_CAR = gql`
mutation deleteUserCar($license_plate: String!, $make: String!, $model: String!, $color: String!) {
  deleteUserCar(license_plate: $license_plate, make: $make, model: $model, color: $color) {
        token
        user {
            _id: ID!
            license_plate:String!
            make:String!
            model:String!
            color:String!
        }
    }
}
`;

export const OCCUPY_SPACE = gql`
mutation occupySpace($license_plate: String!, $spaceName: String!, $make: String!, $model: String!, $color: String!) {
  deleteUserCar(license_plate: $license_plate, spaceName: $spaceName, make: $make, model: $model, color: $color) {
        token
        user {
            _id: ID!
            license_plate:String!
            spaceName:String!
            model:String!
            color:String!
        }
    }
}
`;

export const VACATE_SPACE = gql`
mutation vacateSpace($license_plate: String!, $spaceName: String!, $make: String!, $model: String!, $color: String!) {
  vacateSpace(license_plate: $license_plate, spaceName: $spaceName, make: $make, model: $model, color: $color) {
        token
        user {
            _id: ID!
            license_plate:String!
            spaceName:String!
            model:String!
            color:String!
        }
    }
}
`;