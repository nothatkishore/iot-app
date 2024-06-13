import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '../constants/images'
import CButton from '../components/CButton'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className='justify-center items-center px-4'>

            <Image
                source={images.empty}
                className='h-[215px] w-[270px]'
                resizeMode='contain'
            />

            <Text className='font-psemibold text-xl text-white text-center mt-2'>
                {title}
            </Text>

            <Text className='font-pmedium text-sm text-gray-100'>
                {subtitle}
            </Text>

            <CButton 
            
                title='Create video'
                containerStyles='w-full my-5'
            
            />

        </View>
    )
}

export default EmptyState