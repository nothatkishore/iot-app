import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants"; // Ensure icons are correctly imported
import { ResizeMode, Video } from "expo-av"; // Make sure expo-av is installed

const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {

  const [play, setPlay] = useState(false);

  return (
    <View className='flex-col items-center justify-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
            <Image
              source={{ uri: avatar }} // Ensure avatar URI is valid
              className='w-full h-full rounded-lg'
              resizeMode='cover'
            />
          </View>

          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text className='text-white font-psemibold text-sm' numberOfLines={1}>
              {title}
            </Text>
            <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>

        <View className='pt-2'>
          <Image
            source={icons.menu}
            className='w-5 h-5'
            resizeMode='contain'
          />
        </View>
      </View>

      {
        play ? (

          <Video
            source={{ uri: video }}
            className="w-full h-60 rounded-xl mt-3 bg-white/10"
            useNativeControls
            shouldPlay
            resizeMode="cover"
            isLooping
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            className='w-full h-60 rounded-xl mt-3 relative items-center justify-center text-white'
            onPress={() => setPlay(true)}
          >
            <Image
              source={{ uri: thumbnail }} // Ensure thumbnail URI is valid
              className='w-full h-full rounded-xl mt-3'
              resizeMode='cover'
            />

            <Image
              source={icons.play} // Ensure play icon is correctly imported
              className='h-12 w-12 absolute'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )
      }
    </View>
  );
};

export default VideoCard;
