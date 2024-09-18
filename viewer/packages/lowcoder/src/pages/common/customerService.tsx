
export const customerService: ((onPanelClose?: () => void) => React.ReactNode) | undefined =
  undefined;

export function showCustomerServicePanel() { }

export const showHelpDropdown = (isEdit: boolean) => {
  return isEdit;
};
