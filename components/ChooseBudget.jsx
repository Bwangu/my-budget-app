import {
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
  FlatList,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "../constants";
import { addBudgetItem, getBudgets } from "../api";
import userContext from "../context/user";
import { useRoute } from "@react-navigation/native";

export default function ChooseBudget({ visible, close, budget }) {
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);

  const route = useRoute();
  const { user } = useContext(userContext);

  const get = async () => {
    setLoading(true)
    // pass user id in
    const response = await getBudgets(user.id);
    const budgets = await response.json();
    setBudgets(budgets);
    setLoading(false);
  };

  const addToBudget = async (budget) => {
    setLoading(true);
    const response = await addBudgetItem(budget);
    setLoading(false);
    ToastAndroid.show(
      `added ${budget.food} to ${budget.title}`,
      ToastAndroid.SHORT
    );
    close();
  };

  useEffect(() => {
    get();
  }, [visible, route.params]);

  return (
    <Modal visible={visible} onRequestClose={close}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.close} onPress={close}>
          <MaterialIcons name="close" color={"#222"} size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>
          Choose the budget you would like to add this item to
        </Text>
        {loading && (
          <ActivityIndicator color={colors.purpleColor} size="large" />
        )}
        {!loading && budgets.length == 0 && (
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            You currently do not have any budgets create one by going to the My
            Budget section
          </Text>
        )}
        {!loading && (
          <FlatList
            data={budgets}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  addToBudget({ ...budget, budget: item.id, title: item.title })
                }
                style={styles.listItem}
              >
                <Text style={{ fontSize: 15 }}>{item.title}</Text>
                <Text style={{ color: "#555" }}>{item.amount}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    padding: 10,
    height: "70%",
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  close: {
    alignSelf: "center",
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
  },
});
