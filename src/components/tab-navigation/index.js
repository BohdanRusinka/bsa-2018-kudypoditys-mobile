import React, { Component } from "react";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { Dimensions, StyleSheet } from "react-native";
import { Constants } from "expo";

import BookingNow from "../booking-now";
import BookingLast from "../booking-last";

export default class TabNavigation extends Component {
  state = {
    index: 0,
    routes: [
      { key: "BookingNow", title: "Now", navigation: this.props.navigation },
      { key: "BookingLast", title: "Last", navigation: this.props.navigation },
    ],
  };

  sceneMap = SceneMap({
    BookingNow: BookingNow,
    BookingLast: BookingLast,
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

  render() {
    return (
      <TabView
        style={{ flex: 1 }}
        navigationState={this.state}
        renderScene={this.sceneMap}
        onIndexChange={index => this.setState({ index })}
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
