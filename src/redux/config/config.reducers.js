import {ConfigActionTypes} from "./config.actions";

export const configReducers = (state = {}, action) => {
    switch (action.type) {
        case ConfigActionTypes.Config_Loaded:
            return action.config;
        default:
            return state;
    }
};
