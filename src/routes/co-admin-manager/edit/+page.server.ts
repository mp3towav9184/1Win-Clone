//@ts-nocheck
import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    let id = parseInt(url.searchParams.get('id'))
    if (id){
        let coa = await prisma.coAdmins.findFirst({ where: { id } })
        if (coa) {
            return coa
        }
    }
};

export const actions: Actions = {
    default: async ({ request }) => {
        let data = await request.formData();
        let { id, name, contact, user, pass, days, expiresAt } = Object.fromEntries(data.entries());
        let coa = await prisma.coAdmins.findFirst({ where: { user, id: { not: parseInt(id) || undefined } } });
        if (coa) return { success: false, msg: 'Username already exists'};
        if (parseInt(id)) {
            expiresAt = new Date(expiresAt + 'Z');
            await prisma.coAdmins.update({ where: { id: parseInt(id) }, data: { name, contact, user, pass, expiresAt } })
        } else {
            await prisma.coAdmins.create({ data: { name, contact, user, pass, expiresAt: new Date(+new Date() + parseInt(days) * 24 * 60 * 60 * 1000) } })
        }
        redirect(302, '/co-admin-manager');
    }
};

