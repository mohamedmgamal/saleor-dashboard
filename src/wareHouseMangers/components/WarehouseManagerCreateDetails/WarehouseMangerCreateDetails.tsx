import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardTitle from "@saleor/components/CardTitle";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import React from "react";
import { useIntl } from "react-intl";

import { SupplierCreatePageFormData } from "../WarehouseManagerCreatePage";
 import { useQuery } from "react-apollo";
import { getSuppliers } from "@saleor/wareHouseMangers/queries";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles(
  theme => ({
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "SupplierCreateDetails" }
);

export interface SupplierCreateDetailsProps {
  dataa: SupplierCreatePageFormData;
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}
const WarehouseMangerCreateDetails: React.FC<SupplierCreateDetailsProps> = props => {
  const { dataa, disabled, errors, onChange } = props;
  const {data } = useQuery(getSuppliers);
  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(
    ["FirstName", "LastName", "email","phone","password","supplier"],
    errors
  );

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Manger Overview",
          description: "header"
        })}
      />
      <CardContent>
        <div className={classes.root}>
          <TextField
            disabled={disabled}
            error={!!formErrors.FirstName}
            fullWidth
            name="FirstName"
            label={intl.formatMessage(commonMessages.firstName)}
            helperText={getAccountErrorMessage(
              formErrors.FirstName,
              intl
            )}
            type="text"
            value={dataa.FirstName}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.LastName}
            fullWidth
            name="LastName"
            label={intl.formatMessage(commonMessages.lastName)}
            helperText={getAccountErrorMessage(
              formErrors.LastName,
              intl
            )}
            type="text"
            value={dataa.LastName}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.email}
            fullWidth
            name="email"
            label={intl.formatMessage(commonMessages.email)}
            helperText={getAccountErrorMessage(formErrors.email, intl)}
            type="email"
            value={dataa.email}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.email}
            fullWidth
            name="phone"
            label={intl.formatMessage({
              defaultMessage: "Phone"
            })}
            helperText={getAccountErrorMessage(formErrors.phone, intl)}
            type="phone"
            value={dataa.phone}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.email}
            fullWidth
            name="password"
            label={intl.formatMessage({
              defaultMessage: "password"
            })}
            helperText={getAccountErrorMessage(formErrors.password, intl)}
            type="password"
            value={dataa.password}
            onChange={onChange}
          />
          <Select
            disabled={disabled}
            name="supplier"
            value={dataa.supplier}
            onChange={onChange}
          ><MenuItem disabled selected>Suppliers</MenuItem>
            {
            data?.["suppliers"]?.["edges"] && data?.["suppliers"]?.["edges"].map((supplier)=>{
          return ( <MenuItem value={supplier?.node.id}>{supplier?.node.firstName+"  "+supplier?.node.lastName+" "
          +supplier?.node.phone}</MenuItem>)
            })
          }
          </Select>
          {/*<TextField*/}
          {/*  required*/}
          {/*  disabled={disabled}*/}
          {/*  error={!!formErrors.SupplierID}*/}
          {/*  fullWidth*/}
          {/*  name="supplierId"*/}
          {/*  label={intl.formatMessage({*/}
          {/*    defaultMessage: "SupplierID"*/}
          {/*  })}*/}
          {/*  helperText={getAccountErrorMessage(formErrors.SupplierID, intl)}*/}
          {/*  type="text"*/}
          {/*  value={dataa.supplierId}*/}
          {/*  onChange={onChange}*/}
          {/*/>*/}
        </div>
      </CardContent>
    </Card>
  );
};

WarehouseMangerCreateDetails.displayName = "WarehouseMangerCreateDetails";
export default WarehouseMangerCreateDetails;
