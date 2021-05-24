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
import {DeleteWarehousesListUrlSortField} from "./components/DeleteWarehouseRequestsList"
export const deleteWarehouseSection = "/DeleteWareHouse";

export const deleteWarehouseListPath = deleteWarehouseSection;
export enum DeleteWarehouseListUrlFiltersEnum {
  joinedFrom = "joinedFrom",
  joinedTo = "joinedTo",
  moneySpentFrom = "moneySpentFrom",
  moneySpentTo = "moneySpentTo",
  numberOfOrdersFrom = "numberOfOrdersFrom",
  numberOfOrdersTo = "numberOfOrdersTo",
  query = "query"
}
export type DeleteWarehouseListUrlFilters = Filters<DeleteWarehouseListUrlFiltersEnum>;
export type DeleteWarehouseListUrlDialog = "remove" | TabActionDialog;
export type DeleteWarehouseListUrlSort = Sort<DeleteWarehousesListUrlSortField>;
export type DeleteWarehouseListUrlQueryParams = ActiveTab &
  BulkAction &
  DeleteWarehouseListUrlFilters &
  DeleteWarehouseListUrlSort &
  Dialog<DeleteWarehouseListUrlDialog> &
  Pagination;
export const deleteWarehouseListUrl = (params?: DeleteWarehouseListUrlQueryParams) =>
  deleteWarehouseListPath + "?" + stringifyQs(params);

export const deleteWarehousePath = (id: string) => urlJoin(deleteWarehouseSection, id);
export type DeleteWarehouseUrlDialog = "remove";
export type DeleteWarehouseUrlQueryParams = Dialog<DeleteWarehouseUrlDialog>;
export const existProductUrl = (id: string, params?: DeleteWarehouseUrlQueryParams) =>
  deleteWarehousePath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const deleteWarehouseAddPath = urlJoin(deleteWarehouseSection, "add");
export const deleteWarehouseAddUrl = deleteWarehouseAddPath;

export const deleteWarehouseAddressesPath = (id: string) =>
  urlJoin(deleteWarehousePath(id), "addresses");
export type DeleteWarehouseAddressesUrlDialog = "add" | "edit" | "remove";
export type DeleteWarehouseAddressesUrlQueryParams = Dialog<
  DeleteWarehouseAddressesUrlDialog
  > &
  SingleAction;
export const newProductAddressesUrl = (
  id: string,
  params?: DeleteWarehouseAddressesUrlQueryParams
) => deleteWarehouseAddressesPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export class DeleteWarehouseAddPath {
}
