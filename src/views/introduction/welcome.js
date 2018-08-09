import React from 'react';
import {Loading} from "./loading";
import {connect} from 'react-redux';

import {Text} from 'react-native';

export class _Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.wallet.status) {
            case 'NONE':
                return (<Loading/>);
            case 'NO_WALLET':
                return (<Text>Create a wallet blabla</Text>);
            case 'READY':
                return (<Text>you should go to home now</Text>);
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        wallet: state.wallet
    }
};

export const Welcome = connect(mapStateToProps)(_Welcome);
