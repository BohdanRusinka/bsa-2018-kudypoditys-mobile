import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

export default props => {
  const { placeholder } = props;
  const handleChange = (value) => {
    props.handleChange(value);
  }

  return (
    <Input
      placeholder={placeholder}
      containerStyle={styles.container}
      inputStyle={styles.input}
      inputContainerStyle={styles.inputContainer}
      onChangeText={handleChange}
      rightIcon={
        <Icon name="search" size={20} style={styles.icon} color="grey" />
      }
    />
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 23,
    margin: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#c3c3c3",
    borderRadius: 4,
    padding: 5,
    borderBottomColor: "#c3c3c3",
  },
  input: {
    borderWidth: 0,
  },
  inputContainer: {
    borderBottomColor: "rgba(255, 255, 255, 0)",
  },
  icon: {
    marginRight: 10,
  },
});
