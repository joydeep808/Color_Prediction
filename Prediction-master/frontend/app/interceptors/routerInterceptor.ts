import { useAuthStore } from "../auth/AuthContext"







export type route = "home" | "about" | "login"
export const routerInterceptor = (route:route)=>{
  const userAuthState = useAuthStore.getInitialState().authState;

  if(userAuthState?.authentication){
    if(route === "login"){
      return "/home"
    }
  }

  if(!userAuthState?.authentication){
    if(route === "about"){
      return "/home"
    }
  }
}