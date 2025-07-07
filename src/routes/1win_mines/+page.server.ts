//@ts-nocheck
import session from '$lib/js/session';
import type { Actions, PageServerLoad } from './$types';
import random from 'random';

export const load: PageServerLoad = async ({ cookies }) => {
    let sc = structuredClone(session);
    sc.balance = parseFloat(cookies.get('balance'));
    sc.currency = cookies.get('currency');
    return sc;
};

export const actions: Actions = {
    create: async ({ request, cookies }) => {
        let data = await request.formData();
        let traps = data.get('traps');
        let bet = data.get('bet');
        let balance = parseFloat(cookies.get('balance'));
        balance -= parseFloat(bet);
        cookies.set('balance', balance, { path: '/', maxAge: 30 * 24 * 60 * 60 });
        session.mines_traps = random.sample(Array.from({ length: 25 }, (_, i) => i), parseInt(traps));
    },
    take: async ({ request, cookies }) => {
        let take = parseFloat((await request.formData()).get('take'))
        let balance = parseFloat(cookies.get('balance'));
        balance += take;
        cookies.set('balance', balance, { path: '/', maxAge: 30 * 24 * 60 * 60 });
        return {take}
    },
    cellClick: async ({ request, cookies }) => {
        let data = await request.formData();
        let cell = parseInt(data.get('cell'));
        let steps = parseInt(data.get('steps'));
        let traps = parseInt(data.get('traps'));
        let bet = parseFloat(data.get('bet'));
        if (steps + 1 == 25 - traps) {
            let balance = parseFloat(cookies.get('balance'));
            balance += bet * session.coef[traps].at(-1);
            cookies.set('balance', balance, { path: '/', maxAge: 30 * 24 * 60 * 60 });
        }
        if (session.mines_traps.indexOf(cell)!=-1) {
            return { loss: cell }
        } else {
            return { win: cell }
        }
    }
};
