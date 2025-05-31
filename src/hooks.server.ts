//@ts-nocheck
import type { Handle } from '@sveltejs/kit';

const USERNAME = 'admin';
const PASSWORD = 'admin';
const B64CODE = btoa(USERNAME + ':' + PASSWORD)

export const handle: Handle = async ({ event, resolve }) => {
    let auth = event.cookies.get('auth');
    
	if (auth != B64CODE) {
        let [_, encoded] = event.request.headers.get('Authorization')?.split(' ') || '';
        if (encoded == B64CODE) {
            event.cookies.set('auth', B64CODE, {maxAge: 7 * 24 * 60 * 60, path: '/'})
        } else {
            return new Response('Authentication required', {status: 401, headers: {'WWW-Authenticate': 'Basic realm="Restricted Area"'}});
        }
	}

	return resolve(event);
};
