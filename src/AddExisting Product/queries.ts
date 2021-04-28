import {
  supplierDetailsFragment,
} from "@saleor/fragments/suppliers";
import {existingProductsFragment} from '@saleor/fragments/existingProduct'
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import { ListExistingProducts, ListExistingProductsVariables } from "./types/ListExistProducts";
import {
  SupplierAddresses,
  SupplierAddressesVariables
} from "./types/SupplierAddresses";
import { SupplierCreateData } from "./types/SupplierCreateData";
import {
  ExistingProductDetails,
  ExistingProductDetailsVariables
} from "./types/ExistingProductDetails";

const existingProductsList = gql`
  ${existingProductsFragment}
  query requestsExistProduct(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: RequestExistProductFilterInput
      ) {
    requestsExistProduct(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
    ) {
      edges {
        node {
          ...existingProductsFragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
export const usesExistingProductListQuery = makeQuery<
  ListExistingProducts,
  ListExistingProductsVariables
>(existingProductsList);


const usesExistingProductDetails = gql`
  query requestExistProduct($id: ID!) {
    requestExistProduct(id: $id) {
        id
        status
        createdAt
        updatedAt
        type
        product {
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
  }
`;
export const TypedExistingProductDetailsQuery = TypedQuery<
  ExistingProductDetails,
  ExistingProductDetailsVariables
>(usesExistingProductDetails);




const supplierAddresses = gql`
  ${supplierDetailsFragment}
  query supplier($id: ID!) {
    supplier(id: $id) {
      ...supplierDetailsFragment
    }
  }
`;
export const TypedSupplierAddressesQuery = TypedQuery<
  SupplierAddresses,
  SupplierAddressesVariables
>(supplierAddresses);

const supplierCreateData = gql`
  query CustomerCreateData {
    shop {
      countries {
        code
        country
      }
    }
  }
`;
export const TypedSupplierCreateDataQuery = TypedQuery<SupplierCreateData, {}>(
  supplierCreateData
);
