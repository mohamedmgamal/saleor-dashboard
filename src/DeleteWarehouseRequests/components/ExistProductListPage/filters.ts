import { IFilter } from "@saleor/components/Filter";
import { FilterOpts, MinMax } from "@saleor/types";
import {
  createDateField,
} from "@saleor/utils/filters/fields";
import { defineMessages, IntlShape } from "react-intl";

export enum SupplierFilterKeys {
  joined = "joined",
  moneySpent = "spent",
  numberOfOrders = "orders"
}

export interface SupplierListFilterOpts {
  joined: FilterOpts<MinMax>;
  moneySpent: FilterOpts<MinMax>;
  numberOfOrders: FilterOpts<MinMax>;
}

const messages = defineMessages({
  joinDate: {
    defaultMessage: "Join Date",
    description: "Supplier"
  },
});

export function createFilterStructure(
  intl: IntlShape,
  opts: SupplierListFilterOpts
): IFilter<SupplierFilterKeys> {
  return [
    {
      ...createDateField(
        SupplierFilterKeys.joined,
        intl.formatMessage(messages.joinDate),
        opts.joined.value
      ),
      active: opts.joined.active
    },
  ];
}
