import gql from "graphql-tag";
export const newWarehousesFragment = gql`
  fragment newWarehousesFragment on RequestAddWarehouse {
  id  
      status
      createdAt
      updatedAt
      address{
      country{country}
      governorate
      city
      cityArea
      streetAddress1
    }
      name
      supplier{
        firstName
        lastName
        phone
      }
  }
`;
