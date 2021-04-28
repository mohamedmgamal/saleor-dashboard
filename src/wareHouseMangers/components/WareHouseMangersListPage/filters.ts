import { IFilter } from "@saleor/components/Filter";
import { FilterOpts, MinMax } from "@saleor/types";
import {
  createDateField,
} from "@saleor/utils/filters/fields";
import { defineMessages, IntlShape } from "react-intl";

export enum wareHouseMangersFilterKeys {
  joined = "joined",
}

export interface WareHouseMangersListFilterOpts {
  joined: FilterOpts<MinMax>;
}

const messages = defineMessages({
  joinDate: {
    defaultMessage: "Join Date",
    description: "wareHouseMangers"
  },
});

export function createFilterStructure(
  intl: IntlShape,
  opts: WareHouseMangersListFilterOpts
): IFilter<wareHouseMangersFilterKeys> {
  return [
    {
      ...createDateField(
        wareHouseMangersFilterKeys.joined,
        intl.formatMessage(messages.joinDate),
        opts.joined.value
      ),
      active: opts.joined.active
    },
  ];
}
