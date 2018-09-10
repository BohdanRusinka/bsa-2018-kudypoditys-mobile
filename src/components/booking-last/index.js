import React, { Component } from "React";
import {
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableNativeFeedback,
  View,
} from "react-native";

import Property from "../segment";

export default class BookingLast extends Component {
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
      </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
});
