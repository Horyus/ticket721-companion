import {ConfigLoaded, ConfigActionTypes} from "./config.actions";
import {takeEvery, put, take} from "redux-saga/effects";
import Expo from 'expo';
import {LinkCSLoad} from "../links/links.actions";

function* Config_Load(_) {
    yield put(ConfigLoaded(Expo.Constants.manifest.extra));
}

function* Config_Loaded(_) {
    yield put(LinkCSLoad());
}

export function* configSagas() {
    yield takeEvery(ConfigActionTypes.Config_Load, Config_Load);
    yield takeEvery(ConfigActionTypes.Config_Loaded, Config_Loaded);
}
