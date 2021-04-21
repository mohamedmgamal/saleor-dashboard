import { IFilterElement } from "@saleor/components/Filter";
import { maybe } from "@saleor/misc";
import { SupplierFilterKeys, SupplierListFilterOpts } from "@saleor/suppliers/components/SupplierListPage";
import { SupplierFilterInput } from "@saleor/types/globalTypes";

import {
  createFilterTabUtils,
  createFilterUtils,
  getGteLteVariables,
  getMinMaxQueryParam
} from "../../../utils/filters";
import { SupplierListUrlFilters, SupplierListUrlFiltersEnum, SupplierListUrlQueryParams } from "../../urls";

export const Supplier_FILTERS_KEY = "SupplierFilters";

export function getFilterOpts(
  params: SupplierListUrlFilters
): SupplierListFilterOpts {
  return {
    joined: {
      active: maybe(
        () =>
          [params.joinedFrom, params.joinedTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.joinedTo, ""),
        min: maybe(() => params.joinedFrom, "")
      }
    },
    moneySpent: {
      active: maybe(
        () =>
          [params.moneySpentFrom, params.moneySpentTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.moneySpentTo, ""),
        min: maybe(() => params.moneySpentFrom, "")
      }
    },
    numberOfOrders: {
      active: maybe(
        () =>
          [params.numberOfOrdersFrom, params.numberOfOrdersTo].some(
            field => field !== undefined
          ),
        false
      ),
      value: {
        max: maybe(() => params.numberOfOrdersTo, ""),
        min: maybe(() => params.numberOfOrdersFrom, "")
      }
    }
  };
}

export function getFilterVariables(
  params: SupplierListUrlFilters
): SupplierFilterInput {
  return {
    dateJoined: getGteLteVariables({
      gte: params.joinedFrom,
      lte: params.joinedTo
    }),
    moneySpent: getGteLteVariables({
      gte: parseInt(params.moneySpentFrom, 0),
      lte: parseInt(params.moneySpentTo, 0)
    }),
    numberOfOrders: getGteLteVariables({
      gte: parseInt(params.numberOfOrdersFrom, 0),
      lte: parseInt(params.numberOfOrdersTo, 0)
    }),
    search: params.query
  };
}

export function getFilterQueryParam(
  filter: IFilterElement<SupplierFilterKeys>
): SupplierListUrlFilters {
  const { name } = filter;

  switch (name) {
    case SupplierFilterKeys.joined:
      return getMinMaxQueryParam(
        filter,
        SupplierListUrlFiltersEnum.joinedFrom,
        SupplierListUrlFiltersEnum.joinedTo
      );

    case SupplierFilterKeys.moneySpent:
      return getMinMaxQueryParam(
        filter,
        SupplierListUrlFiltersEnum.moneySpentFrom,
        SupplierListUrlFiltersEnum.moneySpentTo
      );

    case SupplierFilterKeys.numberOfOrders:
      return getMinMaxQueryParam(
        filter,
        SupplierListUrlFiltersEnum.numberOfOrdersFrom,
        SupplierListUrlFiltersEnum.numberOfOrdersTo
      );
  }
}

export const {
  deleteFilterTab,
  getFilterTabs,
  saveFilterTab
} = createFilterTabUtils<SupplierListUrlFilters>(Supplier_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters } = createFilterUtils<
  SupplierListUrlQueryParams,
  SupplierListUrlFilters
>(SupplierListUrlFiltersEnum);
