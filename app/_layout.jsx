import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'

const RootLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            </Stack>
            <StatusBar style='light' />
        </>
    )
}

export default RootLayout