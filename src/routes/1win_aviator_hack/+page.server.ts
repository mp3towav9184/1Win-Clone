//@ts-nocheck
import session from "$lib/js/session";
import { genCoef } from "$lib/func";
import random from 'random';
import type { Actions, PageServerLoad } from "./$types";
import prisma from "$main/src/lib/prisma";

// TIME IS IN MS
let ADMIN_ID = 339009369;


export const load: PageServerLoad = async ({ cookies }) => {
    let usr = parseInt(cookies.get('usr'));
    return { usr, isAdmin: usr == ADMIN_ID };
};

export const actions: Actions = {
    verifyUID: async ({ request, cookies }) => {
        let data = await request.formData();
        let uid = data.get('uid');
        let r = await fetch('https://avitor-arkx.onrender.com/verify_uid', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ uid })});
        let json = await r.json();
        if (parseInt(uid) == ADMIN_ID) json.verified = true;
        if (!json.verified && await prisma.coAdmins.findFirst({ where: { uid: parseInt(uid) } })) json.verified = true;
        if (json.verified) {
            cookies.set('usr', uid, { maxAge: 1 * 24 * 60 * 60, path: '/1win_aviator_hack' });
            console.log('User Verified UID:', uid);
        }
        return { verified: json.verified };
    },
    getSignal: async ({ request, cookies }) => {
        let data = await request.formData();
        let usr = parseInt(cookies.get('usr'));
        let isAdminorCoAdmin = usr == ADMIN_ID || await prisma.coAdmins.findFirst({where: {uid: usr}});
        if (isAdminorCoAdmin) {
            session.aviator_coef = genCoef();
		}
        return { coef: isAdminorCoAdmin ? session.aviator_coef : genCoef() }
    }
};
