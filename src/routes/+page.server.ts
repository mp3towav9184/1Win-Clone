//@ts-nocheck
import session from '$lib/js/session';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return {balance: session.balance, role: locals.role}
};

export const actions: Actions = {
    default: async function ({ request }) {
        let balance = (await request.formData()).get('balance');
        session.balance = balance;
    }
};