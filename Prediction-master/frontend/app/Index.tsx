import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeToggle } from '~/components/ThemeToggle';
import LoginScreen from './screens/Login';
import Home from './screens/Home';
import Prediction from './screens/Prediction';
import { useAuthStore } from './auth/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import { CURRENT_THEME_COLOR } from './constants/Color';
import { useTheme } from './auth/ThemeContext';
import Register from './screens/Register';
import { useEffect } from 'react';
import { axiosInstance, checkUserAuthentication, getTokenFromStorage, removeTokenFromStorage } from './auth/AuthenticationHelper';
import { CONST_TOKEN_NAMES } from './constants/constants';
import React from 'react';
import Toast from 'react-native-toast-message';
import { ArrowBigLeft, LogIn, LogOut } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from './types/Types';

const StackNavigation = createStackNavigator();

const Index = () => {
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    (async () => {
      const accessToken = await getTokenFromStorage(CONST_TOKEN_NAMES.accessToken);
      const refreshToken = await getTokenFromStorage(CONST_TOKEN_NAMES.refreshToken);
      checkUserAuthentication(accessToken, refreshToken);
    })();
  }, []);

  const { authState  , logout , setAuthState} = useAuthStore();  // Access authentication state
  const { currentThemeColor } = useTheme();
  const onLogout = async()=>{
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

  return (
    <StackNavigation.Navigator
      initialRouteName={authState.authentication ? "Home" : "Login"}
      screenOptions={{
        headerShown: true,
        headerTitle: "",  // Remove title
        headerStyle: {
          backgroundColor: currentThemeColor.base.background.primary,  // Header background color
          elevation: 0,  // Disable shadow for Android
          shadowOpacity: 0,  // Disable shadow for iOS
          borderBottomWidth: 1,  // Optional: Add a subtle border at the bottom for aesthetic
          borderBottomColor: currentThemeColor.base.background.secondary,  // Optional: Subtle border color
        },
        // header:()=>(
        //   <View >
        //     <Toast position='top'
        //     visibilityTime={500}
        //     />
        //   </View>
        // ),
        headerRight: () => (
          <SafeAreaView
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
              paddingRight: 15,  // Spacing on the right
            }}
          >
            <ThemeToggle />
            <TouchableOpacity
              style={{
                backgroundColor: 'white',  // Background color for the button
                paddingVertical: 10,  // Vertical padding
                paddingHorizontal: 10,  // Horizontal padding
                borderRadius: 10,  // Rounded corners
                marginLeft: 10,  // Spacing between the theme toggle and the logout button
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={authState.authentication  === true ? onLogout : () => navigation.navigate('Login')}
            >
              {authState.authentication  === true ?  <LogOut size={24} color={currentThemeColor.interactive.button.background}  /> : <Text >Login</Text>}
            </TouchableOpacity>

          </SafeAreaView>
        ),

        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();  // Handle back button press
              } else {
                console.log('No screen to go back to!');
              }
            }}
            style={{
              paddingLeft: 15,  // Padding for the back button
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ArrowBigLeft
              size={24}
              color={currentThemeColor.base.text.primary}  // Adjust icon color to match the theme
            />
          </TouchableOpacity>
        ),
      }}
    >
      {/* Screens for authenticated users */}
      <StackNavigation.Screen
        name="Home"
        component={Home}
        options={{
          cardStyle: { backgroundColor: currentThemeColor.base.background.primary },
          headerTitle: "",  // Remove the title for Home screen
        }}
      />

      {authState.authentication ? (
        <StackNavigation.Screen
          name="Prediction"
          component={Prediction}
          options={{
            cardStyle: { backgroundColor: currentThemeColor.base.background.primary },
            // headerShown: false,
          }}
        />
      ) : (
        <>
          {/* Screens for non-authenticated users */}
          <StackNavigation.Screen
            name="Login"
            component={LoginScreen}
            
          />
          <StackNavigation.Screen
            name="Register"
            component={Register}
            
          />
        </>
      )}
    </StackNavigation.Navigator>
  );
};

export default Index;

const styles = StyleSheet.create({
  component: {
    backgroundColor: CURRENT_THEME_COLOR.base.background.primary,
  },
});
