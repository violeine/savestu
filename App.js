import React from 'react'
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'

import { HomeScreen } from './src/screens/HomeScreen'
import { HistoryScreen } from './src/screens/HistoryScreen'
import { CardScreen } from './src/screens/CardScreen'
import { AccountScreen } from './src/screens/AccountScreen'
import FloatingButton from './src/components/FloatingButton'


const TabNavigator = createBottomTabNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: {
				tabBarIcon: () => <AntDesign name='home' size={24} color="#cdccce" />
			}
		},

		History: {
			screen: HistoryScreen,
			navigationOptions: {
				tabBarIcon: () => <MaterialCommunityIcons name='history' size={24} color="#cdccce" />
			}
		},

		FltButton: {
			screen: () => null,
			navigationOptions: {
				tabBarIcon: <FloatingButton />
			}
		},

		Card: {
			screen: CardScreen,
			navigationOptions: {
				tabBarIcon: () => <AntDesign name='creditcard' size={22} color='#cdccce' />
			}
		},

		Account: {
			screen: AccountScreen,
			navigationOptions: {
				tabBarIcon: () => <MaterialCommunityIcons name='account' size={24} color='#cdccce' />
			}
		},
	}, // Button

	{
		tabBarOptions: {
			showLabel: false
		}
	},
)

export default createAppContainer(TabNavigator)