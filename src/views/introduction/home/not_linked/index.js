import React from 'react';
import {connect} from 'react-redux';
import {Container, Content, View, Grid, Col, Text} from 'native-base';
import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    contentview: {
        flex: 1,
        justifyContent: 'center',
        height: Dimensions.get('window').height
    },
    grid: {
        alignItems: 'center'
    },
    logo_text: {
        textAlign: 'center',
        fontFamily: 'RobotoThin',
        fontSize: 40,
        margin: 30
    },
    text: {
        textAlign: 'center',
        fontFamily: 'RobotoThin',
        fontSize: 20,
        margin: 30
    },
    code_text: {
        color: '#f0f0f0',
        backgroundColor: '#202020',
        textAlign: 'center',
        fontFamily: 'RobotoMono',
        fontSize: 40,
        marginTop: 50
    }

});

export class _NotLinked extends React.Component {
    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.contentview}>
                        <Grid style={styles.grid}>
                            <Col>
                                <Text style={styles.logo_text}>
                                    📡
                                </Text>
                                <Text style={styles.text}>
                                    You are currently not linked !
                                    To link this companion to your Ticket721 account, go to the settings on your web application, enter the following code and follow the steps.
                                </Text>
                                <Text style={styles.code_text}>
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

const mapStateToProps = (state, ownProps) => {
    return ({
        ...ownProps,
        link: state.links
    })
};

export const NotLinked = connect(mapStateToProps)(_NotLinked);
