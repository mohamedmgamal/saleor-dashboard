/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WareHouseMangersFilterInput, UserSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ListWareHouseMangers
// ====================================================

export interface ListwareHouseMangers_wareHouseMangers_edges_node_orders {
  __typename: "OrderCountableConnection";
  totalCount: number | null;
}
interface supplier{
  firstName:string
  lastName:string
}
export interface ListwareHouseMangers_wareHouseMangers_edges_node {
  __typename: "User";
  firstName:string
  id:string
  lastName:string
  phone:string
  isActive:boolean
  dateJoined:string
  email:string
  supplier:supplier
 // orders: ListwareHouseMangers_wareHouseMangers_edges_node_orders | null;
}

export interface ListwareHouseMangers_wareHouseMangers_edges {
  __typename: "UserCountableEdge";
  node: ListwareHouseMangers_wareHouseMangers_edges_node;
}

export interface ListwareHouseMangers_wareHouseMangers_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ListwareHouseMangers_wareHouseMangers {
  __typename: "UserCountableConnection";
  edges: ListwareHouseMangers_wareHouseMangers_edges[];
  pageInfo: ListwareHouseMangers_wareHouseMangers_pageInfo;
}

export interface ListWareHouseMangers {
  warehouseManagers: ListwareHouseMangers_wareHouseMangers | null;
}

export interface ListwareHouseMangersVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: WareHouseMangersFilterInput | null;
  sort?: UserSortingInput | null;
}
