import NotFoundPage from "@saleor/components/NotFoundPage";
import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "../../misc";
import { orderListUrl, orderUrl } from "../../orders/urls";
import NewWarehouseDetailsPage , {
  NewWarehouseDetailsPageFormData
} from "../components/SupplierDetailsPage/NewWarehouseDetailsPage";
import {
  TypedUpdateNewProductMutation
} from "../mutations";
import { TypedNewNewWarehouseDetailsQuery } from "../queries";
import { UpdateWarehouse } from "../types/UpdateRequset";
import {
  newWareHouseAddressesUrl,
  newWareHouseListUrl,
  newWareHouseUrl,
  NewWareHouseUrlQueryParams
} from "../urls";
interface SupplierDetailsViewProps {
  id: string;
  params: NewWareHouseUrlQueryParams;
}

export const SupplierDetailsView: React.FC<SupplierDetailsViewProps> = ({
  id
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();
  const handleSupplierUpdateSuccess = (data: UpdateWarehouse) => {
    // todo: for errors of undefind remove  updateSupplierOpts.data?.changeStatusAddWarehouse.errors and print data )
    if (data.changeStatusAddWarehouse.errors.length < 1) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };

  const handleBack = () => navigate(newWareHouseListUrl());
  return (
        <TypedUpdateNewProductMutation onCompleted={handleSupplierUpdateSuccess}>
          {(updateSupplier, updateSupplierOpts) => (
            <TypedNewNewWarehouseDetailsQuery displayLoader variables={{ id }}>
              {newWarehouseDetails => {
                const supplier = newWarehouseDetails.data?.requestAddWarehouse;
                 if (supplier === null) {
                   return <NotFoundPage onBack={handleBack} />;
                 }

                const handleSubmit = async (
                  data: NewWarehouseDetailsPageFormData
                ) => {
                  const result = await updateSupplier({
                    variables: {
                      input: {
                        requestId:data.id,
                        status:data.status,
                      }
                    }
                  })
                  return result.data.changeStatusAddWarehouse.errors;
                };

                return (
                  <>
                    <WindowTitle
                      title={maybe(() => newWarehouseDetails.data.requestAddWarehouse.name)}
                    />
                    <NewWarehouseDetailsPage
                      Request={maybe(() => newWarehouseDetails.data.requestAddWarehouse)}
                      disabled={
                        newWarehouseDetails.loading ||
                        updateSupplierOpts.loading
                      }
                      errors={
                        // TODO: removed updateSupplierOpts.data?.SupplierUpdate.errors :: cant resolve errors of undefined need to be changed ps: bad response from Graphql
                       updateSupplierOpts.data?.changeStatusAddWarehouse.errors|| []
                      }
                      saveButtonBar={updateSupplierOpts.status}
                      onAddressManageClick={() =>
                        navigate(newWareHouseAddressesUrl(id))
                      }
                      onBack={handleBack}
                      onRowClick={id => navigate(orderUrl(id))}
                      onSubmit={handleSubmit}
                      onDelete={() =>
                        navigate(
                          newWareHouseUrl(id, {
                            action: "remove"
                          })
                        )
                      }
                      onViewAllOrdersClick={() =>
                        navigate(
                          orderListUrl({
                            customer: maybe(
                              () => newWarehouseDetails.data.requestAddWarehouse.name
                            )
                          })
                        )
                      }
                    />
                  </>
                );
              }}
            </TypedNewNewWarehouseDetailsQuery>
          )}
        </TypedUpdateNewProductMutation>
  );
};
export default SupplierDetailsView;
