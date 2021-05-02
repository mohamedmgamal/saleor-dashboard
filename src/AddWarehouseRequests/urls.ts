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
import {NewWareHousesListUrlSortField} from "./components/NewWareHousesList"
export const newWareHouseSection = "/AddWareHouse";

export const newWareHouseListPath = newWareHouseSection;
export enum NewWareHouseListUrlFiltersEnum {
  joinedFrom = "joinedFrom",
  joinedTo = "joinedTo",
  moneySpentFrom = "moneySpentFrom",
  moneySpentTo = "moneySpentTo",
  numberOfOrdersFrom = "numberOfOrdersFrom",
  numberOfOrdersTo = "numberOfOrdersTo",
  query = "query"
}
export type NewWareHouseListUrlFilters = Filters<NewWareHouseListUrlFiltersEnum>;
export type NewWareHouseListUrlDialog = "remove" | TabActionDialog;
export type NewWareHouseListUrlSort = Sort<NewWareHousesListUrlSortField>;
export type NewWareHouseListUrlQueryParams = ActiveTab &
  BulkAction &
  NewWareHouseListUrlFilters &
  NewWareHouseListUrlSort &
  Dialog<NewWareHouseListUrlDialog> &
  Pagination;
export const newWareHouseListUrl = (params?: NewWareHouseListUrlQueryParams) =>
  newWareHouseListPath + "?" + stringifyQs(params);

export const newWareHousePath = (id: string) => urlJoin(newWareHouseSection, id);
export type NewWareHouseUrlDialog = "remove";
export type NewWareHouseUrlQueryParams = Dialog<NewWareHouseUrlDialog>;
export const newWareHouseUrl = (id: string, params?: NewWareHouseUrlQueryParams) =>
  newWareHousePath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const newWareHouseAddPath = urlJoin(newWareHouseSection, "add");
export const newWareHouseAddUrl = newWareHouseAddPath;

export const newWareHouseAddressesPath = (id: string) =>
  urlJoin(newWareHousePath(id), "addresses");
export type NewWareHouseAddressesUrlDialog = "add" | "edit" | "remove";
export type NewWareHouseAddressesUrlQueryParams = Dialog<
  NewWareHouseAddressesUrlDialog
  > &
  SingleAction;
export const newWareHouseAddressesUrl = (
  id: string,
  params?: NewWareHouseAddressesUrlQueryParams
) => newWareHouseAddressesPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export class NewWareHouseAddPath {
}
