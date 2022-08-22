import React from "react";
import NewsContent from "../components/NewsContent";
import MySafeAreaView from "../components/MySafeAreaView";
import NewsHeader from "../components/NewsHeader";

const Main = ({ navigation }) => {
  return (
    <>
      <NewsHeader navigation={navigation} />
      <NewsContent navigation={navigation} />
    </>
  );
};

const NewsScreen = ({ navigation }) => {
  return <MySafeAreaView Component={Main} navigation={navigation} />;
};

export default NewsScreen;
