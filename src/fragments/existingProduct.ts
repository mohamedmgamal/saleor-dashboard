import gql from "graphql-tag";
export const existingProductsFragment = gql`
  fragment existingProductsFragment on RequestExistProduct {
            id
        status
        createdAt
        updatedAt
        type
        product {
        product{
            name
          }
          name
          sku
          price {
            currency
            amount
          }
        }

        supplier {
          firstName
          lastName
          phone
        }
  }
`;
