import * as zustand from "zustand"
import { TLoginResponse, TReponse, TuserRegister } from "../types/Types"
import { useState } from "react"

interface AuthProp{
  authState?:{token:string | null , 
    authentication:boolean | null,
    role:string[] | null,
    tokenExp:number | null}
  token:string | null
  authentication:boolean | null
  role:string[] | null
  tokenExp:number | null
  onRegister?:(register:TuserRegister)=> Promise<TReponse<null>>
  onLogin?:(eamil:string , password:string)=>Promise<TReponse<TLoginResponse | null>>
  onLogout?:()=>Promise<any>
}

type AuthState = {
  auth:boolean
  counter:number
  setAuth:(number:number)=>void 
}


export const useStore = zustand.create<AuthState>()((set) => ({
  auth:true,
  counter:1,
  setAuth:(number:number)=>set((s)=> ({counter:s.counter+=number}))
}))