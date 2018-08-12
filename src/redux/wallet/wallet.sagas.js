import {takeEvery, call, take, put} from "redux-saga/effects";
import {WalletActionType, WalletError, WalletLoaded, WalletMissing, WalletGenerated} from "./wallet.actions";
import {END, eventChannel} from "redux-saga";
import {load} from "../../rxdb";
import {Wallet} from 'ethers';

function* Wallet_Load_eventChannel() {
    return eventChannel((emit) => {

        load().then(async rxdb => {
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
            emit(END);
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

export function* walletSagas() {
    yield takeEvery(WalletActionType.Wallet_Load, Wallet_Load);
    yield takeEvery(WalletActionType.Wallet_Generate, Wallet_Generate);
}
