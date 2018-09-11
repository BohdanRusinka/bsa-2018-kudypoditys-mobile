import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default ({ color, size, animating }) => {
    return (
      <ActivityIndicator
        size={size || "large"}
        color={color || "#465571"}
        style={styles.indicator}
        animating={animating || true}
      />
    );
}

const styles = StyleSheet.create({
  indicator: {
    // backgroundColor: "lightblue"
  },
});
