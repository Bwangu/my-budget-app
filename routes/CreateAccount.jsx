import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import { colors } from "../constants";
import { signup } from "../api";
import { StatusBar } from "expo-status-bar";

export default function CreateAccount({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleValidate = ({ name, email, phone, password, confirm }) => {
    const errors = {};

    if (!name) errors.name = "1";
    if (!email) errors.email = "1";
    if (!phone) errors.phone = "1";
    if (confirm != password) {
      errors.confirm = "1";
      errors.password = "1";
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setMessage("");
    const response = await signup({ ...values });
    const data = await response.json();

    if (data.message && data.message == "User created successfully") {
      navigation.navigate("Login");
    }
    setMessage(data.message);
    ToastAndroid.show(data.message, ToastAndroid.SHORT);
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.description}>
          fill in all the fields to create an account
        </Text>
        <Formik
          validate={handleValidate}
          onSubmit={handleSubmit}
          initialValues={{
            name: "",
            email: "",
            phone: "",
            confirm: "",
            password: "",
          }}
        >
          {({ errors, values, handleChange, handleSubmit }) => (
            <View>
              <View
                style={
                  errors.name
                    ? [styles.input, { borderBottomColor: "red" }]
                    : styles.input
                }
              >
                <TextInput
                  placeholder="Full names"
                  keyboardType="email-address"
                  value={values.name}
                  style={{ padding: 5, backgroundColor: "#eee" }}
                  autoCorrect={false}
                  returnKeyType="next"
                  onChangeText={handleChange("name")}
                />
              </View>
              <View
                style={
                  errors.email
                    ? [styles.input, { borderBottomColor: "red" }]
                    : styles.input
                }
              >
                <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  value={values.email}
                  style={{ padding: 5, backgroundColor: "#eee" }}
                  autoCorrect={false}
                  returnKeyType="next"
                  onChangeText={handleChange("email")}
                />
              </View>
              <View
                style={
                  errors.phone
                    ? [styles.input, { borderBottomColor: "red" }]
                    : styles.input
                }
              >
                <TextInput
                  placeholder="Phone"
                  keyboardType="numeric"
                  value={values.phone}
                  style={{ padding: 5, backgroundColor: "#eee" }}
                  autoCorrect={false}
                  returnKeyType="next"
                  onChangeText={handleChange("phone")}
                />
              </View>
              <View
                style={
                  errors.password
                    ? [styles.input, { borderBottomColor: "red" }]
                    : styles.input
                }
              >
                <TextInput
                  placeholder="Password"
                  value={values.password}
                  autoCorrect={false}
                  secureTextEntry={true}
                  keyboardType={"visible-password"}
                  style={{ padding: 5, backgroundColor: "#eee" }}
                  onChangeText={handleChange("password")}
                />
              </View>
              <View
                style={
                  errors.confirm
                    ? [styles.input, { borderBottomColor: "red" }]
                    : styles.input
                }
              >
                <TextInput
                  placeholder="Confirm Password"
                  value={values.confirm}
                  autoCorrect={false}
                  secureTextEntry={true}
                  keyboardType={"visible-password"}
                  style={{ padding: 5, backgroundColor: "#eee" }}
                  onChangeText={handleChange("confirm")}
                />
              </View>
              {message != "" && (
                <Text style={{ color: colors.purpleColor }}>{message}</Text>
              )}
              <View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Create Account</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.8}
              >
                <Text style={styles.loginText}>
                  Already have an have account?
                  <Text style={{ color: colors.purpleColor }}> Log in</Text>
                </Text>
              </TouchableOpacity>
              <View>
                <Text style={styles.createAccountText}>
                  By click on "Create Account" you agree to MyBudget App terms
                  and conditions
                </Text>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  input: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 3,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.purpleColor,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    color: colors.purpleColor,
    marginTop: 20,
  },
  description: {
    color: "#999",
    marginTop: 5,
    marginBottom: 20,
  },
  loginText: {
    textAlign: "center",
    color: "#333",
    fontSize: 12,
    marginTop: 10,
  },
  createAccountText: {
    textAlign: "center",
    marginTop: 10,
    color: "#444",
    fontSize: 12,
  },
});
