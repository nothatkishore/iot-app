import React from 'react'
import { Stack } from 'expo-router' 
import { StatusBar } from 'expo-status-bar' 
import { View, Text } from 'react-native-animatable'


const AuthLayout = () => {
  return (
    <>
      <StatusBar style='light' />
      <Stack>
        <Stack.Screen name='signIn' options={{headerShown : false}} />
        <Stack.Screen name='signUp' options={{headerShown : false}} />
      </Stack>
    </>

  )
}

export default AuthLayout