import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useNews } from "../contexts/NewsContext";
import moment from "moment";
import "moment-timezone";
import MyTextInput from "../components/MyTextInput";
import { Octicons } from "@expo/vector-icons";
import onShare from "../helpers/onShare";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from "react-native-paper";

const EditArticle = ({ route, navigation }) => {
  const { item, readOnly } = route.params;

  const momentRef = moment(item?.publishedAt);
  const publishedTime = momentRef
    .tz("Asia/Kolkata")
    .format("MMMM Do YYYY, h:mm:ss z");

  // Editable inputs
  const [title, setTitle] = useState(item.title.slice(0, 50));
  const [note, setNote] = useState(item?.note ?? "");
  const [category, setCategory] = useState(item?.category ?? null);
  const [checked, setChecked] = useState(item?.isSharable ?? false);

  // Length of inputs
  const [titleLength, settitleLength] = useState(title.length);
  const [noteLength, setNoteLength] = useState(note.length);

  // Error validation
  const [error, setError] = useState("");

  const { dispatch } = useNews();

  // News Enum
  const NEWS_CATEGORY = Object.freeze({
    BUSINESS: "Business",
    ENTERTAINMENT: "Entertainment",
    GENERAL: "General",
    HEALTH: "Health",
    SCIENCE: "Science",
    SPORTS: "Sports",
    TECHNOLOGY: "Technology",
  });

  // Error updater
  const updateError = (error) => {
    setError(error);

    setTimeout(() => {
      setError("");
    }, 3000);
  };

  // Form Validator
  const isValidForm = () => {
    if (!title.trim() && !note.trim())
      return updateError("Required all fields to save article.");

    if (!title.trim() || title.length < 10)
      return updateError("Title must be minimum 10 character long.");

    if (!note.trim() || note.length < 10)
      return updateError("Note must be minimum 10 character long.");

    if (!category) {
      return updateError("Please Select Category!");
    }

    return true;
  };

  const addToSave = () => {
    if (isValidForm()) {
      dispatch({
        type: "ADD_TO_SAVE",
        payload: {
          ...item,
          title,
          note,
          category,
          saved: true,
          isSharable: checked,
        },
      });
      navigation.navigate("Favourite");
    }
  };

  const onChangeTitleInput = (text) => {
    setTitle(text);
    settitleLength(text.length);
  };

  const onChangeNoteInput = (text) => {
    setNote(text);
    setNoteLength(text.length);
  };

  return (
    <View style={style.wrapper}>
      <ScrollView style={style.scrollViewStyle}>
        {readOnly ? (
          <Image
            source={{
              uri: item?.urlToImage,
            }}
            style={style.readOnlyImageStyle}
          />
        ) : (
          <Image
            source={{
              uri: item?.urlToImage,
            }}
            style={style.imageStyle}
          />
        )}

        {readOnly ? (
          <View style={{ marginTop: 10 }}>
            <Text style={style.readOnlyTitle}>{item.title}</Text>
          </View>
        ) : (
          <MyTextInput
            label="Title*"
            maximumLength={100}
            value={title}
            charCount={titleLength}
            onChangeText={onChangeTitleInput}
            placeholder="Type meaningfull title..."
          />
        )}

        {readOnly ? (
          <View style={style.authorWrapper}>
            <View style={style.textWrapper}>
              <Text style={style.textStyle}>
                {item?.source?.name ?? "Unkown"}
              </Text>
            </View>
            {item?.category && (
              <View style={style.categoryViewStyle}>
                <Text style={style.categoryStyle}>{item?.category}</Text>
              </View>
            )}
          </View>
        ) : (
          <>
            <Text style={style.headerStyle}>Author</Text>
            <View style={style.authorWrapper}>
              <View style={style.textWrapper}>
                <Text style={style.textStyle}>
                  {item?.source?.name ?? "Unkown"}
                </Text>
              </View>
              {item?.category && (
                <View style={style.categoryViewStyle}>
                  <Text style={style.categoryStyle}>{item?.category}</Text>
                </View>
              )}
            </View>
          </>
        )}

        {readOnly ? (
          <View style={{ marginVertical: 10 }}>
            <Text style={style.readOnlyDescStyle}>{item.description}</Text>
          </View>
        ) : (
          <View style={{ marginVertical: 10 }}>
            <Text style={style.headerStyle}>Description</Text>
            <Text style={style.descStyle}>{item.description}</Text>
          </View>
        )}

        {readOnly ? (
          <View style={{ marginVertical: 10 }}>
            <Text style={style.headerStyle}>Published on</Text>
            <Text style={style.timeStyle}>{publishedTime}</Text>
          </View>
        ) : (
          <View style={{ marginVertical: 10 }}>
            <Text style={style.headerStyle}>Published on</Text>
            <Text style={style.descStyle}>{publishedTime}</Text>
          </View>
        )}

        {readOnly ? (
          item.note && (
            <View style={{ marginVertical: 10 }}>
              <Text style={style.headerStyle}>Note</Text>
              <Text style={style.descStyle}>{item.note}</Text>
            </View>
          )
        ) : (
          <MyTextInput
            label="Add Note*"
            maximumLength={200}
            value={note}
            charCount={noteLength}
            onChangeText={onChangeNoteInput}
            placeholder="Type something..."
          />
        )}

        {readOnly ? null : (
          <View style={style.checkboxContainer}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color="#334155"
            />
            <Text style={style.headerStyle}>Sharable</Text>
          </View>
        )}

        {!readOnly && (
          <>
            <Text style={{ margin: 10, ...style.headerStyle }}>
              Choose Category*
            </Text>
            <Picker
              style={{ marginHorizontal: 5 }}
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
              {Object.keys(NEWS_CATEGORY).map((key, i) => (
                <Picker.Item key={i} label={key} value={NEWS_CATEGORY[key]} />
              ))}
            </Picker>
          </>
        )}

        <Text style={style.errorStyle}>{error}</Text>
      </ScrollView>

      {!readOnly ? (
        <View style={style.btnWrapper}>
          <Button
            style={style.btnStyle}
            mode="contained"
            onPress={addToSave}
            color="#334155"
          >
            {item.saved ? "Update" : "Save"}
          </Button>
        </View>
      ) : (
        <View style={style.bgWrapper}>
          <ImageBackground
            blurRadius={20}
            style={style.imageBackground}
            source={{
              uri: item?.urlToImage,
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("Full Story", { url: item?.url });
              }}
            >
              <View style={style.bgStyle}>
                <Text style={{ fontSize: 16, color: "#fff" }}>
                  {item?.description.slice(0, 40)}...
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#fff",
                    fontWeight: "bold",
                    paddingTop: 2,
                  }}
                >
                  Read More
                </Text>
              </View>
            </Pressable>
          </ImageBackground>
        </View>
      )}

      {item?.isSharable && (
        <View style={style.onShare}>
          <Pressable onPress={() => onShare(item?.title, item?.url)}>
            <Octicons
              name="share-android"
              size={18}
              color="#fff"
              style={{
                fontWeight: "bold",
                fontSize: 24,
              }}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  imageBackground: {
    height: 100,
  },

  imageStyle: {
    height: 180,
    borderRadius: 10,
    margin: 10,
  },

  readOnlyImageStyle: {
    height: 280,
    borderRadius: 10,
    margin: 10,
  },

  headerStyle: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "#475569",
    fontSize: 18,
  },

  authorWrapper: {
    alignItems: "baseline",
    display: "flex",
    flexDirection: "row",
    margin: 10,
    marginTop: 0,
  },

  textWrapper: {
    borderRadius: 5,
    padding: 2,
    marginTop: 5,
    marginEnd: 5,
    backgroundColor: "#334155",
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

  categoryStyle: {
    textAlign: "center",
    color: "#334155",
    paddingHorizontal: 5,
    paddingVertical: 1,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },

  textStyle: {
    textAlign: "center",
    color: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 1,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 16,
  },

  descStyle: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#9ca3af",
    fontSize: 16,
  },

  readOnlyDescStyle: {
    margin: 10,
    marginTop: 0,
    fontSize: 16,
  },

  wrapper: { display: "flex", flex: 1 },

  scrollViewStyle: { flex: Platform.OS === "android" ? 0.9 : 0.87 },

  bgWrapper: {
    flex: Platform.OS === "android" ? 0.1 : 0.13,
    display: "flex",
  },

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

  readOnlyTitle: {
    fontSize: 24,
    margin: 10,
    marginTop: 0,
    fontWeight: "bold",
    color: "#334155",
  },

  bgStyle: {
    padding: 15,
  },

  timeStyle: {
    margin: 10,
  },

  errorStyle: { margin: 10, marginBottom: 20, color: "red", fontSize: 18 },

  dropdownStyle: {
    margin: 10,
    marginTop: 0,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#9ca3af",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  onShare: {
    position: "absolute",
    right: 15,
    bottom: 90,
    height: 45,
    width: 45,
    marginVertical: 10,
    backgroundColor: "#334155",
    borderRadius: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  checkboxContainer: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
  },

  checkbox: {
    alignSelf: "center",
  },
});

export default EditArticle;
