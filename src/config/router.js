import React from "react";
import { createStackNavigator } from "react-navigation";
import SearchPage from "../pages/search-page";
import HomePage from "../pages/home-page";
import PropertyPage from "../pages/property-page";
import Bookings from "../pages/bookings";
import Settings from "../components/settings";
import Drawer from "../components/drawer";

export const NavigationStack = createStackNavigator(
  {
    Search: {
      screen: SearchPage,
    },
    Home: {
      screen: HomePage,
    },
    Property: {
      screen: PropertyPage
    },
    Drawer: {
      screen: Drawer
    }
  },
  {
    headerMode: "none",
  },
);
