import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNews } from "../contexts/NewsContext";

const NewsHeader = ({ navigation }) => {
  const {
    state: { save },
  } = useNews();

  const navigateToFavourite = () => {
    navigation.navigate("Favourite");
  };

  return (
    <View style={style.header}>
      <Text style={style.textColor}>All News</Text>

      <Pressable style={style.badgeContainer} onPress={navigateToFavourite}>
        <FontAwesome5 name="bookmark" size={24} color="white" />
        <View style={style.badge}>
          <Text style={style.badgeCount}>{save.length}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    height: 60,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#334155",
  },

  textColor: {
    color: "#f8fafc",
    fontSize: 24,
  },

  badgeContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -8,
    right: -10,
    backgroundColor: Colors.white,
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
  },

  badgeCount: {
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default NewsHeader;
