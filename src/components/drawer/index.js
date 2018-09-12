import React from "react";
import { Button, Avatar } from "react-native-elements";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import {
  createDrawerNavigator,
  DrawerItems,
  NavigationActions,
  createStackNavigator,
} from "react-navigation";

import SearchPage from "../../pages/search-page";
import SearchResults from "../../pages/search-results";
import PropertyPage from "../../pages/property-page";
import SearchResultsPropertyPage from "../../pages/search-results-property-page";
import BookingsPage from "../../pages/bookings";
import SettingsPage from "../../pages/settings";
import LoginPage from "../../pages/login-page";

import AuthHOC from "../auth-hoc";

const Bookings_ = createStackNavigator({
  Bookings: {
    screen: BookingsPage,
  },
  Property: {
    screen: PropertyPage,
  },
}, {
  headerMode: "none"
});

const SearchResults_ = createStackNavigator({
  SearchResults: {
    screen: SearchResults,
  },
  SearchResultsProperty: {
    screen: SearchResultsPropertyPage,
  },
}, {
  headerMode: "none"
});

const Drawer = createDrawerNavigator(
  {
    Search: {
      screen: SearchPage,
    },
    SearchResults: {
      screen: SearchResults_,
    },
    Bookings: {
      screen: Bookings_,
    },
    // Property: {
    //   screen: PropertyPage,
    // },
    Settings: {
      screen: SettingsPage,
    },
    Login: {
      screen: LoginPage,
    },
  },
  {
    initialRouteName: "Search",
    contentComponent: AuthHOC,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  },
);

export default Drawer;

const styles = StyleSheet.create({
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
    paddingLeft: 14,
    fontSize: 13,
    fontWeight: "400",
    color: "#767676",
  },
});
