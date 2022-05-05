import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getMarkets } from "../api";
import { colors } from "../constants";

const imageUrl = "https://mybudgetapplication.com/App/images/";
export default function Market({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    if (route.params && route.params.search) {
      setSearchText(route.params.search);
    }
  }, [route.params]);

  const includesSearchText = (name) => {
    return name.toLowerCase().includes(searchText.toLowerCase());
  };

  const get = async () => {
    const response = await getMarkets();
    setLoading(false);
    if (response.ok) setMarkets(await response.json());
  };

  useEffect(() => get(), []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Available Markets</Text>
        <View style={styles.input}>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            keyboardType="default"
            style={{ padding: 8 }}
            placeholder="Search for market..."
          />
        </View>
      </View>

      {loading && <ActivityIndicator color={colors.purpleColor} size="large" />}
      <FlatList
        data={markets}
        keyExtractor={(extract) => extract.id}
        renderItem={({ item: { id, name, town, market_image } }) => (
          <Fragment>
            {includesSearchText(name) && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MarketDetails", {
                    id,
                    name,
                    town,
                  })
                }
                style={styles.marketItem}
                key={id}
                activeOpacity={0.8}
              >
                <View style={styles.marketImageHolder}>
                  <Image
                    style={styles.marketImage}
                    source={{ uri: imageUrl + market_image }}
                  />
                </View>
                <View>
                  <Text style={styles.marketName}>{name}</Text>
                  <Text style={styles.marketTown}>{town}</Text>
                </View>
              </TouchableOpacity>
            )}
          </Fragment>
        )}
      />
    </View>
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
    marginRight: 10,
    marginBottom: 10,
  },
  marketImage: {
    width: 120,
    height: 120,
    borderRadius: 4,
    backgroundColor: "black",
  },
  marketName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  marketTown: {
    color: "#333",
  },
});
