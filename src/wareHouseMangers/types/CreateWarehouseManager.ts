/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {  AccountErrorCode } from "./../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateWarehouseManager
// ====================================================

export interface CreateWarehouseManager_WarehouseManagerCreate_errors {
  __typename: "AccountError";
  code: AccountErrorCode;
  massage:string | null ;
  field: string | null;
}

export interface CreateWarehouseManager_WarehouseManagerCreate_user {
  __typename: "User";
  id: string;
}

export interface CreateWarehouseManager_WarehouseManagerCreate {
  __typename: "warehouseManagerCreate";
  errors: CreateWarehouseManager_WarehouseManagerCreate_errors[];
  WarehouseManager: CreateWarehouseManager_WarehouseManagerCreate_user | null;
}

export interface CreateWarehouseManager {
  warehouseManagerCreate: CreateWarehouseManager_WarehouseManagerCreate | null;
}

export interface CreateWarehouseManagerVariables {
  input: UserCreateInput;
}
 interface UserCreateInput {
  phone?:string |null;
  password?:string |null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  supplier:string|null
}
