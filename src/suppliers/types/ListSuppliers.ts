/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SupplierFilterInput, UserSortingInput } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: ListSuppliers
// ====================================================

export interface ListSuppliers_Suppliers_edges_node_orders {
  __typename: "OrderCountableConnection";
  totalCount: number | null;
}

export interface ListSuppliers_Suppliers_edges_node {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
 // orders: ListSuppliers_Suppliers_edges_node_orders | null;
}

export interface ListSuppliers_Suppliers_edges {
  __typename: "UserCountableEdge";
  node: ListSuppliers_Suppliers_edges_node;
}

export interface ListSuppliers_Suppliers_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ListSuppliers_Suppliers {
  __typename: "UserCountableConnection";
  edges: ListSuppliers_Suppliers_edges[];
  pageInfo: ListSuppliers_Suppliers_pageInfo;
}

export interface ListSuppliers {
  suppliers: ListSuppliers_Suppliers | null;
}

export interface ListSuppliersVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: SupplierFilterInput | null;
  sort?: UserSortingInput | null;
}
