import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import { SupplierListUrlSortField } from "@saleor/Suppliers/urls";
import {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps
} from "@saleor/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ListSuppliers_Suppliers_edges_node } from "../../types/ListSuppliers";
import SupplierList from "../SupplierList/SupplierList";
import {
  createFilterStructure,
  SupplierFilterKeys,
  SupplierListFilterOpts
} from "./filters";

export interface SupplierListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<SupplierFilterKeys, SupplierListFilterOpts>,
    SortPage<SupplierListUrlSortField>,
    TabPageProps {
  Suppliers: ListSuppliers_Suppliers_edges_node[];
}

const SupplierListPage: React.FC<SupplierListPageProps> = ({
  currencySymbol,
  currentTab,
  filterOpts,
  initialSearch,
  onAdd,
  onAll,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...SupplierListProps
}) => {
  const intl = useIntl();

  const structure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.suppliers)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage
            defaultMessage="Create Supplier"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Suppliers",
            description: "tab name"
          })}
          currencySymbol={currencySymbol}
          currentTab={currentTab}
          filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Supplier"
          })}
          tabs={tabs}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <SupplierList {...SupplierListProps} />
      </Card>
    </Container>
  );
};
SupplierListPage.displayName = "SupplierListPage";
export default SupplierListPage;
