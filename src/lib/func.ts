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

	if (a <= 600) {
		// 60%: 5.00x – 6.00x
		coef = random.int(500, 600) / 100;
	} else if (a <= 900) {
		// 30%: 6.01x – 7.00x
		coef = random.int(601, 700) / 100;
	} else {
		// 10%: 7.01x – 7.40x
		coef = random.int(701, 740) / 100;
	}

	return coef;
}
