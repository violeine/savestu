import React from "react";
import "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import { HomeScreen } from "./src/screens/HomeScreen";
import { HistoryScreen } from "./src/screens/HistoryScreen";
import { CardScreen } from "./src/screens/CardScreen";
import { AccountScreen } from "./src/screens/AccountScreen";
import FloatingButton from "./src/components/FloatingButton";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <AntDesign name="home" size={focused ? 32 : 28} color={tintColor} />
        ),
      },
    },

    History: {
      screen: HistoryScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialCommunityIcons
            name="history"
            size={focused ? 32 : 28}
            color={tintColor}
          />
        ),
      },
    },

    FltButton: {
      screen: () => null,
      navigationOptions: {
        tabBarIcon: <FloatingButton />,
        tabBarLabel: () => null,
      },
    },

    Card: {
      screen: CardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <AntDesign
            name="creditcard"
            size={focused ? 28 : 24}
            color={tintColor}
          />
        ),
      },
    },

    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialCommunityIcons
            name="account"
            size={focused ? 32 : 28}
            color={tintColor}
          />
        ),
      },
    },
  }, // Button

  {
    tabBarOptions: {
      showLabel: true,
      activeTintColor: "#2CC197",
      inactiveTintColor: "#CDCCCE",
      style: {
        height: 65,
      },
      tabStyle: {
        paddingVertical: 5,
      },
      labelStyle: {
        fontSize: 11,
      },
    },
  }
);

export default createAppContainer(TabNavigator);

