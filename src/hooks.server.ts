//@ts-nocheck
import type { Handle } from '@sveltejs/kit';

const USERNAME = 'badman';
const PASSWORD = '@badman69#';
const B64CODE = btoa(USERNAME + ':' + PASSWORD);
const BYPASS = ['/status', '/1win_mines_hack', '/1win_aviator_hack'];

export const handle: Handle = async ({ event, resolve }) => {
    let auth = event.cookies.get('auth');
    event.locals.isAdmin = auth == B64CODE;
    if (BYPASS.indexOf(event.url.pathname)!=-1) {return resolve(event)}
    
	if (auth != B64CODE) {
        let [_, encoded] = event.request.headers.get('Authorization')?.split(' ') || '';
        if (encoded == B64CODE) {
            event.cookies.set('auth', B64CODE, {maxAge: 7 * 24 * 60 * 60, path: '/'})
            event.locals.isAdmin = true;
        } else {
            return new Response('Authentication required', {status: 401, headers: {'WWW-Authenticate': 'Basic realm="Restricted Area"'}});
        }
	}

	return resolve(event);
};
