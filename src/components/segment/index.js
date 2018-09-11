import React, { Component } from "React";
import {
  Image,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";

export default props => {
  const { id, imageUri, name, address, checkIn, checkOut, price } = props;

  const onSegmentPressed = id => {
    props.onSegmentPressed(id);
  };
  return (
    <TouchableNativeFeedback onPress={() => onSegmentPressed(id)}>
      <View style={styles.segment}>
        <Image
          style={styles.image}
          source={{
            uri: imageUri,
          }}
        />
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{address}</Text>
          <View style={styles.downBlock}>
            <Text style={styles.dates}>
              {checkIn} - {checkOut}
            </Text>
            <Text style={styles.price}>{price}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  segment: {
    width: windowWidth - 20,
    height: 100,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  details: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 14,
  },
  name: {
    // backgroundColor: "steelblue",
    height: 30,
    paddingTop: 4,
    width: "auto",
    fontSize: 15,
    fontWeight: "600",
    color: "#465672"
  },
  address: {
    height: 20,
    width: "auto",
    color: "#9197a3",
  },
  dates: {
    height: 20,
    width: "auto",
    color: "#465672"
  },
  downBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  price: {
    // backgroundColor: "rgba(255, 100, 100, 0.3)",
    paddingRight: 10,
    color: "#00A882",
    fontWeight: "600",
  },
});
