import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getMonthlyBudgetItems } from "../api";
import { colors } from "../constants";

const imageUrl = "https://mybudgetapplication.com/App/images/";
export default function BudgetProducts({ navigation }) {
  const [budgets, setBudget] = useState([]);
  const [loading, setLoading] = useState(true);

  const get = async () => {
    const response = await getMonthlyBudgetItems();
    const budgetItems = await response.json();
    console.log(budgetItems);
    setLoading(false);
    setBudget(budgetItems);
  };

  useEffect(() => get(), []);
  return (
    <FlatList
      ListHeaderComponent={() => (
        <View>
          <Text style={styles.title}>Monthly Budget</Text>
          {loading && (
            <ActivityIndicator color={colors.purpleColor} size="large" />
          )}

          <Text style={styles.noProducts}>
            {budgets.length == 0 &&
              !loading &&
              "There are no items in your budget"}
          </Text>
        </View>
      )}
      data={budgets}
      style={[styles.container, styles.budgetHolder]}
      renderItem={({
        item: { id, image, food, market, shop_name, price, description },
      }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MarketStack", {
              screen: "Product",
              params: {
                id,
                image: imageUrl + image,
                short_image: image,
                name: market,
                shop_name,
                food,
                price,
                description,
              },
            })
          }
          key={id}
          style={styles.budgetItem}
          activeOpacity={0.8}
        >
          <View style={styles.imageHolder}>
            <Image source={{ uri: imageUrl + image }} style={styles.image} />
          </View>
          <View style={styles.details}>
            <Text style={styles.name}>{food}</Text>
            <Text style={styles.price}>K{price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.purpleColor,
    textAlign: "center",
    marginTop: 20,
  },
  budgetItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  imageHolder: {
    marginRight: 10,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 100,
  },
  details: {
    flexDirection: "row",
    marginRight: 20,
    alignItems: "center",
    flex: 1,
  },
  name: {
    fontWeight: "700",
    color: "#333",
    fontSize: 16,
    flex: 1,
  },
  price: {
    fontWeight: "700",
    color: "#333",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#333",
    borderColor: "#222",
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  noProducts: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
});
