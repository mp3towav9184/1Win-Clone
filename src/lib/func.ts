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

	if (a <= 100) {
		// 10%: 1.00x – 1.20x
		coef = random.int(100, 120) / 100;
	} else if (a <= 300) {
		// 20%: 1.21x – 2.00x
		coef = random.int(121, 200) / 100;
	} else if (a <= 600) {
		// 30%: 2.01x – 5.00x
		coef = random.int(201, 500) / 100;
	} else if (a <= 800) {
		// 20%: 5.01x – 10.00x
		coef = random.int(501, 1000) / 100;
	} else if (a <= 950) {
		// 15%: 10.01x – 50.00x
		coef = random.int(1001, 5000) / 100;
	} else {
		// 5%: 50.01x – 100.00x
		coef = random.int(5001, 10000) / 100;
	}

	return coef;
}

