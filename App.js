/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Feed from './src/main/screens/tabs/Feed';
import Search from './src/main/screens/tabs/Search';
import ItemDetail from './src/main/screens/ItemDetail';

const RootStack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();
const FeedStack = createStackNavigator();

import {Provider} from 'react-redux';
import store from './src/main/store';

function FeedStackScreen() {
    return (
        <FeedStack.Navigator>
            <FeedStack.Screen name="Feedxd" component={Feed}/>
            <FeedStack.Screen name="Detail" component={ItemDetail}/>
        </FeedStack.Navigator>
    );
}

function Tabs() {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen
                name="Feed"
                component={FeedStackScreen}
                options={{tabBarLabel: 'Feed!'}}
            />
            <BottomTabs.Screen
                name="Search"
                component={Search}
                options={{tabBarLabel: 'Search!'}}
            />
        </BottomTabs.Navigator>
    );
}

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <RootStack.Navigator headerMode="none">
                        <RootStack.Screen name="XD" children={Tabs}/>
                    </RootStack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}
