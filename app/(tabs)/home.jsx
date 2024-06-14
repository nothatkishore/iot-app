import { View, Text } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import images from '../../constants/images'
import SearchInput from '../../components/SearchInput';
import VideoCard from '../../components/VideoCard';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllposts, getLatestposts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import { useGlobalContext } from '../../context/GlobalProvider'



const home = () => {

  const { data: post, reFetch } = useAppwrite(getAllposts)
  const { user } = useGlobalContext()
  const { data: latestPost } = useAppwrite(getLatestposts)

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await reFetch()
    setRefreshing(false)
  }

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
            <View className="flex my-6 px-4 space-y-6">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    {user?.username}
                  </Text>
                </View>

                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <SearchInput />

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-lg font-pregular text-gray-100 mb-3">
                  Latest Videos
                </Text>

                <Trending
                  posts={latestPost ?? []}
                  keyExtractor={item => item.id}
                />

              </View>
            </View>
          )}

          ListEmptyComponent={() =>
          (
            <EmptyState

              title="No videos found"
              subtitle="Be the first one to upload video"

            />
          )}

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}

        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default home
