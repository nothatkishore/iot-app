import { View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Choose any supported icon pack

const Card2 = ({ data1, data2, data3, data4 }) => {
    return (
        <View className="bg-white/75 w-full flex h-1/2 rounded-2xl flex-row flex-wrap justify-around">
            <View className="w-2/5 h-full flex justify-around">
                {/* State of Charge */}
                <View className="bg-black/30 rounded-xl w-full h-1/3 flex justify-center items-center">
                    <Icon name="battery-charging-50" size={24} color="#fff" style={{ marginBottom: 8 }} />
                    <Text className="text-sm font-normal mb-2">State of charge</Text>
                    <Text className="text-xl font-medium">
                        {data1 || 89.09}<Text className="text-sm font-light"> %</Text>
                    </Text>
                </View>

                {/* Temp of Motor */}
                <View className="bg-black/30 rounded-xl w-full h-1/3 flex justify-center items-center">
                    <Icon name="thermometer" size={24} color="#fff" style={{ marginBottom: 8 }} />
                    <Text className="text-sm font-normal">Temp of Motor</Text>
                    <Text className="text-xl font-medium">{data2 || 78.23}</Text>
                    <Text className="text-sm font-light">celcius</Text>
                </View>
            </View>

            <View className="w-2/5 h-full flex justify-around">
                {/* State of Health */}
                <View className="bg-black/30 rounded-xl w-full h-1/3 flex justify-center items-center">
                    <Icon name="heart" size={24} color="#fff" style={{ marginBottom: 8 }} />
                    <Text className="text-sm font-normal mb-2">State of health</Text>
                    <Text className="text-xl font-medium">
                        {data3 || 91.08}<Text className="text-sm font-light"> %</Text>
                    </Text>
                </View>

                {/* Speed of Motor */}
                <View className="bg-black/30 rounded-xl w-full h-1/3 flex justify-center items-center">
                    <Icon name="speedometer" size={24} color="#fff" style={{ marginBottom: 8 }} />
                    <Text className="text-sm font-normal">Speed of Motor</Text>
                    <Text className="text-xl font-medium">{data4 || 1400}</Text>
                    <Text className="text-sm font-light">RPM</Text>
                </View>
            </View>
        </View>
    );
};

export default Card2;
