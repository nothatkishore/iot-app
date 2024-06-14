import { View, Text } from 'react-native'
import { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SearchInput from '../../components/SearchInput';
import VideoCard from '../../components/VideoCard';
import EmptyState from '../../components/EmptyState';
import { searchPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import { useLocalSearchParams } from 'expo-router';


const home = () => {

  const { query } = useLocalSearchParams()
  const { data: post, reFetch } = useAppwrite(() => searchPosts(query))

  useEffect(() => {
    reFetch()
  }, [query])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className='bg-primary h-full'>
        <FlatList
          data={post}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <VideoCard
              video={item}
            />
          )}
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-sm text-gray-100">
                Search results
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>

              <View>
                <SearchInput initialQuery={query} />
              </View>

            </View>
          )}

          ListEmptyComponent={() =>
          (
            <EmptyState
              title="No videos found"
              subtitle="No videos found for this search"
            />
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default home
