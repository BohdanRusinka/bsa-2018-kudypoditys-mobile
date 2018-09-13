import React, { Component } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import { Constants } from "expo";
import { NavigationActions } from "react-navigation";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Storage from "../../helpers/asyncStorage";
import UserDetails from "../user-details";

export class AuthHOC extends Component {
  navigateToScreen = route => () => {
    console.log("Pressed route: ", route);
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.getCurrentUser();
  };

  async componentDidMount() {
    console.log("AuthHOC Did Mount");
    this.props.getCurrentUser();
    const currency = await Storage.getItem("currency");
    if(!currency) {
      await Storage.setItem("currency", { id: 0, name: "Dollar", sign: "$", abbr: "USD", multipliter: 1});
    }
  }

  logout = () => {
    this.props.logout();
    console.log(this.props.navigation);
    this.props.navigation.navigate("Search");
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.user &&
        this.props.user.fullName &&
        this.props.user.email ? (
          <UserDetails
            name={this.props.user.fullName}
            avatarUri={this.props.user.avatar}
            status={this.props.user.email}
          />
        ) : (
          <View style={styles.signinWrapper}>
            <Button
              title="SignIn"
              buttonStyle={styles.signinButton}
              titleStyle={styles.signinButtonTitle}
              onPress={this.navigateToScreen("Login")}
            />
          </View>
        )}

        <TouchableNativeFeedback onPress={this.navigateToScreen("Search")}>
          <View style={styles.navItem}>
            <Text style={styles.navItemText}>Search</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={this.navigateToScreen("Bookings")}>
          <View style={styles.navItem}>
            <Text style={styles.navItemText}>Bookings</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={this.navigateToScreen("Settings")}>
          <View style={styles.navItem}>
            <Text style={styles.navItemText}>Settings</Text>
          </View>
        </TouchableNativeFeedback>

        {this.props.user &&
        this.props.user.fullName &&
        this.props.user.email ? (
          <TouchableNativeFeedback onPress={this.logout}>
            <View style={styles.logout}>
              <Text style={styles.logoutText}>Logout</Text>
              {/*<Icon name="sign-out" size={18} color="#465571" style={{ paddingTop: 2 }}/>*/}
            </View>
          </TouchableNativeFeedback>
        ) : null}
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthHOC);

const styles = StyleSheet.create({
  signinWrapper: {
    height: 70,
  },
  signinButton: {
    backgroundColor: "#fff",
    elevation: 0,
    height: 70,
  },
  signinButtonTitle: {
    color: "#a3a9b7",
    fontSize: 18,
    fontWeight: "400",
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: "#f5f5f5",
  },
  navItem: {
    backgroundColor: "white",
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  navItemText: {
    fontSize: 16,
    color: "#465571",
    fontWeight: "400",
    paddingVertical: 10,
    // backgroundColor: "pink",
    borderBottomWidth: 1,
    borderBottomColor: "#e8edf5"
  },
  userDetails: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ededed",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  userCreds: {},
  userName: {
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#465571",
  },
  userStatus: {
    paddingLeft: 0,
    fontSize: 13,
    fontWeight: "400",
    color: "#767676",
  },
  logout: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    color: "#465571",
    fontWeight: "400",
    paddingRight: 10,
    paddingTop: -1,
  },
});
