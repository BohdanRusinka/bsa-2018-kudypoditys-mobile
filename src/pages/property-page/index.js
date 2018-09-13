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
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import { Constants } from "expo";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImageSlider from "react-native-image-slider";
import HeaderButton from "../../components/header-button";

export class PropertyPage extends Component {
  state = {
    checkIn: "22.12",
    checkOut: "23.12",
    facilities: ["Shower", "Wi-Fi", "TV"],
    propertyName: "Hostel France",
    address: "France, Paris, Giromo Street, 22",
  };

  goBack = () => {
    this.props.navigation.state.params.getBookings();
    this.props.navigation.goBack();
  };

  cancelSubmit = (id) => {
    this.props.cancelBooking({ id: id });
    setTimeout(() => {
      this.goBack();
    }, 500);
  }

  cancelBooking = (id) => {
    Alert.alert(
      "Are you sure?",
      "Cancel this booking?",
      [
        {
          text: "Exit",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Submit", onPress: () => this.cancelSubmit(id) },
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
    const bookingData = navigation.getParam("bookingData");
    const {
      checkIn,
      checkOut,
      propertyName,
      address,
      price,
      description,
      images,
      room,
      confirmationCode,
      phone,
        currency
    } = bookingData;

    return (
      <View style={styles.container}>
        <HeaderButton title={propertyName} onButtonPress={this.goBack} />

        <ScrollView style={styles.body}>
          <ImageSlider
            loopBothSides
            images={images}
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
            title={address}
          />

          <View style={styles.dates}>
            <Text style={styles.datesText}>Check in: {checkIn}</Text>
            <Text style={styles.datesText}>Check out: {checkOut}</Text>
          </View>

          <View style={styles.description}>
            <Text style={styles.heading}>Description:</Text>
            <Text style={styles.text}>{description}</Text>
          </View>

          <View style={styles.description}>
            <Text style={styles.heading}>Confiramtion code:</Text>
            <Text style={styles.text}>{confirmationCode}</Text>
          </View>

          <View style={styles.description}>
            <Text style={styles.heading}>Contact phone:</Text>
            <Text style={styles.text}>{phone}</Text>
          </View>

          {/*<View style={styles.facilities}>*/}
          {/*<Text style={styles.heading}>Facilities:</Text>*/}
          {/*<View>*/}
          {/*{this.state.facilities.map((item, i) => (*/}
          {/*<Text key={i} style={styles.text}>*/}
          {/*{item}*/}
          {/*</Text>*/}
          {/*))}*/}
          {/*</View>*/}
          {/*</View>*/}

          <View style={styles.price}>
            <Text style={styles.heading}>Price:</Text>
            <Text style={styles.text}>{price}{currency.sign}</Text>
          </View>

          <View style={styles.rooms}>
            <Text style={styles.heading}>Room:</Text>
            <View>
              <Text style={styles.text}>{room}</Text>
            </View>
          </View>

          <Button
            title="Cancel booking"
            onPress={() => this.cancelBooking(id)}
            buttonStyle={styles.cancelBookingButton}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PropertyPage);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  datesText: {
    color: "#333",
  },
  description: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  facilities: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  price: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rooms: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addressButtonContainer: {
    width: windowWidth,
    elevation: 0,
  },
  addressButton: {
    backgroundColor: "#fafafa",
    elevation: 0,
  },
  addressButtonTitle: {
    color: "#7d7d7d",
    fontSize: 15,
    fontWeight: "600",
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
