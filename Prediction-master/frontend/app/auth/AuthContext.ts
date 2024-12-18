import * as zustand from "zustand";
import { axiosErrorHandler, TLoginResponse, TReponse, TuserRegister } from "../types/Types";
import { axiosInstance, extractJwtPayload, removeTokenFromStorage, setTokenToStorage } from "./AuthenticationHelper";
import axios from "axios";
import { CONST_TOKEN_NAMES } from "../constants/constants";

const URL= "http://192.168.179.98:3005/api/v1"
type AuthState = {
  token: string | null;
  authentication: boolean | null;
  role: string[] | null;
  tokenExp: number | null;
};

interface AuthPropState {
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  // Optional: You can define these methods if required
  onRegister?: (register: TuserRegister) => Promise<TReponse<null>>;
  onLogin?: (email: string, password: string) => Promise<TReponse<TLoginResponse | null>>;
  logout?: () => Promise<any>;
}

export const useAuthStore = zustand.create<AuthPropState>((set) => ({
  authState: { token: null, authentication: false, role: null, tokenExp: null },

  setAuthState: (newAuthState) =>
    set(() => ({
      authState: { ...newAuthState },
    })),
}));


export default  function authHelper(){

const Register = async(user:TuserRegister):Promise<TReponse<null>|null>=>{
  console.log("Done")
  if(!user.email || !user.password){
    return {
      data:null,
      message:"Please enter email and password",
      statusCode:400,
      isSuccess:false
    }
  }
try {
    const response = await axios.post(`${URL}/user/create` , user);
    await Login(user.email , user.password)
    
    return response.data as TReponse<null>;
} catch (error: any) {
  console.log(error)

  const isAxiosError =   axiosErrorHandler<any>(error)
  if (isAxiosError === null) {
    return null;
  }  
  else {
    return isAxiosError;
  }
}
}

const Login = async(email:string , password:string):Promise<TReponse<TLoginResponse | null>| null>=>{ 
  if(!email || !password){
    return {
      data:null,
      message:"Please enter email and password",
      statusCode:400,
      isSuccess:false
    }
  }
  const userData ={
    email:email,
    password:password
  }
 try {
   const response = await axios.post(`${URL}/user/login` , userData);
   if (!response.data.isSuccess) {
     return response.data as TReponse<TLoginResponse>;
   }
  const jwtPayload=  extractJwtPayload(response.data.data.accessToken)
  const roles = jwtPayload && jwtPayload.role.split(",")
  const tokenExp = jwtPayload && jwtPayload.exp
   setAuthState({
     authentication:true,
     token:response.data.data.accessToken,
     role: roles,
     tokenExp:tokenExp
   })
  axiosInstance.defaults.headers.common["cookie"] = `accessToken=${response.data.data.accessToken}; refreshToken=${response.data.data.refreshToken}`
   setTokenToStorage(CONST_TOKEN_NAMES.accessToken , response.data.data.accessToken)
   setTokenToStorage(CONST_TOKEN_NAMES.refreshToken, response.data.data.refreshToken)
   return response.data as TReponse<TLoginResponse>;
 } catch (error:any) {

  return axiosErrorHandler(error);
 }
}


const onLogout = async()=>{
  console.log("logout")
  await removeTokenFromStorage(CONST_TOKEN_NAMES.accessToken)
  await removeTokenFromStorage(CONST_TOKEN_NAMES.refreshToken)
  setAuthState({
    authentication:false,
    token:null,
    role:null,
    tokenExp:null
  })
 axiosInstance.defaults.headers.common["cookie"] = ""
}

const setAuthState = (newAuthState: AuthState) => {
  useAuthStore.setState({
    authState: newAuthState,
  });

};
const getAuthState = ()=>{
  return useAuthStore.getState().authState
}


return {
  onLogin: Login,
  onRegister:Register,
  logout: onLogout,
  setAuthState,
  getAuthState
}
}