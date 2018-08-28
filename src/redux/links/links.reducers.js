import {LinkActionTypes} from "./links.actions";

export const linksReducers = (state = {cs: {status: 'DISCONNECTED'}, web3: {status: 'DISCONNECTED'}}, action) => {
    switch (action.type) {
        case (LinkActionTypes.Link_CS_Loaded):
            return {
                ...state,
                cs: {
                    status: 'CONNECTED',
                    instance: action.instance
                }
            };
        case (LinkActionTypes.Link_CS_Load_Error):
            return {
                ...state,
                cs: {
                    status: 'ERROR',
                    error: action.error
                }
            };
        case (LinkActionTypes.Link_WEB3_Loaded):
            return {
                ...state,
                web3: {
                    status: 'CONNECTED',
                    instance: action.instance
                }
            };
        case (LinkActionTypes.Link_WEB3_Load_Error):
            return {
                ...state,
                web3: {
                    status: 'ERROR',
                    error: action.error
                }
            };
        default:
            return state;
    }
};
