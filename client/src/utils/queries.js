import { gql } from '@apollo/client';

export const GET_BBQ_PACKAGES = gql`
  query getBBQPackages {
    getBBQPackages {
      _id
      name
      price
    }
  }
`;
