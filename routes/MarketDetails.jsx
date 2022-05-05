import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { getFoods } from "../api";
// import { getProducts } from '../api';
import { categories, colors } from "../constants";

const imageUrl = "https://mybudgetapplication.com/App/images/";
const Product = (props) => {
  const navigation = useNavigation();
  const { id, image, food, description, price } = props;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Product", {
          ...props,
          short_image: image,
        })
      }
      activeOpacity={0.8}
      style={[styles.product, { marginLeft: id % 2 == 0 ? 28 : 0 }]}
    >
      <View>
        <Image source={{ uri: imageUrl + image }} style={styles.productImage} />
      </View>
      <View>
        <Text style={styles.productName}>{food}</Text>
        <Text style={styles.productDesc}>{description}</Text>
        <Text style={styles.price}>K{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function MarketDetails({ route, navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [foods, setFoods] = useState([]);
  const { name, id } = route.params;

  const get = async () => {
    const data = await getFoods(id);
    setFoods(await data.json());
  };

  useEffect(() => get(), []);
  return (
    <FlatList
      data={foods}
      style={styles.container}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Products in {name}</Text>
          <View style={styles.categories}>
            {categories.map(({ icon, name }) => (
              <TouchableOpacity
                key={name}
                style={[
                  styles.categoryItem,
                  {
                    borderColor:
                      selectedCategory == name
                        ? colors.purpleColor
                        : "transparent",
                    borderBottomWidth: selectedCategory == name ? 2 : 0,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(name)}
              >
                <Fragment>
                  <View style={styles.categoryCardIcon}>{icon}</View>
                  <Text style={styles.categoryCardText}>{name}</Text>
                </Fragment>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      renderItem={({ item, index }) => (
        <Fragment key={item.id}>
          {selectedCategory == item.category ||
            (selectedCategory == "All" && <Product {...item} id={index + 1} />)}
        </Fragment>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.purpleColor,
    textAlign: "center",
    marginTop: 20,
  },
  categories: {
    marginTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryHolder: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 20,
    borderBottomColor: "#eee",
    borderBottomWidth: 4,
    paddingBottom: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginBottom: 5,
    width: "25%",
  },
  categoryCardText: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginTop: 5,
  },
  categoryCardIcon: {
    padding: 5,
    backgroundColor: "#ddd",
    borderRadius: 100,
  },
  productHolder: {
    marginTop: 40,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  product: {
    width: "45%",
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 150,
  },
  productName: {
    fontWeight: "700",
    color: "#333",
    fontSize: 16,
    marginTop: 5,
  },
  productDesc: {
    fontSize: 12,
    color: "#444",
  },
  price: {
    color: "orange",
    fontWeight: "700",
    fontSize: 15,
  },
});
