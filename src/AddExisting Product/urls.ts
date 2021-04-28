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
import {ExistingProductsListUrlSortField} from "./components/ExistPRoductsList"
export const existingProductSection = "/existingProductRequest";

export const existingProductListPath = existingProductSection;
export enum ExistingProductListUrlFiltersEnum {
  joinedFrom = "joinedFrom",
  joinedTo = "joinedTo",
  moneySpentFrom = "moneySpentFrom",
  moneySpentTo = "moneySpentTo",
  numberOfOrdersFrom = "numberOfOrdersFrom",
  numberOfOrdersTo = "numberOfOrdersTo",
  query = "query"
}
export type ExistingProductListUrlFilters = Filters<ExistingProductListUrlFiltersEnum>;
export type ExistingProductListUrlDialog = "remove" | TabActionDialog;
export type ExistingProductListUrlSort = Sort<ExistingProductsListUrlSortField>;
export type ExistingProductListUrlQueryParams = ActiveTab &
  BulkAction &
  ExistingProductListUrlFilters &
  ExistingProductListUrlSort &
  Dialog<ExistingProductListUrlDialog> &
  Pagination;
export const existingProductListUrl = (params?: ExistingProductListUrlQueryParams) =>
  existingProductListPath + "?" + stringifyQs(params);

export const existingProductPath = (id: string) => urlJoin(existingProductSection, id);
export type ExistingProductUrlDialog = "remove";
export type ExistingProductUrlQueryParams = Dialog<ExistingProductUrlDialog>;
export const existProductUrl = (id: string, params?: ExistingProductUrlQueryParams) =>
  existingProductPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const existingProductAddPath = urlJoin(existingProductSection, "add");
export const existingProductAddUrl = existingProductAddPath;

export const existingProductAddressesPath = (id: string) =>
  urlJoin(existingProductPath(id), "addresses");
export type ExistingProductAddressesUrlDialog = "add" | "edit" | "remove";
export type ExistingProductAddressesUrlQueryParams = Dialog<
  ExistingProductAddressesUrlDialog
  > &
  SingleAction;
export const newProductAddressesUrl = (
  id: string,
  params?: ExistingProductAddressesUrlQueryParams
) => existingProductAddressesPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export class ExistingProductAddPath {
}
