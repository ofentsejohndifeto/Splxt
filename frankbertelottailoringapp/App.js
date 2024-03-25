import React, { useState, createContext, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from './config/firebase';
import { collection, getDoc, doc } from 'firebase/firestore';
import Tabs from "./navigation/tabs";
import AdminTabs from "./navigation/adminTabs";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Onboarding from "./screens/Onboarding";
import * as Linking from 'expo-linking';
import Home from "./screens/Home";

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext(null);

const prefix = Linking.makeUrl('/');

function useAuthenticatedUserContext() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  return { user, setUser };
}

function AuthenticatedUserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}

function ClientApplicationStack({ isAdmin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
}

function AdminApplicationStack({ isAdmin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useAuthenticatedUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      if (authenticatedUser) {
        const { email, uid } = authenticatedUser;

        // Determine isAdmin value based on administrator email
        const isAdmin = email === 'frankbertelot@gmail.com';

        // Fetch additional user data from Firestore
        const userRef = doc(collection(firestore, 'users'), uid);
        const snapshot = await getDoc(userRef);
        const userData = snapshot.data();

        setUser({ ...authenticatedUser, isAdmin, ...userData });
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const Linking = {
    prefixes:[prefix],
    config: {
      screens:{
        Home: "home",
        ScheduleAppointments: "schedulesappointments",
        Appointments: "appointments",
        Profile: "profile",
      },
    },
  }

  return (
    <NavigationContainer linking={Linking}>
      {user ? (
        user.isAdmin ? (
          <AdminApplicationStack />
        ) : (
          <ClientApplicationStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

export { AuthenticatedUserContext };

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
