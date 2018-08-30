import {takeEvery, call, take, put, select} from 'redux-saga/effects';
import {DMActionTypes, DMFetchingTickets, DMGetTickets, DMSetTickets} from "./data_manager.actions";
import {eventChannel, END} from 'redux-saga';
import {load} from "../../rxdb";

function get_tickets_channel() {
    return eventChannel((emit) => {

        load().then(async (rxdb) => {


            const tickets = await rxdb.tickets.find().exec();
            emit(DMSetTickets(tickets));

            emit(END);
        });

        return () => {};
    });
}

function* DM_Get_Tickets() {

    const get_tickets = yield call(get_tickets_channel);

    try {
        while (true) {
            const event = yield take(get_tickets);
            yield put(event);
        }
    } finally {
        get_tickets.close();
    }

}

function fetch_tickets(t721, t721pu, address) {
    return (eventChannel((emit) => {

        t721.functions.balanceOf(address).then(async v_balance => {
            const p_balance = await t721pu.functions.balanceOf(address);

            const tickets = [];

            for (let v_idx = 0; v_idx < v_balance.toNumber(); ++v_idx) {
                try {
                    const id = (await t721.functions.tokenOfOwnerByIndex(address, v_idx)).toNumber();
                    const uri = await t721.functions.tokenURI(id);
                    const infos = JSON.parse(await (await fetch(uri)).text());
                    tickets.push({
                        ID: id,
                        verified: true,
                        eventIMG: infos.image,
                        eventName: infos.name
                    })
                } catch (e) {

                }
            }


            for (let p_idx = 0; p_idx < p_balance.toNumber(); ++p_idx) {
                try {
                    const id = (await t721pu.functions.tokenOfOwnerByIndex(address, p_idx)).toNumber();
                    const uri = await t721pu.functions.tokenURI(id);
                    const infos = JSON.parse(await (await fetch(uri)).text());
                    tickets.push({
                        ID: id,
                        verified: false,
                        eventIMG: infos.image,
                        eventName: infos.name
                    })
                } catch (e) {

                }
            }

            const rxdb = await load();

            await rxdb.tickets.find().remove();
            for (const ticket of tickets) {
                await rxdb.tickets.insert(ticket);
            }

            emit(DMGetTickets());
            emit(END);

        });


        return () => {};
    }));
}

function* DM_Fetch_Tickets() {
    const status = (yield select()).dm.status;
    const contracts = (yield select()).links.ethers.instance;
    const address = (yield select()).links.link.address;
    if (status === 'READY' && address) {
        yield put(DMFetchingTickets());

        const fetch = yield call(fetch_tickets, contracts.Ticket721, contracts.Ticket721Public, address);

        try {
            while (true) {
                const event = yield take(fetch);
                yield put(event);
            }
        } finally {
            fetch.close();
        }
    }
}

export function* DMSagas() {
    yield takeEvery(DMActionTypes.DM_Get_Tickets, DM_Get_Tickets);
    yield takeEvery(DMActionTypes.DM_Fetch_Tickets, DM_Fetch_Tickets);
}
