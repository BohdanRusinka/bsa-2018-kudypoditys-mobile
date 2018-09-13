import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

export default ({ name, avatarUri, handlePress, size, status }) => {
  return (
    <View style={styles.userDetails}>
      <Avatar
        size={size || "medium"}
        rounded
        source={{
          uri: `${avatarUri}`
        }}
        onPress={handlePress}
        activeOpacity={0.7}
      />
      <View style={styles.userCreds}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userStatus}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userDetails: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#465571",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  userCreds: {},
  userName: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#DFE3EB",
  },
  userStatus: {
    paddingLeft: 10,
    fontSize: 13,
    fontWeight: "400",
    color: "#d7dbe3",
  },
});
