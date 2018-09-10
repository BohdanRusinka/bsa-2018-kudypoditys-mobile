import React, { Component } from "React";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";

import Property from "../segment";

export default class BookingNow extends Component {
  onSegmentPressed = id => {
    this.props.route.navigation.navigate("Property", { id: id });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Property
          id={1}
          imageUri="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          name="Hostel France"
          address="22, Paris, Giromo Street"
          checkIn="22.12"
          checkOut="23.12"
          onSegmentPressed={this.onSegmentPressed}
        />

        <Property
            id={2}
            imageUri="https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            name="Resort SPA VIP"
            address="5, Nice, Les Baumettes"
            checkIn="24.12"
            checkOut="31.12"
            onSegmentPressed={this.onSegmentPressed}
        />
      </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#f1f1f1",
  },
});
