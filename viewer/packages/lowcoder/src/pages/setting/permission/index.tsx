import { Route, Switch } from "react-router";
import PermissionList from "./permissionList";
import PermissionDetail from "./permissionDetail";
import { PERMISSION_SETTING, SETTING_URL } from "constants/routesURL";

export default () => {
  return (
    <Switch>
      <Route path={[SETTING_URL, PERMISSION_SETTING]} component={PermissionList} exact />
    </Switch>
  );
};
