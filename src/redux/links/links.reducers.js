import {LinkActionTypes} from "./links.actions";

export const linksReducers = (state = {cs: {status: 'DISCONNECTED'}, ethers: {status: 'DISCONNECTED'}, link: {status: 'WAITING'}}, action) => {
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
        case (LinkActionTypes.Link_ETHERS_Loaded):
            return {
                ...state,
                ethers: {
                    status: 'CONNECTED',
                    instance: action.instance
                }
            };
        case (LinkActionTypes.Link_ETHERS_Load_Error):
            return {
                ...state,
                ethers: {
                    status: 'ERROR',
                    error: action.error
                }
            };
        case (LinkActionTypes.Link_ETHERS_Linked):
            return {
                ...state,
                link: {
                    status: 'LINKED',
                    address: action.address
                }
            };
        case (LinkActionTypes.Link_ETHERS_Not_Linked):
            return {
                ...state,
                link: {
                    status: 'NOT_LINKED',
                    code: action.code
                }
            };
        case (LinkActionTypes.Link_Error):
            return {
                ...state,
                link: {
                    status: 'ERROR',
                    error: action.error
                }
            };
        default:
            return state;
    }
};
