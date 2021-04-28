import AppHeader from "@saleor/components/AppHeader";
import { CardSpacer } from "@saleor/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Container from "@saleor/components/Container";
import Form from "@saleor/components/Form";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import { AccountErrorFragment } from "@saleor/fragments/types/AccountErrorFragment";
import { SubmitPromise } from "@saleor/hooks/useForm";
import { sectionNames } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "../../../misc";
import { requestNewProductDetails_user } from "../../types/NewProductDetails";
// import NewProduct from "../NewProduct";
import SupplierDetails from "../SupplierDetails";
import SupplierInfo from "../SupplierInfo";
// import SupplierOrders from "../SupplierOrders";
// import SupplierStats from "../SupplierStats";
// import { date } from "@saleor/fixtures";

export interface NewProductDetailsPageFormData {
  id:string
  status:string
  name:string
  createdAt:any
  updatedAt:any
  sku:string
  priceAmount:string
  image:string
  supplier:
    {
      firstName
      lastName
      phone
    }
}

export interface SupplierDetailsPageProps {
  NewProduct: requestNewProductDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: NewProductDetailsPageFormData) => SubmitPromise;
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
  onAddressManageClick: () => void;
  onDelete: () => void;
}

const NewProductDetailsPage: React.FC<SupplierDetailsPageProps> = ({
  NewProduct,
  disabled,
  errors,
  saveButtonBar,
  onBack,
  onSubmit,
  // onViewAllOrdersClick,
  // onRowClick,
  // onAddressManageClick,
  onDelete
}: SupplierDetailsPageProps) => {
  const intl = useIntl();
  return (
    <Form
      initial={{
        id: maybe(() => NewProduct.id, ""),
        createdAt: maybe(() => NewProduct.createdAt, ""),
        name: maybe(() => NewProduct.name, ""),
        image: maybe(() => NewProduct.image, ""),
        priceAmount: maybe(() => NewProduct.priceAmount, ""),
        sku: maybe(() => NewProduct.sku, ""),
        status: maybe(() => NewProduct.status, ""),
        supplier: maybe(() => NewProduct.supplier, {firstName:"",lastName:"",phone:""}),
        updatedAt: maybe(() => NewProduct.updatedAt, ""),
      }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.addNew)}
          </AppHeader>
          <PageHeader title={NewProduct&&NewProduct.name} />
          <Grid>
            <div>
              <SupplierDetails
                NewProduct={NewProduct}
               // data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <SupplierInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              {/* <SupplierStats Supplier={Supplier} />*/}
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBar}
            onSave={submit}
            onCancel={onBack}
            onDelete={onDelete}
          />
        </Container>
      )}
    </Form>
  );
};
NewProductDetailsPage.displayName = "NewProductDetailsPage";
export default NewProductDetailsPage;
