import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import { View, ScrollView, Text, Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Storage from "../../helpers/asyncStorage";

import Header from "../../components/header";
import Segment from "../../components/segment";
import HeaderButton from "../../components/header-button";
import Loader from "../../components/loader";

export class SearchResults extends Component {
  static defaultProps = {
    page: 1,
  };

  state = {
    properties: [],
    propertiesCount: 0,
    pages: 1,
    buttonLoading: false,
    currency: {}
  };

  goToHomePage = () => {
    this.props.navigation.navigate("Search");
  };

  onSegmentPressed = id => {
    this.props.navigation.navigate("SearchResultsProperty", { id: id });
  };

  async componentWillMount() {
    const currency = await Storage.getItem("currency");
    this.setState({
      currency: currency
    });
  }

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
      params.page = `${Number(params.page) + 1}`;
    }

    this.props.fetchProperties(params);
    this.setState({
      buttonLoading: true,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.lastUpdate !== prevProps.lastUpdate) {
      if (!this.props.foundProperties || typeof this.props.foundProperties !== "object") {
        this.setState({
          properties: undefined,
        });
      } else {
        console.log("THIS PROPS ->", this.props);
        this.setState({
          properties: [
            ...this.state.properties,
            ...this.props.foundProperties.properties,
          ],
          pages: Math.ceil(
            Number(this.props.foundProperties.propertiesCount) / 5,
          ),
          propertiesCount: this.props.foundProperties.propertiesCount,
          buttonLoading: false,
        });
      }
    }
  }

  render() {
    const { properties, propertiesCount, currency } = this.state;
    return (
      <View style={styles.wrapper}>
        <HeaderButton title="Results" onButtonPress={this.goToHomePage} />
        {properties && properties.length < 1 ? (
          <View style={styles.indicatorWrapper}>
            <Loader animating={true} />
          </View>
        ) : !properties ? (
          <View style={styles.notFoundWrapper}>
            <Text style={styles.notFoundText}>Not Found</Text>
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
                price={prop.rooms && prop.rooms[0] && prop.rooms[0].price * currency.multiplier || "--"}
                currency={currency}
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
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  scrollView: {},
  foundText: {
    color: "#747474",
    paddingLeft: 14,
    paddingBottom: 2,
    paddingTop: 8,
  },
  indicatorWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink"
  },
  moreButtonContainer: {
    marginTop: 10,
    height: 60,
    width: windowWidth,
    // marginHorizontal: 10,
  },
  moreButton: {
    flex: 1,
    backgroundColor: "#DFE3EB",
  },
  moreButtonTitle: {
    color: "#337DFF",
    fontWeight: "400"
  },
  notFoundWrapper: {
    // backgroundColor: "pink",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  notFoundText: {
    color: "#A8AFBD",
    fontSize: 16,
  }
});
