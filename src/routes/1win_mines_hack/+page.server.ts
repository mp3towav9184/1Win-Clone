import session from "$lib/js/session";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {traps: session.mines_traps};
};