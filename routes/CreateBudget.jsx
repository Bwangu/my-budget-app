import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";

import userContext from "../context/user";

import { colors } from "../constants";
import { createBudget, getBudgets, deleteBudget } from "../api";

export default function CreateBudget() {
  const [prevBudgets, setPrevBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [budgetsLoading, setBudgetsLoading] = useState(true);

  const { user } = useContext(userContext);

  const navigation = useNavigation();

  const handleValidate = ({ title, amount, description }) => {
    const errors = {};
    if (!title) errors.title = "1";
    if (!amount) errors.amount = "1";
    if (!description) errors.description = "1";

    return errors;
  };

  const handleDelete = async (id) => {
    const response = await deleteBudget(id, user.id);
    ToastAndroid.show(await response.json(), ToastAndroid.SHORT);
    setPrevBudgets(prevBudgets.filter((budget) => budget.id != id));
  };

  const removeBudget = (id) => {
    Alert.alert("Are you sure", "you want to delete this budget", [
      { text: "Yes", onPress: () => handleDelete(id), style: "destructive" },
      { text: "No", style: "cancel" },
    ]);
  };

  const handleSubmit = async (values) => {
    setLoading(true)
    const response = await createBudget({ ...values, user: user.id });
    ToastAndroid.show("added item", ToastAndroid.SHORT);
    setLoading(false);
  };

  const get = async () => {
    // pass user id in
    const response = await getBudgets(user.id);
    const budgets = await response.json();
    setPrevBudgets(budgets);
    setBudgetsLoading(false);
  };

  useEffect(() => {
    get();
  }, [loading]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Create Budget</Text>
        <Formik
          validate={handleValidate}
          onSubmit={handleSubmit}
          initialValues={{ title: "", date: "", amount: "", description: "" }}
        >
          {({ errors, values, handleChange, handleSubmit }) => (
            <View>
              <View
                style={
                  errors.title
                    ? [styles.input, { borderBottomColor: "red" }]
                    : styles.input
                }
              >
                <TextInput
                  placeholder="Budget title"
                  value={values.title}
                  style={{ padding: 5 }}
                  onChangeText={handleChange("title")}
                />
              </View>
              <View
                style={
                  errors.amount
                    ? [styles.input, { borderBottomColor: "red" }]
                    : styles.input
                }
              >
                <TextInput
                  placeholder="Budget amount"
                  value={values.amount}
                  style={{ padding: 5 }}
                  keyboardType="number-pad"
                  onChangeText={handleChange("amount")}
                />
              </View>
              <View
                style={
                  errors.description
                    ? [styles.input, { borderBottomColor: "red" }]
                    : styles.input
                }
              >
                <TextInput
                  placeholder="Budget description"
                  value={values.description}
                  style={{ padding: 5 }}
                  onChangeText={handleChange("description")}
                />
              </View>
              <View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  {loading ? (
                    <ActivityIndicator color={"white"} size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Create Budget</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        <Text style={styles.secondTitle}>Previous Budgets</Text>
        {budgetsLoading && (
          <ActivityIndicator color={colors.purpleColor} size="large" />
        )}
        <View>
          {prevBudgets.map(({ id, amount, description, title }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Main", {
                  screen: "BudgetProducts",
                  params: { id, title },
                })
              }
              style={styles.prevBudget}
              activeOpacity={0.8}
              key={id}
            >
              <View style={styles.listLeft}>
                <Text style={{ fontSize: 15 }}>{title}</Text>
                <Text style={{ color: "#555" }}>{amount}</Text>
                <Text style={styles.budgetText}>{description}</Text>
              </View>
              <View style={styles.listRight}>
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => removeBudget(id)}
                >
                  {deleteLoading ? (
                    <ActivityIndicator size={"small"} color="white" />
                  ) : (
                    <MaterialIcons name="delete" size={27} color="#333" />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    color: colors.purpleColor,
    marginTop: 20,
  },
  input: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 3,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.blueColor,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  prevBudget: {
    padding: 10,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    borderBottomWidth: 2,
  },
  budgetTitle: {
    color: colors.blueColor,
    fontSize: 16,
    fontWeight: "700",
  },
  budgetText: {
    color: "#555",
    fontSize: 15,
  },
  secondTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "700",
    color: "#333",
    fontSize: 17,
  },
  listLeft: {
    flex: 1,
  },
  delete: {
    padding: 5,
  },
});
