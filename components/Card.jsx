import { View, Text, Image } from 'react-native';
import React from 'react';

const Card = ({ data1, data2}) => {
  return (
    <View className="bg-white m-4 p-2 rounded-2xl w-full h-1/4 flex flex-row justify-around items-center">
      {/* Voltage Section */}
      <View className="bg-gray-100/50 w-2/5 h-3/4 rounded-md flex justify-center items-center">
        <View>
          <Image
            source={require('../assets/images/voltage.png')} // Replace with your local image
            className="w-12 h-12"
            resizeMode="contain"
          />
        </View>
        <Text className="text-2xl">{data1 || '5.82'}</Text>
        <Text className="text-sm font-light">Volts</Text>
      </View>

      {/* Current Section */}
      <View className="bg-gray-100/50 w-2/5 h-3/4 rounded-md flex justify-center items-center">
        <Image
          source={require('../assets/images/current.png')} // Replace with your local image
          className="w-12 h-12"
          resizeMode="contain"
        />
        <Text className="text-2xl">{data2 || '0.598'}</Text>
        <Text className="text-sm font-light">Ampere</Text>
      </View>
    </View>
  );
};

export default Card;
