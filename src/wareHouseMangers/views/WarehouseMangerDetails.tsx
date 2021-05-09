import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@saleor/components/ActionDialog";
import NotFoundPage from "@saleor/components/NotFoundPage";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "../../misc";
import { orderListUrl, orderUrl } from "../../orders/urls";
import WarehouseMangerDetailsPage, {
  WarehouseMangerDetailsPageFormData
} from "../components/WarehouseMangerDetailsPage/WarehouseMangerDetailsPage";
import {
  TypedRemoveSupplierMutation,
  TypedUpdateWarehouseMangerMutation
} from "../mutations";
import { TypedWarehouseMangerDetailsQuery } from "../queries";
import { RemoveSupplier } from "../types/RemoveSupplier";
import { UpdateWareHouseManger } from "../types/UpdateWareHouseManger";
import {
  wareHouseMangerAddressesUrl,
  wareHouseMangerListUrl,
  wareHouseMangerUrl,
  wareHouseMangerUrlQueryParams
} from "../urls";
interface WareHouseMangerDetailsViewProps {
  id: string;
  params: wareHouseMangerUrlQueryParams;
}

export const WareHouseMangerDetailsView: React.FC<WareHouseMangerDetailsViewProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleSupplierUpdateSuccess = (data: UpdateWareHouseManger) => {
    if (data.warehouseManagerUpdate.errors.length < 1) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };
  const handleSupplierRemoveSuccess = (data: RemoveSupplier) => {
    if (data.deleteWarehouseManager.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Warehouse manger  Removed"
        })
      });
      navigate(wareHouseMangerListUrl());
    }
  };
  const handleBack = () => navigate(wareHouseMangerListUrl());
  return (
    <TypedRemoveSupplierMutation
      variables={{ id }}
      onCompleted={handleSupplierRemoveSuccess}
    >
      {(removeSupplier, removeSupplierOpts) => (
        <TypedUpdateWarehouseMangerMutation onCompleted={handleSupplierUpdateSuccess}>
          {(updateSupplier, updateSupplierOpts) => (
            <TypedWarehouseMangerDetailsQuery displayLoader variables={{ id }}>
              {WarehouseManger => {
                const warehouseManager = WarehouseManger.data?.warehouseManager;
                 if (warehouseManager  === null) {
                   return <NotFoundPage onBack={handleBack} />;
                 }

                const handleSubmit = async (
                  data: WarehouseMangerDetailsPageFormData
                ) => {
                  const result = await updateSupplier({
                    // todo:Edit here for input in mutations
                    variables: {
                      id,
                      input: {
                        note:data.note,
                        email: data.email,
                        firstName: data.firstName,
                        isActive: data.isActive,
                        lastName: data.lastName,
                        phone:data.phone

                      }
                    }
                  });

                  return result.data.warehouseManagerUpdate.errors;
                };
                return (
                  <>
                    <WindowTitle
                      title={maybe(() => WarehouseManger.data.warehouseManager.email)}
                    />
                    <WarehouseMangerDetailsPage
                      WarehouseManger={maybe(() => WarehouseManger.data.warehouseManager)}
                      disabled={
                        WarehouseManger.loading ||
                        updateSupplierOpts.loading ||
                        removeSupplierOpts.loading
                      }
                      errors={
                        // TODO: removed updateSupplierOpts.data?.SupplierUpdate.errors :: cant resolve errors of undefined need to be changed ps: bad response from Graphql
                        updateSupplierOpts.data?.warehouseManagerUpdate.errors|| []
                      }
                      saveButtonBar={updateSupplierOpts.status}
                      onAddressManageClick={() =>
                        navigate(wareHouseMangerAddressesUrl(id))
                      }
                      onBack={handleBack}
                      onRowClick={id => navigate(orderUrl(id))}
                      onSubmit={handleSubmit}
                      onDelete={() =>
                        navigate(
                          wareHouseMangerUrl(id, {
                            action: "remove"
                          })
                        )
                      }
                      onViewAllOrdersClick={() =>
                        navigate(
                          orderListUrl({
                            customer: maybe(
                              () => WarehouseManger.data.warehouseManager.email
                            )
                          })
                        )
                      }
                    />
                    <ActionDialog
                      confirmButtonState={removeSupplierOpts.status}
                      onClose={() => navigate(wareHouseMangerUrl(id), true)}
                      onConfirm={() => removeSupplier()}
                      title={intl.formatMessage({
                        defaultMessage: "Delete Warehouse Manager",
                        description: "dialog header"
                      })}
                      variant="delete"
                      open={params.action === "remove"}
                    >
                      <DialogContentText>
                        <FormattedMessage
                          defaultMessage="Are you sure you want to delete {email}?"
                          description="delete Supplier, dialog content"
                          values={{
                            email: (
                              <strong>
                                {maybe(
                                  () => WarehouseManger.data.warehouseManager.email,
                                  "..."
                                )}
                              </strong>
                            )
                          }}
                        />
                      </DialogContentText>
                    </ActionDialog>
                  </>
                );
              }}
            </TypedWarehouseMangerDetailsQuery>
          )}
        </TypedUpdateWarehouseMangerMutation>
      )}
    </TypedRemoveSupplierMutation>
  );
};
export default WareHouseMangerDetailsView;
