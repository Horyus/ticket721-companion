export const ConfigActionTypes = {
    Config_Load: 'CONFIG_LOAD' ,
    Config_Loaded: 'CONFIG_LOADED'
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
