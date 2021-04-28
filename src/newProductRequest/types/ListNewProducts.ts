/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { RequestNewProductFilterInput, UserSortingInput } from "./../../types/globalTypes";
// import * as url from "url";

// ====================================================
// GraphQL query operation: ListNewProducts
// ====================================================


interface supplier{
  firstName:string;
  lastName:string;
}
export interface ListNewProducts_NewProducts_edges_node {
  __typename: "User";
  id: string;
  status:string;
  name:string;
  createdAt:string
  updatedAt:string
  sku:string
  priceAmount:number
  image: string;
  supplier:supplier
 // orders: ListSuppliers_Suppliers_edges_node_orders | null;
}

export interface ListNewProductsRequest_NewProductsRequest_edges {
  __typename: "UserCountableEdge";
  node: ListNewProducts_NewProducts_edges_node;
}

export interface ListNewProducts_NewProducts_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ListNewProductsRequest_NewProductsRequests {
  __typename: "UserCountableConnection";
  edges: ListNewProductsRequest_NewProductsRequest_edges[];
  pageInfo: ListNewProducts_NewProducts_pageInfo;
}

export interface ListNewProducts {
  requestsNewProduct: ListNewProductsRequest_NewProductsRequests | null;
}

export interface ListNewProductsVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: RequestNewProductFilterInput | null;
  sort?: UserSortingInput | null;
}
