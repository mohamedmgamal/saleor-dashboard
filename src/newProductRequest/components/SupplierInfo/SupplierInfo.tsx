import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
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
    id:string
    status:string
    name:string
    createdAt:any
    updatedAt:any
    sku:string
    priceAmount:string
    image:string
    supplier:
      {
        firstName
        lastName
        phone
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
            defaultMessage="Add new product request information"
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
            disabled={disabled}
            error={!!formErrors.name}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.name, intl)}
            name="name"
            type="text"
            label="Product Name"
            value={data.name}
            onChange={onChange}
          />
          <Select
            name="status"
            value={data.status}
            onChange={onChange}
          >
            <MenuItem value={"PENDING"}>PENDING</MenuItem>
            <MenuItem value={"APPROVED"}>APPROVED</MenuItem>
            <MenuItem value={"REJECT"}>REJECT</MenuItem>
            <MenuItem value={"CANCEL"}>CANCEL</MenuItem>
          </Select>
          <TextField
            disabled={true}
            fullWidth
            type="text"
            label="Product ID"
            value={data.id}
          />
          <TextField
            disabled={disabled}
            fullWidth
            name="image"
            type="text"
            label="Product Image"
            value={data.image}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            fullWidth
            name="priceAmount"
            type="text"
            label="Product priceAmount "
            value={data.priceAmount}
            onChange={onChange}
          />
          <TextField
            disabled={true}
            fullWidth
            name="sku"
            type="text"
            label="Product sku"
            value={data.sku}
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
