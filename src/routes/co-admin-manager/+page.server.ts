//@ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/prisma";

function calcTime(d:Date) {
    let diff = +d - +new Date();
    if (diff < 0) return 'expired';
    let totalSeconds = Math.floor(diff / 1000);
    let days = Math.floor(totalSeconds / (24 * 3600));
    let hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
}

export const load: PageServerLoad = async ({ locals, url }) => {
    if (locals.role != 'super') redirect(302, '/');
    let user = url.searchParams.get('user');
    let coas = await prisma.coAdmins.findMany({
        orderBy: { id: 'desc' },
        where: { user: user ? { contains: user, mode: 'insensitive' } : undefined }
    });
    return {entries: coas.map(i=>({id: i.id, name: i.name, contact: i.contact, user: i.user, days: calcTime(i.expiresAt)}))};
};

export const actions: Actions = {
    delete: async ({ request }) => {
        let id = parseInt((await request.formData()).get('id'))
        if (id) {
            await prisma.coAdmins.delete({ where: { id: id } })
        }
    }
};