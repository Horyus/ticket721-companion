import React from 'react';
import {Loading} from "../loading/index";
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {StyleSheet, View, Dimensions} from 'react-native';
import { Container, Header, Content, Button, Text, Body, Grid, Col} from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

const text = `
Welcome to the Ticket721 Companion
`;

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
        fontSize: 17,
        margin: 30
    },
    buttonview: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 40
    }
});

export class _Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'App' })],
        });
    }

    shouldComponentUpdate(newProps) {
        if (newProps.wallet.status === 'READY')
            this.props.navigation.dispatch(this.resetAction);
        return true;
    }

    render() {
        switch (this.props.wallet.status) {
            case 'NONE':
                return (<Loading/>);
            case 'READY':
                return null;
            default:
                return (
                    <Container>
                        <Content>
                            <View style={styles.contentview}>
                                <Grid style={styles.grid}>
                                    <Col>
                                        <Text style={styles.text}>
                                            {text}
                                        </Text>
                                        <View style={styles.buttonview}>
                                            <Button rounded bordered info small onPress={() => {
                                                this.props.navigation.navigate('Explainer1');
                                            }}>
                                                <Text>Setup</Text>
                                            </Button>
                                        </View>
                                        <View style={styles.buttonview}>
                                            <Button rounded bordered info small onPress={() => {
                                                this.props.navigation.navigate('Recovery');
                                            }}>
                                                <Text>Recover Wallet</Text>
                                            </Button>
                                        </View>
                                    </Col>
                                </Grid>
                            </View>
                        </Content>
                    </Container>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        wallet: state.wallet
    }
};

export const Welcome = withNavigation(connect(mapStateToProps)(_Welcome));
