import React, { Component } from "react";
import {
  View,
  TouchableNativeFeedback,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import Header from "../../components/header/index";
import TabNavigation from "../../components/tab-navigation/index";

export default class Bookings extends Component {

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Bookings" />
        <TabNavigation navigation={navigation}/>
      </View>
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
