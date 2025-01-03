import { View, Text, Image } from 'react-native';
import React from 'react';

const Card1 = ({ data, unit }) => {
    return (
        <View className="m-4 p-2 rounded-2xl w-full h-1/6 flex flex-row items-center bg-white">
            {/* Image Section */}
            <View className="w-2/4 flex justify-center items-center">
                <Image
                    source={require('../assets/images/profile.png')} // Update with the correct image path
                    className="w-24 h-24" // Adjust size as needed
                    resizeMode="cover"
                />
            </View>

            {/* Text Section */}
            <View className="w-2/4 flex justify-center items-center gap-2">
                <View>
                    <Text>Battery Temperature</Text>
                </View>
                <View>
                    <Text className="text-3xl">{data || 33.4} {'°C'}
                    </Text>
                </View>

            </View>
        </View>
    );
};

export default Card1;
