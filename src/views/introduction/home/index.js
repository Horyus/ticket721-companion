import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Text} from 'native-base';
import {connect} from 'react-redux';

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
        fontSize: 15,
        margin: 30
    },
    buttonview: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

class _Home extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.contentview}>
                        <Grid style={styles.grid}>
                            <Col>
                                <Text style={styles.text}>
                                    Home
                                </Text>
                                <Text style={styles.text}>
                                    {this.props.wallet.wallet.address}
                                </Text>
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

export const Home = connect(mapStateToProps)(_Home);
