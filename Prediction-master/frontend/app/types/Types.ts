import { StackNavigationProp } from "@react-navigation/stack"
import axios from "axios"
import { showToast } from "../constants/constants"

export type TuserRegister = {
  email:string,
  password:string,
}

export type TReponse<T> = {
  statusCode:number,
  message:string
  data:T
  isSuccess:boolean
}

export type TuserLogin = {
  email:string,
  password:string,
}

export type TLoginResponse = {
  accessToken:string,
  refreshToken:string,
}

export type JWT_PAYLOAD_TYPE = {
  email:string,
  role:string,
  id:number
  nickName:string
  lastLogin:string
  exp:number

}

export type JWT_TOKEN_PARAM = {
  tokenName?:string,
  tokenValue?:string
}
// export const 

export type TColorResponse = {
    "id":string,
    "number": number|null,
    "status": string,
    "endTime": number
}


export interface UserBidMapper {
  id: string;
  predictionId: number;
  amount: number;
  status: string;
  createdAt: number;
  number:number
  colorType:string
}





export function axiosErrorHandler<T = any>(error:Error){
  if (axios.isAxiosError<TReponse<T>>(error) && error.response) {
      console.log(error.response.data)
      return error.response.data
  }
  return null;
}

// types/navigation.ts
export type RootStackParamList = {
  Home: undefined; // No parameters for Home screen
  Prediction: undefined; // No parameters for About screen
  Login: undefined; // No parameters for Login screen
  Register: undefined; // No parameters for Login screen
};


export type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
