//@ts-nocheck
import session from "$lib/js/session";
import random from 'random';
import type { Actions, PageServerLoad } from "./$types";

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
        if (json.verified) {
            cookies.set('usr', uid, { maxAge: 1 * 24 * 60 * 60, path: '/1win_aviator_hack' });
            console.log('User Verified UID:', uid);
        }
        return { verified: json.verified };
    },
    getSignal: async ({ request, cookies }) => {
        let data = await request.formData();
        let usr = parseInt(cookies.get('usr'));
        return { coef: usr == ADMIN_ID ? session.aviator_coef : random.int(101, random.int(1000, 5000))/100 }
    }
};
