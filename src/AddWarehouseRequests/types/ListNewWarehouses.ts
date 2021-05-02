/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RequestNewWarehouseFilterInput, UserSortingInput } from "./../../types/globalTypes";
// import * as url from "url";

// ====================================================
// GraphQL query operation: ListNewWarehouses
// ====================================================


interface supplier{
  firstName:string;
  lastName:string;
  phone:string
}
export interface  ListNewWareHouses_NewWareHouses_edges_node {
  __typename: "User";
  id:string
  status: string
  createdAt: string
  updatedAt: string
  address: {
    country:
      {
        country: string
      }
    governorate: string
    city: string
    cityArea: string
    streetAddress1: string
  }
  name: string
  supplier: supplier
}

export interface ListNewWareHousesRequest_NewWareHousesRequest_edges {
  __typename: "UserCountableEdge";
  node: ListNewWareHouses_NewWareHouses_edges_node;
}

export interface ListNewWareHouses_NewWareHouses_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ListNewWareHousesRequest_NewWareHousesRequests {
  __typename: "UserCountableConnection";
  edges: ListNewWareHousesRequest_NewWareHousesRequest_edges[];
  pageInfo: ListNewWareHouses_NewWareHouses_pageInfo;
}

export interface ListNewWarehouses {
  requestsAddWarehouse: ListNewWareHousesRequest_NewWareHousesRequests | null;
}

export interface ListNewWareHousesVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: RequestNewWarehouseFilterInput | null;
  sort?: UserSortingInput | null;
}
