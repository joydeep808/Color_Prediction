import { authenticationFromRefreshToken, axiosInstance, getTokenFromStorage } from "../auth/AuthenticationHelper";
import zustand from "zustand"
import { useAuthStore } from "../auth/AuthContext";
import { CONST_TOKEN_NAMES } from "../constants/constants";

axiosInstance.interceptors.request.use(
  async (config) => {
    const authState= useAuthStore.getState().authState;
    // Check if the token is valid
    if (authState?.token && authState.tokenExp !== null && authState.tokenExp > Date.now()) {
      return config; // Token is valid, proceed with the request
    }

    // If the token is expired, attempt to refresh it
    if (authState?.token && authState.tokenExp !== null && authState.tokenExp < Date.now()) {
      try {
        const refreshToken = await getTokenFromStorage(CONST_TOKEN_NAMES.refreshToken);
        if (refreshToken !== null) {
        // const isAuthenticated = await authenticationFromRefreshToken(refreshToken, useAuthStoresetAuthState);
            // config.headers["cookie"] = refreshToken=${refreshToken}
            config.headers.set("cookie" , `refreshToken=${refreshToken}`)
            return config;
          } else {
            return Promise.reject(new Error('Authentication failed'));
          }
        // If no refresh token is available, reject the request
      } catch (error) {
        // If there's an error during the refresh process, reject the request
        return Promise.reject(new Error('Error refreshing token'));
      }
    } else {
      // If no token or expired token found, reject the request
      return Promise.reject(new Error('Validation failed'));
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);