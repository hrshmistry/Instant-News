import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { useNews } from "../contexts/NewsContext";
import NewsCard from "./NewsCard";
import { ActivityIndicator } from "react-native-paper";

const NewsContent = ({ navigation }) => {
  const {
    state: { articles, isLoading },
  } = useNews();

  const goFullNews = (element) => {
    navigation.navigate("Edit Article", {
      item: element.item,
      readOnly: true,
      name: "Article",
    });
  };

  const renderNews = (element) => (
    <Pressable onPress={() => goFullNews(element)}>
      <NewsCard element={element} navigation={navigation} saveBtn={true} />
    </Pressable>
  );

  return (
    <>
      {isLoading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
          }}
        >
          <ActivityIndicator
            animating={true}
            color="#334155"
            size="large"
            style={{}}
          />
        </View>
      ) : (
        <FlatList
          data={articles}
          renderItem={renderNews}
          maxToRenderPerBatch="10"
        />
      )}
    </>
  );
};

export default NewsContent;
