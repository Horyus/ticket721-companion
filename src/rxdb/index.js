import RxDB from 'rxdb';
RxDB.plugin(require('pouchdb-adapter-asyncstorage').default);

import {walletSchema} from "./schemas/wallet";
import {ticketsSchema} from "./schemas/tickets";

const databaseName = 'ticket721companion';

export let rxdb;

export const load = () => {
    return new Promise(async (ok, ko) => {
        if (rxdb) return ok(rxdb);
        try {
            rxdb = await RxDB.create({
                name: databaseName,
                adapter: 'asyncstorage',
                password: 'local_password',
                multiInstance: false
            });

            const walletCollection = await rxdb.collection({
                name: 'wallet',
                schema: walletSchema
            });

            const ticketsCollection = await rxdb.collection({
                name: 'tickets',
                schema: ticketsSchema
            });

            ok(rxdb);
        } catch (e) {
            ko(e);
        }
    });
};
