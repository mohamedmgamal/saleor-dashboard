import { WindowTitle } from "@saleor/components/WindowTitle";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "../../misc";
import WarehouseMangerCreatePage from "../components/WarehouseManagerCreatePage";
import { TypedCreateWarehouseManagerMutation } from "../mutations";
import { TypedSupplierCreateDataQuery } from "../queries";
import { CreateWarehouseManager } from "../types/CreateWarehouseManager";
import { wareHouseMangerListUrl, wareHouseMangerUrl } from "../urls";

export const WarehouseManagerCreate: React.FC<{}> = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleCreateWarehouseManagerSuccess = (
    data: CreateWarehouseManager
  ) => {
    if (data.warehouseManagerCreate.errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage({
          defaultMessage: "Manger created"
        })
      });
      navigate(
        wareHouseMangerUrl(data.warehouseManagerCreate.WarehouseManager.id)
      );
    }
  };
  return (
    <TypedSupplierCreateDataQuery displayLoader>
      {({ data, loading }) => (
        <TypedCreateWarehouseManagerMutation
          onCompleted={handleCreateWarehouseManagerSuccess}
        >
          {(CreateWarehouseManager, createWarehouseManagerOpts) => (
            <>
              <WindowTitle
                title={intl.formatMessage({
                  defaultMessage: "Warehouse Manager",
                  description: "window title"
                })}
              />
              <WarehouseMangerCreatePage
                countries={maybe(() => data.shop.countries, [])}
                disabled={loading || createWarehouseManagerOpts.loading}
                // ToDO: cant resolve errors of undefined need to be changed ps: bad response from Graphql
                errors={
                  createWarehouseManagerOpts.data?.warehouseManagerCreate
                    .errors || []
                }
                saveButtonBar={createWarehouseManagerOpts.status}
                onBack={() => navigate(wareHouseMangerListUrl())}
                onSubmit={formData => {
                  CreateWarehouseManager({
                    variables: {
                      input: {
                        // eslint-disable-next-line radix
                        // supplierId:parseInt(formData.SupplierId),
                        supplier: formData.supplier,
                        email: formData.email,
                        firstName: formData.FirstName,
                        lastName: formData.LastName,
                        phone: formData.phone,
                        password: formData.password
                      }
                    }
                  });
                }}
              />
            </>
          )}
        </TypedCreateWarehouseManagerMutation>
      )}
    </TypedSupplierCreateDataQuery>
  );
};
export default WarehouseManagerCreate;
