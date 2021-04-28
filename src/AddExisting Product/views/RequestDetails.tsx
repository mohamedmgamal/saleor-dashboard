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
import SupplierDetailsPage, {
  SupplierDetailsPageFormData
} from "../components/SupplierDetailsPage/SupplierDetailsPage";
import {
  TypedRemoveSupplierMutation,
  TypedUpdateSupplierMutation
} from "../mutations";
import { TypedExistingProductDetailsQuery } from "../queries";
import { RemoveSupplier } from "../types/RemoveSupplier";
import {
  UpdateExistingProduct,
} from "../types/ExistingProductDetails";
import {
  existingProductListUrl,
  ExistingProductUrlQueryParams,
  existProductUrl,
  newProductAddressesUrl} from "../urls";
interface SupplierDetailsViewProps {
  id: string;
  params: ExistingProductUrlQueryParams;
}

export const SupplierDetailsView: React.FC<SupplierDetailsViewProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleSupplierUpdateSuccess = (data: UpdateExistingProduct) => {
    // console.log(data)
    if (data.changeStatusExistProduct.errors.length < 1) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };
  const handleSupplierRemoveSuccess = (data: RemoveSupplier) => {
    if (data.SupplierDelete.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Supplier Removed"
        })
      });
      navigate(existingProductListUrl());
    }
  };
  const handleBack = () => navigate(existingProductListUrl());
  return (
    <TypedRemoveSupplierMutation
      variables={{ id }}
      onCompleted={handleSupplierRemoveSuccess}
    >
      {(removeSupplier, removeSupplierOpts) => (
        <TypedUpdateSupplierMutation onCompleted={handleSupplierUpdateSuccess}>
          {(updateSupplier, updateSupplierOpts) => (
            <TypedExistingProductDetailsQuery displayLoader variables={{ id }}>
              {result => {
                const supplier = result.data?.requestExistProduct;
                 if (supplier === null) {
                   return <NotFoundPage onBack={handleBack} />;
                 }

                const handleSubmit = async (
                  data: SupplierDetailsPageFormData
                ) => {
                  const result = await updateSupplier({
                    variables: {
                      input: {
                        requestId:data.id,
                        status:data.status,
                      }
                    }
                  });

                  return result.data.changeStatusExistProduct.errors;
                };

                return (
                  <>
                    <WindowTitle
                      title={maybe(() => result.data.requestExistProduct.product.name)}
                    />
                    <SupplierDetailsPage
                      request={maybe(() => result.data.requestExistProduct)}
                      disabled={
                        result.loading ||
                        updateSupplierOpts.loading ||
                        removeSupplierOpts.loading
                      }
                      errors={
                        // TODO: removed updateSupplierOpts.data?.SupplierUpdate.errors :: cant resolve errors of undefined need to be changed ps: bad response from Graphql
                        updateSupplierOpts.data?.changeStatusExistProduct.errors|| []
                      }
                      saveButtonBar={updateSupplierOpts.status}
                      onAddressManageClick={() =>
                        navigate(newProductAddressesUrl(id))
                      }
                      onBack={handleBack}
                      onRowClick={id => navigate(orderUrl(id))}
                      onSubmit={handleSubmit}
                      onDelete={() =>
                        navigate(
                          existProductUrl(id, {
                            action: "remove"
                          })
                        )
                      }
                      onViewAllOrdersClick={() =>
                        navigate(
                          orderListUrl({
                            customer: maybe(
                              () => result.data.requestExistProduct.product.name
                            )
                          })
                        )
                      }
                    />
                    <ActionDialog
                      confirmButtonState={removeSupplierOpts.status}
                      onClose={() => navigate(existProductUrl(id), true)}
                      onConfirm={() => removeSupplier()}
                      title={intl.formatMessage({
                        defaultMessage: "Delete Supplier",
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
                                  () => result.data.requestExistProduct.product.name,
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
            </TypedExistingProductDetailsQuery>
          )}
        </TypedUpdateSupplierMutation>
      )}
    </TypedRemoveSupplierMutation>
  );
};
export default SupplierDetailsView;
