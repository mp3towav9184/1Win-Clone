//@ts-nocheck
import session from "$lib/js/session";
import random from 'random';
import type { Actions, PageServerLoad } from "./$types";

// TIME IS IN MS

export const load: PageServerLoad = async ({ locals, cookies }) => {
    return {
        isAdmin: locals.isAdmin,
        usr: parseInt(cookies.get('usr'))
    };
};

export const actions: Actions = {
    verifyUID: async ({ request, cookies }) => {
        let data = await request.formData();
        let uid = data.get('uid');
        let r = await fetch('https://avitor-production.up.railway.app/verify_uid', {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ uid })});
        let json = await r.json();
        if (json.verified) {
            cookies.set('usr', uid, { maxAge: 1 * 24 * 60 * 60, path: '/1win_mines_hack' });
            console.log('User Verified UID:', uid);
        }
        return { verified: json.verified };
    },
    getSignal: async ({ locals, request, cookies }) => {
        let data = await request.formData();
        let traps = data.get('traps');
        return { traps: locals.isAdmin ? session.mines_traps : random.sample(Array.from({ length: 25 },(_, i) => i), parseInt(traps)) }
    }
};
