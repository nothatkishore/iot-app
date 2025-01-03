import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const StyledImageBackground = styled(ImageBackground);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StyledImageBackground
        source={require('../assets/images/car.jpg')} // Replace with your image path
        className="flex-1 justify-center items-center" // Tailwind classes
        resizeMode="cover"
      >
        <View className="flex-1 justify-around items-center w-full p-5">
          <View className="flex items-center">
            <Text className="text-gray-200 text-2xl mt-10 font-bold text-center">
              Predictive Maintenance of
              <Text className="text-green-200"> Electric Vechicles</Text>

            </Text>
            <Text className="text-sm text-gray-100 font-light">Monitering application</Text>
          </View>


          <TouchableOpacity
            onPress={() => router.push('/home')}
            className="bg-gray-800 p-3 rounded-lg w-full"
          >
            <Text className="text-center text-lg font-bold text-green-100">
              Get started
            </Text>
          </TouchableOpacity>
        </View>
      </StyledImageBackground>
    </GestureHandlerRootView>
  );
};

export default App;
