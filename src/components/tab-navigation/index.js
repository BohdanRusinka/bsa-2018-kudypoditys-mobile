import React, { Component } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { Dimensions, StyleSheet } from "react-native";
import { Constants } from "expo";

import BookingActive from "../booking-active";
import BookingPast from "../booking-past";

export default class TabNavigation extends Component {
  state = {
    index: 0,
    lastUpdate: 0,
    routes: [
      {
        key: "BookingActive",
        title: "Active",
        navigation: this.props.navigation,
        lastUpdate: 0,
      },
      {
        key: "BookingPast",
        title: "Past",
        navigation: this.props.navigation,
        lastUpdate: 0,
      },
    ],
  };

  sceneMap = SceneMap({
    BookingActive: BookingActive,
    BookingPast: BookingPast,
  });

  renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      tabStyle={styles.tab}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />
  );

  changeIndex = index => {
    console.log("INDEX CHANGE", index);
    this.setState({
      index,
      routes: this.state.routes.map(
        (route, i) =>
          i === index
            ? { ...route, lastUpdate: Date.parse(new Date()) }
            : route,
      ),
    });
  };

  render() {
    return (
      <TabView
        style={{ flex: 1 }}
        navigationState={this.state}
        renderScene={this.sceneMap}
        onIndexChange={this.changeIndex}
        renderTabBar={this.renderTabBar}
        initialLayout={{ width: Dimensions.get("window").width, height: 0 }}
      />
    );
  }
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#cecece",
    elevation: 0,
    height: 40,
  },
  tab: {
    backgroundColor: "#f1f1f1",
    height: 40,
  },
  indicator: {
    backgroundColor: "pink",
  },
  label: {
    color: "#465672",
  },
});
