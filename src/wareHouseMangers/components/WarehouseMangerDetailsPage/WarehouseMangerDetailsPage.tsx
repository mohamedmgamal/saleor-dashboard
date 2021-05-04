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

import { getUserName, maybe } from "../../../misc";
import { WareHouseMangerDetails_user } from "../../types/WareHouseMangerDetails";
import WarehouseManagerInfo from "../WarehouseManagerInfo";
// import NewProduct from "../NewProduct";
import WarehouseMangerDetails from "../WarehouseManagerDetails";
// import SupplierOrders from "../SupplierOrders";
// import SupplierStats from "../SupplierStats";
// import { date } from "@saleor/fixtures";

export interface WarehouseMangerDetailsPageFormData {
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
}

export interface SupplierDetailsPageProps {
  WarehouseManger: WareHouseMangerDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: WarehouseMangerDetailsPageFormData) => SubmitPromise;
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
  onAddressManageClick: () => void;
  onDelete: () => void;
}

const WarehouseMangerDetailsPage: React.FC<SupplierDetailsPageProps> = ({
  WarehouseManger,
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
        note: maybe(() => WarehouseManger.note, ""),
        id: maybe(() => WarehouseManger.id, ""),
        email: maybe(() => WarehouseManger.email, ""),
        firstName: maybe(() => WarehouseManger.firstName, ""),
        isActive: maybe(() => WarehouseManger.isActive, false),
        lastName: maybe(() => WarehouseManger.lastName, ""),
        phone: maybe(() => WarehouseManger.phone, ""),
        dateJoined: maybe(() => WarehouseManger.dateJoined, ""),
        supplierId:maybe(()=>WarehouseManger. supplierId,0),
        supplier:maybe(()=>WarehouseManger. supplier,{firstName:"",lastName:""}),

      }}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ change, data, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.WarehouseManagers)}
          </AppHeader>
          <PageHeader title={getUserName(WarehouseManger, true)} />
          <Grid>
            <div>
              <WarehouseMangerDetails
                WareHouseManger={WarehouseManger}
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <WarehouseManagerInfo
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
            // todo:disabled because no mutation
            disabled={ disabled || !hasChanged}
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
WarehouseMangerDetailsPage.displayName = "WarehouseMangerDetailsPage";
export default WarehouseMangerDetailsPage;
