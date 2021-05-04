import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  wareHouseMangerAddPath,
  wareHouseMangerListPath,
  wareHouseMangerListUrlQueryParams,
  wareHouseMangerListUrlSortField,
  wareHouseMangerPath,
  wareHouseMangerUrlQueryParams
} from "./urls";
import SupplierCreateView from "./views/WarehouseManagerCreate";
import SupplierDetailsViewComponent from "./views/WarehouseMangerDetails";
import SupplierListViewComponent from "./views/WareHouseMangersList";
// import { constant } from "lodash-es";

export const wareHouseMangerListView: React.FC<RouteComponentProps<{}>> = ({
  location
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: wareHouseMangerListUrlQueryParams = asSortParams(
    qs,
    wareHouseMangerListUrlSortField
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
  const params: wareHouseMangerUrlQueryParams = qs;

  return (
    <SupplierDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const wareHouseMangerSection: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.WareHouse_Manager)} />
      <Switch>
        <Route
          exact
          path={wareHouseMangerListPath}
          component={wareHouseMangerListView}
        />
        <Route
          exact
          path={wareHouseMangerAddPath}
          component={SupplierCreateView}
        />
        <Route
          path={wareHouseMangerPath(":id")}
          component={SupplierDetailsView}
        />
      </Switch>
    </>
  );
};
