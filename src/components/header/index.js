import React, { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Header, Button } from "react-native-elements";
import Bookings from "../../pages/bookings";

const Button_ = ({ navigation }) => {
  return (
      <TouchableOpacity
        icon="menu"
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="menu" size={24} color="white"/>
      </TouchableOpacity>
  )
}

export default class HeaderComponent extends Component {
  render() {
    const { title, navigation } = this.props;
    return (
      <Header
        placement="left"
        leftComponent={<Button_ navigation={navigation}/>}
        centerComponent={{ text: title, style: styles.text }}
        outerContainerStyles={styles.outerContainerStyles}
        innerContainerStyles={styles.innerContainerStyles}
      />
    );
  }
}

const mainColor = "#465672";
const secondColor = "#DFE3EB";
const textColor = "#A8AFBD";
const linkColor = "#337DFF";
const redColor = "#DA3549";
const greenColor = "#00A882";


const styles = StyleSheet.create({
  outerContainerStyles: {
    backgroundColor: mainColor,
    margin: 0,
    marginBottom: -2
  },
  innerContainerStyles: {
    backgroundColor: mainColor
  },
  text: {
    color: "white",
    fontWeight: "600"
  }
})
