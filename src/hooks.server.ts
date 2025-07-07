//@ts-nocheck
import { PASSWORD, USERNAME } from '$env/static/private';
import { StringDEC } from '$lib/func';
import prisma from '$lib/prisma';
import { redirect, type Handle } from '@sveltejs/kit';

const BYPASS = ['/status', '/1win_mines_hack', '/1win_aviator_hack', '/login'];

export const handle: Handle = async ({ event, resolve }) => {
    if (BYPASS.indexOf(event.url.pathname)!=-1) {return resolve(event)}

    if (!event.cookies.get('balance')) {
        event.cookies.set('balance', parseFloat(Math.floor(Math.random() * (8000 - 1050 + 1)) + 1050 + Math.random()).toFixed(2), { path: '/', maxAge: 30 * 24 * 60 * 60 })
    }
    if (!event.cookies.get('currency')) {
        event.cookies.set('currency', 'USD', { path: '/', maxAge: 30 * 24 * 60 * 60 })
    }
    
    let session = event.cookies.get('session');
    let role : 'super' | 'co-admin' = null;
    try {
        let [user, pass] = StringDEC(session).split(':');
        let coa = await prisma.coAdmins.findFirst({ where: { user: user, pass: pass } });
        let isSuper = user == USERNAME && pass == PASSWORD;
        if (isSuper) {
            role = 'super';
        } else if (coa && coa.expiresAt - new Date() > 0) {
            role = 'co-admin';
        }
    } catch {}

    if (!role) redirect(302, '/login');
    event.locals.role = role;

	return resolve(event);
};
