import React from "react";
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import CardScreen from "./src/screens/CardScreen";
import AccountScreen from "./src/screens/AccountScreen";
import UpdateScreen from "./src/screens/UpdateScreen"
import CreateScreen from "./src/screens/CreateScreen"
import DebugScreen from "./src/screens/DebugScreen"
import LoadingScreen from "./src/screens/LoadingScreen"
import { useInitDbHook, CardProvider } from "./src/db";


const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#229B79" hidden={false} />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}

function HistoryStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="History"
        component={HistoryScreen}
      />
      <Stack.Screen
        name="Update"
        component={UpdateScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'My Account',
          headerStyle: {
            backgroundColor: '#2CC197',
          },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Debug"
        component={DebugScreen}
        options={{
          title: 'Debug Screen',
          headerStyle: {
            backgroundColor: '#2CC197',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

function CardStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Card"
        component={CardScreen}
        options={{
          title: 'My Card',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Update"
        component={UpdateScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const Main = () => {
  useInitDbHook();
  return (
    <Tab.Navigator

      // ----- CHỌN MÀN HÌNH MẶC ĐỊNH -------

      initialRouteName='Home'

      // -------------------------------------



      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            size = focused ? 34 : 30;
          } else if (route.name === "History") {
            iconName = focused ? "history" : "history";
            size = focused ? 34 : 30;
          } else if (route.name === "Card") {
            iconName = focused
              ? "account-card-details"
              : "account-card-details-outline";
            size = focused ? 34 : 30;
          } else if (route.name === "Account") {
            iconName = focused ? "account" : "account-outline";
            size = focused ? 34 : 30;
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}

      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: "#2CC197",
        inactiveTintColor: "#CDCCCE",
        style: {
          height: 60,
        },
        labelStyle: {
          marginTop: -5,
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
      />

      <Tab.Screen
        name="History"
        component={HistoryStackScreen}
      />

      <Tab.Screen
        name="Card"
        component={CardStackScreen}
      />

      <Tab.Screen
        name="Account"
        component={AccountStackScreen}
      />
    </Tab.Navigator>
  );
};

const App = () => (
  <CardProvider>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Loading' component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  </CardProvider>
);

export default App;