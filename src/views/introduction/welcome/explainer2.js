import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Button, Text} from 'native-base';

const text = `
We will need to create a Wallet for you. A Wallet is a unique identity, and you're the only one controlling it.

In Ethereum, a Wallet allows you to spend Ethers, but in the Ticket721 Companion, we're not going to use the Wallet
to spend Ethers. 

This Wallet is only going to be used to create Cryptographically Secured Digital Signatures.
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

export class Explainer2 extends React.Component {
    render() {
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
                                        this.props.navigation.navigate('Explainer3');
                                    }}>
                                        <Text>Cryptographically what ??</Text>
                                    </Button>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                </Content>
            </Container>);
    }
}

