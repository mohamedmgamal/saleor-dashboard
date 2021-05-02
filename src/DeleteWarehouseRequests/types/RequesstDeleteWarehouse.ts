/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RequestExistProductFilterInput, UserSortingInput } from "./../../types/globalTypes";
// import * as url from "url";

// ====================================================
// GraphQL query operation: ListExistingProducts
// ====================================================


interface supplier{
  firstName:string;
  lastName:string;
  phone:string
}
export interface ListRequestDeleteWarehouse_RequestDeleteWarehouse_edges_node {
  __typename: "User";
  id:string
  status:String
  createdAt:string
  updatedAt:string
  warehouse:{
  name:string
  companyName:string
  address:{
  streetAddress1:string
  country:
{
  country:string
}
governorate:string
city:string
cityArea:string
}
}
supplier:supplier
// orders: ListSuppliers_Suppliers_edges_node_orders | null;
}

export interface ListRequestDeleteWarehouse_RequestDeleteWarehouse_edges {
  __typename: "UserCountableEdge";
  node: ListRequestDeleteWarehouse_RequestDeleteWarehouse_edges_node;
}

export interface ListRequestDeleteWarehouse_RequestDeleteWarehouse_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ListRequestDeleteWarehouse_RequestDeleteWarehouse   {
  __typename: "UserCountableConnection";
  edges: ListRequestDeleteWarehouse_RequestDeleteWarehouse_edges[];
  pageInfo: ListRequestDeleteWarehouse_RequestDeleteWarehouse_pageInfo;
}

export interface ListRequestDeleteWarehouse {
  requestsDeleteWarehouse: ListRequestDeleteWarehouse_RequestDeleteWarehouse | null;
}

export interface ListRequestDeleteWarehouseVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: RequestExistProductFilterInput | null;
  sort?: UserSortingInput | null;
}
