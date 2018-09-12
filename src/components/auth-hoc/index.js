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

  componentDidMount() {
    console.log("AuthHOC Did Mount");
    this.props.getCurrentUser();
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
              <Icon name="sign-out" size={20} color="#757575" />
              <Text style={styles.logoutText}>Logout</Text>
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
    backgroundColor: "#f1f1f1",
    elevation: 0,
    height: 70,
  },
  signinButtonTitle: {
    color: "#9b9b9b",
    fontSize: 18,
  },
  navItem: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navItemText: {
    fontSize: 16,
    color: "#465571",
    fontWeight: "600",
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
    color: "#757575",
    fontWeight: "600",
    marginLeft: 5,
  },
});
