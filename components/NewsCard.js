import React from "react";
import { View, Text, Image, Pressable, StyleSheet, Share } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useNews } from "../contexts/NewsContext";
import onShare from "../helpers/onShare";

const NewsCard = ({ element, navigation, saveBtn, removeIcon }) => {
  const { dispatch } = useNews();

  const addToSaved = (element) => {
    navigation.navigate("Edit Article", {
      item: element.item,
      name: "Edit Article",
    });
  };

  const removeFromSave = (id) => {
    dispatch({
      type: "REMOVE_FROM_SAVE",
      payload: id,
    });
  };

  return (
    <View style={style.newsWrapper}>
      <Image
        source={{
          uri: element?.item?.urlToImage,
        }}
        style={style.image}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
          paddingVertical: 2,
        }}
      >
        <View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ fontWeight: "bold", marginBottom: 5, fontSize: 18 }}
          >
            {element?.item?.title}
          </Text>

          <Text
            numberOfLines={3}
            ellipsizeMode="middle"
            style={{ fontSize: 12 }}
          >
            {element?.item?.description}
          </Text>
        </View>

        <View style={style.iconStyle}>
          <View
            style={{
              alignItems: "baseline",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View style={style.textViewStyle}>
              <Text style={style.textStyle}>{element?.item?.source?.name}</Text>
            </View>
            {element?.item?.category && (
              <View style={style.categoryViewStyle}>
                <Text style={style.categoryStyle}>
                  {element?.item?.category}
                </Text>
              </View>
            )}
          </View>

          <View style={style.icon2}>
            {saveBtn &&
              (!element?.item?.saved ? (
                <Pressable onPress={() => addToSaved(element)}>
                  <MaterialCommunityIcons
                    name="bookmark-outline"
                    size={18}
                    color="#334155"
                    style={{
                      marginHorizontal: 5,
                      fontWeight: "bold",
                      fontSize: 24,
                    }}
                  />
                </Pressable>
              ) : (
                <Pressable onPress={() => navigation.navigate("Favourite")}>
                  <MaterialCommunityIcons
                    name="bookmark-check"
                    size={18}
                    color="#334155"
                    style={{
                      marginHorizontal: 5,
                      fontWeight: "bold",
                      fontSize: 24,
                    }}
                  />
                </Pressable>
              ))}

            {element?.item?.isSharable && (
              <Pressable
                onPress={() =>
                  onShare(element?.item?.title, element?.item?.url)
                }
              >
                <Octicons
                  name="share-android"
                  size={18}
                  color="#334155"
                  style={{
                    marginHorizontal: 5,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                />
              </Pressable>
            )}

            {removeIcon && (
              <Pressable onPress={() => removeFromSave(element?.item?._id)}>
                <MaterialCommunityIcons
                  name="bookmark-remove"
                  size={18}
                  color="#334155"
                  style={{
                    marginHorizontal: 5,
                    fontWeight: "bold",
                    fontSize: 24,
                  }}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  newsWrapper: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },

  iconStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  icon2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  sourceName: {
    backgroundColor: "#334155",
    color: Colors.white,
    fontWeight: "bold",
    width: "auto",
    padding: 2,
    borderRadius: 10,
    marginTop: 5,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },

  contentWrapper: {
    marginHorizontal: 10,
  },

  textViewStyle: {
    borderRadius: 5,
    padding: 2,
    backgroundColor: "#334155",
    marginTop: 5,
    marginEnd: 5,
    borderWidth: 1,
    borderColor: "#334155",
  },

  categoryViewStyle: {
    borderRadius: 5,
    padding: 2,
    backgroundColor: "#fff",
    marginTop: 5,
    marginEnd: 5,
    borderWidth: 1,
    borderColor: "#334155",
  },

  textStyle: {
    textAlign: "center",
    color: Colors.white,
    paddingHorizontal: 5,
    paddingVertical: 1,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  categoryStyle: {
    textAlign: "center",
    color: "#334155",
    paddingHorizontal: 5,
    paddingVertical: 1,
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default NewsCard;
