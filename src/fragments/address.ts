import gql from "graphql-tag";

export const fragmentAddress = gql`
  fragment AddressFragment on Address {
    city
    cityArea
    companyName
    country {
      __typename
      code
      country
    }
    governorate
    firstName
    id
    lastName
    phone
    streetAddress1
    streetAddress2
  }
`;
