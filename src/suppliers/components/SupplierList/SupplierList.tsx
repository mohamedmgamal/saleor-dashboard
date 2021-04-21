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
import { SupplierListUrlSortField } from "@saleor/Suppliers/urls";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import { getArrowDirection } from "@saleor/utils/sort";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ListSuppliers_Suppliers_edges_node } from "../../types/ListSuppliers";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colEmail: {},
      colName: {},
      colOrders: {
        width: 200
      }
    },
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
  { name: "SupplierList" }
);

export interface SupplierListProps
  extends ListProps,
    ListActions,
    SortPage<SupplierListUrlSortField> {
  Suppliers: ListSuppliers_Suppliers_edges_node[];
}

const numberOfColumns = 4;

const SupplierList: React.FC<SupplierListProps> = props => {
  const {
    settings,
    disabled,
    Suppliers,
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

  const classes = useStyles(props);

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={Suppliers}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === SupplierListUrlSortField.name
              ? getArrowDirection(sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(SupplierListUrlSortField.name)}
          className={classes.colName}
        >
          <FormattedMessage defaultMessage="Supplier Name" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === SupplierListUrlSortField.email
              ? getArrowDirection(sort.asc)
              : undefined
          }
          onClick={() => onSort(SupplierListUrlSortField.email)}
          className={classes.colEmail}
        >
          <FormattedMessage defaultMessage="Supplier Email" />
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === SupplierListUrlSortField.orders
              ? getArrowDirection(sort.asc)
              : undefined
          }
          textAlign="center"
          onClick={() => onSort(SupplierListUrlSortField.orders)}
          className={classes.colOrders}
        >
          <FormattedMessage defaultMessage="No. of Orders" />
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
          Suppliers,
          Supplier => {
            const isSelected = Supplier ? isChecked(Supplier.id) : false;

            return (
              <TableRow
                className={!!Supplier ? classes.tableRow : undefined}
                hover={!!Supplier}
                key={Supplier ? Supplier.id : "skeleton"}
                selected={isSelected}
                onClick={Supplier ? onRowClick(Supplier.id) : undefined}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(Supplier.id)}
                  />
                </TableCell>
                <TableCell className={classes.colName}>
                  {getUserName(Supplier)}
                </TableCell>
                <TableCell className={classes.colEmail}>
                  {maybe<React.ReactNode>(() => Supplier.email, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.colOrders}>
                  {maybe<React.ReactNode>(
                    () => Supplier.orders.totalCount,
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No Suppliers found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
SupplierList.displayName = "SupplierList";
export default SupplierList;
