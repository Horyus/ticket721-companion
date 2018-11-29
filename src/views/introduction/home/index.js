import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Text} from 'native-base';
import {connect} from 'react-redux';
import {Loading} from "../loading";
import {NotLinked} from "./not_linked";
import {Profile} from "./profile";

const styles = StyleSheet.create({
    contentview: {
        flex: 1,
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    grid: {
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontFamily: 'RobotoThin',
        fontSize: 15,
        margin: 30
    },
    buttonview: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

class _Home extends React.Component {
    render() {
        switch (this.props.inet) {
            case 'UNKNOWN':
                return <Loading/>;
            case 'OFFLINE':
                return (
                    <Profile/>
                );
            case 'ONLINE':
                switch (this.props.link.link.status) {
                    case 'WAITING':
                        return <Loading/>;
                    case 'LINKED':
                        return (
                            <Profile/>
                        );
                    case 'NOT_LINKED':
                        return (
                            <NotLinked/>
                        );
                }
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        wallet: state.wallet,
        link: state.links,
        inet: state.config.inet
    }
};

export const Home = connect(mapStateToProps)(_Home);
