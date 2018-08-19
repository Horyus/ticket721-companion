export const walletSchema = {
    title: 'wallet_schema',
    description: 'Schema to store the user wallet.',
    version: 0,
    type: 'object',
    properties: {
        privateKey: {
            type: 'string'
        }
    },
    required: ['privateKey']
};
