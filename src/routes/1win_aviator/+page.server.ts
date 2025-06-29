//@ts-nocheck
import session from '$lib/js/session';
import type { Actions, PageServerLoad } from './$types';
import random from 'random';

export const load: PageServerLoad = async () => {
    return session;
};

export const actions: Actions = {
    create: async ({ request }) => {
        
    }
};