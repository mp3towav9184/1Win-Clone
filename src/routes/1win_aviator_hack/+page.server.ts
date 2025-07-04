//@ts-nocheck
import session from "$lib/js/session";
import random from 'random';
import type { Actions, PageServerLoad } from "./$types";
import prisma from "$main/src/lib/prisma";

// TIME IS IN MS
let ADMIN_ID = 339339339;


function genCoef() {
    const a = random.int(1, 1000);
    let coef: number;

    if (a <= 100) {
        // 10%: 1.00x – 1.20x
        coef = random.int(100, 120) / 100;
    } else if (a <= 300) {
        // 20%: 1.21x – 2.00x
        coef = random.int(121, 200) / 100;
    } else if (a <= 600) {
        // 30%: 2.01x – 5.00x
        coef = random.int(201, 500) / 100;
    } else if (a <= 800) {
        // 20%: 5.01x – 10.00x
        coef = random.int(501, 1000) / 100;
    } else if (a <= 950) {
        // 15%: 10.01x – 50.00x
        coef = random.int(1001, 5000) / 100;
    } else {
        // 5%: 50.01x – 100.00x
        coef = random.int(5001, 10000) / 100;
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
