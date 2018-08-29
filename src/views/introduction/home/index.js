import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Grid, Col, Text} from 'native-base';
import {connect} from 'react-redux';
import Expo from 'expo';
import {Loading} from "../loading";

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
        switch (this.props.link.link.status) {
            case 'WAITING':
                return <Loading/>;
            case 'LINKED':
                return (
                    <Container>
                        <Content>
                            <View style={styles.contentview}>
                                <Grid style={styles.grid}>
                                    <Col>
                                        <Text style={styles.text}>
                                            You are Linked
                                        </Text>
                                        <Text style={styles.text}>
                                            {this.props.wallet.wallet.address}
                                        </Text>
                                    </Col>
                                </Grid>
                            </View>
                        </Content>
                    </Container>
                );
            case 'NOT_LINKED':
                return (
                    <Container>
                        <Content>
                            <View style={styles.contentview}>
                                <Grid style={styles.grid}>
                                    <Col>
                                        <Text style={styles.text}>
                                            You are not Linked
                                        </Text>
                                        <Text style={styles.text}>
                                            {this.props.wallet.wallet.address}
                                        </Text>
                                        <Text style={styles.text}>
                                            {this.props.link.link.code}
                                        </Text>
                                    </Col>
                                </Grid>
                            </View>
                        </Content>
                    </Container>
                );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        wallet: state.wallet,
        config: state.config,
        link: state.links
    }
};

export const Home = connect(mapStateToProps)(_Home);
