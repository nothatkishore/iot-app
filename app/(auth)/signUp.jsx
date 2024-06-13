import { useState } from 'react'
import { View, Text, Image, Alert, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CButton from '../../components/CButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }

    setIssubmitting(true)

    try 
    {
      const result = await createUser(form.email, form.username, form.password)
      router.replace('/home')
    }

    catch (error) 
    {
      Alert.alert('Error', error.message)
    }

    finally {
      setIssubmitting(false)
    }

  }

  const [isSubmitting, setIssubmitting] = useState(false)

  return (
    <SafeAreaView className='bg-primary h-full'>

      <ScrollView>
        <View className='w-full min-h-[84vh] justify-center px-4 my-6'>

          <View className='w-full items-center'>
            <Image
              source={images.logo}
              resizeMode='contain'
              className='w-[115px] h-[35px]'
            />
          </View>

          <Text className='text-white text-2xl my-10 font-semibold'>Sign up to Aora</Text>

          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            // keyboardType="email-address"
            placeholder='Enter username'
          />

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder='Enter email'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            // keyboardType="email-address"
            placeholder='Enter password'
          />

          <CButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='mt-[10px] flex-row w-full justify-center'>
            <Text className='text-white text-lg font-pregular'>Have an account ?</Text>
            <Link href='/signIn' className='text-secondary-200 text-lg font-psemibold'> Sign in</Link>
          </View>

        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp