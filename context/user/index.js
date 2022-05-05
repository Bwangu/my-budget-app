import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userContext = createContext(null);
export default userContext;

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  async function getUser() {
    const storageUser = await AsyncStorage.getItem("@Budget:user");
    setLoading(false);
    setUser(JSON.parse(storageUser));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, loading }}>
      {children}
    </userContext.Provider>
  );
}
