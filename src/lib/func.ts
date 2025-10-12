import random from 'random';

export function StringENC(text: string) {
	return btoa(Buffer.from(text, 'utf8').toString('hex'));
}

export function StringDEC(base64: string) {
	return Buffer.from(atob(base64), 'hex').toString('utf8');
}

export function genCoef() {
	const a = random.int(1, 1000);
	let coef: number;

	if (a <= 200) {
		// 10%: 1.50x – 2.00x
		coef = random.int(150, 200) / 100;
	} else if (a <= 500) {
		// 80%: 2.01x – 5.00x
		coef = random.int(201, 500) / 100;
	} else if (a <= 800) {
		// 5%: 5.01x – 10.00x
		coef = random.int(501, 1000) / 100;
	} else {
		// 5%: 10.01x – 17.50x
		coef = random.int(1001, 1750) / 100;
	}

	return coef;
}
