import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CButton from '../../components/CButton'
import { Link, router } from 'expo-router'
import { signin } from '../../lib/appwrite' 
import { Alert } from 'react-native' 


const signIn = () => 
{
  const [form, setForm] = useState({
    email : '',
    password : ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () =>
  {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setisSubmitting(true)

    try {
      await signin(form.email, form.password)
      router.replace('/home')
    }

    catch (error) {
      Alert.alert('Error', error.message)
    }

    finally {
      setisSubmitting(false)
    }
  }

  return (
    <>
      <SafeAreaView className='bg-primary h-full'>

        <View className='w-full min-h-[84vh] justify-center px-4 my-6s'>

          <View className='w-full items-center'>
            <Image
              source={images.logo}
              resizeMode='contain'
              className='w-[115px] h-[35px]'
            />
          </View>

          <Text className='text-white text-2xl font-semibold my-10'>Login to Aora</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Enter email"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Enter password"
          />

          <CButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account ?
            </Text>
            <Link href='/signUp' className='text-lg font-psemibold text-secondary'>Sign up</Link>
          </View>

        </View>

      </SafeAreaView>
    </>
  )
}

export default signIn