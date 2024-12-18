import React, { useState, useRef, useCallback } from 'react';
import axios from "axios";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Alert
} from 'react-native';
import { Button } from '~/components/ui/button';
// import { useAuth } from '../context/AuthContext';
import { NavigationProp, TReponse } from '../types/Types';
import { axiosInstance } from '../auth/AuthenticationHelper';
import { Link, useNavigation } from 'expo-router';
import authHelper from '../auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../auth/ThemeContext';
import Toast from 'react-native-toast-message';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { onLogin } = authHelper();
  const {currentThemeColor} = useTheme()
  const navigaor = useNavigation<NavigationProp>()

  const handleEmailSubmit = useCallback(() => {
    passwordInputRef.current?.focus();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError({ email: !email ? 'Email is required' : '', password: !password ? 'Password is required' : '' });
      return;
    }

    try {
     const response =  await onLogin!(email, password);
     Toast.show({
      text1:response?.message,
      type:"success"
     })
      // Handle success or navigate to next screen
    } catch (err) {
      console.error("Login failed", err);
      Alert.alert("Error", "Login failed. Please check your credentials.");
    }
  };

  

  return (
    <View  className='flex-1 ' style={{ backgroundColor: currentThemeColor.base.background.primary }}>
      <Toast position='bottom' type='success'/>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          className="flex-1 justify-center"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <ScrollView
            contentContainerStyle={{  minHeight: SCREEN_HEIGHT }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            className="px-6 py-8"
          >
            <View className="w-full max-w-lg bg-gray-800 p-6 rounded-3xl shadow-xl relative mt-14">
              {/* Title */}
              <Text className="text-3xl font-bold text-white text-center mb-8">
                Login Now
              </Text>

              {/* Email Input */}
              <View className="mb-6">
                <Text className="text-sm text-gray-400 mb-2">Email</Text>
                <TextInput
                  ref={emailInputRef}
                  className="h-12 px-4 bg-gray-700 text-white rounded-xl"
                  placeholder="Enter your email"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={handleEmailSubmit}
                />
                {error.email && (
                  <Text className="text-red-500 text-sm mt-2">{error.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-sm text-gray-400 mb-2">Password</Text>
                <TextInput
                  ref={passwordInputRef}
                  className="h-12 px-4 bg-gray-700 text-white rounded-xl"
                  placeholder="Enter your password"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                {error.password && (
                  <Text className="text-red-500 text-sm mt-2">{error.password}</Text>
                )}
              </View>

              {/* Login Button */}
              <TouchableOpacity
              style={{backgroundColor:currentThemeColor.interactive.button.background}}
                className="w-full  py-3 rounded-xl mb-4"
                onPress={handleLogin}
              >
                <Text className=" text-lg font-semibold text-center" style={{color:currentThemeColor.interactive.button.text}}>Login</Text>
              </TouchableOpacity>

              {/* Forgot Password */}
              <View className="flex-row justify-center">
                <Text className="text-sm text-gray-400">Forgot your password? </Text>
                <TouchableOpacity>
                  <Text className="text-blue-400 text-sm font-semibold">Reset here</Text>
                </TouchableOpacity>
              </View>

              {/* Private request */}
             

              {/* Link to Home */}
              <TouchableOpacity onPress={()=> navigaor.navigate("Register")}>
                <Text  className="text-sm font-semibold" style={{color:currentThemeColor.base.text.primary}}>Register now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LoginScreen;
