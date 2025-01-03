import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const home = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary h-full'>
        <View>
          <Text>Home page</Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default home
