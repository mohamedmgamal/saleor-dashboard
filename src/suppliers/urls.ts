import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog
} from "../types";

export const supplierSection = "/suppliers/";

export const supplierListPath = supplierSection;
export enum SupplierListUrlFiltersEnum {
  joinedFrom = "joinedFrom",
  joinedTo = "joinedTo",
  moneySpentFrom = "moneySpentFrom",
  moneySpentTo = "moneySpentTo",
  numberOfOrdersFrom = "numberOfOrdersFrom",
  numberOfOrdersTo = "numberOfOrdersTo",
  query = "query"
}
export type SupplierListUrlFilters = Filters<SupplierListUrlFiltersEnum>;
export type SupplierListUrlDialog = "remove" | TabActionDialog;
export enum SupplierListUrlSortField {
  name = "name",
  email = "email",
  phone = "phone"
}
export type SupplierListUrlSort = Sort<SupplierListUrlSortField>;
export type SupplierListUrlQueryParams = ActiveTab &
  BulkAction &
  SupplierListUrlFilters &
  SupplierListUrlSort &
  Dialog<SupplierListUrlDialog> &
  Pagination;
export const supplierListUrl = (params?: SupplierListUrlQueryParams) =>
  supplierListPath + "?" + stringifyQs(params);

export const supplierPath = (id: string) => urlJoin(supplierSection, id);
export type SupplierUrlDialog = "remove";
export type SupplierUrlQueryParams = Dialog<SupplierUrlDialog>;
export const supplierUrl = (id: string, params?: SupplierUrlQueryParams) =>
  supplierPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const supplierAddPath = urlJoin(supplierSection, "add");
export const supplierAddUrl = supplierAddPath;

export const supplierAddressesPath = (id: string) =>
  urlJoin(supplierPath(id), "addresses");
export type SupplierAddressesUrlDialog = "add" | "edit" | "remove";
export type SupplierAddressesUrlQueryParams = Dialog<
  SupplierAddressesUrlDialog
> &
  SingleAction;
export const supplierAddressesUrl = (
  id: string,
  params?: SupplierAddressesUrlQueryParams
) => supplierAddressesPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export class SupplierAddPath {
}
