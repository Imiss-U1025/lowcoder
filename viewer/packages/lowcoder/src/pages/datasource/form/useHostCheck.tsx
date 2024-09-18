import { useSelector } from "react-redux";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
import { trans } from "i18n";

export function useHostCheck() {
  const useHostUrl = trans("docUrls.useHost");

  return {
    message: "",
    warningOnly: true,
    validator: (_: RuleObject, value: StoreValue) => {
      if (value && (value.includes("localhost") || value.includes("127.0.0.1"))) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
  };
}
