import Typography from "@material-ui/core/Typography";
import React from "react";

import { AddressType } from "../../customers/types";
import Skeleton from "../Skeleton";

interface AddressFormatterProps {
  address?: AddressType;
}

const AddressFormatter: React.FC<AddressFormatterProps> = ({ address }) => {
  if (!address) {
    return <Skeleton />;
  }
  return (
    <address
      style={{
        fontStyle: "inherit"
      }}
    >
      <Typography component="p">
        {address.firstName} {address.lastName}
      </Typography>
      {address.companyName && (
        <Typography component="p">{address.companyName}</Typography>
      )}
      <Typography component="p">
        {address.streetAddress1}
        <br />
        {address.streetAddress2}
      </Typography>
    </address>
  );
};
AddressFormatter.displayName = "AddressFormatter";
export default AddressFormatter;
