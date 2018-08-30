export const DMActionTypes = {
    DM_Get_Tickets: 'DM_GET_TICKETS',
    DM_Fetch_Tickets: 'DM_FETCH_TICKETS',
    DM_Fetching_Tickets: 'DM_FETCHING_TICKETS',
    DM_Set_Tickets: 'DM_SET_TICKETS'
};

export const DMGetTickets = () => {
    return {
        type: DMActionTypes.DM_Get_Tickets
    }
};

export const DMFetchingTickets = () => {
    return {
        type: DMActionTypes.DM_Fetching_Tickets
    }
};

export const DMFetchTickets = () => {
    return {
        type: DMActionTypes.DM_Fetch_Tickets
    }
};

export const DMSetTickets = (tickets) => {
    return {
        type: DMActionTypes.DM_Set_Tickets,
        tickets
    }
};

