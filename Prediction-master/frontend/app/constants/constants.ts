import { ToastAndroid } from "react-native";
import { ColorThemeTypes } from "./Color";

export const showToast = (message:string) => {
  ToastAndroid.show(message, ToastAndroid.CENTER);
};

export const CONST_TOKEN_NAMES = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken'
}



export let currentTheme:ColorThemeTypes;


export const setThemeContext = (theme:ColorThemeTypes)=>{
  currentTheme=theme;
}