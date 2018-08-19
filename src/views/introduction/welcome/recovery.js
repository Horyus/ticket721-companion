import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Button, Text, Form, Textarea} from 'native-base';
import {Wallet} from 'ethers';
import {connect} from 'react-redux';
import {WalletGenerated} from "../../../redux/wallet/wallet.actions";

const text = `
Enter your 12 seed words
`;

const styles = StyleSheet.create({
    contentview: {
        flex: 1,
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    grid: {
        alignItems: 'center',
        padding: 20
    },
    text: {
        textAlign: 'center',
        fontFamily: 'RobotoThin',
        fontSize: 17,
        marginTop: 30,
        marginBottom: 15
    },
    textview: {
        marginBottom: 30
    },
    buttonview: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    infotext: {
        textAlign: 'center',
        fontFamily: 'RobotoMono',
        fontSize: 14,
        marginBottom: 30
    }
});

class _Recovery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            mnemonic: [],
            tmp_wallet: null,
            tmp_wallet_error: null
        };
        this.update_mnemonic_state = this.update_mnemonic_state.bind(this);
    }

    shouldComponentUpdate(newProps) {
        if (newProps.wallet.wallet && this.state.tmp_wallet && this.state.disabled) {
            if (newProps.wallet.wallet.address === this.state.tmp_wallet.address)
                this.setState({
                    disabled: false
                })
        }
        return true;
    }

    update_mnemonic_state(text) {
        const tmp_mnemonic = text.split(' ').filter(elem => !!elem.length);
        this.setState({
            mnemonic: tmp_mnemonic,
            tmp_wallet: null,
            tmp_wallet_error: null,
            disabled: true
        });
        if (tmp_mnemonic.length === 12) {
            const load_wallet = async () => {
                try {
                    const wallet = Wallet.fromMnemonic(tmp_mnemonic.join(' '));
                    this.setState({
                        tmp_wallet: wallet,
                        tmp_wallet_error: null,
                        disabled: true
                    });
                    this.props.load(wallet, tmp_mnemonic);
                } catch (e) {
                    this.setState({
                        tmp_wallet_error: 'invalid seed words',
                        disabled: true
                    });
                }
            };
            setTimeout(() => {
                load_wallet();
            }, 0);
        }
    }

    render() {
        let information;
        if (this.state.mnemonic.length < 12) {
            if (this.state.mnemonic.length === 11) {
                information = '1 word remaining'
            } else {
                information = `${12 - this.state.mnemonic.length} words remaining`
            }
        }
        if (this.state.mnemonic.length === 12) {
            if (this.state.tmp_wallet_error !== null) {
                information = this.state.tmp_wallet_error
            } else if (this.state.tmp_wallet) {
                information = this.state.tmp_wallet.address;
            } else {
                information = 'loading ...';
            }
        }

        return (
            <Container>
                <Content>
                    <View style={styles.contentview}>
                        <Grid style={styles.grid}>
                            <Col>
                                <Text style={styles.text}>
                                    {text}
                                </Text>
                                <Text style={styles.infotext}>
                                    {information}
                                </Text>
                                <View style={styles.textview}>
                                    <Form>
                                        <Textarea rowSpan={5} bordered onChangeText={this.update_mnemonic_state}/>
                                    </Form>
                                </View>
                                <View style={styles.buttonview}>
                                    <Button disabled={this.state.disabled} info={!this.state.disabled} rounded bordered small onPress={() => {
                                        this.props.navigation.navigate('Ready');
                                    }}>
                                        <Text>Recover</Text>
                                    </Button>
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
        wallet: state.wallet
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        load: (wallet, mnemonic) => {dispatch(WalletGenerated(wallet, mnemonic))}
    }
};

export const Recovery = connect(mapStateToProps, mapDispatchToProps)(_Recovery);
