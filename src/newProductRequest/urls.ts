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
import {NewProductsListUrlSortField} from "./components/NewPRoductsList"
export const newProductSection = "/newProductRequest";

export const newProductListPath = newProductSection;
export enum NewProductListUrlFiltersEnum {
  joinedFrom = "joinedFrom",
  joinedTo = "joinedTo",
  moneySpentFrom = "moneySpentFrom",
  moneySpentTo = "moneySpentTo",
  numberOfOrdersFrom = "numberOfOrdersFrom",
  numberOfOrdersTo = "numberOfOrdersTo",
  query = "query"
}
export type NewProductListUrlFilters = Filters<NewProductListUrlFiltersEnum>;
export type NewProductListUrlDialog = "remove" | TabActionDialog;
export type NewProductListUrlSort = Sort<NewProductsListUrlSortField>;
export type NewProductListUrlQueryParams = ActiveTab &
  BulkAction &
  NewProductListUrlFilters &
  NewProductListUrlSort &
  Dialog<NewProductListUrlDialog> &
  Pagination;
export const newProductListUrl = (params?: NewProductListUrlQueryParams) =>
  newProductListPath + "?" + stringifyQs(params);

export const newProductPath = (id: string) => urlJoin(newProductSection, id);
export type NewProductUrlDialog = "remove";
export type NewProductUrlQueryParams = Dialog<NewProductUrlDialog>;
export const newProductUrl = (id: string, params?: NewProductUrlQueryParams) =>
  newProductPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const newProductAddPath = urlJoin(newProductSection, "add");
export const newProductAddUrl = newProductAddPath;

export const newProductAddressesPath = (id: string) =>
  urlJoin(newProductPath(id), "addresses");
export type NewProductAddressesUrlDialog = "add" | "edit" | "remove";
export type NewProductAddressesUrlQueryParams = Dialog<
  NewProductAddressesUrlDialog
  > &
  SingleAction;
export const newProductAddressesUrl = (
  id: string,
  params?: NewProductAddressesUrlQueryParams
) => newProductAddressesPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export class NewProductAddPath {
}
