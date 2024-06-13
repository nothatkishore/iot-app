import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { React, useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, OtherStyles, ...props }) => {
    const [password, setPassword] = useState('false')

    return (

        <View className={`space-y-2 ${OtherStyles}`}>

            <Text className='text-gray-100 text-base font-pmedium mt-[10px]'>{title}</Text>

            <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl 
    focus:border-secondary-100 items-center flex-row'>

                <TextInput 
                    className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !password}
                />

                {
                    title === 'Password' && (

                        <TouchableOpacity onPress={() => setPassword(!password)}>

                            <Image
                                source={!password ? icons.eye : icons.eyeHide}
                                className='w-6 h-6'
                                resizeMode='contain'
                            />

                        </TouchableOpacity>

                    )

                }

            </View>


        </View>

    )

}

export default FormField