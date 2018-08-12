import {WalletActionType} from "./wallet.actions";

export const walletReducers = (state = {status: 'NONE'}, action) => {
    switch (action.type) {
        case WalletActionType.Wallet_Loaded:
            return {
                ...state,
                status: 'READY',
                wallet: action.wallet
            };
        case WalletActionType.Wallet_Missing:
            return {
                ...state,
                status: 'NO_WALLET'
            };
        case WalletActionType.Wallet_Generate:
            return {
                ...state,
                status: 'GENERATING'
            };
        case WalletActionType.Wallet_Generated:
            return {
                ...state,
                status: 'GENERATED',
                wallet: action.wallet,
                mnemonic: action.mnemonic
            };
        case WalletActionType.Wallet_Ready:
            return {
                ...state,
                status: 'READY'
            }
    }
    return state;
};
