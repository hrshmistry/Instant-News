import Favourite from "./screens/Favourite";
import NewsScreen from "./screens/NewsScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import NewsProvider from "./contexts/NewsContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditArticle from "./screens/EditArticle";
import FullStoryScreen from "./screens/FullStoryScreen";
import { Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AllNews">
        <Stack.Screen
          name="AllNews"
          component={NewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Favourite" component={Favourite} />
        <Stack.Screen
          name="Edit Article"
          component={EditArticle}
          options={({ route, navigation }) => ({
            title: route.params.name,
            headerRight: () =>
              route.params.name === "Saved Article" ? (
                <Pressable
                  onPress={() => {
                    navigation.navigate("Edit Article", {
                      item: route.params.item,
                    });
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#334155" }}>
                    Edit
                  </Text>
                </Pressable>
              ) : route.params.name === "Article" ? (
                <Pressable
                  onPress={() => {
                    navigation.navigate("Edit Article", {
                      item: route.params.item,
                    });
                  }}
                >
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
              ) : null,
          })}
        />
        <Stack.Screen name="Discover News" component={DiscoverScreen} />
        <Stack.Screen
          name="Full Story"
          component={FullStoryScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <NewsProvider>
      <App />
    </NewsProvider>
  );
};
