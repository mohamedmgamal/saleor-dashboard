import {newWarehousesFragment} from '@saleor/fragments/RequestNewWareHouses'
import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

import { TypedQuery } from "../queries";
import { ListNewWarehouses, ListNewWareHousesVariables } from "./types/ListNewWarehouses"
import {
  NewWarehouseDetails,
  requestNewWarehouseDetailsVariables
} from "./types/NewWarehouseDetails";

const newNewWareHousesList = gql`
  ${newWarehousesFragment}
  query requestsAddWarehouse(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: RequestNewWarehouseFilterInput
      ) {
    requestsAddWarehouse(
      after: $after
      before: $before
      first: $first
      last: $last
      filter: $filter
    ) {
      edges {
        node {
          ...newWarehousesFragment
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
export const useNewNewWarehousesListQuery = makeQuery<
  ListNewWarehouses,
  ListNewWareHousesVariables
>(newNewWareHousesList);


const newWarehouseDetails = gql`
  query requestAddWarehouse($id: ID!) {
    requestAddWarehouse(id: $id) {
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
  }
`;
export const TypedNewNewWarehouseDetailsQuery = TypedQuery<
  NewWarehouseDetails,
  requestNewWarehouseDetailsVariables
>(newWarehouseDetails);

