export const ConfigActionTypes = {
    Config_Load: 'CONFIG_LOAD' ,
    Config_Loaded: 'CONFIG_LOADED',
    Config_Check_Inet: 'CONFIG_CHECK_INET',
    Config_Online: 'CONFIG_ONLINE',
    Config_Offline: 'CONFIG_OFFLINE'
};

export const ConfigLoad = () => {
    return {
        type: ConfigActionTypes.Config_Load
    };
};

export const ConfigLoaded = (config) => {
    return {
        type: ConfigActionTypes.Config_Loaded,
        config
    }
};

export const ConfigCheckInet = () => {
    return {
        type: ConfigActionTypes.Config_Check_Inet
    }
};

export const ConfigOnline = () => {
    return {
        type: ConfigActionTypes.Config_Online
    }
};

export const ConfigOffline = () => {
    return {
        type: ConfigActionTypes.Config_Offline
    }
};

