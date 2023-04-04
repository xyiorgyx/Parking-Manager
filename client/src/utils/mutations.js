import { gql } from '@apollo/client';

//createuser, login, addusercar, deleteusercar, occupy space, vacatespace

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $name: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      name: $name
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER_CAR = gql`
  mutation addUserCar(
    $license_plate: String!
    $make: String!
    $model: String!
    $color: String!
    $owner: String!
  ) {
    addUserCar(
      license_plate: $license_plate
      make: $make
      model: $model
      color: $color
      owner: $owner
    ) {
      license_plate
      make
      model
      color
      owner
    }
  }
`;

export const DELETE_USER_CAR = gql`
  mutation deleteUserCar($carId: ID!) {
    deleteUserCar(carId: $carId) {
      _id
      license_plate
      make
      model
      color
    }
  }
`;

export const OCCUPY_SPACE = gql`
  mutation occupySpace($spaceId: ID!, $license_plate: String!) {
    occupySpace(spaceId: $spaceId, license_plate: $license_plate) {
      _id
      spaceName
      occupied
      parkingLot
    }
  }
`;

export const VACATE_SPACE = gql`
  mutation vacateSpace($spaceId: ID!) {
    vacateSpace(spaceId: $spaceId) {
      _id
      spaceName
      occupied
      parkingLot
    }
  }
`;

export const UPDATE_USER_CAR =
  `mutation UpdateUserCar(
  $license_plate: String
  $make: String
  $model: String
  $color: String
  $owner: String
) {
  UpdateUserCar(
    license_plate: $license_plate
    make: $make
    model: $model
    color: $color
    owner: $owner
  ) {
    license_plate
    make
    model
    color
    owner
  }
}
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $name: String!
  ) {
    updateUser(
      username: $username
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      name: $name
    ) 
  }
`;