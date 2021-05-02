import { MenuItem } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@saleor/components/CardTitle";
import Grid from "@saleor/components/Grid";
import Hr from "@saleor/components/Hr";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
const useStyles = makeStyles(
  theme => ({
    content: {
      paddingTop: theme.spacing(2)
    },
    hr: {
      margin: theme.spacing(3, 0)
    },
    sectionHeader: {
      marginBottom: theme.spacing()
    }
  }),
  { name: "SupplierInfo" }
);

export interface SupplierInfoProps {
  data: {
    id: any
    status: string
    createdAt: string
    updatedAt: string
    type:string
    product: {
      name: string
      sku: string
      price: {
        currency: string
        amount: string
      }}
    supplier :{
      firstName:string
      lastName:string
      phone:string
    }
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const SupplierInfo: React.FC<SupplierInfoProps> = props => {
  const { data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const formErrors = getFormErrors(["name", "lastName", "email","phone"], errors);

  return (
    <Card>
      <CardTitle
        title={
          <FormattedMessage
            defaultMessage="Request information"
            description="Product Information, header"
          />
        }
      />
      <CardContent className={classes.content}>
        <Typography className={classes.sectionHeader}>
          <FormattedMessage {...commonMessages.generalInformations} />
        </Typography>
        <Grid variant="uniform">
          <TextField
            disabled={true}
            error={!!formErrors.name}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.name, intl)}
            name="name"
            type="text"
            label="Product Name"
            value={data.product.name}
            onChange={onChange}
          />
          <Select
            disabled={disabled}
            name="status"
            value={data.status}
            onChange={onChange}
          >
            <MenuItem value={"PENDING"} disabled>PENDING</MenuItem>
            <MenuItem value={"APPROVED"}>APPROVED</MenuItem>
            <MenuItem value={"REJECT"}>REJECT</MenuItem>
            <MenuItem value={"CANCEL"} disabled>CANCEL</MenuItem>
          </Select>
          <TextField
            disabled={true}
            fullWidth
            type="text"
            label="Product ID"
            value={data.id}
          />
          <TextField
            disabled={true}
            fullWidth
            name="image"
            type="text"
            label="Product Price"
            value={data.product.price.amount+" "+data.product.price.currency}
            onChange={onChange}
          />
          <TextField
            disabled={true}
            fullWidth
            name="sku"
            type="text"
            label="Product sku"
            value={data.product.sku}
          />
          <TextField
            disabled={true}
            fullWidth
            name="createdAt"
            type="text"
            label="Product createdAt"
            value={data.createdAt}
          /><TextField
          disabled={true}
          fullWidth
          name="updatedAt"
          type="text"
          label="Product updatedAt"
          value={data.updatedAt}
        />
          <TextField
            disabled={true}
            fullWidth
            name="type"
            type="text"
            label="Product type"
            value={data.type}
          />
        </Grid>
        <Hr className={classes.hr} />
        <Typography className={classes.sectionHeader}>
          <FormattedMessage
            defaultMessage="Supplier Information"
            description="Supplier Information section, header"
          />
        </Typography>
        <Grid variant="uniform">
          <TextField
            disabled={true}
            fullWidth
            name="supplier"
            type="text"
            label={"Supplier"}
            value={data.supplier.firstName+" "+data.supplier.lastName}
          />
          <TextField
            disabled={true}
            fullWidth
            name="supplier"
            type="text"
            label={"Supplier Phone Number"}
            value={data.supplier.phone}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
SupplierInfo.displayName = "SupplierInfo";
export default SupplierInfo;
