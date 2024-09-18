import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation placeOrder($packageId: ID!) {
    placeOrder(packageId: $packageId) {
      _id
      package {
        name
      }
    }
  }
`;
