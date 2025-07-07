//@ts-nocheck
import session from '$lib/js/session';
import type { PageServerLoad } from './$types';
import random from 'random';

export const load: PageServerLoad = async ({ cookies }) => {
    let sc = structuredClone(session);
    sc.balance = parseFloat(cookies.get('balance'));
    sc.currency = cookies.get('currency');
    return sc;
};
