
export function StringENC(text : string) {
	return btoa(Buffer.from(text, 'utf8').toString('hex'));
}

export function StringDEC(base64 : string) {
	return Buffer.from(atob(base64), 'hex').toString('utf8');
}

