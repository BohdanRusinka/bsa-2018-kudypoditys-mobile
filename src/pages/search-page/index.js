import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Picker,
    Alert
} from "react-native";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import DatePicker from "react-native-modal-datetime-picker";

import Header from "../../components/header";
import Input from "../../components/input";

export class SearchPage extends Component {
  state = {
    query: "",
    checkInVisible: false,
    checkOutVisible: false,
    checkIn: null,
    checkOut: null,
    selectedRooms: "Rooms",
    selectedAdults: "Adults",
    selectedChildren: "Children",
    page: 1
  };


  handleSearch = () => {
    if(this.state.query.length < 1) {
      return Alert.alert(
          "Oops!",
          "Looks like the search value is empty",
          [{ text: "Got it", onPress: () => {}}]
      )
    }

    let startDate, endDate;

    if(startDate != null) {
      startDate = this.state.checkIn.replace('"').replace('"');
    } else {
      startDate = Date.parse(new Date());
    }
    if(endDate != null) {
      endDate = this.state.checkOut.replace('"').replace('"');
    } else {
      endDate = startDate + 5 * 24 * 60 * 60 * 1000; // + 5 days
    }

    const query = this.state.query;
    const rooms = this.state.selectedRooms === "Rooms" ? 1 : this.state.selectedRooms;
    const adults = this.state.selectedAdults === "Adults" ? 1 : this.state.selectedAdults;
    const children = this.state.selectedChildren === "Children" ? 0 : this.state.selectedChildren;
    const page = this.state.page;

    //http://kudypoditys.ml/search-page?query=Lviv&rooms=1&adults=1&children=1&startDate=1536606838947&endDate=1537038838947&page=1
    const searchParams = {
      query,
      rooms,
      adults,
      children,
      startDate,
      endDate,
      page
    }

    console.log("SearchParams:", searchParams);

    this.props.searchSubmit(searchParams);
    this.props.navigation.navigate("SearchResults");
  }

  handleInputChange = (value) => {
    this.setState({
      query: value
    });
  }

  pickCheckInDate = date => {
    console.log(date);
    this.setState({
      checkIn: JSON.stringify(date),
      checkInVisible: false,
    });
  };

  pickCheckOutDate = date => {
    this.setState({
      checkOut: JSON.stringify(date),
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

  handleRoomsChange = value => {
    this.setState({
      selectedRooms: value,
    });
  };
  handleAdultsChange = value => {
    this.setState({
      selectedAdults: value,
    });
  };
  handleChildrenChange = value => {
    this.setState({
      selectedChildren: value,
    });
  };

  render() {
    console.log(this.state.checkIn);
    let checkIn, checkOut;

    if (this.state.checkIn !== null) {
      checkIn = new Date(
        Date.parse(this.state.checkIn.replace('"', "").replace('"', "")),
      );
    }

    if (this.state.checkOut !== null) {
      checkOut = new Date(
        Date.parse(this.state.checkOut.replace('"', "").replace('"', "")),
      );
    }
    return (
      <View style={styles.wrapper}>
        <Header navigation={this.props.navigation} title="KUDYPODITYS" />
        <Input placeholder="Search" handleChange={this.handleInputChange}/>
        <View style={styles.dateContainer}>
          <Button
            buttonStyle={[styles.datePickerButton, styles.datePicker1]}
            titleStyle={styles.datePickerButtonTitle}
            containerStyle={[styles.datePickerButtonContainer]}
            title={
              this.state.checkIn === null
                ? "CHECK-IN"
                : `${checkIn.getFullYear()}-${checkIn.getMonth() +
                    1}-${checkIn.getUTCDate()}`
            }
            onPress={this.showCheckInPicker}
          />
          <Button
            buttonStyle={[styles.datePickerButton, styles.datePicker2]}
            titleStyle={styles.datePickerButtonTitle}
            containerStyle={[styles.datePickerButtonContainer]}
            title={
              this.state.checkOut === null
                ? "CHECK-OUT"
                : `${checkOut.getFullYear()}-${checkOut.getMonth() +
                    1}-${checkOut.getUTCDate()}`
            }
            onPress={this.showCheckOutPicker}
          />
        </View>

        <View style={styles.pickerWrapper}>
          <View style={[styles.pickerView, styles.pickerView1]}>
            <Picker
              selectedValue={this.state.selectedRooms}
              style={styles.picker}
              onValueChange={this.handleRoomsChange}
            >
              <Picker.Item label="Rooms" value="Rooms" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
            </Picker>
          </View>

          <View style={[styles.pickerView, styles.pickerView2]}>
            <Picker
              selectedValue={this.state.selectedAdults}
              style={styles.picker}
              onValueChange={this.handleAdultsChange}
            >
              <Picker.Item label="Adults" value="Adults" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3+" value="3+" />
            </Picker>
          </View>

          <View style={[styles.pickerView, styles.pickerView3]}>
            <Picker
              selectedValue={this.state.selectedChildren}
              style={styles.picker}
              onValueChange={this.handleChildrenChange}
            >
              <Picker.Item label="Children" value="Children" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3+" value="3+" />
            </Picker>
          </View>
        </View>

        <View>
          <Button
            title="Search"
            onPress={this.handleSearch}
            buttonStyle={styles.searchButton}
            containerStyle={styles.searchButtonContainer}
            titleStyle={styles.searchButtonTitle}
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
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f1f1f1"
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    paddingBottom: 5
  },
  datePicker1: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0
  },
  datePicker2: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  },
  datePickerButton: {
    marginBottom: 20,
    height: 46,
    // width: windowWidth / 2 - 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#c3c3c3",
    borderRadius: 4,
    shadowOpacity: 0,
    elevation: 0
  },
  datePickerButtonTitle: {
    color: "#333",
    fontWeight: "400",
    fontSize: 14,
  },
  datePickerButtonContainer: {
    height: 50,
    width: windowWidth / 2 - 12,
  },
  pickerWrapper: {
    display: "flex",
    flexDirection: "row",
    // paddingLeft: 10,
    // backgroundColor: "pink",
    padding: 10
  },
  pickerView: {
    width: windowWidth / 3 - 8,
    height: 50,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#c3c3c3",
    borderRadius: 4,
  },
  pickerView1: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0
  },
  pickerView2: {
    borderRadius: 0
  },
  pickerView3: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0
  },
  picker: {
    height: 46,
    color: "#333"
  },
  searchButtonContainer: {
    width: windowWidth - 14,
    height: 46,
    paddingLeft: 10
  },
  searchButton: {
    backgroundColor: "#465672",
    height: 46,
    borderRadius: 4,
    marginTop: 10
  },
  searchButtonTitle: {

  }
});
