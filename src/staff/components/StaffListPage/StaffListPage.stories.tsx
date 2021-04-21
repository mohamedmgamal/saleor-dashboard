import {
  filterPageProps,
  pageListProps,
  searchPageProps,
  sortPageProps,
  tabPageProps
} from "@saleor/fixtures";
import { staffMembers } from "@saleor/staff/fixtures";
import { StaffListUrlSortField } from "@saleor/staff/urls";
import Decorator from "@saleor/storybook/Decorator";
import { StaffMemberStatus } from "@saleor/types/globalTypes";
import { storiesOf } from "@storybook/react";
import React from "react";

import StaffListPage, { StaffListPageProps } from ".";

const props: StaffListPageProps = {
  ...pageListProps.default,
  ...searchPageProps,
  ...sortPageProps,
  ...tabPageProps,
  ...filterPageProps,
  filterOpts: {
    status: {
      active: false,
      value: StaffMemberStatus.ACTIVE
    }
  },
  onAdd: undefined,
  onBack: () => undefined,
  sort: {
    ...sortPageProps.sort,
    sort: StaffListUrlSortField.name
  },
  staffMembers
};

storiesOf("Views / Staff / Staff members", module)
  .addDecorator(Decorator)
  .add("default", () => <StaffListPage {...props} />)
  .add("when loading", () => (
    <StaffListPage {...props} disabled={true} staffMembers={undefined} />
  ));
