import React from "react";
import { Button, Avatar } from "react-native-elements";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import {
  createDrawerNavigator,
  DrawerItems,
  NavigationActions,
} from "react-navigation";

import SearchPage from "../../pages/search-page";
import PropertyPage from "../../pages/property-page";
import BookingsPage from "../../pages/bookings";
import SettingsPage from "../../pages/settings";
import LoginPage from "../../pages/login-page";

import AuthHOC from "../auth-hoc";

// const CustomDrawerComponent = props => {
//   navigateToScreen = route => () => {
//     console.log("Pressed route: ", route);
//     const navigateAction = NavigationActions.navigate({
//       routeName: route,
//     });
//     props.navigation.dispatch(navigateAction);
//   };
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.userDetails}>
//         <Avatar
//           size="medium"
//           rounded
//           source={{
//             uri:
//               "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
//           }}
//           onPress={() => console.log("Avatar!")}
//           activeOpacity={0.7}
//         />
//         <View style={styles.userCreds}>
//           <Text style={styles.userName}>John Doevich</Text>
//           <Text style={styles.userStatus}>Logged In</Text>
//         </View>
//       </View>
//       <TouchableNativeFeedback onPress={navigateToScreen("Search")}>
//         <View style={styles.navItem}>
//           <Text style={styles.navItemText}>Search</Text>
//         </View>
//       </TouchableNativeFeedback>
//       <TouchableNativeFeedback onPress={navigateToScreen("Bookings")}>
//         <View style={styles.navItem}>
//           <Text style={styles.navItemText}>Bookings</Text>
//         </View>
//       </TouchableNativeFeedback>
//       <TouchableNativeFeedback onPress={navigateToScreen("Settings")}>
//         <View style={styles.navItem}>
//           <Text style={styles.navItemText}>Settings</Text>
//         </View>
//       </TouchableNativeFeedback>
//
//
//     </View>
//   );
// };

const Drawer = createDrawerNavigator(
  {
    Search: {
      screen: SearchPage,
    },
    Bookings: {
      screen: BookingsPage,
    },
    Property: {
      screen: PropertyPage,
    },
    Settings: {
      screen: SettingsPage,
    },
    Login: {
      screen: LoginPage
    }
  },
  {
    initialRouteName: "Search",
    contentComponent: AuthHOC,
    drawerOpenRoute: "DraweOpen",
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
  userCreds: {

  },
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
