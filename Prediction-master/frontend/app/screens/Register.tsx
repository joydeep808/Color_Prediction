import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, Animated, SafeAreaView,
  ImageBackground
} from 'react-native';
import { useTheme } from '../auth/ThemeContext';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/Types';
import authHelper from '../auth/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ email?: string; password?: string }>({ email: '', password: '' });
  const navigation = useNavigation<NavigationProp>()
  const {getAuthState ,onRegister} = authHelper();
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const emailAnimation = useRef(new Animated.Value(0)).current;
  const passwordAnimation = useRef(new Animated.Value(0)).current;

  const {currentThemeColor} = useTheme()

  const handleEmailSubmit = () => {
    if (!email) {
      setError((prev) => ({ ...prev, email: 'Email is required' }));
      triggerAnimation('email');
    } else {
      setError((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePasswordSubmit = () => {
    if (!password) {
      setError((prev) => ({ ...prev, password: 'Password is required' }));
      triggerAnimation('password');
    } else {
      setError((prev) => ({ ...prev, password: '' }));
    }
  };

  const triggerAnimation = (field: 'email' | 'password') => {
    if (field === 'email') {
      Animated.timing(emailAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(emailAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 2000);
      });
    } else {
      Animated.timing(passwordAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(passwordAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 2000);
      });
    }
  };

  const handleRegister = async() => {
    if (!email || !password) {
      handleEmailSubmit();
      handlePasswordSubmit();
    }
    else{
     console.log (await onRegister!({email , password}))
    }


  };

  return (
    <SafeAreaView style={{flex:2 ,  backgroundColor: currentThemeColor.base.background.primary }}>
      {/* <View>
        <ImageBackground
          className="h-2/3 w-full flex-auto mt-[-12%]"
          resizeMode="contain"
          source={require("../../assets/images/welcome-img.png")}
        />
      </View> */}



        
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', minHeight: "auto" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 24 }}
      >
       


        <View
          className="w-full max-w-lg bg-gray-800 p-6 rounded-3xl shadow-xl"
          style={{
            backgroundColor: currentThemeColor.base.background.secondary,
            marginBottom: 20
          }}
        >
           <Text
        className="text-3xl text-center mb-5"
        style={{ color: currentThemeColor.base.text.primary, fontWeight: 'bold' }}
      >
        Register Now
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
              <Animated.View style={{ opacity: emailAnimation }}>
                <Text className="text-red-500 text-sm mt-2">{error.email}</Text>
              </Animated.View>
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
              onSubmitEditing={handlePasswordSubmit}
            />
            {error.password && (
              <Animated.View style={{ opacity: passwordAnimation }}>
                <Text className="text-red-500 text-sm mt-2">{error.password}</Text>
              </Animated.View>
            )}
          </View>

          {/* Register Button */}
          <TouchableOpacity
            className="w-full bg-blue-600 py-3 rounded-xl mb-4"
            onPress={handleRegister}
            style={{
              backgroundColor: currentThemeColor.interactive.button.background
            }}
          >
            <Text className="text-white text-lg font-semibold text-center">Register</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text className="text-sm text-gray-400">Already have an account? </Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
              <Text className="text-blue-400 text-sm font-semibold">Login here</Text>
            </TouchableOpacity>
          </View>

          {/* Optional Links */}
          {/* <TouchableOpacity
            href="/screens"
            className="text-blue-400 text-sm font-semibold"
            style={{ marginTop: 10 }}
          >
           
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
