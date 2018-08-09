export const WalletActionType = {
    Wallet_Load: 'WALLET_LOAD',
    Wallet_Loaded: 'WALLET_LOADED',
    Wallet_Missing: 'WALLET_MISSING',
    Wallet_Generate: 'WALLET_GENERATE',
    Wallet_Generated: 'WALLET_GENERATED',
    Wallet_Error: 'WALLET_ERROR'
};

export const WalletLoad = () => {
    return {
        type: WalletActionType.Wallet_Load
    }
};

export const WalletLoaded = (wallet) => {
    return {
        type: WalletActionType.Wallet_Loaded,
        wallet
    }
};

export const WalletMissing = () => {
    return {
        type: WalletActionType.Wallet_Missing
    }
};

export const WalletError = () => {
    return {
        type: WalletActionType.Wallet_Error
    }
};

export const WalletGenerate = () => {
    return {
        type: WalletActionType.Wallet_Generate
    }
};

export const WalletGenerated = (wallet, mnemonic) => {
    return {
        type: WalletActionType.Wallet_Generated,
        wallet,
        mnemonic
    }
};
