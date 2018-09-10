import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import TabNavigation from "../../components/tab-navigation";
import { Constants } from "expo";

export default class HomePage extends Component {
  render() {
    return (
        <TabNavigation navigation={this.props.navigation} />
    )
  }
}
