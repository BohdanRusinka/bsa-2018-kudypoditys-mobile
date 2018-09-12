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
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import Property from "../segment";
import Loader from "../../components/loader";

export class BookingActive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      lastUpdate: 0,
    };
  }

  onSegmentPressed = (id, booking) => {
    const bookingData = {
      checkIn: this.simplifyDate(booking.dateIn),
      checkOut: this.simplifyDate(booking.dateOut),
      propertyName: booking.room.property.name,
      address: booking.room.property.address,
      price: booking.room.price,
      description: booking.room.property.description,
      images: booking.room.property.images.map((imgObj) => imgObj.url),
      room: booking.room.roomType.name,
      confirmationCode: booking.orderCode,
      phone: booking.room.property.contactPhone
    };
    this.props.route.navigation.navigate("Property", { id, bookingData, getBookings: this.getBookings });
  };

  getBookings = () => {
    this.props.getBookings();
  };

  componentDidMount() {
    this.getBookings();
  }

  componentDidUpdate(prevProps) {
    if(this.props.route.lastUpdate !== prevProps.route.lastUpdate) {
      this.getBookings();
    }
  }

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

  // DELETE -> http://kudypoditys.ml/api/reservation/13

  render() {
    const properties = this.props.properties && this.props.properties.length > 0 ? this.props.properties.filter(prop => Date.parse(prop.dateOut) > Date.parse(new Date())) : ( this.props.properties && this.props.properties.length < 1 ? [] : undefined);

    return (
      <ScrollView style={styles.container}>
        {!properties ? (
          <View style={styles.loaderWrapper}>
            <Loader animating={true} />
          </View>
        ) : properties.length < 1 ? (
          <View style={styles.emptyTextWrapper}>
            <Text style={styles.emptyText}>Empty</Text>
          </View>
        ) : (
          properties.map((prop, i) => (
            <Property
              id={prop.id}
              key={i}
              imageUri={prop.room.property.images[0].url}
              name={prop.room.property.name}
              address={prop.room.property.address}
              checkIn={this.simplifyDate(prop.dateIn)}
              checkOut={this.simplifyDate(prop.dateOut)}
              price={prop.room.price}
              onSegmentPressed={(id) => this.onSegmentPressed(id, prop)}
            />
          ))
        )}
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingActive);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    backgroundColor: "#f1f1f1",
  },
  loaderWrapper: {
    paddingTop: windowHeight / 2 - 120,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink"
  },
  emptyTextWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#C0C4CA",
  },
});
