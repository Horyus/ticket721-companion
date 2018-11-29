import {ConfigLoaded, ConfigActionTypes, ConfigOffline, ConfigOnline, ConfigCheckInet} from "./config.actions";
import {takeEvery, put, take, call} from "redux-saga/effects";
import {eventChannel, END} from 'redux-saga';
import Expo from 'expo';
import {LinkCSLoad} from "../links/links.actions";
import {NetInfo, Platform} from 'react-native';

const getConnectionInfo = async () => {
    if (Platform.OS === 'ios') {
        return new Promise((resolve, reject) => {
            const connectionHandler = connectionInfo => {
                NetInfo.removeEventListener('connectionChange', connectionHandler);

                resolve(connectionInfo)
            };

            NetInfo.addEventListener('connectionChange', connectionHandler)
        })
    }
    return NetInfo.getConnectionInfo()
};

function Config_Load_Channel() {
    return (eventChannel((emit) => {

        setInterval(() => {
            getConnectionInfo()
                .then((conn) => {
                    if (conn.type !== 'unknown' && conn.type !== 'none') {
                        emit(ConfigOnline());
                        return ;
                    }
                    emit(ConfigOffline());
                })
                .catch((e) => {
                    emit(ConfigOffline());
                });
        }, 1000);

        return () => {};
    }));
}

function* Config_Load(_) {
    yield put(ConfigLoaded(Expo.Constants.manifest.extra));
    yield put(ConfigCheckInet());
}

function* Config_Loaded(_) {
    yield put(LinkCSLoad());
}

function* Config_Check_Inet() {
    const config_load = yield call(Config_Load_Channel);

    try {
        while (true) {
            const event = yield take(config_load);
            yield put(event);
        }
    } finally {
        config_load.close();
    }
}

export function* configSagas() {
    yield takeEvery(ConfigActionTypes.Config_Load, Config_Load);
    yield takeEvery(ConfigActionTypes.Config_Loaded, Config_Loaded);
    yield takeEvery(ConfigActionTypes.Config_Check_Inet, Config_Check_Inet);
}
