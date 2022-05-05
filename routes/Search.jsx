import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getFoods } from "../api";
import { colors } from "../constants";

const imageUrl = "https://mybudgetapplication.com/App/images/";
export default function Search({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const { search } = route.params;

  // get markets
  const get = async (search) => {
    const response = await getFoods();
    const responseData = await response.json();
    setLoading(false);
    const searchedFilter = responseData.filter((item) =>
      item.food.toLowerCase().includes(search.toLowerCase())
    );
    console.log(searchedFilter);
    setProducts(searchedFilter);
  };

  useEffect(() => get(search), [search]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{search} Results</Text>
        {loading && (
          <ActivityIndicator color={colors.purpleColor} size={"large"} />
        )}
        <View>
          {products.map(
            ({ id, food, image, price, description, shop_name, name }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MarketStack", {
                    screen: "Product",
                    params: {
                      id,
                      name,
                      food,
                      price,
                      shop_name,
                      description,
                      image: imageUrl + image,
                      short_image: image,
                    },
                  })
                }
                style={styles.marketItem}
                key={id}
                activeOpacity={0.8}
              >
                <View style={styles.marketImageHolder}>
                  <Image
                    style={styles.marketImage}
                    source={{ uri: imageUrl + image }}
                  />
                </View>
                <View>
                  <Text style={styles.marketName}>{food}</Text>
                  <Text style={styles.marketAmount}>K{price}</Text>
                  <Text style={styles.marketLocation}>{name}</Text>
                </View>
              </TouchableOpacity>
            )
          )}
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
    fontWeight: "700",
    fontSize: 18,
    color: colors.purpleColor,
    textAlign: "center",
    textTransform: "capitalize",
    marginVertical: 20,
  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1.8,
    borderRadius: 15,
    marginVertical: 10,
  },
  marketItem: {
    flexDirection: "row",
    flex: 1,
  },
  marketImageHolder: {
    marginRight: 15,
    marginBottom: 10,
  },
  marketImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
    backgroundColor: "black",
  },
  marketName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  marketLocation: {
    color: "#333",
  },
  marketAmount: {
    fontWeight: "700",
    fontSize: 18,
  },
});
