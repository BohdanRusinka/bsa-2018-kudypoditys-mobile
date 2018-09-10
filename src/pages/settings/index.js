import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import { View, ScrollView, Text, StyleSheet, Dimensions, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";

import Header from "../../components/header";

export class Settings extends Component {

  render() {
    return (
      <View style={styles.wrapper}>
        <Header navigation={this.props.navigation} title="Settings" />
        <ScrollView style={styles.container}>
          <Text style={styles.text}>Settings...</Text>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  container: {
  },
  text: {
    fontSize: 18,
    color: "#465571",
  },
});
