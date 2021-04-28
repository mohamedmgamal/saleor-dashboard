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
import NewProductDetailsPage, {
  NewProductDetailsPageFormData
} from "../components/SupplierDetailsPage/NewProductDetailsPage";
import {
  TypedRemoveSupplierMutation,
  TypedUpdateNewProductMutation
} from "../mutations";
import { TypedNewProductDetailsQuery } from "../queries";
import { RemoveSupplier } from "../types/RemoveSupplier";
import { UpdateNewProduct } from "../types/UpdateSupplier";
import {
  newProductAddressesUrl,
  newProductListUrl,
  newProductUrl,
  NewProductUrlQueryParams
} from "../urls";
interface SupplierDetailsViewProps {
  id: string;
  params: NewProductUrlQueryParams;
}

export const SupplierDetailsView: React.FC<SupplierDetailsViewProps> = ({
  id,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const handleSupplierUpdateSuccess = (data: UpdateNewProduct) => {
    if (data.changeStatusNewProduct.errors.length < 1) {
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
      navigate(newProductListUrl());
    }
  };

  const handleBack = () => navigate(newProductListUrl());
  return (
    <TypedRemoveSupplierMutation
      variables={{ id }}
      onCompleted={handleSupplierRemoveSuccess}
    >
      {(removeSupplier, removeSupplierOpts) => (
        <TypedUpdateNewProductMutation onCompleted={handleSupplierUpdateSuccess}>
          {(updateSupplier, updateSupplierOpts) => (
            <TypedNewProductDetailsQuery displayLoader variables={{ id }}>
              {newProductDetails => {
                const supplier = newProductDetails.data?.requestNewProduct;
                 if (supplier === null) {
                   return <NotFoundPage onBack={handleBack} />;
                 }

                const handleSubmit = async (
                  data: NewProductDetailsPageFormData
                ) => {
                  const result = await updateSupplier({
                    variables: {
                      input: {
                        requestId:data.id,
                        status:data.status,
                      }
                    }
                  });

                  return result.data.changeStatusNewProduct.errors;
                };

                return (
                  <>
                    <WindowTitle
                      title={maybe(() => newProductDetails.data.requestNewProduct.name)}
                    />
                    <NewProductDetailsPage
                      NewProduct={maybe(() => newProductDetails.data.requestNewProduct)}
                      disabled={
                        newProductDetails.loading ||
                        updateSupplierOpts.loading ||
                        removeSupplierOpts.loading
                      }
                      errors={
                        // TODO: removed updateSupplierOpts.data?.SupplierUpdate.errors :: cant resolve errors of undefined need to be changed ps: bad response from Graphql
                        updateSupplierOpts.data?.changeStatusNewProduct.errors|| []
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
                          newProductUrl(id, {
                            action: "remove"
                          })
                        )
                      }
                      onViewAllOrdersClick={() =>
                        navigate(
                          orderListUrl({
                            customer: maybe(
                              () => newProductDetails.data.requestNewProduct.name
                            )
                          })
                        )
                      }
                    />
                    <ActionDialog
                      confirmButtonState={removeSupplierOpts.status}
                      onClose={() => navigate(newProductUrl(id), true)}
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
                                  () => newProductDetails.data.requestNewProduct.name,
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
            </TypedNewProductDetailsQuery>
          )}
        </TypedUpdateNewProductMutation>
      )}
    </TypedRemoveSupplierMutation>
  );
};
export default SupplierDetailsView;
