import React from 'react';
import {Loading} from "../loading/index";
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

import {StyleSheet, View, Dimensions} from 'react-native';
import { Container, Header, Content, Button, Text, Body, Grid, Col} from 'native-base';

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
        justifyContent: 'center'
    }
});

export class _Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.wallet.status) {
            case 'NONE':
                return (<Loading/>);
            case 'GENERATING':
            case 'GENERATED':
            case 'NO_WALLET':
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
                                    </Col>
                                </Grid>
                            </View>
                        </Content>
                    </Container>);
            case 'READY':
                return (<Text>yok</Text>);
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
