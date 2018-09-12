import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./container";
import { Text, View, Dimensions, StyleSheet, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import {
  required,
  minLength2,
  email,
  phoneNumber,
  password,
} from "../../regexValidationService";

export class Registration extends Component {
  state = {
    fullName: "test",
    email: "test@testmail.com",
    phone: "12345678956",
    password: "qweRTY123",
    fullNameError: undefined,
    emailError: undefined,
    phoneError: undefined,
    passwordError: undefined,
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  goLogin = () => {
    this.props.navigation.navigate("Login");
  };

  goHome = () => {
    this.props.navigation.navigate("Search");
  };

  componentDidUpdate(prevProps) {
    if (this.props.registration.lastUpdate !== prevProps.registration.lastUpdate) {
      if (
        this.props.registration &&
        this.props.registration.registrationStatus &&
        !this.props.registration.registrationStatus.error
      ) {
        Alert.alert(
          "Congratulations!",
          "You've successfully registered. \nTo enter your account, you have to verify your email.",
          [{ text: "Got it!" }],
        );
      } else if (
        this.props.registration &&
        this.props.registration.registrationStatus &&
        this.props.registration.registrationStatus.error
      ) {
        Alert.alert(
          "Something went wrong!",
          `${this.props.registration.registrationStatus.message}`,
          [{ text: "Okay" }],
        );
      }
    }
  }

  handleRegistrationSubmit = () => {
    let fullNameError = required(this.state.fullName);
    let emailError = required(this.state.email);
    let phoneError = required(this.state.phone);
    let passwordError = required(this.state.password);

    fullNameError = fullNameError
      ? fullNameError
      : minLength2(this.state.fullName);
    emailError = emailError ? emailError : email(this.state.email);
    phoneError = phoneError ? phoneError : phoneNumber(this.state.phone);
    passwordError = passwordError
      ? passwordError
      : password(this.state.password);

    this.setState({
      fullNameError,
      emailError,
      phoneError,
      passwordError,
    });

    if (fullNameError || emailError || phoneError || passwordError) {
      return;
    }

    const userData = {
      fullName: this.state.fullName,
      email: this.state.email,
      phoneNumber: this.state.phone,
      password: this.state.password,
      appeal: "Mr.",
      countryId: 1,
      paymentTypeId: 1,
      preferredCurrency: "USD",
    };

    console.log("REGISTRATION -> SUBMIT!");
    this.props.registrationSubmit({ userData });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.logo}>Kudypoditys</Text>
        <Text style={styles.text}>Registration</Text>
        <View style={styles.inputWrapper}>
          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.container}
            errorStyle={styles.errorStyle}
            errorMessage={this.state.fullNameError}
            placeholder="Full name"
            leftIcon={{
              type: "MaterialIcons",
              name: "person",
              color: "#EDEDED",
            }}
            value={this.state.fullName}
            onChangeText={value => this.handleChange("fullName", value)}
          />
          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.container}
            errorStyle={styles.errorStyle}
            errorMessage={this.state.emailError}
            placeholder="E-mail"
            leftIcon={{
              type: "MaterialIcons",
              name: "email",
              color: "#EDEDED",
            }}
            value={this.state.email}
            onChangeText={value => this.handleChange("email", value)}
          />
          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.container}
            errorStyle={styles.errorStyle}
            errorMessage={this.state.phoneError}
            placeholder="Phone (ex.: YYYXXXYYYXXX)"
            leftIcon={{
              type: "MaterialIcons",
              name: "phone",
              color: "#EDEDED",
            }}
            value={this.state.phone}
            onChangeText={value => this.handleChange("phone", value)}
          />
          <Input
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.container}
            errorStyle={styles.errorStyle}
            errorMessage={this.state.passwordError}
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
          onPress={this.handleRegistrationSubmit}
          buttonStyle={styles.loginButton}
          buttonContainerStyle={styles.loginButtonContainer}
          containerStyle={styles.loginButtonContainerAlt}
          titleStyle={styles.loginButtonTitle}
          title="Submit"
        />
        <View style={styles.buttonNavigateWrapper}>
          <Button
              title="Login"
              icon={{
                type: "MaterialIcons",
                name: "arrow-back",
                size: 18,
                color: "#afb2b9",
              }}
              onPress={this.goLogin}
              iconLeft
              buttonStyle={styles.homeButton}
              containerStyle={styles.homeButtonContainer}
              titleStyle={styles.homeButtonTitle}
              iconContainerStyle={styles.homeButtonIconContainerLeft}
          />
          <Button
              title="Home"
              icon={{
                type: "MaterialIcons",
                name: "arrow-forward",
                size: 18,
                color: "#afb2b9",
              }}
              onPress={this.goHome}
              iconRight
              buttonStyle={styles.homeButton}
              containerStyle={styles.homeButtonContainer}
              titleStyle={styles.homeButtonTitle}
              iconContainerStyle={styles.homeButtonIconContainerRight}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#465672",
    paddingTop: 40,
  },
  errorStyle: {
    color: "#ff6b50",
    fontSize: 15,
    marginBottom: -15,
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
  buttonNavigateWrapper: {
    display: "flex",
    flexDirection: "row",
    width: windowWidth - 40,
    paddingTop: 10,
  },
  homeButtonContainer: {
    flex: 1,
  },
  homeButton: {
    elevation: 0,
    backgroundColor: "transparent",
  },
  homeButtonTitle: {
    color: "#afb2b9",
    fontWeight: "400",
  },
  homeButtonIconContainerLeft: {
    marginRight: -5,
    paddingTop: 3,
  },
  homeButtonIconContainerRight: {
    marginLeft: -5,
    paddingTop: 3,
  },
});
