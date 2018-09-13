import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import { View, ScrollView, Text, StyleSheet, Dimensions, Picker } from "react-native";
import { Button } from "react-native-elements";
import Storage from "../../helpers/asyncStorage";

import Header from "../../components/header";

export class Settings extends Component {
  state = {
    selectedCurrency: "0",
  };

  currencies = [
    { id: 0, name: "Dollar", sign: "$", abbr: "USD", multiplier: 1 },
    { id: 1, name: "Euro", sign: "€", abbr: "EUR", multiplier: 0.86 },
    { id: 2, name: "Hryvnia", sign: "₴", abbr: "UAH", multiplier: 27.8 },
  ];

  async componentWillMount() {
    const currency = await Storage.getItem("currency");
    console.log("currency", currency);
    if(currency && currency.id) {
      this.setState({
        selectedCurrency: currency.id + ""
      });
    }
  }

  changeCurrency = async (value) => {
    this.setState({
      selectedCurrency: value
    });
    const currencyObj = this.currencies[Number(value)];
    await Storage.setItem("currency", currencyObj);
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Header navigation={this.props.navigation} title="Settings" />
        <ScrollView style={styles.container}>
          <View style={styles.currencyWrapper}>
            <Picker
                selectedValue={this.state.selectedCurrency}
                style={styles.picker}
                onValueChange={this.changeCurrency}
            >
              <Picker.Item label="USD" value="0"/>
              <Picker.Item label="EUR" value="1"/>
              <Picker.Item label="UAH" value="2"/>
            </Picker>
          </View>
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
