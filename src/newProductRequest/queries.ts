import {newProductsFragment} from '@saleor/fragments/newProduc'
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import { ListNewProducts, ListNewProductsVariables } from "./types/ListNewProducts"

import {
  NewProductDetails,
  requestNewProductDetailsVariables
} from "./types/NewProductDetails";

const newProductsList = gql`
  ${newProductsFragment}
  query requestsNewProduct(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: RequestNewProductFilterInput
      ) {
    requestsNewProduct(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
    ) {
      edges {
        node {
          ...newProductsFragment
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
export const useNewProductListQuery = makeQuery<
  ListNewProducts,
  ListNewProductsVariables
>(newProductsList);

const newPoductDetails = gql`
  ${newProductsFragment}
  query requestNewProduct($id: ID!) {
    requestNewProduct(id: $id) {
      ...newProductsFragment
    }
  }
`;
export const TypedNewProductDetailsQuery = TypedQuery<
  NewProductDetails,
  requestNewProductDetailsVariables
>(newPoductDetails);

