import gql from "graphql-tag";
export const newProductsFragment = gql`
  fragment newProductsFragment on RequestNewProduct {
            id
        status
        name
        createdAt
        updatedAt
        sku
        priceAmount
        image
        supplier
        {firstName
        lastName
        phone}
  }
`;
