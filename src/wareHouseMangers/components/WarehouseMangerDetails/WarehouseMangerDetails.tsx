import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@saleor/components/CardTitle";
import { ControlledCheckbox } from "@saleor/components/ControlledCheckbox";
import Skeleton from "@saleor/components/Skeleton";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { maybe, parseBoolean } from "@saleor/misc";
// import { getFormErrors } from "@saleor/utils/errors";
// import getAccountErrorMessage from "@saleor/utils/errors/account";
import moment from "moment-timezone";
import React from "react";
import { FormattedMessage } from "react-intl";

import { WareHouseMangerDetails_user } from "../../types/WareHouseMangerDetails";

const useStyles = makeStyles(
  theme => ({
    cardTitle: {
      height: 72
    },
    checkbox: {
      marginBottom: theme.spacing()
    },
    content: {
      paddingTop: theme.spacing()
    },
    subtitle: {
      marginTop: theme.spacing()
    }
  }),
  { name: "SupplierDetails" }
);

export interface SupplierDetailsProps {
  WareHouseManger: WareHouseMangerDetails_user;
  data: {
    isActive: boolean;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const WarehouseMangerDetails: React.FC<SupplierDetailsProps> = props => {
  const { WareHouseManger, data, disabled, onChange } = props;
  const classes = useStyles(props);
 // const intl = useIntl();
  // @ts-ignore
  return (
    <Card>
      <CardTitle
        className={classes.cardTitle}
        title={
          <>
            {maybe<React.ReactNode>(() => WareHouseManger.email, <Skeleton />)}
            {WareHouseManger && WareHouseManger.dateJoined ? (
              <Typography
                className={classes.subtitle}
                variant="caption"
                component="div"
              >
                <FormattedMessage
                  defaultMessage="Active member since {date}"
                  description="section subheader"
                  values={{
                    date: moment(WareHouseManger.dateJoined).format("MMM YYYY")
                  }}
                />
              </Typography>
            ) : (
              <Skeleton style={{ width: "10rem" }} />
            )}
          </>
        }
      />
      <CardContent className={classes.content}>
       <ControlledCheckbox
         // @ts-ignore
         checked={parseBoolean(data.isActive)}
         className={classes.checkbox}
         disabled={disabled}
         // label={intl.formatMessage({
         //   defaultMessage: "User account active",
         //   description: "check to mark this account as active"
         // })}
         name={"isActive"}
         label={"Warehouse Manger Account status is "+data.isActive}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
WarehouseMangerDetails.displayName = "WarehouseMangerDetails";
export default WarehouseMangerDetails;
