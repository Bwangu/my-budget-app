import React, { useState, useEffect } from "react";
import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { deleteBudgetItem, getBudgetItems } from "../api";
import { colors } from "../constants";

const imageUrl = "https://mybudgetapplication.com/App/images/";
export default function BudgetProducts({ navigation, route }) {
  const [budgets, setBudget] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { id, title } = route.params;

  const deleteBudget = async (id, price) => {
    const remove = async () => {
      setDeleteLoading(true);
      await deleteBudgetItem(id);
      setDeleteLoading(false);
      setBudget(budgets.filter((budget) => budget.id != id));
      setTotal(total => total - price)
    };

    Alert.alert("Are you sure", "you want to remove this item", [
      {
        text: "Yes",
        onPress: remove,
        style: "destructive",
      },
      {
        text: "No",
        style: "destructive",
      },
    ]);
  };

  const get = async () => {
    const response = await getBudgetItems(id);
    const budgetItems = await response.json();
    setLoading(false);

    budgetItems.map((budget) => {
      setTotal((total) => total + parseInt(budget.price));
    });

    setBudget(budgetItems);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text style={styles.title}>Products in {title}</Text>
            <Text style={styles.title}>{!loading && `Total: ${total}`}</Text>
          </View>

          {loading && (
            <ActivityIndicator color={colors.purpleColor} size="large" />
          )}
          <Text style={styles.noProducts}>
            {budgets.length == 0 &&
              !loading &&
              "There is currently no monthly budget"}
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
          <View>
            <TouchableOpacity
              onPress={() => deleteBudget(id, price)}
              style={styles.deleteButton}
              activeOpacity={0.8}
            >
              {deleteLoading ? (
                <ActivityIndicator color={"white"} size="small" />
              ) : (
                <MaterialIcons name="close" color="white" size={25} />
              )}
            </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 10,
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
