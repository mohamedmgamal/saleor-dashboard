import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { AddressTypeInput } from "@saleor/customers/types";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { OrderErrorFragment } from "@saleor/fragments/types/OrderErrorFragment";
import { commonMessages } from "@saleor/intl";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import getOrderErrorMessage from "@saleor/utils/errors/order";
import React from "react";
import { IntlShape, useIntl } from "react-intl";
import FormSpacer from "../FormSpacer";
import { useQuery } from "react-apollo";
import { getCitesQ, getCitiesAreas, getGovernorates } from "@saleor/warehouses/queries";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import Grid from "../Grid/Grid";

const useStyles = makeStyles(
  theme => ({
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "AddressEdit" }
);

interface AddressEditProps {
  countryDisplayValue: string;
  data: AddressTypeInput;
  disabled?: boolean;
  errors: Array<AccountErrorFragment | OrderErrorFragment>;
  onChange(event: React.ChangeEvent<any>);
  onCountryChange(event: React.ChangeEvent<any>);
}

function getErrorMessage(
  err: AccountErrorFragment | OrderErrorFragment,
  intl: IntlShape
): string {
  if (err?.__typename === "AccountError") {
    return getAccountErrorMessage(err, intl);
  }

  return getOrderErrorMessage(err, intl);
}

const AddressEdit: React.FC<AddressEditProps> = props => {
  const {
    data,
    disabled,
    errors,
    onChange,
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formFields: Array<keyof AddressTypeInput> = [
    "city",
    "cityArea",
    "country",
    "firstName",
    "lastName",
    "companyName",
    "streetAddress1",
    "streetAddress2",
    "governorate"
  ];
  const formErrors = getFormErrors<
    keyof AddressTypeInput,
    AccountErrorFragment | OrderErrorFragment
  >(formFields, errors);
  data.country="EG";
  const {data:govsData} = useQuery(getGovernorates, {
    variables: { countryCode:"EG" },
  });
  const {data:citesData,refetch} = useQuery(getCitesQ, {
    variables: { countryCode:"EG",governorate:data.governorate},
  });
  const {data:citesAreasData,refetch:getCitesAreas} = useQuery(getCitiesAreas, {
    variables: { countryCode:"EG",governorate:data.governorate,city:data.city},
  });
  return (
    <>
      <div className={classes.root}>
        <div>
          <TextField
            disabled={disabled}
            error={!!formErrors.firstName}
            helperText={getErrorMessage(formErrors.firstName, intl)}
            label={intl.formatMessage(commonMessages.firstName)}
            name="firstName"
            onChange={onChange}
            value={data.firstName}
            fullWidth
          />
        </div>
        <div>
          <TextField
            disabled={disabled}
            error={!!formErrors.lastName}
            helperText={getErrorMessage(formErrors.lastName, intl)}
            label={intl.formatMessage(commonMessages.lastName)}
            name="lastName"
            onChange={onChange}
            value={data.lastName}
            fullWidth
          />
        </div>
      </div>
      <FormSpacer />
      <div className={classes.root}>
        <div>
          <TextField
            disabled={disabled}
            error={!!formErrors.companyName}
            helperText={getErrorMessage(formErrors.companyName, intl)}
            label={intl.formatMessage({
              defaultMessage: "Company"
            })}
            name="companyName"
            onChange={onChange}
            value={data.companyName}
            fullWidth
          />
        </div>
        <div>
        </div>
      </div>
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.streetAddress1}
        helperText={getErrorMessage(formErrors.streetAddress1, intl)}
        label={intl.formatMessage({
          defaultMessage: "Address line 1"
        })}
        name="streetAddress1"
        onChange={onChange}
        value={data.streetAddress1}
        fullWidth
      />
      <FormSpacer />
      <Grid>
        <TextField
          disabled={true}
          label={intl.formatMessage({
            defaultMessage: "Country"
          })}
          value={data.country}
          fullWidth/>
      <Select
        disabled={disabled}
        name="governorate"
        error={!!formErrors.governorate}
        value={data.governorate}
        onChange={(e)=>{
          // @ts-ignore
          onChange(e)
          console.log("GOV : "+data.governorate)
          refetch()
        }}
      ><MenuItem disabled selected>Governorates</MenuItem>
        {
          govsData?.["addressValidationRules"]?.["governorate"] && govsData?.["addressValidationRules"]?.["governorate"].map((governorate)=>{
            return ( <MenuItem value={governorate?.code}>{governorate?. nameEn}</MenuItem>)
          })
        }
      </Select>
      <Select
        disabled={disabled}
        name="city"
        error={!!formErrors.city}
        value={data.city}
        onChange={(e)=>{
          // @ts-ignore
          onChange(e)
          console.log(data.country+" "+data.city)
          getCitesAreas()
        }}
      ><MenuItem disabled selected>cities</MenuItem>
        {
          citesData?.["addressValidationRules"]?.["city"] && citesData?.["addressValidationRules"]?.["city"].map((city)=>{
            return ( <MenuItem value={city?.code}>{city?. nameEn}</MenuItem>)
          })
        }
      </Select>
      <Select
        disabled={disabled}
        name="cityArea"
        error={!!formErrors.cityArea}
        value={data.cityArea}
        // @ts-ignore
        onChange={onChange}
      ><MenuItem disabled selected>cities Areas</MenuItem>
        {
          citesAreasData?.["addressValidationRules"]?.["cityArea"] && citesAreasData?.["addressValidationRules"]?.["cityArea"].map((cityArea)=>{
            return ( <MenuItem value={cityArea?.code}>{cityArea?.nameEn}</MenuItem>)
          })
        }
      </Select></Grid>
    </>
  );
};
AddressEdit.displayName = "AddressEdit";
export default AddressEdit;
