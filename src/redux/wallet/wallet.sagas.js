import {takeEvery, call, take, put, select} from "redux-saga/effects";
import {
    WalletActionType,
    WalletError,
    WalletLoaded,
    WalletMissing,
    WalletGenerated,
    WalletReady
} from "./wallet.actions";
import {END, eventChannel} from "redux-saga";
import {load} from "../../rxdb";
import {Wallet} from 'ethers';
import {ConfigLoad} from "../config/config.actions";

function* Wallet_Load_eventChannel() {
    return eventChannel((emit) => {

        load()
            .then(async rxdb => {

                //await rxdb.wallet.find().remove();

                const wallet = await rxdb.wallet.find().exec();

                if (!wallet) {
                    emit(WalletError());
                    emit(END);
                    return ;
                }

                if (!wallet.length) {
                    emit(WalletMissing());
                    emit(END);
                    return ;
                }

                emit(WalletLoaded(new Wallet(wallet[0].privateKey)));
                emit(ConfigLoad());
                emit(END);
            })
            .catch(e => {
                console.log(e);
            });
        return () => {};
    });
}

function* Wallet_Load(_) {
    const WLec = yield call(Wallet_Load_eventChannel);

    try {
        while (true) {
            const event = yield take(WLec);
            yield put(event);
        }
    } finally {
        WLec.close();
    }

}

function* Wallet_Generate_eventChannel() {
    return eventChannel((emit) => {
        setTimeout(() => {
            try {
                const wallet = Wallet.createRandom();
                emit(WalletGenerated(wallet, wallet.mnemonic.split(' ')));
                emit(END);
            } catch (e) {
                emit(WalletError());
                emit(END);
            }
        }, 500);

        return () => {};
    })
}

function* Wallet_Generate(_) {
    const WGec = yield call(Wallet_Generate_eventChannel);

    try {
        while (true) {
            const event = yield take(WGec);
            yield put(event);
        }
    } finally {
        WGec.close();
    }

}

function* Wallet_Save_eventChannel() {
    const state = yield select();
    return eventChannel((emit) => {
        load().then(async rxdb => {
            await rxdb.wallet.insert({
                privateKey: state.wallet.wallet.privateKey
            });
            emit(WalletReady());
            emit(ConfigLoad());
            emit(END);
        });
        return () => {};
    })
}

function* Wallet_Save(_) {
    const WSec = yield call(Wallet_Save_eventChannel);

    try {
        while (true) {
            const event = yield take(WSec);
            yield put(event);
        }
    } finally {
        WSec.close();
    }
}

export function* walletSagas() {
    yield takeEvery(WalletActionType.Wallet_Load, Wallet_Load);
    yield takeEvery(WalletActionType.Wallet_Generate, Wallet_Generate);
    yield takeEvery(WalletActionType.Wallet_Save, Wallet_Save);
}
