import { BASE_URL } from "constants/routesURL";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUser } from "redux/selectors/usersSelectors";

export const requiresUnAuth = <Props extends {}>(Component: React.ComponentType<Props>) => {
  function Wrapped(props: Props) {
    const user = useSelector(getUser);
    if (!user.isAnonymous) {
      return <Redirect to={BASE_URL} />;
    }
    return <Component {...props} />;
  }

  return Wrapped;
};
