import { gql } from '@apollo/client';

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
  query getCars {
    car {
        _id
        license_plate
        make
        model
        color
    }
  }
`;

export const QUERY_LOT = gql`
  query getLot {
    lot {
        _id
        lotName
        }
        space{
            _id
            spaceName
        }
    }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
    }
  }
`;
