import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Button, Text, Item, Input} from 'native-base';
import {Vibration} from 'react-native';


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
    input: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontSize: 17
    },
    buttonview: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

class _Verifier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: 0,
            input: '',
            error: false
        };
        this.mnemonic_checker = this.mnemonic_checker.bind(this);
    }

    mnemonic_checker(text) {
        if (text === this.props.mnemonic[this.state.verified]) {
            Vibration.vibrate(50);
            if (this.state.verified === 1) {
                this.props.navigation.navigate('Ready');
            }
            this.setState({
                input: '',
                verified: this.state.verified + 1,
                error: false
            });
        } else {
            this.setState({
                input: text,
                error: !!text.length
            });
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.contentview}>
                        <Grid style={styles.grid}>
                            <Col>
                                <Text style={styles.text}>
                                    Input Word #{this.state.verified + 1}
                                </Text>
                                <View style={styles.buttonview}>
                                    <Item underline error={this.state.error} style={{width: Dimensions.get('window').width * 0.5}}>
                                        <Input autoCorrect={false} style={styles.input} value={this.state.input} onChangeText={this.mnemonic_checker} ref={(ref) => {this.input = ref}}/>
                                    </Item>
                                </View>
                            </Col>
                        </Grid>
                    </View>
                </Content>
            </Container>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        mnemonic: state.wallet.mnemonic
    }
};

export const Verifier = connect(mapStateToProps)(_Verifier);
