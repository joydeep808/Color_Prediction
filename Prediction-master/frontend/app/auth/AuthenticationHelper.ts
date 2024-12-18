import axios from "axios";
import { JWT_PAYLOAD_TYPE, JWT_TOKEN_PARAM, TReponse } from "../types/Types";
import * as secureStorage from "expo-secure-store"
import authHelper from "./AuthContext";
import { CONST_TOKEN_NAMES } from "../constants/constants";
const URL = "http://192.168.179.98:3005/api/v1"

export const axiosInstance =  axios.create({
  baseURL:URL
})

const {setAuthState} = authHelper()

// async function authenticationHelper(){
 
  const setTokenToStorage = async (tokenName:string , tokenValue:string) => {
    try {
      await secureStorage.setItemAsync(tokenName, tokenValue);
    return true;
    } catch (error) {
      return false;
    }
  }
  const getTokenFromStorage = async (tokenName:string) => {
      const token = await secureStorage.getItemAsync(tokenName);
      return token;
  
  }
  
  const removeTokenFromStorage = async (tokenName:string) => {
    try {
      await secureStorage.deleteItemAsync(tokenName);
    return true;
    } catch (error) {
      return false;
    }
  }

  function extractJwtPayload(value:string):JWT_PAYLOAD_TYPE | null{
    return JSON.parse(atob(value.split(".")[1])) as JWT_PAYLOAD_TYPE | null
  }
  async function jwtTokenPayload(token:JWT_TOKEN_PARAM){
    if (token.tokenName !== undefined) {
      const value = await getTokenFromStorage(token.tokenName)
      
      const tokenPayload= value === null ? null:extractJwtPayload(value) ;
      if (tokenPayload === null && token.tokenValue === null) {
        return null;
      }
      return tokenPayload;
    }
    if (token.tokenValue != undefined) {
        return extractJwtPayload(token.tokenValue)
    }
    return null;
  }

  
  const setUserNotLoggedIn = ()=>{
    setAuthState({
      token: null,
      authentication: false,
      role: null,
      tokenExp:null
    })
    axiosInstance.defaults.headers.common["cookie"] = ``
  }

  const authenticationFromRefreshToken = async(refreshToken:string )=>{
    
    try {
      console.log("refreshToken" , refreshToken)
      const response =  await axios.get(`${URL}/user/refreshToken/${refreshToken}`) 
         const responseData = response.data as TReponse<string>
         if (!responseData.isSuccess) {
            setUserNotLoggedIn()
            removeTokenFromStorage(CONST_TOKEN_NAMES.refreshToken)
            return null;
         }
         else{
            const userDetails = extractJwtPayload(responseData.data);
            setTokenToStorage(CONST_TOKEN_NAMES.accessToken ,responseData.data);
            setAuthState({
              authentication:true,
              token:responseData.data,
              role:userDetails && userDetails.role.split(","),
              tokenExp:userDetails && userDetails.exp
            })
            console.log("a new acccess token is generated successfully ")
            
            axiosInstance.defaults.headers.common["cookie"] = `accessToken=${responseData.data};
        ${refreshToken && `refreshToken=${refreshToken}`}`
        return true;
         }

    } catch (error) {
      console.log(error)
      return null;
    }
  }

  const checkUserAuthentication = async(accessToken:string|null , refreshToken:string|null )=>{
    if (accessToken === null && refreshToken === null) {
      setUserNotLoggedIn()
    }
    if (accessToken !== null) {

      const tokenPayload = extractJwtPayload(accessToken)
      if (tokenPayload === null) {
        console.log("token paylod is not found")
        setUserNotLoggedIn()
        return null;
      }
      const date = new Date(tokenPayload.exp * 1000);
      const offset = 5.5 * 60 * 60 * 1000;  // IST offset in milliseconds
      const istDate = new Date(date.getTime() + offset).getTime();
      if (tokenPayload && istDate < Date.now() && refreshToken === null) {
        console.log("token found but  expired and  refresh token is also not found ", refreshToken)
        removeTokenFromStorage(CONST_TOKEN_NAMES.accessToken)
        setUserNotLoggedIn()
        return null;
      }
      if (tokenPayload && istDate < Date.now() && refreshToken !== null) {
        
      return await authenticationFromRefreshToken(refreshToken )
      }
      else{
        setAuthState({
          token:accessToken,
          authentication:true,
          role:tokenPayload.role.split(","),
          tokenExp:tokenPayload.exp
        })
        axiosInstance.defaults.headers.common["cookie"] = `accessToken=${accessToken};
        ${refreshToken && `refreshToken=${refreshToken}`}`
        return true;
      }
    }
    if (refreshToken!== null) {
      return await authenticationFromRefreshToken(refreshToken)
    }
  }


 

  // return {checkUserAuthentication , jwtTokenPayload , extractJwtPayload ,setTokenToStorage ,getTokenFromStorage  , removeTokenFromStorage }
// }
// 



// export default {authenticationHelper};

export {authenticationFromRefreshToken , checkUserAuthentication , jwtTokenPayload , extractJwtPayload ,setTokenToStorage ,getTokenFromStorage  , removeTokenFromStorage }