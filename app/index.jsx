import { View, Text, Image, Button } from 'react-native';
import { React, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';


const index = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className='bg-gray-100 h-full'>
        <View className='w-full items-center justify-center px-4 h-full'>
          <Text className="text-4xl text-white">
             Predictive Maintenence of
          </Text>
          <TouchableOpacity onPress={() => router.push("/home")}>
              <Text className="text-white bg-yellow-400 rounded-xl p-5">Click me bro</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default index;
