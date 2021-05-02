import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@saleor/components/CardTitle";
import { DateTime } from "@saleor/components/Date";
import { Hr } from "@saleor/components/Hr";
import Skeleton from "@saleor/components/Skeleton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "../../../misc";
import { WareHouseMangerDetails_user } from "../../types/WareHouseMangerDetails";

const useStyles = makeStyles(
  theme => ({
    label: {
      marginBottom: theme.spacing(1)
    },
    value: {
      fontSize: 24
    }
  }),
  { name: "SupplierStats" }
);

export interface SupplierStatsProps {
  Supplier: WareHouseMangerDetails_user;
}

const SupplierStats: React.FC<SupplierStatsProps> = props => {
  const { Supplier } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Supplier History",
          description: "section header"
        })}
      />
      <CardContent>
        <Typography className={classes.label} variant="caption">
          <FormattedMessage defaultMessage="Last login" />
        </Typography>
        {maybe(
          () => (
            <Typography variant="h6" className={classes.value}>
              {Supplier.dateJoined === null ? (
                "-"
              ) : (
                <DateTime date={Supplier.dateJoined} />
              )}
            </Typography>
          ),
          <Skeleton />
        )}
      </CardContent>
      <Hr />
      <CardContent>
        <Typography className={classes.label} variant="caption">
          <FormattedMessage defaultMessage="Last order" />
        </Typography>
        {maybe(
          () => (
            <Typography variant="h6" className={classes.value}>
              {Supplier.dateJoined.edges.length === 0 ? (
                "-"
              ) : (
                <DateTime
                  date={Supplier.dateJoined.edges[0].node.created}
                />
              )}
            </Typography>
          ),
          <Skeleton />
        )}
      </CardContent>
    </Card>
  );
};
SupplierStats.displayName = "SupplierStats";
export default SupplierStats;
