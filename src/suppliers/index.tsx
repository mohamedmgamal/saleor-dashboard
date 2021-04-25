import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  supplierAddPath,
  supplierAddressesPath,
  SupplierAddressesUrlQueryParams,
  supplierListPath,
  SupplierListUrlQueryParams,
  SupplierListUrlSortField,
  supplierPath,
  SupplierUrlQueryParams
} from "./urls";
import SupplierAddressesViewComponent from "./views/SupplierAddresses";
import SupplierCreateView from "./views/SupplierCreate";
import SupplierDetailsViewComponent from "./views/SupplierDetails";
import SupplierListViewComponent from "./views/SupplierList";

export const SupplierListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: SupplierListUrlQueryParams = asSortParams(
    qs,
    SupplierListUrlSortField
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
  const params: SupplierUrlQueryParams = qs;

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
  const params: SupplierAddressesUrlQueryParams = qs;

  return (
    <SupplierAddressesViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const SupplierSection: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.suppliers)} />
      <Switch>
        <Route exact path={supplierListPath} component={SupplierListView} />
        <Route exact path={supplierAddPath} component={SupplierCreateView} />
        <Route
          path={supplierAddressesPath(":id")}
          component={SupplierAddressesView}
        />
        <Route path={supplierPath(":id")} component={SupplierDetailsView} />
      </Switch>
    </>
  );
};
