import React from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import {StyleSheet, Image} from 'react-native';
import {Container, Header, Left, Button, Body, Title, Right, Content, Icon, Separator, Text, ListItem, Card, CardItem} from 'native-base';
import QRCode from 'react-native-qrcode';
import {Wallet} from 'ethers';

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

class _QrCode extends React.Component {
    constructor(props) {
        super(props);
        const payload = this.genPayload();
        this.state = {
            value: payload,
            interval: setInterval(() => {
                    this.setState({
                        value: this.genPayload()
                    })
                }, 5000)
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    genPayload() {
        const ticket = this.props.navigation.getParam('ticket', 'NO-ID');
        const date = Date.now();
        const message = (ticket.verified ? 'V' : 'P') + ticket.ID + date.toString();
        return JSON.stringify({
            id: ticket.ID,
            v: ticket.verified,
            timestamp: date,
            sig: this.props.wallet.wallet.signMessage(message)
        });
    }

    render() {
        const ticket = this.props.navigation.getParam('ticket', 'NO-ID');
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
                    <Title style={styles.title}>your ticket</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content contentContainerStyle={{flex:1, justifyContent: 'center', alignItems: 'center', padding: 5}}>
                    <Card style={{width: '90%', backgroundColor: '#121212', borderRadius: 15, shadowColor: 'black', shadowOpacity: 0.5, shadowOffset: {width: 5, height: 5}, shadowRadius: 10, borderWidth: 0}}>
                        <CardItem style={{backgroundColor: 'transparent'}}>
                            <Body>
                            <Text style={{color: '#f0f0f0'}}>{ticket.eventName}</Text>
                            <Text style={{color: '#f0f0f0'}} note>ID #{ticket.ID}</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: ticket.eventIMG}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <QRCode
                                value={this.state.value}
                                bgColor="#f0f0f0"
                                fgColor="#121212"
                                size={340}
                            />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        ) ;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        wallet: state.wallet
    }
};

export const QrCode = withNavigation(connect(mapStateToProps)(_QrCode));

