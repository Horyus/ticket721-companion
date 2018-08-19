import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Button, Text} from 'native-base';
import { Table, Row, Rows } from 'react-native-table-component';
import {WalletGenerate} from "../../../redux/wallet/wallet.actions";
import {Loading} from "../loading";

const styles = StyleSheet.create({
    contentview: {
        flex: 1,
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    addressText: {
        textAlign: 'center',
        fontFamily: 'RobotoMono',
        fontSize: 13,
        marginTop: 15,
        marginBottom: 45
    },
    texttitle: {
        textAlign: 'center',
        fontFamily: 'RobotoThin',
        fontSize: 20,
        marginTop: 15,
        marginBottom: 15
    },
    text: {
        textAlign: 'center',
        fontFamily: 'RobotoThin',
        fontSize: 17,
        marginTop: 30,
        marginBottom: 15
    },
    lasttext: {
        textAlign: 'center',
        fontFamily: 'RobotoThin',
        fontSize: 17,
        marginTop: 30,
        marginBottom: 30
    },
    grid: {
        alignItems: 'center'
    },
    head: {},
    tabletext: {
        padding: 6,
        fontFamily: 'RobotoLight',
        fontSize: 15
    },
    buttonview: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

class _Generator extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.generate();
    }

    render() {
        switch(this.props.wallet.status) {
            case 'NO_WALLET':
            case 'GENERATING':
            case 'READY':
                return <Loading/>;
            case 'GENERATED':
                const mnemonic = this.props.wallet.mnemonic;
                const data = {
                    tableHead: ["1. " + mnemonic[0], "7. " + mnemonic[6]],
                    tableData: [
                        ["2. " + mnemonic[1], "8. " + mnemonic[7]],
                        ["3. " + mnemonic[2], "9. " + mnemonic[8]],
                        ["4. " + mnemonic[3], "10. " + mnemonic[9]],
                        ["5. " + mnemonic[4], "11. " + mnemonic[10]],
                        ["6. " + mnemonic[5], "12. " + mnemonic[11]],
                    ]
                };
                return (
                    <Container>
                        <Content>
                            <View style={styles.contentview}>
                                <Grid style={styles.grid}>
                                    <Col style={{padding: 20}}>
                                        <Text style={styles.texttitle}>
                                            Wallet generated
                                        </Text>
                                        <Text style={styles.addressText}>
                                            {this.props.wallet.wallet.address}
                                        </Text>
                                        <Table borderStyle={{borderWidth: 1, borderColor: '#121212', padding: 16}}>
                                            <Row data={data.tableHead} style={styles.head} textStyle={styles.tabletext}/>
                                            <Rows data={data.tableData} textStyle={styles.tabletext}/>
                                        </Table>
                                        <Text style={styles.lasttext}>
                                            These 12 words are your seed words, be sure to not them somewhere safe
                                        </Text>
                                        <View style={styles.buttonview}>
                                            <Button rounded bordered info small onPress={() => {
                                                this.props.navigation.navigate('Verifier');
                                            }}>
                                                <Text>All the words are safely noted !</Text>
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
        generate: () => {dispatch(WalletGenerate())}
    }
};

export const Generator = connect(mapStateToProps, mapDispatchToProps)(_Generator);
