import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { getUserName, maybe, renderCollection } from "@saleor/misc";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import { wareHouseMangerListUrlSortField } from "@saleor/wareHouseMangers/urls";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ListwareHouseMangers_wareHouseMangers_edges_node } from "../../types/ListWareHouseMangers";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colEmail: {},
      colName: {},
      colOrders: {
        width: 200
      }
    },
    colPhone:{textAlign:"center"},
    colEmail: {},
    colName: {
      paddingLeft: 0
    },
    colOrders: {
      textAlign: "center"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "managersList" }
);

export interface WarehouseMangersListProps
  extends ListProps,
    ListActions,
    SortPage<wareHouseMangerListUrlSortField> {
  wareHouseMangers: ListwareHouseMangers_wareHouseMangers_edges_node[];
}

const numberOfColumns = 3;

const WareHouseMangersList: React.FC<WarehouseMangersListProps> = props => {
  const {
    settings,
    disabled,
    wareHouseMangers,
    pageInfo,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    onSort,
    toolbar,
    toggle,
    toggleAll,
    selected,
    sort,
    isChecked
  } = props;
  // console.log("warehouseMangers")
  // console.log(props)
  const classes = useStyles(props);

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={wareHouseMangers}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === wareHouseMangerListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(wareHouseMangerListUrlSortField.name)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage="Manager Name" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === wareHouseMangerListUrlSortField.email
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(wareHouseMangerListUrlSortField.email)}
          className={classes.colEmail}
        >
          <FormattedMessage defaultMessage="Manager Email" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === wareHouseMangerListUrlSortField.phone
              ? getArrowDirection(sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(wareHouseMangerListUrlSortField.phone)}
          className={classes.colPhone}
        >
          <FormattedMessage defaultMessage="phone Number" />
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          wareHouseMangers,
          wareHouseManger => {
            const isSelected = wareHouseManger ? isChecked(wareHouseManger.id) : false;

            return (
              <TableRow
                className={!!wareHouseManger ? classes.tableRow : undefined}
                hover={!!wareHouseManger}
                key={wareHouseManger ? wareHouseManger.id : "skeleton"}
                selected={isSelected}
                onClick={wareHouseManger ? onRowClick(wareHouseManger.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(wareHouseManger.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {getUserName(wareHouseManger)}
                </TableCell>
                <TableCell className={classes.colEmail}>
                  {maybe<React.ReactNode>(() => wareHouseManger.email, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colPhone}>
                  {maybe<React.ReactNode>(
                    () => wareHouseManger.phone,
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No customers found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
WareHouseMangersList.displayName = "WareHouseMangersList";
export default WareHouseMangersList;
