import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  return (
    <View className="flex-1 bg-white">
      <WebView
        source={{ uri: 'https://predictive-maintenance-of-electric-vehicle.streamlit.app/' }}
        className="flex-1"
        startInLoadingState={true}
        renderLoading={() => (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
      />
    </View>
  );
};

export default App;
