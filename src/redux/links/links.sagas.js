import {
    LinkActionTypes,
    LinkCSLoaded,
    LinkCSLoadError, LinkEthersCheckLink, LinkEthersLinked,
    LinkEthersLoad,
    LinkEthersLoaded, LinkEthersLoadError, LinkEthersNotLinked
} from "./links.actions";
import {takeEvery, select, put, call, take} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
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
        yield put(LinkEthersLoaded({Ticket721Hub}));
        yield put(LinkEthersCheckLink(true));
    } catch (e) {
        yield put(LinkEthersLoadError(e));
    }
}

function* Link_Ethers_Check_Link_Channel(action) {

    const T721Hub = (yield select()).links.ethers.instance.Ticket721Hub;
    const CSAPI = (yield select()).links.cs.instance;
    const Address = (yield select()).wallet.wallet.address;
    const Companion_Link = (yield select()).links.link;

    return eventChannel((emit) => {


        T721Hub.functions.companions(Address).then((res) => {
            if (res === '0x0000000000000000000000000000000000000000') {
                if (action.publish) {
                    // TODO Check CS Status
                    CSAPI.get_code(Address).then(response => response.text())
                        .then((code) => {
                            emit(LinkEthersNotLinked(JSON.parse(code).code));
                            setTimeout(() => {
                                emit(LinkEthersCheckLink(false));
                                emit(END);
                            }, 5000);
                        })
                        .catch((e) => {
                            //TODO Something
                        })
                } else if (Companion_Link) {
                    console.log(Companion_Link.code);
                    emit(LinkEthersNotLinked(Companion_Link.code));
                    setTimeout(() => {
                        emit(LinkEthersCheckLink(false));
                        emit(END);
                    }, 5000);
                }
            } else {
                emit(LinkEthersLinked(res));
                emit(END);
            }
        })
            .catch(e => {
                console.warn(e);
                setTimeout(() => {
                    emit(LinkEthersCheckLink(false));
                    emit(END);
                }, 5000);
            });

        return (() => {});
    });
}

function* Link_Ethers_Check_Link(action) {

    const check_link_channel = yield call(Link_Ethers_Check_Link_Channel, action);

    console.log('hola');

    try {
        while (true) {
            const event = yield take(check_link_channel);
            yield put(event);
        }
    } finally {
        check_link_channel.close();
    }

}

export function* linksSagas() {
    yield takeEvery(LinkActionTypes.Link_CS_Load, Link_CS_Load);
    yield takeEvery(LinkActionTypes.Link_ETHERS_Load, Link_Ethers_Load);
    yield takeEvery(LinkActionTypes.Link_ETHERS_Check_Link, Link_Ethers_Check_Link);
}
