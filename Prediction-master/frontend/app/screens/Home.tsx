import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { NavigationProp, RootStackParamList } from '../types/Types';
import { useNavigation } from '@react-navigation/native';
import { axiosInstance, removeTokenFromStorage } from '../auth/AuthenticationHelper';
import { CONST_COLOR } from '../constants/Color';
import { useTheme } from '../auth/ThemeContext';
import { router } from 'expo-router';
import { useAuthStore } from '../auth/AuthContext';
import { CONST_TOKEN_NAMES } from '../constants/constants';

const Home = () => {
  const navigation = useNavigation<NavigationProp>()
  const { currentThemeColor, setCurrentTheme } = useTheme()
  const {authState , setAuthState }= useAuthStore();
 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    heading: {
      color: currentThemeColor.interactive.button.background
    },

    text: {
      color: currentThemeColor.base.text.primary,
      fontSize: 14,
    }
  });
  const HomeScreenStyles = StyleSheet.create({
    button: {
      backgroundColor: currentThemeColor.interactive.button.background,
      color: currentThemeColor.interactive.button.text,
      borderWidth:1
    }
  })



  const navigator = useNavigation<NavigationProp>()
  return (
    <SafeAreaView className='flex-1 h-full overflow-auto scroll-m-9' >
      <View >
        <ImageBackground className='h-2/3 w-full  flex-auto mt-[-14%]'
          resizeMode="contain"
          source={require("../../assets/images/welcome-img.png")}
        />
      </View>
      <Text className='text-3xl text-center mb-4' style={styles.heading} >Welcome to home </Text>
        <View className='w-[90%] mx-auto'>
      <Text className={`text-base mb-2 text-left`} style={styles.text} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit culpa laborum aperiam suscipit? Ab totam aperiam doloribus rerum incidunt cupiditate? Eaque porro incidunt tempore vero reprehenderit quasi quos cumque adipisci?</Text>

        </View>
      <View className='flex flex-row  justify-around w-[95%] pt-8 gap-3 ' style={{ marginBlock: 0, marginInline: "auto" }} >
        {authState.authentication ? <>
        <TouchableOpacity
          className="w-[46%] py-4 rounded-md"
          style={HomeScreenStyles.button}
          onPress={() => navigator.navigate("Home")} // Correctly call the function with a valid theme value
        >
          <Text className="text-center text-white" >Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className='bg-white w-[46%] py-4 rounded-md '  onPress={() => navigator.navigate("Prediction")}><Text className='text-center'>Game</Text></TouchableOpacity>
        </>: 
        <>
        <TouchableOpacity
          className="w-[46%] py-4 rounded-md"
          style={HomeScreenStyles.button}
          onPress={() => navigator.navigate("Login")} // Correctly call the function with a valid theme value
          >
          <Text className="text-center text-white" >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[46%] py-4 rounded-md"

          style={{ borderColor: currentThemeColor.interactive.button.background, borderWidth: 1 }}
          onPress={() => navigator.navigate("Register")} // Correctly call the function with a valid theme value
        >
          <Text className="text-center text-white" >Register</Text>
        </TouchableOpacity>
          </>
        }

      </View>

    </SafeAreaView>

  )

}






export default Home