import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from "~/lib/useColorScheme";
import '../global.css';
import Index from './Index';
import AuthManager from './auth/AuthManager';
import { ThemeProvider } from './auth/ThemeContext';
import Toast from "react-native-toast-message"; 
import { View } from "react-native";

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { DarkTheme, DefaultTheme, NavigationContainer, Theme, ThemeProvider } from '@react-navigation/native';
// import { SplashScreen, Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import * as React from 'react';
// import { Button, Platform } from 'react-native';
// import { NAV_THEME } from '~/lib/constants';
// import { useColorScheme } from '~/lib/useColorScheme';
// import { PortalHost } from '@rn-primitives/portal';
// import { ThemeToggle } from '~/components/ThemeToggle';
// import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './screens/Home';
// import LoginScreen from './screens/Login';


// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// // Prevent the splash screen from auto-hiding before getting the color scheme.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
//   const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

//   React.useEffect(() => {
//     (async () => {
//       const theme = await AsyncStorage.getItem('theme');
//       if (Platform.OS === 'web') {
//         // Adds the backgrouwebnd color to the html element to prevent white background on overscroll.
//         document.documentElement.classList.add('bg-background');
//       }
//       if (!theme) {
//         AsyncStorage.setItem('theme', colorScheme);
//         setIsColorSchemeLoaded(true);
//         return;
//       }
//       const colorTheme = theme === 'dark' ? 'dark' : 'light';
//       if (colorTheme !== colorScheme) {
//         setColorScheme(colorTheme);
//         setAndroidNavigationBar(colorTheme);
//         setIsColorSchemeLoaded(true);
//         return;
//       }
//       setAndroidNavigationBar(colorTheme);
//       setIsColorSchemeLoaded(true);
//     })().finally(() => {
//       SplashScreen.hideAsync();
//     });
//   }, []);

//   if (!isColorSchemeLoaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
//       <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
//       {/* <Stack screenOptions={{ headerRight: () => <ThemeToggle /> }} /> */}
//       <AuthProvider>
//       <Layout/>

      
//       </AuthProvider>
//       <PortalHost />
//     </ThemeProvider>
//   );
// }

// export const Layout = ()=>{

//   const {authState , onLogout} = useAuth();
//   return (
//     <NavigationContainer>
//       <StackNavigation.Navigator  >
//     {authState?.authentication ? (
//       <StackNavigation.Screen name='Home' component={Home} options={
//         {
//           headerRight:()=><Button onPress={onLogout} title='Logout now'/>
//         }
//       }/>
//     ):(
//       <StackNavigation.Screen name='Login' component={LoginScreen}/>
//     )}
//       </StackNavigation.Navigator>
//     </NavigationContainer>
//   )
// }






export default function RootLayout() {
const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  // const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  // React.useEffect(() => {
  //   (async () => {
  //     const theme = await AsyncStorage.getItem('theme');
  //     if (Platform.OS === 'web') {
  //       // Adds the backgrouwebnd color to the html element to prevent white background on overscroll.
  //       document.documentElement.classList.add('bg-background');
  //     }
  //     if (!theme) {
  //       AsyncStorage.setItem('theme', colorScheme);
  //       setIsColorSchemeLoaded(true);
  //       return;
  //     }
  //     const colorTheme = theme === 'dark' ? 'dark' : 'light';
     
  //     if (colorTheme === "dark") {
  //       CURRENT_THEME_COLOR.accent =LIGHT_THEME.accent
  //       CURRENT_THEME_COLOR.base = LIGHT_THEME.base
  //       CURRENT_THEME_COLOR.interactive = LIGHT_THEME.interactive
  //     }
  //     if (colorTheme !== colorScheme) {

  //       setColorScheme(colorTheme);
  //       setAndroidNavigationBar(colorTheme);
  //       setIsColorSchemeLoaded(true);
  //       return;
  //     }
  //     setAndroidNavigationBar(colorTheme);
  //     setIsColorSchemeLoaded(true);
  //   })().finally(() => {
  //     SplashScreen.hideAsync();
  //   });
  // }, []);

  // if (!isColorSchemeLoaded) {
  //   return null;
  // }

  return (
        <SafeAreaProvider>
            <ThemeProvider>
          <AuthManager>
          <Index></Index>
         </AuthManager>
            </ThemeProvider>
        </SafeAreaProvider>
  )



}


