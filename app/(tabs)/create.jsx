import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { styled } from 'nativewind';

const StyledImageBackground = styled(ImageBackground);

const App = () => {
  return (
    <StyledImageBackground 
      source={require('../../assets/images/thumbnail.png')} // Replace with your image path
      className="flex-1 justify-center items-center" // Tailwind classes
      resizeMode="cover" // Optional
    >
      <View className="bg-black/50 p-5 rounded-lg">
        <Text className="text-white text-lg font-bold">
          Hello, this is a background image!
        </Text>
      </View>
    </StyledImageBackground>
  );
};

export default App;
