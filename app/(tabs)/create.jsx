import { View, Text, Image, Alert } from 'react-native'
import { React, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FormField from '../../components/FormField'
import { Video, ResizeMode } from 'expo-av';
import { icons } from '../../constants';
import CButton from '../../components/CButton'
import * as DocumentPicker from "expo-document-picker";
import { router } from 'expo-router';
import createVideo from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const create = () => {

  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setform] = useState({
    title: '',
    video: '',
    thumbnail: '',
    prompt: ''
  })

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setform({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setform({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  }

  const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } 
    
    catch (error) 
    {
      Alert.alert("Error1", error.message);
    } 
    
    finally 
    {
      setform({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView className='bg-primary h-full'>

        <ScrollView className='px-4 my-6'>


          <Text className='text-2xl text-white font-psemibold'>
            Upload a video
          </Text>

          <FormField
            title='Video Title'
            value={form.title}
            placeholder='Give your video a catchy title...'
            handleChangeText={(event) => setform({ ...form, title: event })}
            OtherStyles='mt-10'
          />

          <View className='mt-7 space-y-2'>

            <Text className='text-base text-gray-100 font-pmedium'>
              Upload video
            </Text>

            <TouchableOpacity
              onPress={() => openPicker('video')}
            >
              {form.video ?
                (
                  <Video
                    source={{ uri: form.video.uri }}
                    className='w-full h-64 rounded-2xl'
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                  />
                ) :

                (
                  <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                    <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>

                      <Image
                        source={icons.upload}
                        resizeMode='contain'
                        className='h-1/2 w-1/2'
                      />

                    </View>
                  </View>
                )

              }
            </TouchableOpacity>
          </View>

          <View className='mt-7 space-y-2'>
            <Text className='text-base text-gray-100 font-psemibold'>
              Thumbnail image
            </Text>
            <TouchableOpacity
              onPress={() => openPicker('image')}
            >
              {form.thumbnail ?
                (
                  <Image
                    source={{ uri: form.thumbnail.uri }}
                    resizeMode='cover'
                    className='w-full h-64 rounded-2xl'
                  />
                ) :

                (
                  <View className='w-full h-16 px-4 bg-black-100 
                  rounded-2xl justify-center items-center flex-row space-x-2'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='h-5 w-5'
                    />

                    <Text className='text-sm text-gray-100 font-pmedium'>Choose a file</Text>

                  </View>
                )

              }
            </TouchableOpacity>
          </View>

          <FormField
            title='AI Prompt'
            value={form.prompt}
            placeholder='The prompt you used to create this video'
            handleChangeText={(event) => setform({ ...form, prompt: event })}
            OtherStyles='mt-7'
          />

          <CButton
            title='Submit & Publish'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={uploading}
          />

        </ScrollView>

      </SafeAreaView>
    </GestureHandlerRootView>

  )
}

export default create