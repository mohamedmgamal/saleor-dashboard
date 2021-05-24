import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardTitle from "@saleor/components/CardTitle";
import Skeleton from "@saleor/components/Skeleton";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { maybe } from "@saleor/misc";
import React from "react";

import { RequestDetails_user } from "../../types/ExistingProductDetails";

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
  Request: RequestDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const ExistProductDetails: React.FC<SupplierDetailsProps> = props => {
  const { Request} = props;
  const classes = useStyles(props);
  return (
    <Card>
      <CardTitle
        className={classes.cardTitle}
        title={
          <>
            {maybe<React.ReactNode>(() => Request.product.product.name +" "+Request.product.name , <Skeleton />)}
          </>
        }
      />
    </Card>
  );
};
ExistProductDetails.displayName = "ExistProductDetails";
export default ExistProductDetails;
