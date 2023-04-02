import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    User {
        name
        cars
        phoneNumber
        paid
        email
    }
  }
`; 