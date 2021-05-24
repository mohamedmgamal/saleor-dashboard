import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";

import { AddressTypeInput } from "@saleor/customers/types";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { ShopErrorFragment } from "@saleor/fragments/types/ShopErrorFragment";
import { WarehouseErrorFragment } from "@saleor/fragments/types/WarehouseErrorFragment";
import { ChangeEvent } from "@saleor/hooks/useForm";
import { getFormErrors } from "@saleor/utils/errors";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import getShopErrorMessage from "@saleor/utils/errors/shop";
import getWarehouseErrorMessage from "@saleor/utils/errors/warehouse";
import React from "react";
import { IntlShape, useIntl } from "react-intl";
import { useQuery } from "react-apollo";
import { getGovernorates, getCitesQ, getCitiesAreas } from "@saleor/warehouses/queries";
import { SingleAutocompleteChoiceType } from "@saleor/components/SingleAutocompleteSelectField";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
export interface CompanyAddressFormProps {
  countries: SingleAutocompleteChoiceType[];
  dataa: AddressTypeInput;
  displayCountry: string;
  errors: Array<
    AccountErrorFragment | ShopErrorFragment | WarehouseErrorFragment
  >;
  disabled: boolean;
  onChange: (event: ChangeEvent) => void;
  onCountryChange: (event: ChangeEvent) => void;
}

const useStyles = makeStyles(
  {
    root: {}
  },
  { name: "CompanyAddressForm" }
);

function getErrorMessage(
  err: AccountErrorFragment | ShopErrorFragment | WarehouseErrorFragment,
  intl: IntlShape
): string {
  switch (err?.__typename) {
    case "AccountError":
      return getAccountErrorMessage(err, intl);
    case "WarehouseError":
      return getWarehouseErrorMessage(err, intl);
    default:
      return getShopErrorMessage(err, intl);
  }
}

const CompanyAddressForm: React.FC<CompanyAddressFormProps> = props => {
  const {
    dataa,
    disabled,
    errors,
    onChange,
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const formFields = [
    "streetAddress1",
    "streetAddress2",
    "city",
    "country",
    "governorate",
    "phone"
    ,"cityArea"
  ];
  console.log(dataa)
  const formErrors = getFormErrors(formFields, errors);
    const {data} = useQuery(getGovernorates, {
      variables: { countryCode:"EG" },
    });
  const {data:citesData,refetch} = useQuery(getCitesQ, {
    variables: { countryCode:"EG",governorate:dataa.governorate},
  });
  const {data:citesAreasData,refetch:getCitesAreas} = useQuery(getCitiesAreas, {
    variables: { countryCode:"EG",governorate:dataa.governorate,city:dataa.city},
  });
  return (
    <div className={classes.root}>
      <TextField
        disabled={disabled}
        error={!!formErrors.streetAddress1}
        helperText={getErrorMessage(formErrors.streetAddress1, intl)}
        label={intl.formatMessage({
          defaultMessage: "Address line 1"
        })}
        name={"streetAddress1" as keyof AddressTypeInput}
        onChange={onChange}
        value={dataa.streetAddress1}
        fullWidth
      />
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.streetAddress2}
        helperText={getErrorMessage(formErrors.streetAddress2, intl)}
        label={intl.formatMessage({
          defaultMessage: "Address line 2"
        })}
        name={"streetAddress2" as keyof AddressTypeInput}
        onChange={onChange}
        value={dataa.streetAddress2}
        fullWidth
      />
      <FormSpacer />
      <Grid>
        <TextField
          fullWidth
          disabled={true}
          value={"Egypt"}
          label={"Country"}
        />
        <FormSpacer/>
        {dataa.governorate&& dataa.city && dataa.cityArea &&<div>
          <TextField
            fullWidth
          disabled={true}
          value={dataa.governorate}
          label={"Governorate"}
          />
          <FormSpacer/>
          <TextField
            fullWidth
          disabled={true}
          value={dataa.city}
          label={"City"}
          />
          <FormSpacer/>
          <TextField
            fullWidth
          disabled={true}
          value={dataa.cityArea}
          label={"City Area"}
          /></div>
        }
        <br/>
        <Select
          disabled={disabled}
          name="governorate"
          error={!!formErrors.governorate}
          value={dataa.governorate}
          onChange={(e)=>{
            // @ts-ignore
            onChange(e)
            refetch()
          }}
        ><MenuItem disabled selected>Governorates</MenuItem>
          {
            data?.["addressValidationRules"]?.["governorate"] && data?.["addressValidationRules"]?.["governorate"].map((governorate)=>{
              return ( <MenuItem value={governorate?.code}>{governorate?. nameEn}</MenuItem>)
            })
          }
        </Select>
        <Select
          disabled={disabled}
          name="city"
          error={!!formErrors.city}
          value={dataa.city}

          onChange={(e)=>{
            // @ts-ignore
            onChange(e)
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
          value={dataa.cityArea}
          // @ts-ignore
          onChange={onChange}
        ><MenuItem disabled selected>cities Areas</MenuItem>
          {
            citesAreasData?.["addressValidationRules"]?.["cityArea"] && citesAreasData?.["addressValidationRules"]?.["cityArea"].map((cityArea)=>{
              return ( <MenuItem value={cityArea?.code}>{cityArea?.nameEn}</MenuItem>)
            })
          }
        </Select>
      </Grid>
      <FormSpacer />
      <Grid>
        {/*<SingleAutocompleteSelectField*/}
        {/*  disabled={disabled}*/}
        {/*  displayValue={displayCountry}*/}
        {/*  error={!!formErrors.country}*/}
        {/*  helperText={getErrorMessage(formErrors.country, intl)}*/}
        {/*  label={intl.formatMessage({*/}
        {/*    defaultMessage: "Country"*/}
        {/*  })}*/}
        {/*  name={"country" as keyof AddressTypeInput}*/}
        {/*  onChange={onCountryChange && getGovernorate}*/}
        {/*  value={dataa.country}*/}
        {/*  choices={countries}*/}
        {/*  InputProps={{*/}
        {/*    inputProps: {*/}
        {/*      autoComplete: "none"*/}
        {/*    }*/}
        {/*  }}*/}
        {/*/>*/}
      </Grid>
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.phone}
        fullWidth
        helperText={getErrorMessage(formErrors.phone, intl)}
        label={intl.formatMessage({
          defaultMessage: "Phone"
        })}
        name={"phone" as keyof AddressTypeInput}
        value={dataa.phone}
        onChange={onChange}
      />
    </div>
  );
};
CompanyAddressForm.displayName = "CompanyAddressForm";
export default CompanyAddressForm;
