import React from "react";
import {
  FlatList,
  View,
  Text,
  Platform,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNews } from "../contexts/NewsContext";
import NewsCard from "../components/NewsCard";
import { Button } from "react-native-paper";

const Favourite = ({ navigation }) => {
  const {
    state: { save },
  } = useNews();

  const goFullNews = (element) => {
    navigation.navigate("Edit Article", {
      item: element.item,
      readOnly: true,
      name: "Saved Article",
    });
  };

  const renderSaved = (element) => (
    <Pressable onPress={() => goFullNews(element)}>
      <NewsCard element={element} navigation={navigation} removeIcon={true} />
    </Pressable>
  );

  const goHome = () => {
    navigation.navigate("AllNews");
  };

  return (
    <>
      {save.length === 0 && (
        <View>
          <Text style={style.textStyle}>Favourite is empty!</Text>
          <Text style={style.subTextStyle}>
            Please add articles to see them here.
          </Text>
        </View>
      )}

      <View style={style.wrapper}>
        <FlatList
          data={save}
          renderItem={renderSaved}
          maxToRenderPerBatch="10"
          style={style.flatListStyle}
        />

        <View style={style.btnWrapper}>
          <Button
            style={style.btnStyle}
            mode="contained"
            onPress={goHome}
            color="#334155"
          >
            Home
          </Button>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  textStyle: {
    marginHorizontal: 5,
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  subTextStyle: {
    margin: 5,
    fontSize: 16,
    textAlign: "center",
  },

  wrapper: { display: "flex", flex: 1 },

  flatListStyle: { flex: Platform.OS === "android" ? 0.9 : 0.87 },

  btnWrapper: {
    flex: Platform.OS === "android" ? 0.15 : 0.15,
    display: "flex",
    borderTopWidth: 2,
    borderTopColor: "#334155",
  },

  btnStyle: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Favourite;
