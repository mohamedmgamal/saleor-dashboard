import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {NewProductsListUrlSortField}from "./components/NewPRoductsList/NewProductsList";
import {
  newProductAddressesPath,
  NewProductAddressesUrlQueryParams,
  newProductListPath,
  NewProductListUrlQueryParams,
  newProductPath,
  NewProductUrlQueryParams
} from "./urls";
import SupplierListViewComponent from "./views/NewProductsList";
import SupplierAddressesViewComponent from "./views/SupplierAddresses";
import SupplierDetailsViewComponent from "./views/SupplierDetails";

export const NewPoductListView: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: NewProductListUrlQueryParams = asSortParams(
    qs,
    NewProductsListUrlSortField
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
  const params: NewProductUrlQueryParams = qs;

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
  const params: NewProductAddressesUrlQueryParams = qs;

  return (
    <SupplierAddressesViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const NewProductSection: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.addNew)} />
      <Switch>
        <Route exact path={newProductListPath} component={NewPoductListView} />
        <Route
          path={newProductAddressesPath(":id")}
          component={SupplierAddressesView}
        />
        <Route path={newProductPath(":id")} component={SupplierDetailsView} />
      </Switch>
    </>
  );
};
