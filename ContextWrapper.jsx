import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthenticationSwitch from "./screens";
import { UserProvider } from "./context/user";
import { ModalProvider } from "./context/modal";

export default function ContextWrapper() {
  return (
    <NavigationContainer>
      <UserProvider>
        <ModalProvider>
          <AuthenticationSwitch />
        </ModalProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
