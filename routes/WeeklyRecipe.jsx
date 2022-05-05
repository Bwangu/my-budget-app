import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, Fragment } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

import { getRecipes } from "../api";
import { colors } from "../constants";

const imageUrl = "https://mybudgetapplication.com/App/images/";
const RecipeCard = (props) => {
  const { name, instructions, ingredients, image } = props;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.recipesCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("Main", {
          screen: "Recipe",
          params: {
            ...props,
            image: imageUrl + image,
          },
        })
      }
    >
      <Fragment>
        <View style={styles.recipesCardImageHolder}>
          <Image
            style={styles.recipesImage}
            source={{ uri: imageUrl + image, width: 120, height: 120 }}
          />
        </View>
        <View style={styles.recipesCardInfo}>
          <Text style={styles.recipesName}>{name}</Text>
          <Text style={styles.recipesDescription}>
            {ingredients.slice(0.2)}
          </Text>
        </View>
      </Fragment>
    </TouchableOpacity>
  );
};

export default function WeeklyRecipe() {
  const [loading, setLoading] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const get = async () => {
    const response = await getRecipes();
    setLoading(false);
    setRecipes(await response.json());
  };
  useEffect(() => {
    get();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Recipes</Text>
        {loading && (
          <ActivityIndicator size={"large"} color={colors.purpleColor} />
        )}
        <View style={styles.recipesHolder}>
          {recipes.map((props) => (
            <RecipeCard key={props.id} {...props} />
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
  cardHolder: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 20,
    maxWidth: 400,
    borderBottomColor: "#eee",
    borderBottomWidth: 4,
    paddingBottom: 20,
    marginHorizontal: "auto",
  },
  card: {
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    width: "45%",
    marginBottom: 10,
  },
  cardText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  categoryHolder: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 20,
    borderBottomColor: "#eee",
    borderBottomWidth: 4,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#555",
    fontSize: 18,
    marginTop: 10,
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
  recipesHolder: {},
  recipesCard: {
    flexDirection: "row",
    padding: 10,
  },
  recipesCardImageHolder: {
    marginRight: 12,
  },
  recipesImage: {
    width: 120,
    height: 120,
    borderRadius: 4,
  },
  recipesCardInfo: {
    flex: 1,
  },
  recipesDescription: {
    color: "#555",
    fontSize: 13,
  },
  recipesPrice: {
    fontSize: 18,
    color: "orange",
    fontWeight: "700",
    flex: 1,
  },
  addBtn: {
    backgroundColor: colors.blueColor,
    borderRadius: 100,
    padding: 2,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.purpleColor,
    textAlign: "center",
    marginTop: 20,
  },
  recipesName: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 5,
  },
});
