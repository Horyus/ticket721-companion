import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Button, Text} from 'native-base';

const text = `
Don't worry ! You don't have to go into details !

All you need to know is that to generate such a Wallet, we need 12 random words.

It is very important to note down these 12 words, as we're not going to store them for you, and they will be the only way for you to restore this Wallet if you lose it !

Are you ready to generate the Wallet and note these 12 words ?
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

export class Explainer3 extends React.Component {
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
                                        this.props.navigation.navigate('Generator');
                                    }}>
                                        <Text>Generate the Wallet</Text>
                                    </Button>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                </Content>
            </Container>);
    }
}

