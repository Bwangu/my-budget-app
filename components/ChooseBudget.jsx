import {
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors } from "../constants";
import { addBudgetItem, getBudgets } from "../api";

import { MaterialIcons } from "@expo/vector-icons";
import userContext from "../context/user";

export default function ChooseBudget({ visible, close, budget }) {
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);

  const { user } = useContext(userContext);

  const get = async () => {
    // pass user id in
    const response = await getBudgets(user.id);
    const budgets = await response.json();
    setLoading(false);
    setBudgets(budgets);
  };

  const addToBudget = async (budget) => {
    setLoading(true);
    const response = await addBudgetItem(budget);
    console.log(await response.text());
    close();
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

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
        {!loading && (
          <FlatList
            data={budgets}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => addToBudget({ ...budget, budget: item.id })}
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
