import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Container, Header, Left, Icon, Body, Title, Content, Button, Right, Text, View} from 'native-base';

const styles = StyleSheet.create({
    title: {
        fontFamily: 'RobotoThin',
        fontSize: 20
    },
    listitem_title: {
        fontFamily: 'RobotoLight'
    },
    listitem_text: {
        fontFamily: 'RobotoThin'

    },
    head: {
        height: 70,
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1
    },
    left_icon: {
        marginLeft: 10
    },
    comp_addr_title: {
        fontFamily: 'RobotoLight',
        margin: 10,
        fontSize: 20
    },
    comp_addr_content: {
        fontFamily: 'RobotoMono',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        color: '#f0f0f0',
        backgroundColor: '#202020'
    },
    buttonview: {
        marginTop: 200,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

class _Settings extends React.Component {
    render() {
        return (
            <Container>
                <Header style={styles.head} transparent>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.pop();
                        }}>
                            <Icon style={{color: '#202020', marginLeft: 10}} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.title}>settings</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <View>
                        <Title style={styles.comp_addr_title}>companion address</Title>
                        <Text style={styles.comp_addr_content}>{this.props.wallet}</Text>
                    </View>
                    {
                        this.props.link.address
                            ?
                            <View>
                                <Title style={styles.comp_addr_title}>linked to</Title>
                                <Text style={styles.comp_addr_content}>{this.props.link.address}</Text>
                            </View>
                            :
                            null
                    }
                    <View style={styles.buttonview}>
                        <Button rounded bordered danger onPress={() => {alert('TODO')}}><Text>reset companion</Text></Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        wallet: state.wallet.wallet.address,
        link: state.links.link
    }
};

export const Settings = withNavigation(connect(mapStateToProps)(_Settings));
