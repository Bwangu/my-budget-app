import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../constants";
import userContext from "../context/user";
import MainScreen, { AuthScreen } from "./MainScreen";

export default function AuthenticationSwitch() {
  const { user, loading } = useContext(userContext);
  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator color={colors.purpleColor} size="large" />
      </View>
    );
  } else if (user) {
    return <MainScreen />;
  } else return <AuthScreen />;
}
