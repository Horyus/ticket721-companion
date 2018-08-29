const Fs = require('fs');

module.exports =
{
    API_URL: "http://172.20.10.2:8080",
    BC_URL: 'http://172.20.10.2:8545',
    T721HUB_ADDRESS: JSON.parse(Fs.readFileSync(process.env.DIST_PATH + '/contracts/Ticket721Hub.json').toString()).deployedAddress,
    T721HUB_ABI: JSON.parse(Fs.readFileSync(process.env.DIST_PATH + '/contracts/Ticket721Hub.json').toString()).abiDefinition,
    BC_CHAIN_ID: 2702,
    BC_CHAIN_NAME: 'custom'
};
