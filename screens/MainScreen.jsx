import React, { useState, useContext, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import {
  BudgetProducts,
  Category,
  CreateAccount,
  CreateBudget,
  Home,
  Login,
  Market,
  MarketDetails,
  MonthlyBudget,
  Product,
  Recipe,
  WeeklyRecipe,
} from "../routes";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants";
import userContext from "../context/user";
import modalContext from "../context/modal";
import Modal from "react-native-modalbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = () => {
  const { setOpen } = useContext(modalContext);
  return (
    <SafeAreaView>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.menu} onPress={() => setOpen(true)}>
          <MaterialIcons name="menu" color={colors.purpleColor} size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>MyBudget App</Text>
      </View>
    </SafeAreaView>
  );
};

const TabBar = () => {
  const [keyboardShowing, setKeyboardShowing] = useState(false);
  const { isOpen, close } = useContext(modalContext);
  const { setUser } = useContext(userContext);

  const logout = async () => {
    await AsyncStorage.removeItem("@Budget:user");
    setUser(null);
  };

  const navigation = useNavigation();

  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardShowing(true);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardShowing(false);
  });

  if (keyboardShowing) {
    return <Fragment />;
  } else
    return (
      <Fragment>
        <View style={styles.tabBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            <MaterialIcons name="home" color="#999" size={35} />
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateBudget")}
            style={styles.floatingBtn}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" color="white" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MarketStack", { screen: "Market" })
            }
            style={styles.tabItem}
            activeOpacity={0.8}
          >
            <MaterialIcons name="amp-stories" color="#999" size={35} />
            <Text style={styles.tabText}>Market</Text>
          </TouchableOpacity>
        </View>

        <Modal
          style={styles.modal}
          isOpen={isOpen}
          swipeToClose
          swipeThreshold={50}
          onClosed={close}
        >
          <View style={styles.modalPill}></View>
          <TouchableOpacity onPress={logout} style={styles.logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </Modal>
      </Fragment>
    );
};
const Stack = createNativeStackNavigator();

const StackNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Category" component={Category} />
    <Stack.Screen name="CreateBudget" component={CreateBudget} />
    <Stack.Screen name="BudgetProducts" component={BudgetProducts} />
    <Stack.Screen name="MonthlyBudget" component={MonthlyBudget} />
    <Stack.Screen name="WeeklyRecipe" component={WeeklyRecipe} />
    <Stack.Screen name="Recipe" component={Recipe} />
  </Stack.Navigator>
);

const MStack = createNativeStackNavigator();

const MarketStack = () => (
  <MStack.Navigator screenOptions={{ headerShown: false }}>
    <MStack.Screen name="Market" component={Market} />
    <MStack.Screen name="MarketDetails" component={MarketDetails} />
    <MStack.Screen name="Product" component={Product} />
  </MStack.Navigator>
);

const AuthStack = createNativeStackNavigator();

export const AuthScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
  </AuthStack.Navigator>
);
// 906-92 -> Noble Sikazwe
const Tabs = createBottomTabNavigator();

export default function MainScreen() {
  const { user } = useContext(userContext);
  return (
    <Tabs.Navigator
      tabBar={() => (user ? <TabBar /> : null)}
      screenOptions={{
        header: () => <Header />,
        headerShown: user != null,
      }}
    >
      <Tabs.Screen name="Main" component={StackNavigation} />
      <Tabs.Screen name="MarketStack" component={MarketStack} />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  nav: {
    padding: 10,
    borderBottomColor: colors.purpleColor,
    backgroundColor: "white",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.purpleColor,
    flex: 1,
  },
  menu: {
    borderRadius: 100,
  },
  tabBar: {
    borderTopColor: "lightgrey",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 60,
    paddingTop: 7,
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    color: "#888",
    fontWeight: "600",
    fontSize: 12,
    marginTop: -5,
  },
  floatingBtn: {
    backgroundColor: colors.purpleColor,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    top: -3,
  },

  modal: {
    height: "40%",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalPill: {
    width: 100,
    height: 5,
    backgroundColor: "#ddd",
    alignSelf: "center",
    borderRadius: 100,
  },
  logout: {
    padding: 10,
    borderRadius: 9,
    backgroundColor: "#ddd",
    alignItems: "center",
    marginTop: 10,
  },
  listItem: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 2,
    alignItems: "center",
    padding: 10,
  },
});
