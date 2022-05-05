import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";

export default function Recipe({ route }) {
  const { name, ingredients, image, instructions } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View>
          <Image style={styles.productImage} source={{ uri: image }} />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.name}>Recipe for {name}</Text>
          <Text style={styles.title}>Ingredients</Text>
          <View style={styles.location}>
            <Text style={styles.text}>{ingredients}, </Text>
          </View>
          <Text style={styles.title}>Instructions</Text>
          <Text style={styles.text}>{instructions}</Text>
        </View>
      </View>
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
    fontSize: 20,
    color: "#333",
    marginTop: 10,
  },
  text: {
    color: "#333",
  },
  title: {
    fontWeight: "700",
    color: "#333",
    marginVertical: 10,
    fontSize: 16,
  },
});
