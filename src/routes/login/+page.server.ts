//@ts-nocheck
import { CF_SECRET, PASSWORD, USERNAME } from "$env/static/private";
import { StringENC, StringDEC } from "$lib/func";
import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";


async function isTokenValid(token : string) {
    let data = new FormData();
    data.append('secret', CF_SECRET);
    data.append('response', token);
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: data
    });
    const d = await r.json();
    return d.success;
}

export const load: PageServerLoad = async ({ cookies }) => {
    let session = cookies.get('session');
    let loggedIn = false;
    try {
        let [user, pass] = StringDEC(session).split(':');
        let coa = await prisma.coAdmins.findFirst({ where: { user: user, pass: pass } });
        let isSuper = user == USERNAME && pass == PASSWORD;
        if (isSuper || (coa && coa.expiresAt - new Date() > 0)) {
            loggedIn = true
        }
    } catch {}
    if (loggedIn) redirect(302, '/');
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        let data = await request.formData();
        let user = data.get('user');
        let pass = data.get('pass');
        let token = data.get('cf-turnstile-response');
        if (!await isTokenValid(token)) return {success: false, msg: 'Invalid Captcha Token'};
        let coa = await prisma.coAdmins.findFirst({ where: { user: user, pass: pass } });
        let isSuper = user == USERNAME && pass == PASSWORD;

        if (coa && coa.expiresAt - new Date() < 0) {
            return { success: false, msg: 'Your access has been expired. Please contact the admin to renew it.' }
        }
        if (isSuper || coa) {
            cookies.set('session', StringENC(user + ':' + pass), { path: '/', maxAge: 3 * 24 * 60 * 60 })
            redirect(302, '/')
        } else {
            return { success: false, msg: 'Invalid username or password' }
        }
    }
};

