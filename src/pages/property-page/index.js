import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Constants } from "expo";

import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImageSlider from "react-native-image-slider";

export default class PropertyPage extends Component {
  state = {
    checkIn: "22.12",
    checkOut: "23.12",
    facilities: ["Shower", "Wi-Fi", "TV"],
    propertyName: "Hostel France",
    address: "France, Paris, Giromo Street, 22"
  };

  goToHomePage = () => {
    this.props.navigation.navigate("Bookings");
  };

  cancelBooking = () => {
    Alert.alert(
      "Are you sure?",
      "Cancel this booking?",
      [
        {
          text: "Exit",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Submit", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false },
    );
  };

  images = [
    "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  ];

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam("id");
    return (
      <View style={styles.container}>
        {/*<Button onPress={this.goToHomePage} title={"< Back"} style={styles.backButton} />*/}
        <Icon.Button
          onPress={this.goToHomePage}
          name="chevron-left"
          size={24}
          iconStyle={{ marginLeft: 10 }}
          borderRadius={0}
          color="white"
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{this.state.propertyName}</Text>
        </Icon.Button>

        <ScrollView style={styles.body}>
          <ImageSlider
            loopBothSides
            images={this.images}
            customSlide={({ index, item, style, width }) => (
              <View key={index} style={[style, styles.customSlide]}>
                <Image source={{ uri: item }} style={styles.customImage} />
              </View>
            )}
          />

          <Button
            onPress={() => {}}
            icon={<Icon size={18} color="grey" name="location-on" />}
            iconLeft
            buttonStyle={styles.addressButton}
            containerStyle={styles.addressButtonContainer}
            titleStyle={styles.addressButtonTitle}
            title={this.state.address}
          />

          <View style={styles.dates}>
            <Text style={styles.datesText}>Check in: {this.state.checkIn}</Text>
            <Text style={styles.datesText}>
              Check out: {this.state.checkOut}
            </Text>
          </View>

          <View style={styles.description}>
            <Text style={styles.heading}>Description:</Text>
            <Text style={styles.text}>
              Beautiful hotel located somewhere in Paris, i don't know actually
              where exactly, but...
            </Text>
          </View>

          <View style={styles.facilities}>
            <Text style={styles.heading}>Facilities:</Text>
            <View>
              {this.state.facilities.map((item, i) => (
                <Text key={i} style={styles.text}>
                  {item}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.price}>
            <Text style={styles.heading}>Price:</Text>
            <Text style={styles.text}>200$</Text>
          </View>

          <View style={styles.rooms}>
            <Text style={styles.heading}>Rooms:</Text>
            <View>
              <Text style={styles.text}>Double Room</Text>
            </View>
          </View>

          <Button
            title="Cancel booking"
            onPress={this.cancelBooking}
            buttonStyle={styles.cancelBookingButton}
          />
        </ScrollView>
      </View>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1"
  },
  backButton: {
    backgroundColor: "#465672",
    paddingTop: 10,
    paddingBottom: 10,
  },
  clearButton: {
    backgroundColor: "transparent",
  },
  backButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  body: {
    flex: 1,
    flexDirection: "column",
  },
  customSlide: {
    display: "flex",
    alignContent: "center",
  },
  customImage: {
    height: windowHeight / 4,
    flex: 1,
  },
  // Body styles (except slider)
  heading: {
    fontWeight: "600",
  },
  text: {
    color: "#333",
  },
  dates: {
    padding: 20,
  },
  datesText: {
    color: "#333",
  },
  description: {
    padding: 20,
  },
  facilities: {
    padding: 20,
  },
  price: {
    padding: 20,
  },
  rooms: {
    padding: 20,
  },
  addressButtonContainer: {
    width: windowWidth,
    elevation: 0
  },
  addressButton: {
    backgroundColor: "#fafafa",
    elevation: 0
  },
  addressButtonTitle: {
    color: "#7d7d7d",
    fontSize: 15,
    fontWeight: "600"
  },
  cancelBookingButton: {
    width: windowWidth - 60,
    height: 40,
    padding: 10,
    backgroundColor: "#DA3549",
    margin: 30,
    borderWidth: 0,
  },
  cancelButtonText: {
    paddingTop: 14,
    paddingBottom: 14,
    color: "white",
  },
});
