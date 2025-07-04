//@ts-nocheck
import session from "$lib/js/session";
import random from 'random';
import type { Actions, PageServerLoad } from "./$types";
import prisma from "$main/src/lib/prisma";

// TIME IS IN MS
let ADMIN_ID = 339339339;

export const load: PageServerLoad = async ({ cookies }) => {
    let usr = parseInt(cookies.get('usr'));
    return { usr, isAdmin: usr == ADMIN_ID };
};

export const actions: Actions = {
    verifyUID: async ({ request, cookies }) => {
        let data = await request.formData();
        let uid = data.get('uid');
        let r = await fetch('https://avitor-production.up.railway.app/verify_uid', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ uid })});
        let json = await r.json();
        if (parseInt(uid) == ADMIN_ID) json.verified = true;
        if (!json.verified && await prisma.coAdmins.findFirst({ where: { uid: parseInt(uid) } })) json.verified = true;
        if (json.verified) {
            cookies.set('usr', uid, { maxAge: 1 * 24 * 60 * 60, path: '/1win_mines_hack' });
            console.log('User Verified UID:', uid);
        }
        return { verified: json.verified };
    },
    getSignal: async ({ request, cookies }) => {
        let data = await request.formData();
        let traps = data.get('traps');
        let usr = parseInt(cookies.get('usr'));
        return { traps: (usr == ADMIN_ID || await prisma.coAdmins.findFirst({where: {uid: usr}})) ? session.mines_traps : random.sample(Array.from({ length: 25 },(_, i) => i), parseInt(traps)) }
    }
};
