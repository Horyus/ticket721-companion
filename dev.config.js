const Fs = require('fs');

module.exports =
{
    API_URL: "http://192.168.0.6:8080",
    BC_URL: 'http://192.168.0.6:8545',
    T721HUB_ADDRESS: JSON.parse(Fs.readFileSync(process.env.DIST_PATH).toString()).deployedAddress,
    T721HUB_ABI: JSON.parse(Fs.readFileSync(process.env.DIST_PATH).toString()).abiDefinition,
    BC_CHAIN_ID: 2702,
    BC_CHAIN_NAME: 'custom'
};
