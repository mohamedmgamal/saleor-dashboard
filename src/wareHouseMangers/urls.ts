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

export const wareHouseMangerSection = "/wareHouseMangers";

export const wareHouseMangerListPath = wareHouseMangerSection;
export enum wareHouseMangerListUrlFiltersEnum {
  joinedFrom = "joinedFrom",
  joinedTo = "joinedTo",
  moneySpentFrom = "moneySpentFrom",
  moneySpentTo = "moneySpentTo",
  numberOfOrdersFrom = "numberOfOrdersFrom",
  numberOfOrdersTo = "numberOfOrdersTo",
  query = "query"
}
export type wareHouseMangerListUrlFilters = Filters<wareHouseMangerListUrlFiltersEnum>;
export type wareHouseMangerListUrlDialog = "remove" | TabActionDialog;
export enum wareHouseMangerListUrlSortField {
  name = "name",
  email = "email",
  phone = "phone"
}
export type wareHouseMangerListUrlSort = Sort<wareHouseMangerListUrlSortField>;
export type wareHouseMangerListUrlQueryParams = ActiveTab &
  BulkAction &
  wareHouseMangerListUrlFilters &
  wareHouseMangerListUrlSort &
  Dialog<wareHouseMangerListUrlDialog> &
  Pagination;
export const wareHouseMangerListUrl = (params?: wareHouseMangerListUrlQueryParams) =>
  wareHouseMangerListPath + "?" + stringifyQs(params);

export const wareHouseMangerPath = (id: string) => urlJoin(wareHouseMangerSection, id);
export type wareHouseMangerUrlDialog = "remove";
export type wareHouseMangerUrlQueryParams = Dialog<wareHouseMangerUrlDialog>;
export const wareHouseMangerUrl = (id: string, params?: wareHouseMangerUrlQueryParams) =>
  wareHouseMangerPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const wareHouseMangerAddPath = urlJoin(wareHouseMangerSection, "add");
export const wareHouseMangerAddUrl = wareHouseMangerAddPath;

export const wareHouseMangerAddressesPath = (id: string) =>
  urlJoin(wareHouseMangerPath(id), "addresses");
export type wareHouseMangerAddressesUrlDialog = "add" | "edit" | "remove";
export type wareHouseMangerAddressesUrlQueryParams = Dialog<
  wareHouseMangerAddressesUrlDialog
> &
  SingleAction;
export const wareHouseMangerAddressesUrl = (
  id: string,
  params?: wareHouseMangerAddressesUrlQueryParams
) => wareHouseMangerAddressesPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export class WareHouseMangerAddPath {
}
