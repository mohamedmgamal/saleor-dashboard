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
import { commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage} from "react-intl";
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

export interface RequestInfoProps {
  data: {
    id:string
    status:string
    createdAt:string
    updatedAt:string
    warehouse:{
      name:string
      companyName:string
      address:{
        streetAddress1:string
        country:
          {
            country:string
          }
        governorate:string
        city:string
        cityArea:string
      }
    }
    supplier :{
      firstName:string
      lastName:string
      phone:string
    }
  };
  onChange: (event: React.ChangeEvent<any>) => void;
}

const RequestrInfo: React.FC<RequestInfoProps> = props => {
  const { data, onChange } = props;

  const classes = useStyles(props);
  return (
    <Card>
      <CardTitle
        title={
          <FormattedMessage
            defaultMessage="Delete Warehouse request information"
            description="request Information, header"
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
            fullWidth
            name="name"
            type="text"
            label="Warehouse Name"
            value={data.warehouse && data.warehouse.name || ""}
          />
          <Select
            name="status"
            value={data.status }
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
            label="Warehouse ID"
            value={data.id}
          />
          <TextField
            disabled={true}
            fullWidth
            name="createdAt"
            type="text"
            label="Product createdAt"
            value={data.createdAt || ""}
          /><TextField
          disabled={true}
          fullWidth
          name="updatedAt"
          type="text"
          label="Product updatedAt"
          value={data.updatedAt || ""}
        />

        </Grid>
        <Hr className={classes.hr} />
        <Typography className={classes.sectionHeader || ""}>
          <FormattedMessage
            defaultMessage="Address Information"
            description="Address Information section, header"
          />
        </Typography>
        <Grid variant="uniform">
          <TextField
            disabled={true}
            fullWidth
            label={"Street Address"}
            name="streetAddress1"
            type="text"
            value={data.warehouse && data.warehouse.address.streetAddress1 || ""}
          />
          <TextField
            disabled={true}
            fullWidth
            name="country"
            label={"Country"}
            type="text"
            value={data.warehouse && data.warehouse.address.country.country || ""}
          />
          <TextField
            disabled={true}
            fullWidth
            label={"Governorate"}
            name="governorate"
            type="text"
            value={data.warehouse && data.warehouse.address.governorate || ""}
          />
          <TextField
            disabled={true}
            fullWidth
            label={"City"}
            name="city"
            type="text"
            value={data.warehouse && data.warehouse.address.city || ""}
          />
          <TextField
            disabled={true}
            fullWidth
            label={"City Area"}
            name="city"
            type="text"
            value={data.warehouse && data.warehouse.address.cityArea || ""}
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
            value={data.supplier && data.supplier.firstName+" "+data.supplier.lastName || ""}
          />
          <TextField
            disabled={true}
            fullWidth
            name="supplier"
            type="text"
            label={"Supplier Phone Number"}
            value={data.supplier && data.supplier.phone || ""}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
RequestrInfo.displayName = "SupplierInfo";
export default RequestrInfo;
