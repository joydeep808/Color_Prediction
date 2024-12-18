// import axios  from "axios";
// import * as secureStorage from "expo-secure-store"
// import React, { useContext, useEffect, useState } from "react";
// import { JWT_PAYLOAD_TYPE, TLoginResponse, TReponse, TuserLogin, TuserRegister } from "../types/Types";
// import { authenticationFromRefreshToken, axiosInstance, checkUserAuthentication, extractJwtPayload, getTokenFromStorage, removeTokenFromStorage, setTokenToStorage } from "../auth/AuthenticationHelper";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const CONST_TOKEN_NAMES = {
//   accessToken:"accessToken",
//   refreshToken:"refreshToken",

// }

// interface AuthProp{
//   authState?:{token:string | null , 
//     authentication:boolean | null,
//     role:string[] | null,
//     tokenExp:number | null};
//   onRegister?:(register:TuserRegister)=> Promise<TReponse<null>>;
//   onLogin?:(eamil:string , password:string)=>Promise<TReponse<TLoginResponse | null>>;
//   onLogout?:()=>Promise<any>;
// }



// const AuthContext = React.createContext<AuthProp>({});

// const URL = "http://192.168.179.98:3005/api/v1"

// export const useAuth = ()=>{
//   return useContext(AuthContext);
// }

// export const AuthProvider= ({children}:any)=>{
//   const [authState , setAuthState] = useState<{
//     token:string | null , 
//     authentication:boolean | null,
//     role:string[] | null,
//     tokenExp:number | null
//   }>({
//     token:null,
//     authentication:null,
//     role:null,
//     tokenExp:null
//   });





   


//   // const {} = AuthHelperUtil 

//   useEffect(()=>{
//     (async ()=>{
//       const accessToken = await getTokenFromStorage(CONST_TOKEN_NAMES.accessToken)
//       const refreshToken = await getTokenFromStorage(CONST_TOKEN_NAMES.refreshToken)
//       checkUserAuthentication(accessToken , refreshToken , setAuthState)
//     })()
//   },[])


//   const Register = async(user:TuserRegister):Promise<TReponse<null>>=>{
//     if(!user.email || !user.password){
//       return {
//         data:null,
//         message:"Please enter email and password",
//         statusCode:400,
//         isSuccess:false
//       }
//     }
//     const response = await axiosInstance.post(`${URL}/user/register` , user);
//     return response.data as TReponse<null>;
//   }

//   const Login = async(email:string , password:string):Promise<TReponse<TLoginResponse | null>>=>{ 
//     if(!email || !password){
//       return {
//         data:null,
//         message:"Please enter email and password",
//         statusCode:400,
//         isSuccess:false
//       }
//     }
//    try {
//      const response = await axios.post(`${URL}/user/login` , {email , password});
//      if (!response.data.isSuccess) {
//        return response.data as TReponse<TLoginResponse>;
//      }
//     const jwtPayload=  extractJwtPayload(response.data.data.accessToken)
//     const roles = jwtPayload && jwtPayload.role.split(",")
//     const tokenExp = jwtPayload && jwtPayload.exp
//      setAuthState({
//        authentication:true,
//        token:response.data.data.accessToken,
//        role: roles,
//        tokenExp:tokenExp
//      })
//     axiosInstance.defaults.headers.common["cookie"] = `accessToken=${response.data.data.accessToken}; refreshToken=${response.data.data.refreshToken}`
//      setTokenToStorage(CONST_TOKEN_NAMES.accessToken , response.data.data.accessToken)
//      setTokenToStorage(CONST_TOKEN_NAMES.refreshToken, response.data.data.refreshToken)
//      return response.data as TReponse<TLoginResponse>;
//    } catch (error) {
      
//       return error as TReponse<TLoginResponse>
//    }
//   }


//   const logout = async()=>{
    
//     await removeTokenFromStorage(CONST_TOKEN_NAMES.accessToken)
//     await removeTokenFromStorage(CONST_TOKEN_NAMES.refreshToken)
//     setAuthState({
//       authentication:false,
//       token:null,
//       role:null,
//       tokenExp:null
//     })
//    axiosInstance.defaults.headers.common["cookie"] = ""
//   }

//   const value = {
//     onRegister:Register,
//     onLogin:Login,
//     onLogout:logout,
//     authState
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }










// // async function checkAuthentication(accessToken:string|null , refreshToken:string|null , accessTokenExpiry:number|null , refreshTokenExpiry:number|null , setAuthState: React.Dispatch<React.SetStateAction<{
// //   token: string | null;
// //   authentication: boolean | null;
// // }>>){
// //    // when ever my application loads for the first time than i have to fetch the user data
// //       // if the accessToken is there and accessToken is not expired than i have to set the authentication to true
// //       // if the accessToken is there and accessToken is expired than i have to send a request to my backend with the refreshToken and get the new accessToken if refreshToken is not expired than i have to set the authentication to true
// //       // if refreshToken is expired than i have to set the authentication to false

// //   if (accessToken && accessTokenExpiry  &&  accessTokenExpiry > Date.now()) {
// //     setAuthState({
// //       authentication:true,
// //       token:accessToken
// //     })
// //    axiosInstance.defaults.headers.common["cookie"] = `accessToken=${accessToken};
// //      ${refreshToken != null ? refreshTokenExpiry != null && refreshTokenExpiry > Date.now()
// //        ? `refreshToken=${refreshToken}` : "" : ""}`
    
// //   }
// //   else if(refreshToken && refreshTokenExpiry && refreshTokenExpiry > Date.now()){
// //     const response = await axios.post(`${URL}/api/v1/user/refreshToken` , {
// //       refreshToken
// //     })

// //     if (response.data.isSuccess) {
// //       setAuthState({
// //         authentication:true,
// //         token:response.data.data.accessToken
// //       })
// //       setTokenToStorage(CONST_TOKEN_NAMES.accessToken , response.data.data.accessToken)
// //       setTokenToStorage(CONST_TOKEN_NAMES.accessTokenExpiry , response.data.data.accessTokenExpiry.toString())
// //      axiosInstance.defaults.headers.common["cookie"] = `accessToken=${response.data.data.accessToken}; refreshToken=${response.data.data.refreshToken}`
// //     }
// //     else{
// //       setAuthState({
// //         authentication:false,
// //         token:null
// //       })
// //      axiosInstance.defaults.headers.common["cookie"] = ""
// //     }
// //   }
// // } 

// // export default AuthContext;