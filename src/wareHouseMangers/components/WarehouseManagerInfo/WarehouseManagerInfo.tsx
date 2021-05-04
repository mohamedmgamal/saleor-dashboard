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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { useMutation } from "react-apollo";
import useNotifier from "@saleor/hooks/useNotifier";
import {resetPassword} from "../../mutations"
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
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateJoined: any;
    phone:string|null
    note: string | null;
    isActive: boolean;
    supplier :{
      firstName:string
      lastName:string
    }
    supplierId:number
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const WarehouseManagerInfo: React.FC<SupplierInfoProps> = props => {
  const { data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const formErrors = getFormErrors(["firstName", "lastName", "email","phone","supplierId"], errors);
  const [PasswordUpdate] = useMutation(resetPassword);
  const [open, setOpen] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  // const { loading, error, data } = useQuery(resetPassword);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const notify = useNotifier();
  const handleSubmit = () => {
    if (newPassword.length<4)
    {
      notify({
        status: "error",
        text: "too short password"
      });
      return ;
    }
    PasswordUpdate({variables:{id:data.id,password:newPassword}})
    notify({
      status: "success",
      text: intl.formatMessage(commonMessages.savedChanges)
    });
    setOpen(false);
  };
  const passwordHandler=(e)=>{
    setNewPassword(e.target.value)
  }
  return (
    <Card>
      <CardTitle
        title={
          <FormattedMessage
            defaultMessage="Personal Informations"
            description="Supplier information, header"
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
            error={!!formErrors.firstName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.firstName, intl)}
            name="firstName"
            type="text"
            label={intl.formatMessage(commonMessages.firstName)}
            value={data.firstName}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.lastName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.lastName, intl)}
            name="lastName"
            type="text"
            label={intl.formatMessage(commonMessages.lastName)}
            value={data.lastName}
            onChange={onChange}
          />
        </Grid>
        <Hr className={classes.hr} />
        <Typography className={classes.sectionHeader}>
          <FormattedMessage
            defaultMessage="Contact Information"
            description="Supplier contact section, header"
          />
        </Typography>
        <Grid variant="uniform">
        <TextField
          disabled={disabled}
          error={!!formErrors.email}
          fullWidth
          helperText={getAccountErrorMessage(formErrors.email, intl)}
          name="email"
          type="email"
          label={intl.formatMessage(commonMessages.email)}
          value={data.email}
          onChange={onChange}
        />
        <TextField
          disabled={disabled}
          error={!!formErrors.phone}
          fullWidth
          helperText={getAccountErrorMessage(formErrors.phone, intl)}
          name="phone"
          type="string"
          label={intl.formatMessage(commonMessages.phone)}
          value={data.phone}
          onChange={onChange}
        />
          <TextField
            disabled={true}
            error={!!formErrors.supplierId}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.supplierId, intl)}
            name="supplierId"
            type="string"
            label="supplierId"
            value={data.supplierId}
            onChange={onChange}
          />
          <TextField
            disabled={true}
            fullWidth
            name="phone"
            type="string"
            label="Supplier Name"
            value={data.supplier.firstName+" "+data.supplier.lastName}
            onChange={onChange}
          />
        </Grid>
        <Grid>
          <div style={{marginTop:"5%"}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              <span style={{color:"red"}}> Reset password</span>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">new password</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <span style={{color:"red"}}> Password Reset</span>
                </DialogContentText>
                <TextField
                  autoFocus
                  onChange={passwordHandler}
                  id="name"
                  label="New Password"
                  type="password"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Reset
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};
WarehouseManagerInfo.displayName = "WarehouseManagerInfo";
export default WarehouseManagerInfo;
