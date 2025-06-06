//@ts-nocheck
import session from '$lib/js/session';
import type { Actions, PageServerLoad } from './$types';
import random from 'random';

export const load: PageServerLoad = async () => {
    return session;
};

export const actions: Actions = {
    create: async ({ request }) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let data = await request.formData();
        let traps = data.get('traps');
        let bet = data.get('bet');
        session.balance-=parseFloat(bet);
        session.mines_traps = random.sample(Array.from({ length: 25 }, (_, i) => i), parseInt(traps));
    },
    take: async ({ request }) => {
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (1500 - 500 + 1)) + 500));
        let take = parseFloat((await request.formData()).get('take'))
        session.balance+=take;
        return {take}
    },
    cellClick: async ({ request }) => {
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (1500 - 500 + 1)) + 500));
        let data = await request.formData();
        let cell = parseInt(data.get('cell'));
        let steps = parseInt(data.get('steps'));
        let traps = parseInt(data.get('traps'));
        let bet = parseFloat(data.get('bet'));
        if (steps + 1 == 25 - traps) { session.balance += bet * session.coef[traps].at(-1) }
        if (session.mines_traps.indexOf(cell)!=-1) {
            return { loss: cell }
        } else {
            return { win: cell }
        }
    }
};