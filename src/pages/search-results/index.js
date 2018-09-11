import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import { View, ScrollView, Text, Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import Header from "../../components/header";
import Segment from "../../components/segment";
import HeaderButton from "../../components/header-button";
import Loader from "../../components/loader";

export class SearchResults extends Component {
  static defaultProps = {
    foundProperties: {
      properties: [],
      propetiesCount: -1,
    },
    page: 1,
    buttonLoading: false,
  };

  state = {
    properties: [],
    pages: 1,
  };

  goToHomePage = () => {
    this.props.navigation.navigate("Search");
  };

  onSegmentPressed = id => {
    this.props.navigation.navigate("Property", { id: id });
  };

  fetchMoreProperties = () => {
    let params = {
      query: this.props.query,
      adults: this.props.adults,
      children: this.props.children,
      rooms: this.props.rooms,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      page: this.props.page,
    };

    if (Number(params.page) < this.state.pages) {
      console.log("PARAMS PAGE IF ->>", params.page, this.state.pages);
      params.page = `${Number(params.page) + 1}`;
    }
    console.log("Params Page ->", params.page);
    // return;
    this.props.fetchProperties(params);
    this.setState({
      buttonLoading: true,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.lastUpdate !== prevProps.lastUpdate) {
      this.setState({
        properties: [
          ...this.state.properties,
          ...this.props.foundProperties.properties,
        ],
        pages: Math.ceil(
          Number(this.props.foundProperties.propertiesCount) / 5,
        ),
        buttonLoading: false,
      });
    }
  }

  render() {
    console.log("Properties count", this.props.foundProperties.propetiesCount);
    console.log(
      "Search results properties",
      this.props.foundProperties.properties,
    );
    const { properties } = this.state;
    const { propertiesCount } = this.props.foundProperties;

    return (
      <View style={styles.wrapper}>
        <HeaderButton title="Results" onButtonPress={this.goToHomePage} />
        {properties.length < 1 ? (
          <View style={styles.indicatorWrapper}>
            <Loader animating={true} />
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            <Text style={styles.foundText}>
              Found {propertiesCount} properties
            </Text>
            {properties.map((prop, i) => (
              <Segment
                key={i}
                id={prop.id}
                imageUri={
                  prop.images && prop.images[0].url && prop.images[0].url
                }
                name={prop.name}
                address={prop.address}
                checkIn="Available"
                checkOut="now"
                onSegmentPressed={this.onSegmentPressed}
              />
            ))}
            {this.props.page < this.state.pages ? (
              <Button
                onPress={this.fetchMoreProperties}
                title="Show more"
                buttonStyle={styles.moreButton}
                containerStyle={styles.moreButtonContainer}
                titleStyle={styles.moreButtonTitle}
                loading={this.state.buttonLoading}
              />
            ) : null}
          </ScrollView>
        )}
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  scrollView: {},
  foundText: {
    color: "#747474",
    paddingLeft: 13,
    paddingBottom: 2,
    paddingTop: 5,
  },
  indicatorWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink"
  },
  moreButtonContainer: {
    marginTop: 10,
    height: 50,
    width: windowWidth - 20,
    marginHorizontal: 10
  },
  moreButton: {
    flex: 1,
    backgroundColor: "#A8AFBD",
  },
  moreButtonTitle: {
    // color: "#9096a2"
  }
});
