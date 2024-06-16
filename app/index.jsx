import { View, Text, Image } from 'react-native';
import { React, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../constants/images';
import CButton from '../components/CButton';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const index = () => 
{
  const { isLoading, isLogin } = useGlobalContext();

  if (isLogin && !isLoading) 
    return <Redirect href='/home' />;

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='w-full items-center justify-center px-4 h-full'>
        <Image source={images.logo} resizeMode='contain' className='h-[200px]' />
        <Image source={images.cards} resizeMode='contain' className='h-[300px]' />
        <View className='mt-5'>
          <Text className='text-white text-3xl font-bold'>Hello,
            <Text className='text-violet-300'>World</Text>
          </Text>
        </View>
        <Text className='text-white text-sm'>
          Where creativity meets innovation
        </Text>
        <CButton
          title='Continue with E Mail'
          handlePress={() => router.push('/signIn')}
          containerStyles='w-full mt-7'
        />
      </View>
    </SafeAreaView>
  );
};

export default index;
