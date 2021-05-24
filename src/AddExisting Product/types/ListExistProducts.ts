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
}
export interface ListExistingProducts_ExistingProducts_edges_node {
  __typename: "User";
  id: string;
  status:string;
  createdAt:string
  updatedAt:string
  type
  product :{
    product:{
    name:string
  }
  name:string
  sku:string
price :{
  currency:string
  amount:any
}
}
supplier :supplier
// orders: ListSuppliers_Suppliers_edges_node_orders | null;
}

export interface ListExistingProductsRequest_ExistingProductsRequest_edges {
  __typename: "UserCountableEdge";
  node: ListExistingProducts_ExistingProducts_edges_node;
}

export interface ListExistingProducts_ExistingProducts_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ListExistingProductsRequest_ExistingProductsRequests {
  __typename: "UserCountableConnection";
  edges: ListExistingProductsRequest_ExistingProductsRequest_edges[];
  pageInfo: ListExistingProducts_ExistingProducts_pageInfo;
}

export interface ListExistingProducts {
  requestsExistProduct: ListExistingProductsRequest_ExistingProductsRequests | null;
}

export interface ListExistingProductsVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: RequestExistProductFilterInput | null;
  sort?: UserSortingInput | null;
}
