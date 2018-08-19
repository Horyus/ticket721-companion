import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Button, Text} from 'native-base';

const text = `
With this application, you can generate QR Codes for your Ticket721 tickets.
These QR Codes can be scanned at the events your are going to attend, and will
certify your ownership of a ticket.

It is important to follow all the steps to setup your Ticket721 Companion, and
link it with your Ticket721 Webapp.
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

export class Explainer1 extends React.Component {
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
                                        this.props.navigation.navigate('Explainer2');
                                    }}>
                                        <Text>Ok, I got it !</Text>
                                    </Button>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                </Content>
            </Container>);
    }
}

