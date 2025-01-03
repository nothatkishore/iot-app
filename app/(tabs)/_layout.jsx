import { View, Text, Image } from 'react-native'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'
import React from 'react'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className='items-center justify-center'>
            <Image
                source={icon}
                className='w-6 h-6'
                tintColor={color}
                resizeMode='contain'
            />

            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-[10px] text-white`}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    return (

        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle:
                    {
                        height: 60,
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533'
                    },
                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Dashboard',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Dashboard"
                                focused={focused}
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name='create'
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                name="Create"
                                focused={focused}
                            />
                        )
                    }}
                />

            </Tabs>
        </>

    )
}

export default TabsLayout