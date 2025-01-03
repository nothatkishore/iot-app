import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Card from '../../components/Card';
import Card1 from '../../components/Card1';
import Card2 from '../../components/Card2';
import { useState, useEffect } from 'react';
import { database } from '../../firebase.js'; // Adjust the import path as needed
import { ref, onValue } from 'firebase/database';

const Home = () => {

  const [data, setData] = useState({
    bat_temp: 0,
    current: 0,
    mot_temp: 0,
    soc: 0,
    soh: 0,
    speed: 0,
    voltage: 0,
  });

  useEffect(() => {
    const dataRef = ref(database, 'parameters'); // Replace with your actual database path

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        console.log("No data available");
      }
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary flex-1 flex p-2">
        <View className="flex-1 flex flex-row flex-wrap justify-center items-center p-4">
          <Card data1={data.voltage} data2={data.current} />
          <Card1 data={data.bat_temp} />
          <View className="flex-1">
            <Card2
              data1={data.soc}
              data2={data.mot_temp}
              data3={data.soh}
              data4={data.speed}
            />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;
