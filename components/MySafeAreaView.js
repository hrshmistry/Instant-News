import { View, Platform, StatusBar, SafeAreaView } from "react-native";
import React from "react";

const MySafeAreaView = ({ Component, ...rest }) => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? 0 : 0,
      }}
    >
      <SafeAreaView>
        <Component {...rest} />
        <StatusBar
          barStyle={
            Platform.OS === "android" ? "light-content" : "dark-content"
          }
        />
      </SafeAreaView>
    </View>
  );
};

export default MySafeAreaView;
