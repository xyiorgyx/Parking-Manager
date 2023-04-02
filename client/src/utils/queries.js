import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      cars {
        _id
        license_plate
        make
        model
        color
      }
      space{
        _id
        spaceName
      }
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
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;
