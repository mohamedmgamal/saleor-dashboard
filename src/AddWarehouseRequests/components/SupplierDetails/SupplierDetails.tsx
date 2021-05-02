import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@saleor/components/CardTitle";
import Skeleton from "@saleor/components/Skeleton";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { maybe } from "@saleor/misc";
// import { getFormErrors } from "@saleor/utils/errors";
// import getAccountErrorMessage from "@saleor/utils/errors/account";
import moment from "moment-timezone";
import React from "react";
import { FormattedMessage} from "react-intl";

import { requestNewProductDetails_user } from "../../types/NewWarehouseDetails";

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
  NewProduct: requestNewProductDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = props => {
  const { NewProduct} = props;
  const classes = useStyles(props);
  return (
    <Card>
      <CardTitle
        className={classes.cardTitle}
        title={
          <>
            {maybe<React.ReactNode>(() => NewProduct.name, <Skeleton />)}
            {NewProduct && NewProduct.createdAt ? (
              <Typography
                className={classes.subtitle}
                variant="caption"
                component="div"
              >
                <FormattedMessage
                  defaultMessage="Active member since {date}"
                  description="section subheader"
                  values={{
                    date: moment(NewProduct.createdAt).format("MMM YYYY")
                  }}
                />
              </Typography>
            ) : (
              <Skeleton style={{ width: "10rem" }} />
            )}
          </>
        }
      />
    </Card>
  );
};
SupplierDetails.displayName = "SupplierDetails";
export default SupplierDetails;
