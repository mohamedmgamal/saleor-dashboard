import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@saleor/components/CardTitle";
import Skeleton from "@saleor/components/Skeleton";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { maybe } from "@saleor/misc";
import moment from "moment-timezone";
import React from "react";
import { FormattedMessage } from "react-intl";

import { SupplierDetails_user } from "../../types/ExistingProductDetails";

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
  Supplier: SupplierDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const ExistProductDetails: React.FC<SupplierDetailsProps> = props => {
  const { Supplier} = props;
  const classes = useStyles(props);
  return (
    <Card>
      <CardTitle
        className={classes.cardTitle}
        title={
          <>
            {maybe<React.ReactNode>(() => Supplier.product.name, <Skeleton />)}
            {Supplier && Supplier.createdAt ? (
              <Typography
                className={classes.subtitle}
                variant="caption"
                component="div"
              >
                <FormattedMessage
                  defaultMessage="Active member since {date}"
                  description="section subheader"
                  values={{
                    date: moment(Supplier.createdAt).format("MMM YYYY")
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
ExistProductDetails.displayName = "ExistProductDetails";
export default ExistProductDetails;
