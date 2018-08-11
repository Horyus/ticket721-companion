import React from 'react';
import {Font} from 'expo';

import {Home} from "./src/views/introduction/home";

import {Welcome} from "./src/views/introduction/welcome";
import {Explainer1} from "./src/views/introduction/welcome/explainer1";

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

import { createNavigationReducer, createReactNavigationReduxMiddleware, reduxifyNavigator } from 'react-navigation-redux-helpers';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import createSagaMiddleware from 'redux-saga';
import {fork, all} from "redux-saga/effects";

import {walletReducers} from "./src/redux/wallet/wallet.reducers";
import {walletSagas} from "./src/redux/wallet/wallet.sagas";
import {WalletLoad} from "./src/redux/wallet/wallet.actions";

const AppNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home
        }
    },
    {
        initialRouteName: 'Home'
    }
);

const IntroNavigator = createStackNavigator(
    {
        Welcome: {
            screen: Welcome
        },
        Explainer1: {
            screen: Explainer1
        },
        App: {
            screen: AppNavigator
        }
    },
    {
        initialRouteName: 'Welcome',
        headerMode: 'none'
    }
);

// Setting Navigation Reducer
const navReducer = createNavigationReducer(IntroNavigator);

// Combining Navigation Reducer and Application Reducers
const reducer = combineReducers({
    wallet: walletReducers,
    nav: navReducer
});

// Creating Saga Middleware instance
const sagaMiddleware = createSagaMiddleware();

// Creating Saga Combination of Application Sagas
function* sagas() {
    yield all([
        fork(walletSagas)
    ]);
}

// Creating Navigation Middleware
const navMiddleware = createReactNavigationReduxMiddleware("root", state => state.nav);

// Creating Redux Store with combined reducers, initial state and combined middlewares
const Store = createStore(reducer, {
    wallet: {
        status: 'NONE'
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
            RobotoBlack: require('./assets/fonts/Roboto/Roboto-Black.ttf')
        })
    };

    render() {
        return (
            <Provider store={Store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}

