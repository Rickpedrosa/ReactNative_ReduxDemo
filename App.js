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
import {Text} from 'react-native-paper';

const RootStack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();
const FeedStack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';

// function FeedStackScreen() {
//     return (
//         <FeedStack.Navigator headerMode="none">
//             <FeedStack.Screen
//                 name="Feedxd"
//                 component={Feed}/>
//         </FeedStack.Navigator>
//     );
// }

function Tabs() {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen
                name="People"
                component={Feed}
                options={{tabBarLabel: 'People!'}}
            />
            <BottomTabs.Screen
                name="Worlds"
                component={Feed}
                options={{tabBarLabel: 'Worlds!'}}
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

    function getHeaderTitle(route) {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen || 'People';

        switch (routeName) {
            case 'People':
                return 'People';
            case 'Worlds':
                return 'Worlds';
        }
    }

    if (!isReady) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <NavigationContainer
                    onStateChange={state =>
                        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
                    }>
                    <RootStack.Navigator>
                        <RootStack.Screen
                            name="XD"
                            children={Tabs}
                            options={({
                                          route,
                                      }) => ({
                                headerTitle: <Text>{getHeaderTitle(route)}</Text>,
                            })}/>
                        <RootStack.Screen
                            name="Detail"
                            component={ItemDetail}
                        />
                    </RootStack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}
