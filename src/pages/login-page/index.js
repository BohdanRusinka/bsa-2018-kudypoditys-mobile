import React, { Component } from "React";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";
import Storage from "../../helpers/asyncStorage";

export class LoginPage extends Component {
  state = {
    email: "yevgenyprib@gmail.com", // natalya@gmail.com
    password: "asdASD123", // nata1NATA
    loginStatus: undefined,
  };

  handleLoginSubmit = () => {
    console.log("Login submit", this.state);
    this.props.submitLogin({
      email: this.state.email,
      password: this.state.password,
    });
  };

  componentWillMount() {
    if(this.props.loginStatus === "success") {
      this.props.navigation.navigate("Search");
    }
  }

  async componentDidUpdate() {
    console.log("LoginPage Did Update");
    if(this.props.loginStatus === "success") {
      await Storage.setItem("loginStatus", "success");
      this.props.navigation.navigate("Search");
    } else {
      // const message = this.props.loginStatus.replace("Error").replace("Error").replace(":").replace(":");
      const message = this.props.loginStatus;
      console.log(message);
      alert(message);
      await Storage.setItem("loginStatus", this.props.loginStatus);
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.logo}>Kudypoditys</Text>
        <Text style={styles.text}>Login</Text>
        <View style={styles.inputWrapper}>
          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.container}
            placeholder="E-mail"
            leftIcon={{
              type: "MaterialIcons",
              name: "person",
              color: "#EDEDED",
            }}
            value={this.state.email}
            onChangeText={value => this.handleChange("email", value)}
          />
          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.container}
            placeholder="Password"
            secureTextEntry={true}
            leftIcon={{
              type: "MaterialIcons",
              name: "vpn-key",
              color: "#EDEDED",
            }}
            value={this.state.password}
            onChangeText={value => this.handleChange("password", value)}
          />
        </View>
        <Button
          icon={{
            type: "FontAwesome",
            name: "check",
            size: 24,
            color: "#465672",
          }}
          onPress={this.handleLoginSubmit}
          buttonStyle={styles.loginButton}
          buttonContainerStyle={styles.loginButtonContainer}
          containerStyle={styles.loginButtonContainerAlt}
          titleStyle={styles.loginButtonTitle}
          title="Submit"
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#465672",
    paddingTop: windowHeight / 6,
  },
  logo: {
    fontSize: 28,
    color: "#DFE3EB",
    fontWeight: "600",
    marginBottom: 20,
  },
  text: {
    color: "#d6d9e1",
    fontSize: 20,
  },
  inputContainer: {
    width: windowWidth - 40,
    borderBottomColor: "#a4a8af",
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    color: "#f1f1f1",
    // backgroundColor: "rgba(8, 1, 1, 0.4)"
  },
  loginButton: {
    paddingVertical: 5,
    // paddingHorizontal: 15,
    backgroundColor: "#DFE3EB",
    borderRadius: 4,
  },
  loginButtonTitle: {
    color: "#465672",
    fontSize: 18,
    fontWeight: "600",
  },
  loginButtonContainerAlt: {
    width: windowWidth,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
