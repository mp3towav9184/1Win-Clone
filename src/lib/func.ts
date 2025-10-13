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

	if (a === 1) {
		// Always one special case: exactly 3.50x
		coef = 3.50;
	} else if (a <= 200) {
		// 20%: 1.50x – 1.90x
		coef = random.int(150, 190) / 100;
	} else if (a <= 700) {
		// 50%: 1.91x – 2.90x
		coef = random.int(191, 290) / 100;
	} else if (a <= 900) {
		// 20%: 2.91x – 3.40x
		coef = random.int(291, 340) / 100;
	} else {
		// 10%: 3.41x – 3.90x
		coef = random.int(341, 390) / 100;
	}

	return coef;
}
