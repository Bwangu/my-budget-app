import React, { useState, useContext } from "react";
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import { StatusBar } from "expo-status-bar";

import { colors } from "../constants";
import userContext from "../context/user";
import { login } from "../api";

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { setUser } = useContext(userContext);
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <StatusBar />
        <Text style={styles.title}>Log in to MyBudget App</Text>
        <Text style={styles.description}>
          login to all access all the features of the MyBudget app
        </Text>
        <Formik
          validate={({ emailphone, password }) => {
            const errors = {};
            if (!emailphone) errors.emailphone = "1";
            if (!password) errors.password = "1";

            return errors;
          }}
          onSubmit={async ({ emailphone, password }) => {
            setLoading(true);
            const response = await login({ emailphone, password });

            const user = await response.json();

            if (!response.ok) {
              setLoading(false);
              return setMessage(user && user.message);
            }
            await AsyncStorage.setItem("@Budget:user", JSON.stringify(user));
            setLoading(false);
            setUser(user);
          }}
          initialValues={{
            emailphone: "",
            password: "",
          }}
        >
          {({ errors, values, handleChange, handleSubmit }) => (
            <View>
              <View
                style={
                  errors.emailphone
                    ? [styles.input, { borderBottomColor: "red" }]
                    : styles.input
                }
              >
                <TextInput
                  placeholder="Email/Phone"
                  keyboardType="email-address"
                  value={values.emailphone}
                  style={{ padding: 5, backgroundColor: "#eee" }}
                  autoCorrect={false}
                  returnKeyType="next"
                  onChangeText={handleChange("emailphone")}
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
                  style={{ padding: 5, backgroundColor: "#eee" }}
                  onChangeText={handleChange("password")}
                />
              </View>
              <Text style={{ color: "red" }}>{message}</Text>
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  {loading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("CreateAccount")}
                activeOpacity={0.8}
              >
                <Text style={styles.createAccountText}>
                  Does not have account?{" "}
                  <Text style={{ color: colors.purpleColor }}>create one</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
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
    borderRadius: 3,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
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
  createAccountText: {
    marginTop: 10,
  },
});
