import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
      _id
      email
      username
      cars {
        _id
        color
        license_plate
        make
        model
        owner
        spaces {
          _id
          occupied
          parkingLot
          spaceName
        }
      }
      name
      paid
      phoneNumber
    }
  }
`;

export const QUERY_CARS = gql`
  query cars {
    cars {
      _id
      license_plate
      make
      model
      color
      owner
    }
  }
`;

export const QUERY_CAR = gql`
  query car($carId: ID!) {
    car(carId: $carId) {
      _id
      license_plate
      make
      model
      color
      owner
    }
  }
`;

export const QUERY_LOT = gql`
  query getLot {
    lot {
      _id
      lotName
      address
      parkingRate
      photo
    }
    space {
      _id
      spaceName
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
      username
      cars {
        _id
        color
        license_plate
        make
        model
        owner
        spaces {
          _id
          occupied
          parkingLot
          spaceName
        }
      }
      name
      paid
      phoneNumber
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      password
      name
      username
      phoneNumber
      paid
      email
      cars {
        _id
        license_plate
        make
        model
        color
      }
    }
  }
`;
