import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const text = `
Welcome to the Ticket721 Companion. 
This Application is your pass to all your events.
We are going to generate a Wallet for you. This Wallet will never be used to make transactions,
it will only be used to prove that you own a ticket for a specific event.
`;

export class Explainer1 extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontFamily: 'RobotoThin',
        fontSize: 17,
        margin: 30
    }
});
