//@ts-nocheck
import session from '$lib/js/session';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return session;
};

export const actions: Actions = {
    create: async ({ request }) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let traps = (await request.formData()).get('traps');
        session.mines_traps = Array.from(new Set(Array.from({ length: parseInt(traps) }, () => Math.floor(Math.random() * 25))));
    },
    take: async ({ request }) => {
        let take = parseFloat((await request.formData()).get('take'))
        session.balance+=take;
        return {take}
    },
    cellClick: async ({ request }) => {
        // await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (1000 - 300 + 1)) + 300));
        let cell = parseInt((await request.formData()).get('cell'))
        if (session.mines_traps.indexOf(cell)!=-1) {
            return { loss: cell }
        } else {
            return { win: cell }
        }
    }
};