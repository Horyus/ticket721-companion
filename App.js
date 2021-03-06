import React from 'react';
import {Font} from 'expo';

import {Home} from "./src/views/introduction/home";

import getTheme from './native-base-theme/components';
import {StyleProvider} from 'native-base';

import {Welcome} from "./src/views/introduction/welcome";
import {Recovery} from "./src/views/introduction/welcome/recovery";
import {Explainer1} from "./src/views/introduction/welcome/explainer1";
import {Explainer2} from "./src/views/introduction/welcome/explainer2";
import {Explainer3} from "./src/views/introduction/welcome/explainer3";
import {Generator} from "./src/views/introduction/welcome/generator";
import {Verifier} from "./src/views/introduction/welcome/verifier";
import {Ready} from "./src/views/introduction/welcome/ready";

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

import { createNavigationReducer, createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import createSagaMiddleware from 'redux-saga';
import {fork, all} from "redux-saga/effects";

import {walletReducers} from "./src/redux/wallet/wallet.reducers";
import {walletSagas} from "./src/redux/wallet/wallet.sagas";
import {WalletLoad} from "./src/redux/wallet/wallet.actions";

import {configReducers} from "./src/redux/config/config.reducers";
import {ConfigLoad} from "./src/redux/config/config.actions";
import {configSagas} from "./src/redux/config/config.sagas";

import {linksReducers} from "./src/redux/links/links.reducers";
import {linksSagas} from "./src/redux/links/links.sagas";

import {DMReducers} from "./src/redux/data_manager/data_manager.reducers";
import {DMSagas} from "./src/redux/data_manager/data_manager.sagas";

import {Settings} from "./src/views/introduction/home/settings";
import {QrCode} from "./src/views/introduction/home/qrcode";

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        Settings: {
            screen: Settings
        },
        QrCode: {
            screen: QrCode
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        gesturesEnabled: false,
        cardStyle: { backgroundColor: '#FFFFFF' }
    }
);

const IntroNavigator = createStackNavigator(
    {
        Welcome: {
            screen: Welcome,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Recovery: {
            screen: Recovery,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Explainer1: {
            screen: Explainer1,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Explainer2: {
            screen: Explainer2,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Explainer3: {
            screen: Explainer3,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Generator: {
            screen: Generator,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Verifier: {
            screen: Verifier,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        Ready: {
            screen: Ready,
            navigationOptions: {
                gesturesEnabled: false,
            }
        },
        App: {
            screen: AppNavigator,
            navigationOptions: {
                gesturesEnabled: false,
            }
        }
    },
    {
        initialRouteName: 'Welcome',
        headerMode: 'none',
        gesturesEnabled: false,
        cardStyle: { backgroundColor: '#FFFFFF' }
    }
);

// Setting Navigation Reducer
const navReducer = createNavigationReducer(IntroNavigator);

// Combining Navigation Reducer and Application Reducers
const reducer = combineReducers({
    wallet: walletReducers,
    config: configReducers,
    links: linksReducers,
    dm: DMReducers,
    nav: navReducer
});

// Creating Saga Middleware instance
const sagaMiddleware = createSagaMiddleware();

// Creating Saga Combination of Application Sagas
function* sagas() {
    yield all([
        fork(walletSagas),
        fork(configSagas),
        fork(linksSagas),
        fork(DMSagas)
    ]);
}

// Creating Navigation Middleware
const navMiddleware = createReactNavigationReduxMiddleware("root", state => state.nav);

// Creating Redux Store with combined reducers, initial state and combined middlewares
const Store = createStore(reducer, {
    wallet: {
        status: 'NONE'
    },
    config: {
        inet: 'UNKNOWN',
        env: {}
    }
}, applyMiddleware(navMiddleware, sagaMiddleware));

// Run Saga Middleware
sagaMiddleware.run(sagas);

// Creating Reduxifyed Node
const App = reduxifyNavigator(IntroNavigator, "root");

// Create mapStateToProps for previous node
const mapStateToProps = (state) => ({
    state: state.nav
});

// Connect component to redux store
const AppWithNavigationState = connect(mapStateToProps)(App);

Store.dispatch(WalletLoad());

// Export Default Root class
export default class Root extends React.Component {
    componentDidMount() {
        Font.loadAsync({
            RobotoThin: require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
            RobotoLight: require('./assets/fonts/Roboto/Roboto-Light.ttf'),
            Roboto: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
            RobotoMedium: require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
            RobotoBlack: require('./assets/fonts/Roboto/Roboto-Black.ttf'),
            RobotoMono: require('./assets/fonts/RobotoMono/RobotoMono-Regular.ttf')
        })
    };

    render() {
        return (
            <Provider store={Store}>
                <StyleProvider style={getTheme()}>
                    <AppWithNavigationState/>
                </StyleProvider>
            </Provider>
        );
    }
}

