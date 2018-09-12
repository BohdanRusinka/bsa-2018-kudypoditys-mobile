import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "remote-redux-devtools";
import { Provider } from "react-redux";

// import { NavigationStack } from "./config/router";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";

import reducer from "./logic/reducer";
import rootSaga from "./logic/rootSaga";
import Drawer from "./components/drawer";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

sagaMiddleware.run(rootSaga);

import AuthHOC from "./components/auth-hoc";
// import LoginPage from "./pages/login-page/index";

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Drawer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#465571",
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});
