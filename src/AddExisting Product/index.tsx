import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {ExistingProductsListUrlSortField}from "./components/ExistPRoductsList/ExistProductsList";
import {
  existingProductAddressesPath,
  ExistingProductAddressesUrlQueryParams,
  existingProductListPath,
  ExistingProductListUrlQueryParams,
  existingProductPath,
  ExistingProductUrlQueryParams
} from "./urls";
import SupplierListViewComponent from "./views/ExistProductsList";
import SupplierAddressesViewComponent from "./views/SupplierAddresses";
import SupplierDetailsViewComponent from "./views/RequestDetails";

export const ExistingPoductListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ExistingProductListUrlQueryParams = asSortParams(
    qs,
    ExistingProductsListUrlSortField
  );
  return <SupplierListViewComponent params={params} />;
};

interface SupplierDetailsRouteParams {
  id: string;
}
const SupplierDetailsView: React.FC<RouteComponentProps<
  SupplierDetailsRouteParams
  >> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ExistingProductUrlQueryParams = qs;

  return (
    <SupplierDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

interface SupplierAddressesRouteParams {
  id: string;
}
const SupplierAddressesView: React.FC<RouteComponentProps<
  SupplierAddressesRouteParams
  >> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ExistingProductAddressesUrlQueryParams = qs;

  return (
    <SupplierAddressesViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const ExistingProductSection: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.addExisting)} />
      <Switch>
        <Route exact path={existingProductListPath} component={ExistingPoductListView} />
        <Route
          path={existingProductAddressesPath(":id")}
          component={SupplierAddressesView}
        />
        <Route path={existingProductPath(":id")} component={SupplierDetailsView} />
      </Switch>
    </>
  );
};
