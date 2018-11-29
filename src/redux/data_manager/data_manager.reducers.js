import {DMActionTypes} from "./data_manager.actions";

export const DMReducers = (state = {tickets: [], status: 'READY'}, action) => {

    switch (action.type) {
        case DMActionTypes.DM_Fetching_Tickets:
            return {
                ...state,
                status: 'FETCHING'
            };
        case DMActionTypes.DM_Set_Tickets:
            return {
                ...state,
                status: 'READY',
                tickets: action.tickets
            };
        default:
            return state;
    }

};
