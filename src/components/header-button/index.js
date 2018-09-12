import React, { Component } from "react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";

export default (props) => {
  return (
      <Button
          onPress={props.onButtonPress}
          icon={{
            name: "chevron-left",
            size: 26,
            color: "white"
          }}
          iconLeft
          buttonStyle={styles.backButton}
          containerStyle={styles.backButtonContainer}
          iconContainerStyle={styles.iconContainer}
          titleStyle={styles.title}
          borderRadius={0}
          title={props.title}
      />
  )
}

const styles = StyleSheet.create({
  backButton: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "#465672",
    height: 50,
    borderRadius: 0,
  },
  title: {
    fontSize: 18,
  },
  iconContainer: {
    marginLeft: 10
  },
  backButtonContainer: {
    height: 50
  }
});
