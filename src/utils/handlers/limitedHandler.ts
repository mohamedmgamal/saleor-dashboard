import { FormChange } from "@saleor/hooks/useForm";

function createlimitedHandler(change: FormChange) {
  return (event: React.ChangeEvent<any>) => {
      change(event);
  };
}

export default createlimitedHandler;
