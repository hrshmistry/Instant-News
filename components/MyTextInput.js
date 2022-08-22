import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const MyTextInput = (props) => {
  const { label, maximumLength, charCount } = props;

  return (
    <View>
      <View style={styles.labelAndIndicator}>
        <Text style={styles.labelStyle}>{label}</Text>
        <Text style={styles.countStyle}>
          {charCount}/{maximumLength}
        </Text>
      </View>
      <TextInput
        style={styles.inputStyle}
        maxLength={maximumLength}
        {...props}
      />
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  labelStyle: {
    fontWeight: "bold",
    color: "#475569",
    fontSize: 18,
  },

  countStyle: {
    fontWeight: "bold",
    color: "#475569",
    fontSize: 14,
  },

  inputStyle: {
    margin: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    borderColor: "#9ca3af",
    fontSize: 16,
  },

  labelAndIndicator: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    marginBottom: 0,
  },
});
