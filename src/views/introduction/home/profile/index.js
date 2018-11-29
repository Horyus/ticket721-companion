import React from 'react';
import {connect} from 'react-redux';
import {Container, Content, Header, Button, Icon, Title, Right, Text, List, ListItem, Thumbnail, Left, Body} from 'native-base';
import {StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {DMFetchTickets, DMGetTickets} from "../../../../redux/data_manager/data_manager.actions";

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
        marginLeft: 10,
        color: '#202020'
    }
});


class _Profile extends React.Component {
    constructor(props) {
        super(props);
        this.props.get();
    }

    render() {

        const list_item = this.props.data.tickets
            .map((elem) => {
                return (
                    <ListItem thumbnail key={(elem.verified ? 'V' : '') + elem.ID.toString()} onPress={() => {this.props.navigation.navigate('QrCode', {ticket: elem})}}>
                        <Left>
                            <Thumbnail square source={{ uri: elem.eventIMG }} />
                        </Left>
                        <Body>
                        <Text style={styles.listitem_title}>{elem.eventName}</Text>
                        <Text style={styles.listitem_text} note numberOfLines={1}>ID #{elem.ID}</Text>
                        </Body>
                    </ListItem>
                )
            });

        return (
            <Container>
                <Header style={styles.head} transparent>
                    <Left>
                        <Button transparent>
                            {
                                this.props.inet === 'OFFLINE'
                                    ?
                                    <Icon style={{fontSize: 25, marginLeft: 10, color: 'red'}} type="MaterialCommunityIcons" name="wifi-off"/>
                                    :
                                    <Icon style={styles.left_icon} name="refresh" onPress={() => {this.props.fetch()}}/>
                            }
                            {
                                this.props.inet === 'UNKNOWN'
                                    ?
                                    <Icon style={{fontSize: 25, marginLeft: 10, color: '#eeeeee'}} type="Entypo" name="dots-three-horizontal"/>
                                    :
                                    null
                            }
                        </Button>
                    </Left>
                    <Body>
                    <Title style={styles.title}>my tickets</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('Settings');
                        }}>
                            <Icon style={{color: '#202020'}} name="settings"/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List>
                        {list_item}
                    </List>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({
        ...ownProps,
        address: state.links.link.address,
        inet: state.config.inet,
        data: state.dm
    })
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        ...ownProps,
        get: () => {dispatch(DMGetTickets())},
        fetch: () => {dispatch(DMFetchTickets())}
    })
};

export const Profile = withNavigation(connect(mapStateToProps, mapDispatchToProps)(_Profile));
