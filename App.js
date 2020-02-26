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
import {Provider} from 'react-redux';
import store from './src/main/store';
import {AsyncStorage} from 'react-native';

const RootStack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();
const FeedStack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

function FeedStackScreen() {
    return (
        <FeedStack.Navigator>
            <FeedStack.Screen
                name="Feedxd"
                component={Feed}/>
            <FeedStack.Screen
                name="Detail"
                component={ItemDetail}
            />
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

/**
 * @return {null}
 * @return {null}
 */

export default function App() {
    const [isReady, setIsReady] = React.useState(false);
    const [initialState, setInitialState] = React.useState();

    React.useEffect(() => {
        const restoreState = async () => {
            try {
                const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
                const state = JSON.parse(savedStateString);

                setInitialState(state);
            } finally {
                setIsReady(true);
            }
        };

        if (!isReady) {
            // noinspection JSIgnoredPromiseFromCall
            restoreState();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <NavigationContainer
                    onStateChange={state =>
                        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
                    }>
                    <RootStack.Navigator headerMode="none">
                        <RootStack.Screen name="XD" children={Tabs}/>
                    </RootStack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}
