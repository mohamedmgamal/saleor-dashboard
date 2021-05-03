import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import { NewWareHousesListUrlSortField } from "./components/NewWareHousesList/NewWareHousesList";
import {
  newWareHouseListPath,
  NewWareHouseListUrlQueryParams,
  newWareHousePath,
  NewWareHouseUrlQueryParams
} from "./urls";
import SupplierListViewComponent from "./views/NewProductsList";
import SupplierDetailsViewComponent from "./views/SupplierDetails";

export const NewWarehouseListView: React.FC<RouteComponentProps<{}>> = ({
  location
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: NewWareHouseListUrlQueryParams = asSortParams(
    qs,
    NewWareHousesListUrlSortField
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
  const params: NewWareHouseUrlQueryParams = qs;

  return (
    <SupplierDetailsViewComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const NewWareHouseSection: React.FC<{}> = () => {
  const intl = useIntl();
  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.addWareHouse)} />
      <Switch>
        <Route
          exact
          path={newWareHouseListPath}
          component={NewWarehouseListView}
        />
        <Route path={newWareHousePath(":id")} component={SupplierDetailsView} />
      </Switch>
    </>
  );
};
