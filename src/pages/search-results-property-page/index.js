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
  Picker,
} from "react-native";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import { Constants } from "expo";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import ImageSlider from "react-native-image-slider";
import HeaderButton from "../../components/header-button";
import Loader from "../../components/loader";
import DatePicker from "react-native-modal-datetime-picker";
import Storage from "../../helpers/asyncStorage";

export class SearchResultsPropertyPage extends Component {
  state = {
    checkInVisible: false,
    checkOutVisible: false,
    checkIn: Date.parse(new Date()),
    checkOut: Date.parse(new Date()) + 5 * 24 * 60 * 60 * 1000,

    adults: "Adults",
    children: "Children",
    room: "Room",
    paymentType: 1, // 1: cash 2: visa 3: webmoney
    currency: {}
  };

  async componentWillMount() {
    const currency = await Storage.getItem("currency");
    const loginStatus = await Storage.getItem("loginStatus")
    this.setState({
      currency: currency,
      loginStatus: loginStatus
    });
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    this.props.getProperty({ id });
  }

  submitBooking = () => {
    const bookingData = {
      dateIn: this.state.checkIn,
      dateOut: this.state.checkOut,
      guestsCount: Number(this.state.adults) + Number(this.state.children),
      paymentTypeId: this.state.paymentType,
      roomId: this.state.room,
    };

    console.log("BOOKING DATA ->", bookingData);
    this.props.bookProperty({ bookingData });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.bookResponse &&
      this.props.bookResponse.orderCode &&
      this.props.bookResponse.orderCode !==
        (prevProps.bookResponse && prevProps.bookResponse.orderCode)
    ) {
      Alert.alert(
        "Booking Success!",
        `Your orderCode is ${this.props.bookResponse.orderCode}`,
        [
          { text: "Ok" },
        ],
      );
    } else if (this.props.bookResponse) {
      Alert.alert("Booking info:", this.props.bookResponse, [{ text: "ok" }]);
    }
  }

  bookProperty = () => {
    if(this.state.loginStatus !== "success") {
      return Alert.alert("Oops!", "You have to login into your account to book properties.", [
        { text: "Ok" },
      ]);
    }
    if (this.state.adults === "Adults") {
      return Alert.alert("Oops!", "Please, select «Adults» value", [
        { text: "Ok" },
      ]);
    }
    if (this.state.children === "Children") {
      return Alert.alert("Oops!", "Please, select «Children» value", [
        { text: "Ok" },
      ]);
    }
    if (this.state.room === "Room") {
      return Alert.alert("Oops!", "Please, select «Room» value", [
        { text: "Ok" },
      ]);
    }

    Alert.alert(
      "Book with this property",
      `
          CheckIn: ${this.simplifyDate(this.state.checkIn)}
          CheckOut: ${this.simplifyDate(this.state.checkOut)}
          Adults: ${this.state.adults}
          Children: ${this.state.children}
        `,
      [{ text: "Ok", onPress: this.submitBooking }],
    );
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  pickCheckInDate = date => {
    const newDate = Date.parse(date);
    this.setState({
      checkIn: newDate,
      checkInVisible: false,
    });
  };

  pickCheckOutDate = date => {
    const newDate = Date.parse(date);
    this.setState({
      checkOut: newDate,
      checkOutVisible: false,
    });
  };

  showCheckInPicker = () => {
    this.setState({
      checkInVisible: true,
    });
  };

  showCheckOutPicker = () => {
    this.setState({
      checkOutVisible: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      checkInVisible: false,
      checkOutVisible: false,
    });
  };

  handlePickerChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  simplifyDate = date => {
    const newDate = new Date(date);
    const month =
      newDate.getMonth() + 1 < 10
        ? "0" + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1;
    const day =
      newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    return `${day}.${month}`;
  };

  render() {
    const checkIn = "Available";
    const checkOut = "now";
    const currency = this.state.currency;

    let propertyName;
    let address;
    let price;
    let description;
    let rooms;
    let images = [];
    let facilities = [];

    if (this.props.property) {
      propertyName = this.props.property.property.name;
      address = this.props.property.property.address;
      description = this.props.property.property.description;
      rooms = this.props.property.property.rooms;
      images = this.props.property.property.images.map(imgObj => imgObj.url);
      facilities = this.props.property.property.facilityLists.map(
        obj => obj.facility.name,
      );
    }

    return (
      <View style={styles.container}>
        <HeaderButton
          title={propertyName || "Loading..."}
          onButtonPress={this.goBack}
        />
        {!this.props.property ? (
          <View style={styles.loaderWrapper}>
            <Loader animating={true} />
          </View>
        ) : (
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
              <Text style={styles.datesText}>
                {checkIn} {checkOut}
              </Text>
            </View>

            <View style={styles.description}>
              <Text style={styles.heading}>Description:</Text>
              <Text style={styles.text}>{description}</Text>
            </View>

            <View style={styles.facilities}>
              <Text style={styles.heading}>Facilities:</Text>
              {facilities && facilities.length > 0
                ? facilities.map((item, i) => (
                    <Text key={i} style={styles.text}>
                      {item}
                    </Text>
                  ))
                : null}
            </View>

            <View style={styles.rooms}>
              <Text style={styles.heading}>Rooms:</Text>
              <View>
                {rooms &&
                  rooms.length > 0 &&
                  rooms.map((room, i) => (
                    <Text key={i} style={styles.text}>
                      {room.roomType.name} - {room.price * currency.multiplier}
                      {currency.sign}
                    </Text>
                  ))}
              </View>
            </View>

            <View style={styles.bookingBlockWrapper}>
              <View style={styles.checkButtonWrapper}>
                <Button
                  title={this.simplifyDate(this.state.checkIn)}
                  buttonStyle={styles.checkButton}
                  containerStyle={[
                    styles.checkButtonContainer,
                    { borderRightWidth: 0 },
                  ]}
                  titleStyle={styles.checkButtonTitle}
                  onPress={this.showCheckInPicker}
                />
                <Button
                  title={this.simplifyDate(this.state.checkOut)}
                  buttonStyle={styles.checkButton}
                  containerStyle={styles.checkButtonContainer}
                  titleStyle={styles.checkButtonTitle}
                  onPress={this.showCheckOutPicker}
                />
              </View>
              <View style={styles.pickerWrapper}>
                <View style={[styles.pickerView, styles.pickerView1]}>
                  <Picker
                    selectedValue={this.state.adults}
                    style={styles.picker}
                    onValueChange={value =>
                      this.handlePickerChange("adults", value)
                    }
                  >
                    <Picker.Item label="Adults" value="Adults" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                  </Picker>
                </View>
                <View style={[styles.pickerView, styles.pickerView2]}>
                  <Picker
                    selectedValue={this.state.children}
                    style={styles.picker}
                    onValueChange={value =>
                      this.handlePickerChange("children", value)
                    }
                  >
                    <Picker.Item label="Children" value="Children" />
                    <Picker.Item label="0" value="0" />
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                  </Picker>
                </View>
                <View style={[styles.pickerView, styles.pickerView3]}>
                  <Picker
                    selectedValue={this.state.room}
                    style={styles.picker}
                    onValueChange={value =>
                      this.handlePickerChange("room", value)
                    }
                  >
                    <Picker.Item label="Room" value="Room" />
                    {rooms && rooms.length > 0
                      ? rooms.map((room, i) => (
                          <Picker.Item
                            key={i}
                            label={room.roomType.name}
                            value={room.id}
                          />
                        ))
                      : null}
                  </Picker>
                </View>
              </View>
              <View style={[styles.pickerViewClear]}>
                <Picker
                  selectedValue={this.state.paymentType}
                  style={styles.pickerClear}
                  onValueChange={value =>
                    this.handlePickerChange("paymentType", value)
                  }
                >
                  <Picker.Item label="Cash" value="1" />
                  <Picker.Item label="Visa" value="2" />
                  <Picker.Item label="WebMoney" value="3" />
                </Picker>
              </View>
              <Button
                title="Book now"
                onPress={this.bookProperty}
                buttonStyle={styles.bookButton}
                containerStyle={styles.bookButtonContainer}
                titleStyle={styles.bookButtonTitle}
              />
            </View>

            <DatePicker
              isVisible={this.state.checkInVisible}
              onConfirm={this.pickCheckInDate}
              onCancel={this.hideDatePicker}
            />
            <DatePicker
              isVisible={this.state.checkOutVisible}
              onConfirm={this.pickCheckOutDate}
              onCancel={this.hideDatePicker}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsPropertyPage);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  loaderWrapper: {
    paddingTop: windowHeight / 2 - 100,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#6a6a6a",
    fontSize: 15,
    fontWeight: "400",
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
  bookingBlockWrapper: {
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: "#e5e7e9",
  },
  checkButtonWrapper: {
    flex: 1,
    width: windowWidth - 40,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  checkButtonContainer: {
    elevation: 0,
    borderWidth: 1,
    borderColor: "#DEDEDF",
    height: 44,
  },
  checkButton: {
    elevation: 0,
    width: windowWidth / 2 - 20,
    backgroundColor: "#fff",
    height: 42,
  },
  checkButtonTitle: {
    color: "#2e2e2e",
    fontWeight: "400",
  },
  pickerWrapper: {
    flex: 1,
    flexDirection: "row",
    width: windowWidth - 40,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  pickerView: {
    width: windowWidth / 3 - 12.5,
    backgroundColor: "#fff",
    borderColor: "#D8D8D9",
    borderWidth: 1,
    height: 44,
  },
  pickerView2: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  picker: {
    height: 42,
    // backgroundColor: "pink"
  },
  pickerViewClear: {
    width: windowWidth - 40,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  pickerClear: {
    color: "#337DFF",
    width: windowWidth - 40,
  },
  bookButtonContainer: {
    flex: 1,
    width: windowWidth,
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  bookButton: {
    height: 42,
    backgroundColor: "#337DFF",
    borderColor: "#2b6ad5",
    borderWidth: 1,
    elevation: 0,
  },
  bookButtonTitle: {
    color: "#fff",
    fontWeight: "600",
  },
});
