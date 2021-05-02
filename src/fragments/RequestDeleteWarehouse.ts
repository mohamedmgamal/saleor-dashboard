import gql from "graphql-tag";
export const deleteWarehousesFragment = gql`
  fragment deleteWarehousesFragment on RequestDeleteWarehouse {
  id
        status
        createdAt
        updatedAt
        warehouse{
          name
          companyName
          address{
            streetAddress1
            country
            {
              country
            }
            governorate
            city
            cityArea
          }
        }
        supplier{
          firstName
          lastName
          phone
        }
  }
`;
