import {ConfigActionTypes} from "./config.actions";

export const configReducers = (state = {}, action) => {
    switch (action.type) {
        case ConfigActionTypes.Config_Loaded:
            return {
                ...state,
                env: action.config
            };
        case ConfigActionTypes.Config_Online:
            return {
                ...state,
                inet: 'ONLINE'
            };
        case ConfigActionTypes.Config_Offline:
            return {
                ...state,
                inet: 'OFFLINE'
            };
        default:
            return state;
    }
};
