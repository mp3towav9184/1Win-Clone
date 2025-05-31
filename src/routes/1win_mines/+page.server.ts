//@ts-nocheck
import session from '$lib/js/session';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return session;
};

export const actions: Actions = {
    create: async ({ request }) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let data = await request.formData();
        let traps = data.get('traps');
        session.mines_traps = Array.from(new Set(Array.from({ length: parseInt(traps) }, () => Math.floor(Math.random() * 25))));
        console.log(session.mines_traps)
    }
};