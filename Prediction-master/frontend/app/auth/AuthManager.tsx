import React, { useEffect } from "react";
import { checkUserAuthentication, getTokenFromStorage } from "./AuthenticationHelper";
import { CONST_TOKEN_NAMES } from "../constants/constants";

const AuthManager = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    (async () => {
      const accessToken = await getTokenFromStorage(CONST_TOKEN_NAMES.accessToken);
      const refreshToken = await getTokenFromStorage(CONST_TOKEN_NAMES.refreshToken);

      // Call checkUserAuthentication to validate the tokens and update the auth state.
      checkUserAuthentication(accessToken, refreshToken);
    })();
  }, []);

  // Wrap the children with React.Fragment or return them directly
  return <>{children}</>;
};

export default AuthManager;
