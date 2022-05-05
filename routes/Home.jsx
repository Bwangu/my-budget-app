import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { getFeatured } from "../api";
import ChooseBudget from "../components/ChooseBudget";

import { cards, categories, colors } from "../constants";

const Card = ({ idx, title, icon, color = "white" }) => {
  const navigation = useNavigation();
  const navigate = (title) => {
    switch (title) {
      case "My Budget":
        navigation.navigate("CreateBudget");
        break;
      case "Market":
        navigation.navigate("MarketStack", { screen: "Market" });
        break;
      case "Monthly Budget":
        navigation.navigate("Main", { screen: "MonthlyBudget" });
        break;
      case "Weekly Recipe":
        navigation.navigate("Main", { screen: "WeeklyRecipe" });
        break;
      default:
        navigation.navigate("Home");
        break;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate(title)}
      style={[
        styles.card,
        { backgroundColor: color, marginLeft: idx % 1 == 0 ? 10 : 0 },
      ]}
    >
      <Fragment>
        {icon}
        <Text style={styles.cardText}>{title}</Text>
      </Fragment>
    </TouchableOpacity>
  );
};

const CategoryItem = ({ icon, name }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Category", { name })}
      style={styles.categoryItem}
      activeOpacity={0.8}
    >
      <Fragment>
        <View style={styles.categoryCardIcon}>{icon}</View>
        <Text style={styles.categoryCardText}>{name}</Text>
      </Fragment>
    </TouchableOpacity>
  );
};

const imageUrl = "https://mybudgetapplication.com/App/images/";
const FeaturedCard = (props) => {
  const { food, description, price, image } = props;
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const questionBudget = () => {
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };
  return (
    <TouchableOpacity
      style={styles.featuredCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("MarketStack", {
          screen: "Product",
          params: {
            ...props,
            image: imageUrl + image,
          },
        })
      }
    >
      <Fragment>
        <View style={styles.featuredCardImageHolder}>
          <Image
            style={styles.featuredImage}
            source={{ uri: imageUrl + image, width: 120, height: 120 }}
          />
        </View>
        <View style={styles.featuredCardInfo}>
          <Text style={styles.featuredName}>{food}</Text>
          <Text style={styles.featuredDescription}>{description}</Text>
          <Text style={styles.featuredPrice}>K{price}</Text>
          <View>
            <TouchableOpacity
              onPress={questionBudget}
              style={styles.addBtn}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="plus" color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
      <ChooseBudget close={close} visible={visible} budget={props} />
    </TouchableOpacity>
  );
};

export default function Home({ navigation }) {
  const [loading, setLoading] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [search, setSearch] = useState("");

  const searchItem = () => {
    navigation.navigate("MarketStack", {
      screen: "Market",
      params: { search },
    });
  };

  const get = async () => {
    const response = await getFeatured();
    setLoading(false);
    setFeatured(await response.json());
  };
  useEffect(() => {
    get();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.cardHolder}>
          {cards.map(({ id, title, icon, color }) => (
            <Card
              key={title}
              idx={id}
              icon={icon}
              title={title}
              color={color}
            />
          ))}
        </View>
        <View style={styles.inputHolder}>
          <TextInput
            placeholder="Search "
            style={styles.input}
            value={search}
            returnKeyType="search"
            onSubmitEditing={searchItem}
            onChangeText={setSearch}
          />
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.searchIcon}
              onPress={searchItem}
            >
              <MaterialCommunityIcons
                color={"white"}
                size={25}
                name="search-web"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryHolder}>
          {categories.map(({ name, icon }, idx) => (
            <CategoryItem key={idx} icon={icon} name={name} />
          ))}
        </View>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        {loading && (
          <ActivityIndicator size={"large"} color={colors.purpleColor} />
        )}
        <View style={styles.featuredHolder}>
          {featured.map((props) => (
            <FeaturedCard key={props.id} {...props} />
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
  featuredHolder: {},
  featuredCard: {
    flexDirection: "row",
    padding: 10,
  },
  featuredCardImageHolder: {
    marginRight: 12,
  },
  featuredImage: {
    width: 120,
    height: 120,
    borderRadius: 4,
  },
  featuredCardInfo: {
    flex: 1,
  },
  featuredDescription: {
    color: "#555",
    fontSize: 13,
  },
  featuredPrice: {
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
  inputHolder: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: "#f0f0f0",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchIcon: {
    padding: 5,
    backgroundColor: colors.purpleColor,
    borderRadius: 9,
  },
});
