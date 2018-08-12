import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Button, Text} from 'native-base';
import {WalletSave} from "../../../redux/wallet/wallet.actions";
import {connect} from 'react-redux';

const text = `
You succesfully created your Wallet !
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

class _Ready extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch(this.props.status) {
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
                                            <Button rounded bordered success small onPress={() => {
                                                this.props.save();
                                            }}>
                                                <Text>Use Ticket721 Companion</Text>
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
        status: state.wallet.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        save: () => {dispatch(WalletSave())}
    }
};

export const Ready = connect(mapStateToProps, mapDispatchToProps)(_Ready);
