//@ts-nocheck
import session from '$lib/js/session';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	return {balance: parseFloat(cookies.get('balance')), currency: cookies.get('currency'), all_currencies: Object.keys(session.all_currencies), role: locals.role}
};

export const actions: Actions = {
    balance: async function ({ request, cookies }) {
        let balance = (await request.formData()).get('balance');
        cookies.set('balance', String(parseFloat(balance)), { path: '/', maxAge: 30 * 24 * 60 * 60 })
    },
    currency: async function ({ request, cookies }) {
        let currency = (await request.formData()).get('currency');
        cookies.set('currency', currency, { path: '/', maxAge: 30 * 24 * 60 * 60 })
    }
};