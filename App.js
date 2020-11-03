import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen'
import HistoryScreen from './src/screens/HistoryScreen'
import CardScreen from './src/screens/CardScreen'
import AccountScreen from './src/screens/AccountScreen'



const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="Home" component={HomeScreen} />
		</HomeStack.Navigator>
	);
}

function HistoryStackScreen() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="History" component={HistoryScreen} />
		</HomeStack.Navigator>
	);
}

const App = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName

						if (route.name === 'Home') {
							iconName = focused ? 'home' : 'home-outline'
							size = focused ? 32 : 28
						}

						else if (route.name === 'History') {
							iconName = focused ? 'history' : 'history'
							size = focused ? 32 : 28
						}

						else if (route.name === 'Card') {
							iconName = focused ? 'account-card-details' : 'account-card-details-outline'
							size = focused ? 32 : 28
						}

						else if (route.name === 'Account') {
							iconName = focused ? 'account' : 'account-outline'
							size = focused ? 32 : 28
						}

						return <MaterialCommunityIcons name={iconName} size={size} color={color} />
					},
				})
				}

				tabBarOptions={{
					activeTintColor: '#2CC197',
					inactiveTintColor: '#CDCCCE',
					style: {
						height: 55,
					},
					labelStyle: {
						marginTop: -5,
						marginBottom: 5,
					}
				}}
			>
				<Tab.Screen name="Home" component={HomeStackScreen} />
				<Tab.Screen name="History" component={HistoryStackScreen} />
				<Tab.Screen name="Card" component={CardScreen} />
				<Tab.Screen name="Account" component={AccountScreen} />
			</Tab.Navigator>
		</NavigationContainer >
	);
}

export default App