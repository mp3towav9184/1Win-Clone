//@ts-nocheck
import session from "$lib/js/session";
import random from 'random';
import type { Actions, PageServerLoad } from "./$types";
import prisma from "$main/src/lib/prisma";

// TIME IS IN MS
let ADMIN_ID = 339339339;


function genCoef() {
    let a = random.int(1, 100);
    let coef: number;
    if (a <= 80) {
        // 80%: 1 to 15
        coef = random.int(101, 1500) / 100;
    } else if (a <= 90) {
        // 10%: 1 to 100
        coef = random.int(101, 10000) / 100;
    } else if (a <= 97) {
        // 7%: 1 to 6
        coef = random.int(101, 600) / 100;
    } else {
        // 3%: 1 to 2
        coef = random.int(101, 200) / 100;
    }
    return coef;
}

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
