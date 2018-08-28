export const LinkActionTypes = {
    Link_CS_Load: 'LINK_CS_LOAD',
    Link_CS_Loaded: 'LINK_CS_LOADED',
    Link_CS_Load_Error: 'LINK_CS_LOAD_ERROR',
    Link_ETHERS_Load: 'LINK_ETHERS_LOAD',
    Link_ETHERS_Loaded: 'LINK_ETHERS_LOADED',
    Link_ETHERS_Load_Error: 'LINK_ETHERS_LOAD_ERROR'
};

export const LinkCSLoad = () => {
    return {
        type: LinkActionTypes.Link_CS_Load
    };
};

export const LinkCSLoaded = (instance) => {
    return {
        type: LinkActionTypes.Link_CS_Loaded,
        instance
    };
};

export const LinkCSLoadError = (error) => {
    return {
        type: LinkActionTypes.Link_CS_Load_Error,
        error
    };
};

export const LinkEthersLoad = () => {
    return {
        type: LinkActionTypes.Link_ETHERS_Load
    };
};

export const LinkEthersLoaded = (instance) => {
    return {
        type: LinkActionTypes.Link_ETHERS_Loaded,
        instance
    };
};

export const LinkEthersLoadError = (error) => {
    return {
        type: LinkActionTypes.Link_ETHERS_Load_Error,
        error
    };
};

