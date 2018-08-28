import {LinkActionTypes, LinkCSLoad, LinkCSLoaded, LinkCSLoadError, LinkEthersLoad} from "./links.actions";
import {takeEvery, select, put} from 'redux-saga/effects';
import {CSLink} from "../../utils/cslink";
import {providers, Contract} from 'ethers';

function* Link_CS_Load(action) {
    try {
        const CS_API_URL = (yield select()).config.API_URL;
        const instance = new CSLink(CS_API_URL);
        yield put(LinkCSLoaded(instance));
        yield put(LinkEthersLoad());
    } catch (e) {
        yield put(LinkCSLoadError(e));
    }
}

function* Link_Ethers_Load(action) {
    try {
        const {BC_URL, T721HUB_ADDRESS, T721HUB_ABI, BC_CHAIN_ID, BC_CHAIN_NAME} = (yield select()).config;
        const provider = new providers.JsonRpcProvider(BC_URL, {name: BC_CHAIN_NAME, chainId: BC_CHAIN_ID});
        const Ticket721Hub = new Contract(T721HUB_ADDRESS, T721HUB_ABI, provider);
    } catch (e) {
    }
}

export function* linksSagas() {
    yield takeEvery(LinkActionTypes.Link_CS_Load, Link_CS_Load);
    yield takeEvery(LinkActionTypes.Link_ETHERS_Load, Link_Ethers_Load)
}
