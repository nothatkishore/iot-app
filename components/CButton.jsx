import { Text, TouchableOpacity } from 'react-native'
import react from 'react'

const CButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => 
{
    return (
        <TouchableOpacity
            className={`bg-secondary-100 p-[5px] my-[10px] rounded-lg justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            onPress={handlePress}
            activeOpacity={0.9}
            disabled={isLoading}
        >
            <Text className={`text-primary font-pmedium text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CButton