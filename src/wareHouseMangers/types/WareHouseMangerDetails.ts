/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PaymentChargeStatusEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: WarehouseManagerDetails
// ====================================================

export interface SupplierDetails_user_defaultShippingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface SupplierDetails_user_defaultShippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: SupplierDetails_user_defaultShippingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SupplierDetails_user_defaultBillingAddress_country {
  __typename: "CountryDisplay";
  code: string;
  country: string;
}

export interface SupplierDetails_user_defaultBillingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  country: SupplierDetails_user_defaultBillingAddress_country;
  countryArea: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string | null;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SupplierDetails_user_orders_edges_node_total_gross {
  __typename: "Money";
  currency: string;
  amount: number;
}

export interface SupplierDetails_user_orders_edges_node_total {
  __typename: "TaxedMoney";
  gross: SupplierDetails_user_orders_edges_node_total_gross;
}

export interface SupplierDetails_user_orders_edges_node {
  __typename: "Order";
  id: string;
  created: any;
  number: string | null;
  paymentStatus: PaymentChargeStatusEnum | null;
  total: SupplierDetails_user_orders_edges_node_total | null;
}

export interface SupplierDetails_user_orders_edges {
  __typename: "OrderCountableEdge";
  node: SupplierDetails_user_orders_edges_node;
}

export interface SupplierDetails_user_orders {
  __typename: "OrderCountableConnection";
  edges: SupplierDetails_user_orders_edges[];
}

export interface SupplierDetails_user_lastPlacedOrder_edges_node {
  __typename: "Order";
  id: string;
  created: any;
}

export interface WareHouseMangerDetails_user {
  __typename: "User";
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateJoined: any;
  phone:string|null
  note: string | null;
  isActive: boolean;
  supplier :{
  firstName:string
  lastName:string
      }
  supplierId:number
}

export interface WareHouseMangerDetails {
  warehouseManager: WareHouseMangerDetails_user | null;
}

export interface WareHouseMangerDetailsVariables {
  id: string;
}
