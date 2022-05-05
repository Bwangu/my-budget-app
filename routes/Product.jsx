import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { colors } from "../constants";
import ChooseBudget from "../components/ChooseBudget";

export default function Product({ route }) {
  const [visible, setVisible] = useState(false);

  const close = () => setVisible(false);

  const imageUrl = "https://mybudgetapplication.com/images/"
  const params = route.params;
  const { shop_name, food, image, short_image, description, price, name } =
    params;

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View>
          <Image style={styles.productImage} source={{ uri: image }} />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.name}>{food}</Text>
          <View style={styles.location}>
            <Text style={styles.locationText}>{shop_name}, </Text>
            <Text style={styles.locationText}>{name}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>K{price}</Text>
          <View style={styles.buttonsHolder}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.addButton}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Add to Budget</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ChooseBudget budget={{...params, image: short_image}} close={close} visible={visible} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  productImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 3 / 2,
  },
  name: {
    fontWeight: "700",
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    fontWeight: "700",
    color: "#333",
  },
  description: {
    marginVertical: 7,
    fontSize: 16,
    color: "#777",
  },
  price: {
    color: "orange",
    fontWeight: "700",
    fontSize: 40,
  },
  buttonsHolder: {
    flexDirection: "row",
    marginTop: 20,
  },
  buyButton: {
    padding: 10,
    backgroundColor: colors.purpleColor,
    width: "46%",
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
    flex: 1,
  },
  addButton: {
    padding: 10,
    backgroundColor: colors.blueColor,
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
