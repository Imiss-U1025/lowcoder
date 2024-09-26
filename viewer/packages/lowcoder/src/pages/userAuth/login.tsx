import { useParams } from "react-router-dom";
import { trans } from "i18n";
import FormLogin from "@lowcoder-ee/pages/userAuth/formLogin";
import { AuthContainer } from "pages/userAuth/authComponents";
import React, { useContext, useMemo } from "react";
import { AuthContext, getLoginTitle } from "pages/userAuth/authUtils";
import { requiresUnAuth } from "pages/userAuth/authHOC";

// this is the classic Sign In
function Login() {
  const { inviteInfo} = useContext(AuthContext);
  const orgId = useParams<any>().orgId;

  const organizationId = useMemo(() => {
    if(inviteInfo?.invitedOrganizationId) {
      return inviteInfo?.invitedOrganizationId;
    }
    return orgId;
  }, [ inviteInfo, orgId ])

  const loginHeading = getLoginTitle(inviteInfo?.createUserName)
  const loginSubHeading = trans("userAuth.poweredByLowcoder");

  return (
    <>
      <AuthContainer
        heading={loginHeading}
        subHeading={loginSubHeading}
      >
        <FormLogin organizationId={organizationId} />
      </AuthContainer>
    </>
  );
}

export default requiresUnAuth(Login);
